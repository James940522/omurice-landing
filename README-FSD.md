# FSD (Feature-Sliced Design) 구조

## 📁 폴더 구조

```
src/
├── app/                    # Next.js App Router (애플리케이션 진입점)
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 메인 페이지
│   └── globals.css        # 전역 스타일
│
├── widgets/               # 🎨 독립적인 UI 블록 (페이지 구성 요소)
│   ├── header/           # 헤더 위젯
│   ├── footer/           # 푸터 위젯
│   ├── hero/             # 히어로 섹션
│   ├── brand-intro/      # 브랜드 소개
│   ├── startup-guide/    # 창업 안내
│   ├── startup-process/  # 창업 프로세스
│   ├── startup-cost/     # 창업 비용
│   ├── menu/             # 메뉴 섹션
│   ├── baemin-orders/    # 배민 주문 섹션
│   ├── store/            # 매장 안내
│   └── floating-inquiry/ # 플로팅 문의 (추후 features로 이동)
│
├── features/              # 🔧 사용자 시나리오 (동적 기능, 추후 추가)
│   ├── inquiry-form/     # 문의 폼 (동적 기능)
│   ├── search-store/     # 매장 검색 (동적 기능)
│   └── mobile-menu/      # 모바일 메뉴 (동적 기능)
│
├── entities/              # 📦 비즈니스 엔티티
│   ├── menu/             # 메뉴 관련 (데이터, UI)
│   ├── store/            # 매장 관련
│   └── order/            # 주문 관련
│
└── shared/                # 🔨 공유 리소스
    ├── ui/               # 재사용 가능한 UI 컴포넌트
    ├── lib/              # 유틸리티 함수
    └── types/            # 타입 정의
```

## 🏗️ 계층 구조

1. **app/** - Next.js 라우팅 및 애플리케이션 초기화
2. **widgets/** - 큰 독립 UI 블록 (헤더, 푸터, 섹션 등)
3. **features/** - 사용자 시나리오, 동적 기능 (추후 추가)
4. **entities/** - 비즈니스 엔티티 (메뉴, 매장, 주문)
5. **shared/** - 재사용 가능한 코드 (utils, types, UI)

## 🎯 현재 상태

### ✅ 완료

- `shared/lib/` - 유틸리티 함수
- `shared/types/` - 타입 정의
- `widgets/header/` - 헤더 (Server Component)
- `widgets/hero/` - 히어로 섹션 (Server Component)
- `widgets/footer/` - 푸터 (Server Component)

### 🚧 진행 중

나머지 섹션들은 기존 `components/sections/`에 유지:

- BrandIntroSection
- StartupGuideSection
- StartupProcessSection
- StartupCostSection
- MenuSection
- BaeminOrdersSection
- StoreSection

### 📅 향후 작업

1. **나머지 섹션을 widgets로 이동**
2. **동적 기능 추가 시 features로 분리**:
   - inquiry-form (문의 폼, 모달)
   - search-store (매장 검색)
   - mobile-menu (모바일 햄버거 메뉴)
   - carousel (메뉴 슬라이더)

## 📖 FSD 원칙

1. **단방향 의존성**: 상위 계층만 하위 계층 import 가능
   - ❌ shared → entities (불가능)
   - ✅ entities → shared (가능)
2. **Public API**: 각 모듈은 `index.ts`를 통해 export

   ```ts
   // widgets/header/index.ts
   export { default as Header } from './ui/Header';
   ```

3. **격리성**: 각 슬라이스는 독립적으로 동작

## 🔗 Import 규칙

```typescript
// ✅ Good - Public API를 통한 import
import { Header } from '@/widgets/header';
import { formatNumber } from '@/shared/lib/utils';

// ❌ Bad - 내부 구현 직접 import
import Header from '@/widgets/header/ui/Header';
```

## 🚀 Server Component 전환

모든 컴포넌트를 Server Component로 변경:

- ✅ `'use client'` 제거
- ✅ `framer-motion` 애니메이션 제거
- ✅ `useState`, `useEffect` 등 React Hooks 제거
- ✅ 순수 HTML/CSS로 구현

동적 기능은 추후 Client Component로 features에 추가 예정.

## 📝 마이그레이션 체크리스트

- [x] shared/lib/ utils 이동
- [x] shared/types/ types 이동
- [x] widgets/header/ 생성 (Server Component)
- [x] widgets/hero/ 생성 (Server Component)
- [x] widgets/footer/ 생성 (Server Component)
- [ ] 나머지 widgets 이동
- [ ] entities 구성
- [ ] features 추가 (동적 기능)
