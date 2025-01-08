/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: function() {
        return [
            {
                source: '/',
                destination: '/auth',
                permanent: true
            },
            {
                source: '/app/room',
                destination: '/app',
                permanent: true
            },
            {
                source: '/app/profile',
                destination: '/app',
                permanent: true
            }
        ]
    }
};

export default nextConfig;
