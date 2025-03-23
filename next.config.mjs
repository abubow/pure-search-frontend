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
};

export default nextConfig; 