export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

export const config = {
  apiServerUrl: process.env.API_SERVER_URL || 'http://localhost:8080',
  // dev 모드에서는 기본적으로 목 데이터 사용, FORCE_REAL_API=true로 실제 API 강제 사용 가능
  useMockData: isDevelopment && process.env.FORCE_REAL_API !== 'true',
};