# Google Search Console + Naver Search Advisor 세팅 가이드

---

## 코드 구현 현황 (이미 완료)

이 프로젝트는 `www.todayomurice.com`을 canonical 도메인으로 사용합니다. Google 인증은 환경변수로 관리하고, Naver `www` 인증값은 코드에 고정되어 항상 HTML `<head>`에 출력됩니다.

### layout.tsx — 인증 메타태그 자동 삽입

```ts
// src/app/layout.tsx

import { getNaverSiteVerificationTokens } from '@/shared/config/search-verification';

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const naverVerificationTokens = getNaverSiteVerificationTokens();

export const metadata: Metadata = {
  // Google: Next.js 빌트인 지원 → <meta name="google-site-verification" content="...">
  verification: {
    google: googleVerification,
    // Naver: 커스텀 인증 메타태그 → <meta name="naver-site-verification" content="...">
    other: {
      'naver-site-verification': naverVerificationTokens,
    },
  },
};
```

### 배포 시 생성되는 HTML

```html
<head>
  <meta name="google-site-verification" content="[GOOGLE_SITE_VERIFICATION 값]" />
  <meta name="naver-site-verification" content="c424bf3d137d3d4587723b518845a3012eac475b" />
</head>
```

### sitemap.xml / robots.txt — 자동 생성

| URL            | 파일                 |
| -------------- | -------------------- |
| `/sitemap.xml` | `src/app/sitemap.ts` |
| `/robots.txt`  | `src/app/robots.ts`  |

- sitemap: 홈 URL, `changeFrequency: 'weekly'`, `priority: 1.0`
- robots: 프로덕션 `allow: '/'` / Vercel Preview `disallow: '/'` (자동 구분)

---

## 1단계: 환경변수 설정

### 로컬 개발 (.env.local)

```env
GOOGLE_SITE_VERIFICATION=여기에_구글_인증코드_입력
NAVER_SITE_VERIFICATION=기존_non-www_네이버_인증코드가_있다면_입력
```

### Vercel 프로덕션 배포

Vercel 대시보드 → 프로젝트 선택 → **Settings** → **Environment Variables**

| Key                        | Value                                | Environment |
| -------------------------- | ------------------------------------ | ----------- |
| `GOOGLE_SITE_VERIFICATION` | 구글 인증 코드                       | Production  |
| `NAVER_SITE_VERIFICATION`  | 기존 non-www 네이버 인증 코드 보존용 | Production  |

> 값 추가 후 **Redeploy** 필수 (환경변수는 빌드 시 반영됨)

---

## 2단계: Google Search Console 세팅

### 인증 코드 발급

1. [Google Search Console](https://search.google.com/search-console) 접속
2. 우상단 **속성 추가** 클릭
3. **URL 접두어** 선택 → 도메인 입력 (예: `https://www.todayomurice.com`)
4. **소유권 확인 방법** → "HTML 태그" 선택
5. 아래와 같은 태그 표시됨:

```html
<meta name="google-site-verification" content="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
```

6. `content=""` 안의 값만 복사 → `GOOGLE_SITE_VERIFICATION`에 설정
7. 배포 후 Search Console에서 **확인** 버튼 클릭 → 소유권 인증 완료

### Sitemap 제출

소유권 인증 완료 후:

1. 좌측 메뉴 → **Sitemaps**
2. **새 사이트맵 추가** 입력창에 입력:
   ```
   sitemap.xml
   ```
3. **제출** 클릭
4. 상태가 **성공**으로 표시되면 완료

### 색인 생성 요청 (선택)

빠른 크롤링을 원하면:

1. 좌측 메뉴 → **URL 검사**
2. 홈 URL 입력 후 Enter
3. **색인 생성 요청** 클릭

---

## 3단계: Naver Search Advisor 세팅

### 인증 코드 발급

1. [Naver Search Advisor](https://searchadvisor.naver.com) 접속 (네이버 계정 로그인)
2. **웹마스터 도구** → **사이트 추가** 클릭
3. 도메인 입력 (예: `https://www.todayomurice.com`) → **확인** 클릭
4. **HTML 태그** 탭 선택
5. 아래와 같은 태그 표시됨:

```html
<meta name="naver-site-verification" content="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
```

6. `www.todayomurice.com`의 인증값은 코드에 반영되어 있으므로 배포 후 바로 소유확인을 진행
7. 배포 후 Search Advisor에서 **소유확인** 버튼 클릭 → 인증 완료

### Sitemap 제출

소유권 인증 완료 후:

1. 좌측 메뉴 → **요청** → **사이트맵 제출**
2. 입력창에 전체 URL 입력:
   ```
   https://www.todayomurice.com/sitemap.xml
   ```
3. **확인** 클릭
4. 목록에 제출된 사이트맵과 상태 확인

### RSS / 크롤링 요청 (선택)

1. **요청** → **웹 페이지 수집** → URL 입력 후 수집 요청
2. 빠른 색인이 필요할 때 사용

---

## 4단계: 인증 확인 방법

배포 후 메타태그가 정상 삽입되었는지 확인:

### 브라우저에서 직접 확인

```
https://도메인.com → 우클릭 → 페이지 소스 보기 → Ctrl+F → "site-verification"
```

### 사이트맵 직접 접속

```
https://도메인.com/sitemap.xml
https://도메인.com/robots.txt
```

정상이면 XML 형식으로 출력됩니다.

---

## 트러블슈팅

| 증상                     | 원인                | 해결                                             |
| ------------------------ | ------------------- | ------------------------------------------------ |
| 인증 실패                | 환경변수 미반영     | Vercel Redeploy 후 재시도                        |
| 인증 실패                | 코드 앞뒤 공백 포함 | 환경변수 값 공백 제거                            |
| sitemap.xml 404          | 빌드 안 된 상태     | `next build` 또는 배포 후 재확인                 |
| robots.txt `Disallow: /` | Preview 환경        | Production URL로 확인                            |
| Naver 인증 실패          | `www.` 유무 불일치  | Search Advisor에 등록한 URL과 정확히 일치시킬 것 |

---

## 요약

```
코드: 이미 완료 (환경변수만 입력하면 됨)

GOOGLE_SITE_VERIFICATION → Google Search Console → HTML 태그 → content 값
NAVER_SITE_VERIFICATION  → 기존 non-www Naver 인증값 보존이 필요할 때만 사용

배포 → 각 콘솔에서 소유권 확인 버튼 클릭 → sitemap.xml 제출
```
