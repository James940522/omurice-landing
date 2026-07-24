import { NextResponse } from 'next/server';
import { SITE_ORIGIN } from '@/shared/config/site';
import { getNaverSiteVerificationTokens } from '@/shared/config/search-verification';

/**
 * SEO: 검증 디버그 엔드포인트
 *
 * 프로덕션 환경에서 환경변수가 제대로 설정되었는지 확인
 * ⚠️ 실제 토큰 값은 반환하지 않음 (보안)
 *
 * @route GET /__verify__
 * @returns {hasGoogleVerification, hasNaverVerification, naverVerificationTokenCount, siteOrigin}
 */
export async function GET() {
  const hasGoogleVerification = !!process.env.GOOGLE_SITE_VERIFICATION;
  const naverVerificationTokenCount = getNaverSiteVerificationTokens().length;

  return NextResponse.json({
    hasGoogleVerification,
    hasNaverVerification: naverVerificationTokenCount > 0,
    naverVerificationTokenCount,
    siteOrigin: SITE_ORIGIN,
    timestamp: new Date().toISOString(),
  });
}
