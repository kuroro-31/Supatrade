/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_SUPABASE_URL],
  },
  experimental: {
    appDir: true, // nextjs13 からディレクトリ構成を変更できる
  },
};
