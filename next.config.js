/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["xxxx.supabase.co"],
  },
  experimental: {
    appDir: true, // nextjs13 からディレクトリ構成を変更できる
  },
};
