/** @type {import('next').NextConfig} */
const nextConfig = {
  // Konfigurasi untuk mengatasi masalah Sequelize di server-side
  serverExternalPackages: ['sequelize', 'mysql2'],
};

export default nextConfig;
