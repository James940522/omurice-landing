import { NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';

export const runtime = 'nodejs';

const Schema = z.object({
  name: z.string().min(1),
  phone: z.string().min(8),
  email: z.string().email(),
  region: z.string().min(1),
  message: z.string().optional().default(''),
  privacyAgree: z.literal(true),
  hp: z.string().optional(), // honeypot
  domain: z.string().optional(), // 도메인 정보 (네모 태그용)
});

function normalizePhone(input: string) {
  return input.replace(/[^\d]/g, '');
}

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

// 레이트리밋: IP별로 1분에 3번까지 허용
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1분
const RATE_LIMIT_MAX = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  
  // 1분 이전 요청은 제거
  const recentRequests = requests.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT_MAX) {
    return false; // 제한 초과
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  
  // 메모리 누수 방지: 오래된 항목 정리
  if (rateLimitMap.size > 1000) {
    const entriesToDelete: string[] = [];
    rateLimitMap.forEach((timestamps, key) => {
      if (timestamps.every((t) => now - t > RATE_LIMIT_WINDOW)) {
        entriesToDelete.push(key);
      }
    });
    entriesToDelete.forEach((key) => rateLimitMap.delete(key));
  }
  
  return true;
}

function getClientIp(req: Request): string {
  // Vercel의 경우 x-forwarded-for 또는 x-real-ip 사용
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  
  return 'unknown';
}

export async function POST(req: Request) {
  // 레이트리밋 체크
  const clientIp = getClientIp(req);
  if (!checkRateLimit(clientIp)) {
    return NextResponse.json(
      { ok: false, error: 'TOO_MANY_REQUESTS', message: '너무 많은 요청입니다. 잠시 후 다시 시도해주세요.' },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = Schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'INVALID_INPUT', detail: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // 봇이면 조용히 성공 처리
  if (parsed.data.hp && parsed.data.hp.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = parsed.data.name.trim();
  const phone = normalizePhone(parsed.data.phone);
  const email = parsed.data.email.trim();
  const region = parsed.data.region.trim();
  const message = (parsed.data.message ?? '').trim();
  const domain = parsed.data.domain || '';

  // apply.todayomurice.com 또는 localhost인 경우 [네모] 태그 추가
  const isNemoTag = domain === 'apply.todayomurice.com' || domain === 'localhost';
  const tagPrefix = isNemoTag ? '[네모] ' : '';

  const text = `${tagPrefix}[오늘은 오므라이스 창업문의]
📞 문의자 연락처: ${phone}

이름: ${name}
이메일: ${email}
희망지역: ${region}

문의내용:
${message || '-'}`.slice(0, 1000);

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

