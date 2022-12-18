/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	assetPrefix: './',
	crossOrigin: 'anonymous',

	async rewrites() {
		return [
			{
				source: '/deposit/public/:path*',
				destination: `http://127.0.0.1:5000/api/deposit/public/:path*`,
			},
			{
				source: '/deposit/private/:path*',
				destination: `http://127.0.0.1:5000/api/deposit/private/:path*`,
			},
		];
	},
	webpack5: true,
	webpack: (config) => {
		config.resolve.fallback = { fs: false };

		return config;
	},
};

module.exports = nextConfig;
