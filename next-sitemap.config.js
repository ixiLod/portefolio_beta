/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ixilod.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/ _next/static/'],
      },
    ],
  },
};
