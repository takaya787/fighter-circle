/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path((?!auth).*)', // Exclude `/api/auth/*`,
                destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
            },
        ];
    },
};

export default nextConfig;
