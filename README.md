# 오늘은 오므라이스 랜딩 페이지

국내 1위 오므라이스 프랜차이즈 "오늘은 오므라이스"의 공식 랜딩 페이지입니다.

## 🚀 기술 스택

- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **TypeScript**
- **FSD (Feature-Sliced Design) 아키텍처**

## 📁 프로젝트 구조 (FSD)

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 메인 페이지
│   └── globals.css        # 전역 스타일
│
├── widgets/               # 독립적인 UI 블록
│   ├── header/           # 헤더
│   ├── hero/             # 히어로 섹션
│   └── footer/           # 푸터
│
├── features/              # 사용자 시나리오 (동적 기능, 추후 추가)
│
├── entities/              # 비즈니스 엔티티
│   ├── menu/             # 메뉴 관련
│   ├── store/            # 매장 관련
│   └── order/            # 주문 관련
│
└── shared/                # 공유 리소스
    ├── ui/               # 재사용 가능한 UI 컴포넌트
    ├── lib/              # 유틸리티 함수
    └── types/            # 타입 정의
```

## 🎨 디자인 특징

- **귀여운 톤앤매너**: Jua, Gaegu 폰트 사용
- **커스텀 마우스 커서**: SVG 기반 커스텀 커서
- **브랜드 컬러**:
  - Primary: #FFB800 (노란색)
  - Secondary: #FF8A3D (주황색)
  - Accent Pink: #FF6B9D
  - Accent Blue: #00D4E8
  - Accent Green: #8CDE2D
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 대응

## 🧱 Server Component 우선 설계

현재 모든 컴포넌트는 **Server Component**로 구현되어 있습니다:

- ✅ `'use client'` 제거
- ✅ 애니메이션 제거 (framer-motion)
- ✅ 상태 관리 제거 (useState, useEffect)
- ✅ 순수 HTML/CSS로 구현

**추후 동적 기능 추가 시** Client Component로 `features/`에 분리 예정:

- 문의 폼 (inquiry-form)
- 매장 검색 (search-store)
- 모바일 메뉴 (mobile-menu)
- 캐러셀 (carousel)

## 📝 주요 섹션

1. **Hero Section** - 메인 비주얼
2. **Brand Intro** - 브랜드 소개 (검증된 브랜드, 안정적 수익, 본사 지원)
3. **Startup Guide** - 창업 안내 (월매출 1.5억, 100호점 돌파, 배달앱 1위)
4. **Startup Process** - 6단계 창업 프로세스
5. **Startup Cost** - 투명한 창업 비용 안내
6. **Menu Section** - 메뉴 소개 (카테고리별)
7. **Baemin Orders** - 배민 최근 주문수
8. **Store Section** - 매장 안내
9. **Footer** - 회사 정보

## 🛠️ 개발 명령어

```bash
# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# Lint 체크
pnpm lint
```

## 🔧 환경 설정

### Node.js 버전

- Node.js 20 이상 권장

### 패키지 매니저

- pnpm 사용

### 폰트

Google Fonts에서 로드:

- Jua (메인 타이틀)
- Gaegu (본문, 서브텍스트)
- Nanum Pen Script (장식용)

## 📄 라이센스

© 2024 오늘은 오므라이스. All rights reserved.

---

## 📌 FSD 원칙

1. **단방향 의존성**: 상위 계층만 하위 계층 import 가능
2. **Public API**: 각 모듈은 `index.ts`를 통해 export
3. **격리성**: 각 슬라이스는 독립적으로 동작

더 자세한 FSD 구조는 [README-FSD.md](./README-FSD.md) 참고
