/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/feed",
        permanent: true,
      },
      {
        source: "/events",
        destination: "/feed",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
