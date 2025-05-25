import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    eslint: {
        // 빌드 중 ESLint 오류가 나와도 계속 빌드하도록 함
        ignoreDuringBuilds: true,
    }
};

export default nextConfig;
