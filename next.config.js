/** @type {import('next').NextConfig} */
const repo = 'monterey-minivan-campers';
const isProd = process.env.NODE_ENV === 'production';
const usePrefix = isProd && !process.env.LOCAL_PREVIEW;

module.exports = {
  output: 'export',
  images: { unoptimized: true },
  basePath: usePrefix ? `/${repo}` : '',
  assetPrefix: usePrefix ? `/${repo}` : '',
  trailingSlash: true,
};
