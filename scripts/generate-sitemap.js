import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Import data sources
import { services } from '../src/data/servicesData.js';
import { destinations } from '../src/data/destinationsData.js';
import { blogPosts } from '../src/data/blogData.js';

const DOMAIN = 'https://alarbabtravel.pk';
const TODAY = new Date().toISOString().split('T')[0];

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/services', priority: '0.9', changefreq: 'weekly' },
  { url: '/destinations', priority: '0.9', changefreq: 'weekly' },
  { url: '/about', priority: '0.7', changefreq: 'monthly' },
  { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  { url: '/faq', priority: '0.8', changefreq: 'weekly' },
  { url: '/blog', priority: '0.8', changefreq: 'weekly' },
];

const servicePages = services.map(s => ({
  url: `/services/${s.slug || s.id}`,
  priority: '0.9',
  changefreq: 'weekly'
}));

const destinationPages = destinations.map(d => ({
  url: `/destinations/${d.id}`,
  priority: '0.85',
  changefreq: 'weekly'
}));

const blogPages = blogPosts.map(p => ({
  url: `/blog/${p.slug || p.id}`,
  priority: '0.75',
  changefreq: 'monthly'
}));

const allUrls = [
  ...staticPages,
  ...servicePages,
  ...destinationPages,
  ...blogPages
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allUrls.map(item => `  <url>
    <loc>${DOMAIN}${item.url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

// Write to public/sitemap.xml
const publicSitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
fs.writeFileSync(publicSitemapPath, sitemapXml, 'utf-8');
console.log(`[SEO] Sitemap successfully written to ${publicSitemapPath} (${allUrls.length} valid URLs)`);

// If dist directory exists, write to dist/sitemap.xml as well
const distDir = path.join(rootDir, 'dist');
if (fs.existsSync(distDir)) {
  const distSitemapPath = path.join(distDir, 'sitemap.xml');
  fs.writeFileSync(distSitemapPath, sitemapXml, 'utf-8');
  console.log(`[SEO] Sitemap also synchronized to ${distSitemapPath}`);
}
