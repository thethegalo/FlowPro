
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* Otimizações de Performance */
  compress: true, // Ativa compressão gzip/brotli
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'], // Formatos de imagem de alta performance
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.typebot.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.typebotstorage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.inlead.cloud',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // Reduz o bundle size importando apenas o necessário
    optimizePackageImports: ['lucide-react', 'recharts', 'framer-motion', 'date-fns'],
  },
  compiler: {
    // Remove console.log em produção para performance e segurança
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
