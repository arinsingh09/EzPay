/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
};
