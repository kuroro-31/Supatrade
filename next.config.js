/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["dliuqqekpgmalcnyuvzl.supabase.co"],
  },
  experimental: {
    appDir: true, // nextjs13 からディレクトリ構成を変更できる
  },
};
