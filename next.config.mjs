/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignore specific ESLint issues during the build process
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript errors during the build process
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      }
    ];
  },
  // Disable SSL in development
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.devServer = {
        ...config.devServer,
        https: false,
      };
    }
    return config;
  },
  // Add headers to prevent SSL issues
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' http://localhost:* https://localhost:*; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* https://localhost:*; style-src 'self' 'unsafe-inline' http://localhost:* https://localhost:*; img-src 'self' data: http://localhost:* https://localhost:*; connect-src 'self' http://localhost:* https://localhost:* ws://localhost:* wss://localhost:*; font-src 'self' http://localhost:* https://localhost:*;"
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ];
  }
};

export default nextConfig; 