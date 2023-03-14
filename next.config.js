// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/react',
  '@amcharts/amcharts5',
  '@mui/material',
  '@mui/styles',
  '@tinymce/tinymce-react'
]);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true
  }
};

module.exports = withTM(withBundleAnalyzer(nextConfig));
