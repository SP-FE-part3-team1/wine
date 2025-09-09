import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com', 
        port: '',
        pathname: '/**', // 이 호스트의 모든 경로를 허용합니다.
      },
    ],
  },
};

export default nextConfig;
