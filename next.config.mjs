

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/cleartext-podcast/**",
      },
    ],
  },
};

export default nextConfig;
