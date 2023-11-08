/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.dummyjson.com", "i.stack.imgur.com", "res.cloudinary.com","i.im.ge", "cdn-icons-png.flaticon.com"]
    
  },
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn-icons-png.flaticon.com',
      port: '',
      pathname: 'cdn-icons-png.flaticon.com',
    },
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
