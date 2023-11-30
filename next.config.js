const crypto = require('crypto');

// Function to generate a random nonce
const generateRandomNonce = () => {
  return crypto.randomBytes(16).toString('base64');
};

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.dummyjson.com", "res.cloudinary.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    const randomNonce = generateRandomNonce();

    return [
      {
        source: '/api/:path*', // Modify this based on your needs
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
            Content-Security-Policy: script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self';
            X-Content-Type-Options: nosniff
            Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
            
            `.replace(/\n/g, ''), // Remove newlines
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
