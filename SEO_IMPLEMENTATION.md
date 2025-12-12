# SEO 구현 완료 문서

## 📋 작업 요약

Next.js 16 App Router 기반 "오늘은 오므라이스 · 에그이츠" 프랜차이즈 랜딩페이지에 대한 전면적인 SEO 최적화를 완료했습니다.

## ✅ 완료된 작업

### A) Global Metadata (app/layout.tsx)

- ✅ SEO 최적화된 title 및 title template 설정
- ✅ 프랜차이즈 의도 키워드 포함한 description
- ✅ metadataBase 설정 (환경변수 기반)
- ✅ canonical URL 설정
- ✅ robots 규칙 설정 (preview 환경 noindex)
- ✅ OpenGraph 및 Twitter 카드 메타데이터
- ✅ Google 및 Naver 사이트 인증 placeholder

**타겟 키워드:**

- 오므라이스 창업
- 오므라이스 프랜차이즈
- 배달 전문점 창업
- 소자본 외식 창업
- 1인 운영 음식점 창업

### B) On-Page SEO (HeroSection)

- ✅ H1 태그 추가: "오므라이스 프랜차이즈 창업, 오늘은 오므라이스 · 에그이츠"
- ✅ 반복 텍스트에 `aria-hidden="true"` 적용 (SEO 스팸 방지)
- ✅ Hero 서브 카피 추가 (소자본 창업, 배달 매출 중심)
- ✅ 장식용 이미지에 빈 alt 속성 적용

### C) 카피 개선

- ✅ Hero 섹션에 프랜차이즈 의도 키워드 포함
  - "소자본 외식 창업을 고민 중이라면, 배달 매출 중심 구조로 시작하세요."
  - "오므라이스 창업을 처음 시작하는 분도 운영 동선과 조리 프로세스를 단순화했습니다."

### D) Structured Data (JSON-LD)

- ✅ Organization Schema
  - 브랜드명: 오늘은 오므라이스, 에그이츠
  - 연락처 정보 포함
- ✅ FAQPage Schema
  - "1~2인 운영이 가능한가요?"
  - "오므라이스 창업 비용은 어떻게 산정되나요?"
  - "가맹 상담은 어떻게 진행되나요?"

### E) Sitemap & Robots

- ✅ `app/sitemap.ts` 생성
- ✅ `app/robots.ts` 생성
- ✅ 환경변수 기반 동적 URL 생성

### F) OG 이미지

- ⚠️ **TODO**: `public/og.png` 파일 생성 필요
  - 권장 크기: 1200x630 픽셀
  - 파일명: `og.png`
  - 위치: `/public/og.png`

## 📂 수정/생성된 파일

### 수정된 파일

1. `/src/app/layout.tsx`
   - Global metadata 업데이트
   - metadataBase, robots, verification 추가

2. `/src/app/page.tsx`
   - Script 컴포넌트로 JSON-LD 추가
   - Organization 및 FAQPage Schema

3. `/src/widgets/hero/ui/HeroSection.tsx`
   - H1 태그 추가 (sr-only로 숨김)
   - aria-hidden 적용
   - SEO 서브 카피 추가

### 새로 생성된 파일

1. `/src/app/sitemap.ts`
2. `/src/app/robots.ts`
3. `/SEO_IMPLEMENTATION.md` (본 문서)

## 🔑 필수 환경 변수

다음 환경변수를 `.env.local` 또는 Vercel 환경변수에 설정하세요:

```bash
# 사이트 기본 URL (필수)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Google Search Console 인증 (선택)
GOOGLE_SITE_VERIFICATION=your_google_verification_code

# Naver 웹마스터 도구 인증 (선택)
NAVER_SITE_VERIFICATION=your_naver_verification_code
```

## 📊 SEO 체크리스트

### 완료 항목

- [x] H1 태그 (페이지당 1개)
- [x] Meta title & description
- [x] Canonical URL
- [x] OG tags (OpenGraph)
- [x] Twitter Card
- [x] Structured Data (Organization, FAQPage)
- [x] Sitemap
- [x] Robots.txt
- [x] 환경별 robots 설정 (preview = noindex)
- [x] 모바일 최적화 (viewport, responsive)
- [x] 장식 요소 aria-hidden

### 추가 권장 사항

- [ ] OG 이미지 생성 (`public/og.png`)
- [ ] H2 섹션 제목 추가 업데이트 (추후 섹션별 최적화)
- [ ] 블로그/콘텐츠 페이지 추가 (SEO 강화)
- [ ] 사이트맵에 추가 페이지 등록 (추후 페이지 생성 시)

## 🚀 배포 후 확인사항

1. **Google Search Console**
   - 사이트 등록
   - Sitemap 제출: `https://yourdomain.com/sitemap.xml`
   - 색인 생성 요청

2. **Naver 웹마스터 도구**
   - 사이트 등록
   - Sitemap 제출

3. **메타 태그 확인**
   - [OpenGraph 미리보기](https://www.opengraph.xyz/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)

4. **Structured Data 확인**
   - [Google Rich Results Test](https://search.google.com/test/rich-results)
   - [Schema Markup Validator](https://validator.schema.org/)

## 📈 예상 SEO 효과

### 타겟 검색어

1. **주요 의도 키워드**
   - 오므라이스 창업
   - 오므라이스 프랜차이즈
   - 배달 전문점 창업
   - 소자본 외식 창업
   - 1인 운영 음식점 창업

2. **보조 키워드**
   - 오므라이스 창업 비용
   - 오므라이스 가맹 문의
   - 배달 오므라이스 창업
   - 프랜차이즈 창업 고민
   - 소형 매장 창업

3. **브랜드 키워드** (서포트)
   - 오늘은 오므라이스
   - 에그이츠

## 💡 추가 최적화 제안

### 단기 (1~2주)

1. `public/og.png` 이미지 생성
2. Google Analytics 4 설정
3. Google Tag Manager 통합

### 중기 (1~2개월)

1. 블로그/콘텐츠 섹션 추가
2. 지역별 매장 페이지 (LocalBusiness Schema)
3. 리뷰/후기 Schema 추가
4. 내부 링크 구조 최적화

### 장기 (3개월+)

1. 정기적인 콘텐츠 발행
2. 백링크 확보 전략
3. 지역 SEO 최적화
4. Core Web Vitals 모니터링 및 개선

## 📞 문의

SEO 관련 문의사항이나 추가 최적화가 필요한 경우 개발팀에 문의하세요.

---

**마지막 업데이트:** 2024년 12월
**작업자:** Next.js SEO Engineer
