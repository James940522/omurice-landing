# 창업문의 Contact Form + Solapi SMS 전송 기능 이식 가이드

다른 Next.js 프로젝트에 그대로 붙여넣어 사용할 수 있도록 구현 코드 전체를 포함한 가이드입니다.

---

## 전체 흐름

```
사용자 폼 입력
  → POST /api/leads
  → IP 기반 Rate Limit 체크 (1분 3회)
  → Honeypot 봇 차단
  → Zod 유효성 검사
  → Solapi API로 담당자 문자 발송
  → 성공/실패 응답
```

---

## 1. 사전 준비

### 패키지 설치

```bash
pnpm add zod
# framer-motion은 FloatingInquiry, ContactFormSection 애니메이션에 사용
pnpm add framer-motion
```

### Solapi 가입 및 설정

1. [solapi.com](https://solapi.com) 회원가입
2. 발신번호 등록 (SMS 발송에 사용할 번호 — 본인 인증 필요)
3. API Key / Secret 발급: 콘솔 → 개발 → API Key 관리

### 환경변수 (.env.local)

```env
SOLAPI_API_KEY=your_api_key_here
SOLAPI_API_SECRET=your_api_secret_here
SMS_TO=01099999999        # 문자 받을 담당자 번호 (하이픈 없이)
SMS_FROM=01011112222      # Solapi에 등록한 발신번호 (하이픈 없이)
```

---

## 2. API Route

> **파일 위치**: `src/app/api/leads/route.ts`

```ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';

export const runtime = 'nodejs';

// 입력 유효성 스키마
const Schema = z.object({
  name: z.string().min(1),
  phone: z.string().min(8),
  email: z.string().email(),
  region: z.string().min(1),
  message: z.string().optional().default(''),
  source: z.string().min(1),     // 방문 유입 경로
  privacyAgree: z.literal(true), // 개인정보 동의 (반드시 true)
  hp: z.string().optional(),     // honeypot (봇 차단용)
  domain: z.string().optional(), // 발신 도메인 (다중 도메인 운영 시 태그 구분용)
});

// 전화번호 정규화: 숫자만 추출
function normalizePhone(input: string) {
  return input.replace(/[^\d]/g, '');
}

// Solapi HMAC-SHA256 인증 헤더 생성
function solapiAuthHeader() {
  const apiKey = process.env.SOLAPI_API_KEY!;
  const apiSecret = process.env.SOLAPI_API_SECRET!;
  const date = new Date().toISOString();
  const salt = crypto.randomUUID();

  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(date + salt)
    .digest('hex');

  return `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`;
}

// Rate Limit: IP당 1분에 최대 3회
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  const recentRequests = requests.filter((t) => now - t < RATE_LIMIT_WINDOW);

  if (recentRequests.length >= RATE_LIMIT_MAX) return false;

  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);

  // 메모리 누수 방지: 1000개 초과 시 만료 항목 정리
  if (rateLimitMap.size > 1000) {
    const toDelete: string[] = [];
    rateLimitMap.forEach((timestamps, key) => {
      if (timestamps.every((t) => now - t > RATE_LIMIT_WINDOW)) toDelete.push(key);
    });
    toDelete.forEach((key) => rateLimitMap.delete(key));
  }

  return true;
}

// 클라이언트 IP 추출 (Vercel 환경 대응)
function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();

  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp;

  return 'unknown';
}

export async function POST(req: Request) {
  // 1. Rate Limit 체크
  const clientIp = getClientIp(req);
  if (!checkRateLimit(clientIp)) {
    return NextResponse.json(
      { ok: false, error: 'TOO_MANY_REQUESTS', message: '너무 많은 요청입니다. 잠시 후 다시 시도해주세요.' },
      { status: 429 }
    );
  }

  // 2. JSON 파싱
  const body = await req.json().catch(() => null);

  // 3. Zod 유효성 검사
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'INVALID_INPUT', detail: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // 4. Honeypot: 봇이 hidden 필드를 채운 경우 조용히 성공 처리
  if (parsed.data.hp && parsed.data.hp.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = parsed.data.name.trim();
  const phone = normalizePhone(parsed.data.phone);
  const email = parsed.data.email.trim();
  const region = parsed.data.region.trim();
  const message = (parsed.data.message ?? '').trim();
  const source = parsed.data.source.trim();
  const domain = parsed.data.domain || '';

  // 5. 도메인별 태그 처리 (다중 도메인 운영 시 구분용 — 단일 도메인이면 제거해도 됨)
  // 예: apply.example.com 에서 온 문의는 [네모] 태그 붙임
  const isSpecialDomain = domain === 'apply.todayomurice.com' || domain === 'localhost';
  const tagPrefix = isSpecialDomain ? '[네모] ' : '';

  // 6. SMS 본문 구성 (최대 1000자)
  const text = `${tagPrefix}[창업문의]
📞 문의자 연락처: ${phone}

이름: ${name}
이메일: ${email}
희망지역: ${region}
유입경로: ${source}

문의내용:
${message || '-'}`.slice(0, 1000);

  // 7. Solapi API 호출
  const res = await fetch('https://api.solapi.com/messages/v4/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: solapiAuthHeader(),
    },
    body: JSON.stringify({
      message: {
        to: process.env.SMS_TO,
        from: process.env.SMS_FROM,
        text,
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('SOLAPI_SEND_FAIL', errText);
    return NextResponse.json({ ok: false, error: 'SEND_FAIL' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
```

### API 응답 스펙

| 상황 | HTTP 상태 | 응답 |
|------|-----------|------|
| 성공 | 200 | `{ ok: true }` |
| Rate Limit 초과 | 429 | `{ ok: false, error: 'TOO_MANY_REQUESTS' }` |
| 유효성 오류 | 400 | `{ ok: false, error: 'INVALID_INPUT', detail: ... }` |
| SMS 발송 실패 | 500 | `{ ok: false, error: 'SEND_FAIL' }` |

---

## 3. Contact Form 컴포넌트

> **파일 위치**: `src/widgets/contact-form/ui/ContactFormSection.tsx`

```tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function ContactFormSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    region: '',
    message: '',
    source: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const [hp, setHp] = useState(''); // honeypot (건드리지 않는다)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !privacyAgree) return;

    setIsSubmitting(true);
    try {
      const domain = typeof window !== 'undefined' ? window.location.hostname : '';

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          region: formData.region,
          message: formData.message,
          source: formData.source,
          privacyAgree: true,
          hp,
          domain,
        }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          alert('너무 많은 요청입니다. 잠시 후 다시 시도해주세요.');
        } else {
          throw new Error('SEND_FAIL');
        }
        return;
      }

      alert('접수 완료! 담당자가 영업일 기준 24시간 이내 연락드립니다.');
      setFormData({ name: '', phone: '', email: '', region: '', message: '', source: '' });
      setPrivacyAgree(false);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('전송 실패. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-gray-900" ref={ref}>
      <div className="max-w-4xl mx-auto px-4">
        {/* 섹션 헤더 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">창업 문의</h2>
          <p className="text-gray-300 text-lg">담당자가 영업일 기준 24시간 이내에 연락드립니다.</p>
        </motion.div>

        {/* 폼 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* 이름 & 연락처 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                    placeholder="010-1234-5678"
                  />
                </div>
              </div>

              {/* 이메일 & 희망지역 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="region" className="block text-sm font-bold text-gray-700 mb-2">
                    희망 창업 지역 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="region"
                    name="region"
                    required
                    value={formData.region}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                    placeholder="서울 강남구"
                  />
                </div>
              </div>

              {/* 방문 유입 경로 */}
              <div>
                <label htmlFor="source" className="block text-sm font-bold text-gray-700 mb-2">
                  방문 유입 경로 <span className="text-red-500">*</span>
                </label>
                <select
                  id="source"
                  name="source"
                  required
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all bg-white"
                >
                  <option value="">선택해주세요</option>
                  <option value="검색">검색</option>
                  <option value="SNS">SNS</option>
                  <option value="지인추천">지인추천</option>
                  <option value="배너광고">배너광고</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              {/* 문의 내용 */}
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                  문의 내용
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all resize-none"
                  placeholder="궁금하신 점을 자유롭게 작성해주세요."
                />
              </div>

              {/* Honeypot — 반드시 hidden으로 유지 (봇만 채움) */}
              <input
                type="text"
                name="hp"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* 개인정보 동의 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyAgree}
                    onChange={(e) => setPrivacyAgree(e.target.checked)}
                    required
                    className="mt-1 w-5 h-5 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                  />
                  <span className="text-sm text-gray-600 leading-relaxed">
                    개인정보 수집 및 이용에 동의합니다. 수집된 정보는 창업 상담 목적으로만 사용되며,
                    관련 법령에 따라 안전하게 관리됩니다.
                  </span>
                </label>
              </div>

              {/* 제출 버튼 */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-4 px-8 rounded-xl text-lg font-bold shadow-xl transition-all duration-300 ${
                  isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-2xl'
                }`}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? '전송 중...' : '창업 문의 신청하기'}
              </motion.button>

              <p className="text-center text-sm text-gray-500">
                영업일 기준 24시간 이내에 담당자가 연락드립니다.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

### 폼 필드 커스터마이징

- **필드 추가/제거**: `formData` 초기값, `handleChange`, `JSON.stringify` 바디, API `Schema` 4곳 모두 수정
- **`source` 드롭다운 옵션**: 프로젝트에 맞게 `<option>` 목록 변경
- **SMS 본문**: `route.ts`의 `text` 템플릿 리터럴 수정

---

## 4. Floating 창업문의 버튼

> **파일 위치**: `src/features/inquiry/ui/FloatingInquiry.tsx`

스크롤이 화면 높이의 80%를 넘으면 우하단에 버튼 노출. 클릭 시 `#contact` 섹션으로 이동.

```tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingInquiry() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 체크

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToContact}
          className="fixed bottom-8 right-8 z-50 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full shadow-xl flex items-center justify-center font-black text-sm md:text-base border-4 border-orange-500"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ y: { duration: 2, repeat: Infinity } }}
        >
          <span className="text-center leading-tight text-orange-600">
            창업
            <br />
            문의
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
```

---

## 5. 페이지에 조립하기

```tsx
// src/app/page.tsx 또는 원하는 페이지

import ContactFormSection from '@/widgets/contact-form/ui/ContactFormSection';
import FloatingInquiry from '@/features/inquiry/ui/FloatingInquiry';

export default function Page() {
  return (
    <>
      {/* 다른 섹션들 */}
      <HeroSection />
      <BrandSection />

      {/* 문의 섹션 — id="contact" 가 FloatingInquiry 스크롤 타겟 */}
      <ContactFormSection />

      {/* 플로팅 버튼 — 레이아웃 최상위에 마운트 */}
      <FloatingInquiry />
    </>
  );
}
```

---

## 6. 커스터마이징 포인트 요약

| 항목 | 위치 | 변경 내용 |
|------|------|-----------|
| SMS 수신번호 | `.env.local` | `SMS_TO` |
| SMS 발신번호 | `.env.local` | `SMS_FROM` |
| SMS 본문 형식 | `route.ts` `text` 변수 | 브랜드명, 필드 순서 등 |
| 도메인 태그 `[네모]` | `route.ts` `isSpecialDomain` | 단일 도메인이면 `tagPrefix = ''`로 고정하거나 로직 삭제 |
| 유입경로 옵션 | `ContactFormSection.tsx` `<option>` 목록 | 프로젝트에 맞게 변경 |
| Rate Limit 횟수 | `route.ts` `RATE_LIMIT_MAX` | 기본 3회/분 |
| 스크롤 트리거 지점 | `FloatingInquiry.tsx` `0.8` | `window.innerHeight * 0.8` 배율 조정 |
| 버튼 텍스트 | `FloatingInquiry.tsx` | "창업 문의" 문구 |

---

## 7. 주의사항

- **Solapi 발신번호 사전 등록 필수**: 등록되지 않은 번호로 발송 시 오류 발생
- **`SMS_FROM` 하이픈 없이 입력**: `01012345678` 형식
- **Rate Limit은 인메모리**: Vercel serverless 환경에서는 인스턴스별로 독립 동작. 엄격한 Rate Limit이 필요하면 Redis(Upstash) 사용 권장
- **Zod v4**: `zod` 4.x 기준. v3는 import 방식 동일하나 일부 API 차이 있을 수 있음
- **`runtime = 'nodejs'`**: `crypto` 모듈 사용을 위해 필수. Edge Runtime에서는 동작 안 함
