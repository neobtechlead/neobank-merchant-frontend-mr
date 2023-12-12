/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
    trailingSlash: true,
    output: 'standalone'
}

module.exports = nextConfig
