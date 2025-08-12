import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 정적 내보내기 (S3 배포용)
  output: "export",
  trailingSlash: true,

  // 이미지 최적화
  images: {
    unoptimized: true,
  },

  // 환경 변수
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // 빌드 최적화
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
