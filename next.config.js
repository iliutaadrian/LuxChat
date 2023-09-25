/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public'
})

const nextConfig = {
  ...withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true
  }),
  images: {
    domains: ['res.cloudinary.com'],
  }
}

module.exports = nextConfig