'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { fetchStores, filterStores } from '@/lib/stores';
import type { Store } from '@/lib/stores';

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
const KAKAO_SDK_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false&libraries=services`;

export default function StoreMapSection() {
  // 환경 변수 디버깅
  useEffect(() => {
    console.log('=== Kakao Maps Debug ===');
    console.log('API Key:', KAKAO_API_KEY);
    console.log('SDK URL:', KAKAO_SDK_URL);
    console.log('API Key exists:', !!KAKAO_API_KEY);
    console.log('=======================');
  }, []);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Kakao Maps 관련 ref (Kakao Maps JS SDK 객체)
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const geocoderRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const infoWindowRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  // 매장 데이터 상태
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [keyword, setKeyword] = useState('');
  const [selectedStoreCode, setSelectedStoreCode] = useState<string | null>(null);

  // 로딩 상태
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  /**
   * 카카오맵 스크립트 동적 로드
   */
  useEffect(() => {
    // API 키 확인
    if (!KAKAO_API_KEY) {
      console.error('❌ KAKAO_API_KEY is not defined!');
      console.error('Please check your .env.local file');
      setMapError('카카오맵 API 키가 설정되지 않았습니다');
      return;
    }

    // 이미 로드된 경우
    if (window.kakao && window.kakao.maps) {
      console.log('✅ Kakao Maps SDK already loaded');
      setIsScriptLoaded(true);
      return;
    }

    console.log('📥 Loading Kakao Maps SDK...');
    console.log('SDK URL:', KAKAO_SDK_URL);

    // 스크립트 태그 생성
    const script = document.createElement('script');
    script.src = KAKAO_SDK_URL;
    script.async = true;

    script.onload = () => {
      console.log('✅ Kakao Maps SDK loaded successfully');
      setIsScriptLoaded(true);
    };

    script.onerror = (error) => {
      console.error('❌ Failed to load Kakao Maps SDK');
      console.error('Error:', error);
      console.error('Possible causes:');
      console.error('1. Invalid API key');
      console.error('2. Domain not registered in Kakao Developers');
      console.error('3. Network error');
      setMapError('지도 스크립트 로드 실패 (콘솔 확인)');
    };

    document.head.appendChild(script);

    return () => {
      // 클린업은 하지 않음 (다른 컴포넌트에서도 사용할 수 있음)
    };
  }, []);

  /**
   * 카카오맵 초기화
   */
  useEffect(() => {
    if (!isScriptLoaded || !mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // 이미 초기화됨

    // Kakao Maps SDK 로드 대기 및 지도 초기화
    window.kakao.maps.load(() => {
      try {
        const container = mapContainerRef.current;
        if (!container) return;

        const options = {
          center: new window.kakao.maps.LatLng(INITIAL_CENTER.lat, INITIAL_CENTER.lng),
          level: INITIAL_ZOOM_LEVEL,
        };

        // 지도 생성
        const map = new window.kakao.maps.Map(container, options);
        mapInstanceRef.current = map;

        // Geocoder 생성
        geocoderRef.current = new window.kakao.maps.services.Geocoder();

        // InfoWindow 생성
        infoWindowRef.current = new window.kakao.maps.InfoWindow({
          zIndex: 1,
        });

        console.log('Map initialized successfully');
        setIsMapReady(true);
      } catch (error) {
        console.error('Map initialization error:', error);
        setMapError('지도 초기화 실패');
      }
    });
  }, [isScriptLoaded]);

  /**
   * CSV 데이터 로드
   */
  useEffect(() => {
    const loadStores = async () => {
      try {
        const data = await fetchStores();
        console.log(`Loaded ${data.length} stores`);
        setStores(data);
        setFilteredStores(data);
        setIsDataLoaded(true);
      } catch (error) {
        console.error('Failed to load stores:', error);
      }
    };

    loadStores();
  }, []);

  /**
   * 검색어 변경 시 필터링
   */
  useEffect(() => {
    const filtered = filterStores(stores, keyword);
    setFilteredStores(filtered);
  }, [keyword, stores]);

  /**
   * 모든 마커 제거
   */
  const clearMarkers = () => {
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current = [];
  };

  /**
   * InfoWindow 컨텐츠 생성
   */
  const createInfoWindowContent = (store: Store, lat: string, lng: string): string => {
    const directionsUrl = `https://map.kakao.com/link/to/${encodeURIComponent(store.display_name)},${lat},${lng}`;

    return `
      <div style="padding: 16px; min-width: 250px;">
        <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">
          ${store.display_name}
        </h3>
        <p style="font-size: 14px; color: #666; margin-bottom: 4px;">
          ${store.address}
        </p>
        <p style="font-size: 14px; color: #666; margin-bottom: 12px;">
          ${store.phone}
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
   * 매장 리스트를 기반으로 마커 렌더링
   */
  const renderMarkers = (storesToRender: Store[]) => {
    if (!mapInstanceRef.current || !geocoderRef.current) return;

    clearMarkers();

    if (infoWindowRef.current) {
      infoWindowRef.current.close();
    }

    if (storesToRender.length === 0) return;

    const bounds = new window.kakao.maps.LatLngBounds();
    let geocodedCount = 0;

    storesToRender.forEach((store) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      geocoderRef.current.addressSearch(store.address, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const position = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          const marker = new window.kakao.maps.Marker({
            map: mapInstanceRef.current,
            position: position,
          });

          window.kakao.maps.event.addListener(marker, 'click', () => {
            const content = createInfoWindowContent(store, result[0].y, result[0].x);
            infoWindowRef.current.setContent(content);
            infoWindowRef.current.open(mapInstanceRef.current, marker);
          });

          markersRef.current.push(marker);
          bounds.extend(position);

          geocodedCount++;

          if (geocodedCount === storesToRender.length) {
            mapInstanceRef.current.setBounds(bounds);
          }
        } else {
          console.warn(`Failed to geocode address: ${store.address}`);
        }
      });
    });
  };

  /**
   * 필터링된 매장 목록이 변경되면 마커 다시 렌더링
   */
  useEffect(() => {
    if (isMapReady && isDataLoaded && filteredStores.length > 0) {
      renderMarkers(filteredStores);
    }
  }, [filteredStores, isMapReady, isDataLoaded]);

  /**
   * 리스트에서 매장 클릭 시 해당 위치로 이동
   */
  const handleStoreClick = (store: Store) => {
    if (!geocoderRef.current || !mapInstanceRef.current) return;

    setSelectedStoreCode(store.store_code);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    geocoderRef.current.addressSearch(store.address, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const position = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        mapInstanceRef.current.panTo(position);
        mapInstanceRef.current.setLevel(FOCUSED_ZOOM_LEVEL);

        // 해당 매장 마커의 InfoWindow 열기
        const content = createInfoWindowContent(store, result[0].y, result[0].x);
        infoWindowRef.current.setContent(content);
        infoWindowRef.current.setPosition(position);
        infoWindowRef.current.open(mapInstanceRef.current);
      }
    });
  };

  return (
    <section
      id="store"
      className="py-20 md:py-32 relative overflow-hidden"
      ref={ref}
      style={{
        backgroundImage:
          'url(/asset/etc/James_A_hyperrealistic_exterior_shot_of_a_small_delivery-focu_c7dcf40c-1f4c-4665-815f-46b7a55b79cf_3.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-6"></div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            매장 안내
          </h2>
          <p className="text-xl md:text-2xl text-white mb-6 drop-shadow-md">
            전국 각지에서 성공적으로 운영 중
          </p>
          <div className="w-24 h-2 bg-yellow-300 mx-auto rounded-full" />
        </motion.div>

        {/* 지도 + 매장 목록 레이아웃 */}
        <motion.div
          className="bg-foreground rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] min-h-[900px] lg:h-[700px]">
            {/* 왼쪽: 매장 목록 */}
            <div className="bg-white p-6 overflow-y-auto max-h-[400px] lg:max-h-none">
              {/* 검색 박스 */}
              <div className="mb-6">
                <div className="flex items-center gap-2 border-2 border-foreground/20 rounded-lg p-3">
                  <span className="text-xl">🔍</span>
                  <input
                    type="text"
                    placeholder="지점명, 주소로 검색"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="flex-1 outline-none text-base"
                  />
                </div>
              </div>

              {/* 검색 결과 개수 */}
              <div className="mb-4 text-sm text-gray-500">{filteredStores.length}개 매장</div>

              {/* 매장 목록 */}
              <div className="space-y-4">
                {filteredStores.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    {isDataLoaded ? '검색 결과가 없습니다.' : '매장 목록을 불러오는 중...'}
                  </div>
                ) : (
                  filteredStores.map((store, index) => (
                    <motion.div
                      key={store.store_code}
                      onClick={() => handleStoreClick(store)}
                      className={`border-2 rounded-xl p-4 transition-all cursor-pointer ${
                        selectedStoreCode === store.store_code
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-gray-200 hover:border-yellow-400 hover:bg-yellow-50'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: Math.min(0.1 * index, 1) }}
                    >
                      {/* 매장명 */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{store.branch_name}</h3>

                      {/* 전화번호 */}
                      <p className="text-base text-yellow-600 font-semibold mb-2">{store.phone}</p>

                      {/* 주소 */}
                      <p className="text-sm text-gray-600 leading-relaxed">{store.address}</p>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* 오른쪽: 실제 카카오 지도 */}
            <motion.div
              className="bg-gray-200 relative"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div ref={mapContainerRef} className="w-full h-full" />

              {/* 로딩 및 에러 표시 */}
              {!isMapReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    {mapError ? (
                      <>
                        <p className="text-red-600 mb-2">❌ {mapError}</p>
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
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
