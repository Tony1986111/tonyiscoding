/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Next.js 不支持在 env 中设置 PORT
  // 端口应该通过命令行参数或环境变量设置
};

module.exports = nextConfig;
