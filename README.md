# 오늘은 오므라이스 · 에그이츠 | 공식 랜딩 페이지

> 재영에프앤비(Jaeyoung F&B) 운영, 배달 중심 오므라이스 프랜차이즈 공식 웹사이트

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com/)

🔗 **프로덕션**: [https://todayomurice.com](https://todayomurice.com)

---

## 🚀 기술 스택

### Core

- **Next.js 16.0.8** (App Router, React Server Components)
- **React 19.2.0** (최신 안정 버전)
- **TypeScript 5** (Strict Mode)
- **Tailwind CSS v4** (최신 버전)

### UI/UX

- **Framer Motion** - 애니메이션
- **Swiper** - 이미지 슬라이더
- **Radix UI** - 접근성 준수 컴포넌트 (Dialog, Tooltip 등)
- **Lucide React** - 아이콘 라이브러리

### 아키텍처

- **FSD (Feature-Sliced Design)** - 확장 가능한 프로젝트 구조
- **Server Component 우선** - 성능 최적화

### SEO & Analytics

- **Google Search Console** - 검색 최적화
- **Naver Search Advisor** - 네이버 검색 등록
- **JSON-LD Schema** - 구조화된 데이터
- **Open Graph** - 소셜 미디어 최적화

---

## 📁 프로젝트 구조 (FSD)

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # 루트 레이아웃 (SEO 메타데이터)
│   ├── page.tsx               # 메인 페이지
│   ├── icon.tsx               # 동적 Favicon 생성
│   ├── robots.ts              # robots.txt 생성
│   ├── sitemap.ts             # sitemap.xml 생성
│   ├── __verify__/            # 검증 디버그 엔드포인트
│   └── globals.css            # 전역 스타일
│
├── widgets/                   # 독립적인 UI 블록 (13개)
│   ├── header/               # 헤더 (스크롤 최적화)
│   ├── hero/                 # 히어로 섹션
│   ├── brand-intro/          # 브랜드 소개
│   ├── revenue-proof/        # 수익 증명
│   ├── dual-brand/           # 듀얼 브랜드 소개
│   ├── startup-process/      # 창업 프로세스
│   ├── menu/                 # 메뉴 소개
│   ├── store-preset/         # 매장 유형
│   ├── reviews/              # 고객 리뷰
│   ├── store-map/            # 매장 지도 (Kakao Map)
│   ├── contact-form/         # 창업 문의 폼
│   └── footer/               # 푸터
│
├── features/                  # 사용자 시나리오 (동적 기능 4개)
│   ├── intro-animation/      # 인트로 애니메이션
│   ├── owner-recruitment-modal/  # 점주 모집 모달
│   ├── store-status-modal/   # 매장 오픈 현황 모달
│   └── inquiry/              # 플로팅 문의 버튼
│
├── shared/                    # 공유 리소스
│   ├── ui/                   # 재사용 가능한 UI (BaseModal, Sheet)
│   ├── lib/                  # 유틸리티 (utils.ts)
│   ├── types/                # 타입 정의
│   └── config/               # 설정 (site.ts - SEO 단일 소스)
│
└── lib/                       # 비즈니스 로직
    └── stores.ts             # 매장 데이터
```

---

## 🎨 디자인 시스템

### 폰트

- **Jua** (메인 타이틀) - 귀여운 톤앤매너
- **Gaegu** (본문, 서브텍스트) - 손글씨 느낌
- **Nanum Pen Script** (장식용)

### 브랜드 컬러

```css
Primary: #FFB800    /* 노란색 - 오므라이스 */
Secondary: #FF8A3D  /* 주황색 - 강조 */
Accent Pink: #FF6B9D
Accent Blue: #00D4E8
Accent Green: #8CDE2D
```

### 반응형 디자인

- 📱 Mobile: 320px ~ 767px
- 📱 Tablet: 768px ~ 1023px
- 💻 Desktop: 1024px ~

---

## 📝 주요 섹션

### 1. Hero Section

- 브랜드 로고 + 메인 비주얼
- 스크롤 다운 인디케이터

### 2. Brand Intro

- 검증된 브랜드, 안정적 수익, 본사 지원

### 3. Revenue Proof

- 실제 매출 증명 (월매출 1.5억)
- 100호점 돌파, 배달앱 1위

### 4. Dual Brand

- 오늘은 오므라이스 vs 에그이츠 비교

### 5. Startup Process

- 6단계 창업 프로세스 (상담 → 계약 → 교육 → 오픈)

### 6. Menu Section

- 카테고리별 메뉴 소개
- 이미지 슬라이더 (Swiper)

### 7. Store Preset

- 매장 유형별 소개 (소형/중형/대형)

### 8. Reviews

- 고객 리뷰 (이미지 + 텍스트)

### 9. Store Map

- Kakao Map API 연동
- 전국 매장 위치 표시

### 10. Contact Form

- 창업 문의 폼 (React Hook Form)
- 실시간 유효성 검사

### 11. Footer

- 회사 정보 (재영에프앤비)
- 사업자 정보, 연락처
- 브랜드명 내부 링크 (SEO 최적화)

---

## 🔍 SEO 최적화

### Google Search Console 준비 완료 ✅

- ✅ Canonical URL 설정
- ✅ Open Graph 메타 태그
- ✅ JSON-LD 구조화 데이터 (Organization, FAQPage)
- ✅ Sitemap.xml 자동 생성
- ✅ Robots.txt (Preview 환경 noindex)
- ✅ Google Site Verification 메타 태그

### Naver Search Advisor 준비 완료 ✅

- ✅ Naver Site Verification 메타 태그
- ✅ 한국어 최적화 (ko_KR locale)

### 브랜드 엔티티 최적화

- ✅ 타이틀: "오늘은 오므라이스 · 에그이츠" 우선
- ✅ JSON-LD sameAs (공식 채널 연결)
- ✅ Footer 브랜드명 내부 링크 (앵커 텍스트)

### 리다이렉트 설정 ✅

- ✅ www → non-www (301 리다이렉트)
- ✅ HTTP → HTTPS 강제 (HSTS)
- ✅ Canonical 통일

### Favicon 완벽 설정 ✅

- ✅ favicon.ico (15KB)
- ✅ icon.png (512x512)
- ✅ apple-touch-icon.png (180x180)
- ✅ 동적 Favicon 생성 (src/app/icon.tsx)

---

## 🛠️ 개발 명령어

```bash
# 개발 서버 실행 (localhost:3000)
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# Lint 체크
pnpm lint

# 코드 포맷팅
pnpm format

# 포맷 검사만
pnpm format:check
```

---

## 🔧 환경 설정

### 필수 환경변수

`.env.local` 파일 생성:

```bash
# 사이트 URL (프로덕션 도메인)
NEXT_PUBLIC_SITE_URL=https://todayomurice.com

# Google Search Console 검증
GOOGLE_SITE_VERIFICATION=xxxxxxxxxxxxxx

# Naver Search Advisor 검증
NAVER_SITE_VERIFICATION=xxxxxxxxxxxxxx
```

### Node.js 버전

- **Node.js 20 이상** 필수
- pnpm 사용 권장

### 외부 API

- **Kakao Maps API** (매장 지도)
- 환경변수에 키 설정 필요 (선택)

---

## 📦 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/James940522/omurice-landing.git

# 디렉토리 이동
cd omurice-landing

# 의존성 설치
pnpm install

# 환경변수 설정
cp .env.example .env.local
# .env.local 파일 수정

# 개발 서버 실행
pnpm dev
```

브라우저에서 `http://localhost:3000` 접속

---

## 🚢 배포 (Vercel)

### 자동 배포

- `main` 브랜치에 push → 자동 배포
- Preview 배포: Pull Request 생성 시

### 수동 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 프로덕션 배포
vercel --prod
```

### 환경변수 설정

Vercel 대시보드 → Settings → Environment Variables

---

## 📊 성능 최적화

### Server Components 우선

- 모든 위젯은 기본적으로 Server Component
- Client Component는 동적 기능만 (`'use client'`)

### 이미지 최적화

- Next.js Image 컴포넌트 사용
- AVIF/WebP 포맷 우선
- Lazy Loading 적용

### 폰트 최적화

- Google Fonts Preconnect
- Font Display Swap

### 빌드 최적화

- Turbopack 사용 (Next.js 16)
- Static Generation (SSG)

---

## 🧪 테스트 체크리스트

### SEO

- [ ] `https://todayomurice.com/favicon.ico` 접근
- [ ] `https://todayomurice.com/robots.txt` 생성 확인
- [ ] `https://todayomurice.com/sitemap.xml` 생성 확인
- [ ] `view-source:https://todayomurice.com` 메타 태그 확인
- [ ] Google Search Console URL 검사
- [ ] Naver Search Advisor 소유확인

### 리다이렉트

- [ ] `www.todayomurice.com` → `todayomurice.com` (301)
- [ ] HTTP → HTTPS 자동 리다이렉트

### 브라우저 호환성

- [ ] Chrome (최신)
- [ ] Safari (iOS/macOS)
- [ ] Firefox
- [ ] Edge

### 반응형

- [ ] Mobile (375px, 414px)
- [ ] Tablet (768px, 1024px)
- [ ] Desktop (1280px, 1920px)

---

## 📌 FSD 원칙

### 1. 단방향 의존성

```
app → widgets → features → shared
```

상위 계층만 하위 계층을 import 가능

### 2. Public API

각 모듈은 `index.ts`를 통해 export:

```typescript
// ✅ Good
import { Header } from '@/widgets/header';

// ❌ Bad
import Header from '@/widgets/header/ui/Header';
```

### 3. 격리성

각 슬라이스는 독립적으로 동작:

- Widget은 다른 Widget을 import하지 않음
- Feature는 다른 Feature를 import하지 않음

더 자세한 FSD 구조는 [README-FSD.md](./README-FSD.md) 참고

---

## 🔗 관련 링크

- **프로덕션**: [https://todayomurice.com](https://todayomurice.com)
- **GitHub**: [https://github.com/James940522/omurice-landing](https://github.com/James940522/omurice-landing)
- **Vercel 대시보드**: [배포 관리](https://vercel.com/dashboard)

---

## 📄 라이센스

© 2024 **주식회사 재영에프앤비 (Jaeyoung F&B)**. All rights reserved.

**브랜드**:

- 오늘은 오므라이스 (Today Omurice)
- 에그이츠 (EGG EATS)

---

## 🤝 기여

프로젝트 개선 제안은 Issues 또는 Pull Request로 환영합니다!

### 개발 가이드

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Made with ❤️ by [James940522](https://github.com/James940522)**
