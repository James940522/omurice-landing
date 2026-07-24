export const getNaverSiteVerificationTokens = (): string[] => {
  return [process.env.NAVER_SITE_VERIFICATION, process.env.NAVER_SITE_VERIFICATION_2].filter(
    (token, index, tokens): token is string => {
      return !!token && tokens.indexOf(token) === index;
    }
  );
};
