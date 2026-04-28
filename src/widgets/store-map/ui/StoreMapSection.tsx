'use client';

import { motion, useInView } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { fetchStores, filterStores } from '@/lib/stores';
import type { Store } from '@/lib/stores';

/**
 * InfoWindow에 삽입되는 HTML에서 사용자 입력(store.display_name, store.address)을
 * escape해 XSS 위험을 차단한다.
 */
const escapeHtml = (str: string): string =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/**
 * 지도 초기 설정 상수
 */
const INITIAL_CENTER = {
  lat: 36.5, // 대한민국 중심부
  lng: 127.5,
};

const INITIAL_ZOOM_LEVEL = 13;
const FOCUSED_ZOOM_LEVEL = 4;

// 카카오맵 API 키
const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

// 카카오맵 SDK URL (반드시 https 사용)
// 지오코딩은 서버 사이드 `/api/stores`에서 처리되므로 `libraries=services`는 필요하지 않다.
const KAKAO_SDK_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`;

export default function StoreMapSection() {
  // 환경 변수 디버깅
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Kakao Maps 관련 ref (Kakao Maps JS SDK 객체)
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  // store_code를 키로 마커를 저장하는 Map
  const markersRef = useRef<Map<string, any>>(new Map()); // eslint-disable-line @typescript-eslint/no-explicit-any
  const infoWindowRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  // 커스텀 핀 크기 (CSS로 직접 제어 — 이 값만 바꾸면 됨)
  const PIN_W = 34;
  const PIN_H = 42;

  // 매장 데이터 상태
  const [stores, setStores] = useState<Store[]>([]);
  const [keyword, setKeyword] = useState('');
  const [selectedStoreCode, setSelectedStoreCode] = useState<string | null>(null);

  // 검색어/원본 매장 변경에 따라 파생되는 값 — derived state는 useMemo로 처리한다.
  const filteredStores = useMemo(() => filterStores(stores, keyword), [stores, keyword]);

  // 로딩 상태
  const [isMapReady, setIsMapReady] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  // KAKAO_API_KEY는 모듈 로드 시점에 결정되므로 lazy init으로 초기 에러 상태를 잡는다.
  const [mapError, setMapError] = useState<string | null>(() =>
    KAKAO_API_KEY ? null : '카카오맵 API 키가 설정되지 않았습니다'
  );

  // 모바일 탭 상태 ('list' | 'map')
  const [mobileTab, setMobileTab] = useState<'list' | 'map'>('list');

  /**
   * 카카오맵 스크립트 로드 + 지도 초기화 (단일 effect)
   *
   * 두 단계를 별도 effect로 나누면 중간 state(`isScriptLoaded`)에 대한
   * "effect body 동기 setState" 룰 위반이 발생하므로, 콜백 체인으로 통합한다.
   * - 외부 시스템(window.kakao 글로벌, <script> 태그) 동기화 책임
   * - setState는 모두 콜백 안에서만 호출되어 cascading render 없음
   */
  useEffect(() => {
    if (!KAKAO_API_KEY) return;

    let cancelled = false;

    const initMap = () => {
      if (cancelled || mapInstanceRef.current) return;

      window.kakao.maps.load(() => {
        if (cancelled || mapInstanceRef.current) return;
        const container = mapContainerRef.current;
        if (!container) return;

        try {
          const map = new window.kakao.maps.Map(container, {
            center: new window.kakao.maps.LatLng(INITIAL_CENTER.lat, INITIAL_CENTER.lng),
            level: INITIAL_ZOOM_LEVEL,
          });
          mapInstanceRef.current = map;
          infoWindowRef.current = new window.kakao.maps.InfoWindow({ zIndex: 1 });
          setIsMapReady(true);
        } catch (error) {
          console.error('Map initialization error:', error);
          setMapError('지도 초기화 실패');
        }
      });
    };

    // 1) 이미 SDK가 로드된 경우 → 곧바로 초기화
    if (window.kakao?.maps) {
      initMap();
      return () => {
        cancelled = true;
      };
    }

    // 2) 같은 SDK <script>가 이미 DOM에 있는 경우 → 로드 완료 대기
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${KAKAO_SDK_URL}"]`
    );
    if (existing) {
      existing.addEventListener('load', initMap, { once: true });
      return () => {
        cancelled = true;
        existing.removeEventListener('load', initMap);
      };
    }

    // 3) 신규 SDK 로드
    const script = document.createElement('script');
    script.src = KAKAO_SDK_URL;
    script.async = true;
    script.onload = initMap;
    script.onerror = () => {
      if (!cancelled) setMapError('지도 스크립트 로드 실패');
    };
    document.head.appendChild(script);

    return () => {
      cancelled = true;
    };
  }, []);

  /**
   * CSV 데이터 로드 (주소가 있는 매장만 지도에 표시)
   */
  useEffect(() => {
    let cancelled = false;

    const loadStores = async () => {
      try {
        const data = await fetchStores();
        if (cancelled) return;

        const storesWithAddress = data.filter(
          (store) => store.address && store.address.trim() !== ''
        );
        setStores(storesWithAddress);
        setIsDataLoaded(true);
      } catch (error) {
        console.error('Failed to load stores:', error);
      }
    };

    loadStores();

    return () => {
      cancelled = true;
    };
  }, []);

  /**
   * 모든 마커 제거
   */
  const clearMarkers = () => {
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current.clear();
  };

  /**
   * InfoWindow 컨텐츠 생성 — 사용자 입력은 escape하여 XSS 방어
   */
  const createInfoWindowContent = (store: Store, lat: string, lng: string): string => {
    const directionsUrl = `https://map.kakao.com/link/to/${encodeURIComponent(
      store.display_name
    )},${lat},${lng}`;

    return `
      <div style="padding: 16px; min-width: 250px;">
        <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">
          ${escapeHtml(store.display_name)}
        </h3>
        <p style="font-size: 14px; color: #666; margin-bottom: 12px;">
          ${escapeHtml(store.address)}
        </p>
        <a
          href="${directionsUrl}"
          target="_blank"
          rel="noopener noreferrer"
          style="display: inline-block; background-color: #FEE500; color: #000; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-size: 14px; font-weight: bold;"
        >
          길찾기
        </a>
      </div>
    `;
  };

  /**
   * InfoWindow를 특정 위치에서 열기 (CustomOverlay용)
   */
  const openInfoWindow = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (store: Store, position: any, lat: string, lng: string) => {
      if (infoWindowRef.current) infoWindowRef.current.close();
      const content = createInfoWindowContent(store, lat, lng);
      infoWindowRef.current = new window.kakao.maps.InfoWindow({
        position,
        content,
        zIndex: 5,
      });
      infoWindowRef.current.open(mapInstanceRef.current);
    },
    []
  );

  /**
   * 매장 리스트를 기반으로 마커 렌더링 (CustomOverlay 사용 — CSS로 크기 제어)
   *
   * 매장에는 `/api/stores` 응답 시점에 lat/lng가 이미 포함되어 있으므로
   * 별도의 비동기 지오코딩 단계 없이 동기적으로 마커를 일괄 렌더링한다.
   * 좌표가 없는 매장(지오코딩 실패)은 스킵.
   */
  const renderMarkers = useCallback(
    (storesToRender: Store[]) => {
      if (!mapInstanceRef.current) return;

      clearMarkers();
      if (infoWindowRef.current) infoWindowRef.current.close();

      if (storesToRender.length === 0) return;

      const bounds = new window.kakao.maps.LatLngBounds();

      storesToRender.forEach((store) => {
        if (typeof store.lat !== 'number' || typeof store.lng !== 'number') return;

        const { lat, lng } = store;
        const position = new window.kakao.maps.LatLng(lat, lng);

        // 커스텀 핀 요소 생성 (크기 = PIN_W × PIN_H)
        const el = document.createElement('div');
        el.style.cssText = `width:${PIN_W}px; height:${PIN_H}px; cursor:pointer; position:relative;`;

        const img = document.createElement('img');
        img.src = `${window.location.origin}/asset/logo/custom-pin-Photoroom.png`;
        img.alt = store.branch_name;
        img.style.cssText = 'width:100%; height:100%; object-fit:contain; display:block;';
        img.onerror = () => {
          console.warn('Custom pin image failed to load, using fallback');
          img.style.display = 'none';
          const fallback = document.createElement('div');
          fallback.style.cssText = `width:${PIN_W}px;height:${PIN_H}px;background:#FFC107;border:2px solid #FF8F00;border-radius:50% 50% 50% 0;transform:rotate(-45deg);`;
          el.appendChild(fallback);
        };
        el.appendChild(img);

        const overlay = new window.kakao.maps.CustomOverlay({
          position,
          content: el,
          yAnchor: 1.0,
          xAnchor: 0.5,
          zIndex: 3,
          map: mapInstanceRef.current,
        });

        el.addEventListener('click', () => {
          openInfoWindow(store, position, lat.toString(), lng.toString());
        });

        markersRef.current.set(store.store_code, overlay);
        bounds.extend(position);
      });

      if (markersRef.current.size > 0) {
        mapInstanceRef.current.setBounds(bounds);
      }
    },
    [PIN_W, PIN_H, openInfoWindow]
  );

  /**
   * 필터링된 매장 목록이 변경되면 마커 다시 렌더링.
   * 결과가 0건일 때도 기존 마커는 정리해야 하므로 length 조건은 두지 않는다.
   */
  useEffect(() => {
    if (!isMapReady || !isDataLoaded) return;
    renderMarkers(filteredStores);
  }, [filteredStores, isMapReady, isDataLoaded, renderMarkers]);

  /**
   * 지도 탭으로 전환 시 지도 크기 재조정
   */
  const handleMapTabSwitch = () => {
    setMobileTab('map');

    // 지도 크기 재조정 (DOM 업데이트 후 실행)
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.relayout();
      }
    }, 100);
  };

  /**
   * 리스트에서 매장 클릭 시 해당 위치로 이동
   */
  const handleStoreClick = (store: Store) => {
    if (!mapInstanceRef.current) return;

    setSelectedStoreCode(store.store_code);

    // 모바일에서는 지도 탭으로 자동 전환
    handleMapTabSwitch();

    // 지도 크기 재조정 후 위치 이동 (약간의 지연 필요)
    setTimeout(() => {
      const overlay = markersRef.current.get(store.store_code);

      if (overlay) {
        const position = overlay.getPosition();
        mapInstanceRef.current.panTo(position);
        mapInstanceRef.current.setLevel(FOCUSED_ZOOM_LEVEL);

        const lat = position.getLat();
        const lng = position.getLng();
        openInfoWindow(store, position, lat.toString(), lng.toString());
      }
    }, 150);
  };

  return (
    <section
      id="store"
      className="py-20 md:py-32 relative overflow-hidden"
      ref={ref}
      style={{
        backgroundImage:
          'url(/asset/bg/James_soft_cream_and_pastel_yellow_gradient_background_extrem_5dec8460-2b90-4356-a8e4-451278ddf25b_3.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-6"></div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">매장 안내</h2>
          <p className="text-xl md:text-2xl text-gray-800 mb-6 font-semibold">
            전국 각지에서 성공적으로 운영 중
          </p>
          <div className="w-24 h-2 bg-yellow-400 mx-auto rounded-full" />
        </motion.div>

        {/* 지도 + 매장 목록 레이아웃 */}
        <motion.div
          className="bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-500"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* 검색 박스 (모든 화면에서 상단 고정) */}
          <div className="bg-white p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center gap-2 border-2 border-gray-300 rounded-xl p-3 bg-gray-50">
              <input
                type="text"
                placeholder="지점명, 주소로 검색"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="flex-1 outline-none text-base bg-transparent"
              />
            </div>
          </div>

          {/* 모바일 탭 버튼 (lg 미만에서만 표시) */}
          <div className="lg:hidden flex border-b border-gray-200">
            <button
              onClick={() => setMobileTab('list')}
              className={`flex-1 py-4 text-base font-bold transition-all ${
                mobileTab === 'list'
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              매장 목록
            </button>
            <button
              onClick={handleMapTabSwitch}
              className={`flex-1 py-4 text-base font-bold transition-all ${
                mobileTab === 'map'
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              지도 보기
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] h-[600px] lg:h-[700px]">
            {/* 왼쪽: 매장 목록 */}
            <div
              className={`bg-white p-4 sm:p-6 overflow-y-auto h-full ${
                mobileTab === 'list' ? 'block' : 'hidden lg:block'
              }`}
            >
              {/* 매장 목록 */}
              <div className="space-y-3">
                {filteredStores.length === 0 ? (
                  <div className="text-center py-20 text-gray-500">
                    {isDataLoaded ? (
                      <div>
                        <p className="text-lg">검색 결과가 없습니다.</p>
                      </div>
                    ) : (
                      <div>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                        <p>매장 목록을 불러오는 중...</p>
                      </div>
                    )}
                  </div>
                ) : (
                  filteredStores.map((store, index) => (
                    <motion.div
                      key={store.store_code}
                      onClick={() => handleStoreClick(store)}
                      className={`rounded-xl p-4 transition-all cursor-pointer border-2 ${
                        selectedStoreCode === store.store_code
                          ? 'bg-yellow-50 shadow-md border-amber-500'
                          : 'hover:bg-yellow-50 hover:shadow-sm border-amber-400'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: Math.min(0.05 * index, 0.8) }}
                    >
                      <div className="flex items-center gap-4">
                        {/* 왼쪽: 매장 로고 이미지 */}
                        <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden">
                          <Image
                            src="/asset/logo/지도_가맹점.png"
                            alt="매장 로고"
                            width={80}
                            height={80}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* 오른쪽: 매장 정보 */}
                        <div className="flex-1 min-w-0">
                          {/* 매장명 */}
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 truncate">
                            {store.branch_name}
                          </h3>

                          {/* 주소 */}
                          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                            {store.address}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* 오른쪽: 실제 카카오 지도 */}
            <motion.div
              className={`bg-gray-200 relative h-full ${
                mobileTab === 'map' ? 'block' : 'hidden lg:block'
              }`}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div ref={mapContainerRef} className="w-full h-full" />

              {/* 로딩 및 에러 표시 */}
              {!isMapReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center px-4">
                    {mapError ? (
                      <>
                        <p className="text-red-600 mb-2 text-lg">❌ {mapError}</p>
                        <p className="text-sm text-gray-600">
                          환경 변수와 카카오 개발자 센터 설정을 확인하세요.
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                        <p className="text-gray-600">지도를 불러오는 중...</p>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* 모바일에서 목록으로 돌아가기 버튼 */}
              <button
                onClick={() => setMobileTab('list')}
                className="lg:hidden absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg font-bold text-sm flex items-center gap-2 hover:bg-gray-50 transition-all z-10"
              >
                ← 목록으로
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
