import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Enterprise-grade Technical SEO Component for Al Arbab Travels.
 * Dynamically handles document title, description, keywords, canonical URLs,
 * Open Graph, Twitter Cards, robots indexing directives, and Schema.org JSON-LD markup.
 */
export default function SEO({
  title = "Al Arbab Travels | Premier Visa Consultancy & Travel Agency Islamabad",
  description = "Al Arbab Travels is Pakistan's premier travel agency and visa consultancy in Islamabad. Full assistance for Asian visit visas, Umrah packages, flight booking, and expert file preparation for Schengen & USA.",
  keywords = "visa consultancy Pakistan, Asian visit visa processing, Umrah packages Islamabad, air ticketing Pakistan, Schengen visa file preparation Pakistan, USA visa application support Pakistan",
  canonicalPath = "",
  image = "https://alarbabtravel.pk/hero_travel_lux.jpg",
  type = "website",
  noIndex = false,
  schema = null
}) {
  const location = useLocation();
  const cleanPath = (canonicalPath || location.pathname).replace(/\/+$/, '') || '/';
  const currentUrl = `https://alarbabtravel.pk${cleanPath === '/' ? '/' : cleanPath}`;
  const absoluteImage = image.startsWith('http') ? image : `https://alarbabtravel.pk${image.startsWith('/') ? '' : '/'}${image}`;

  useEffect(() => {
    // 1. Title Tag
    document.title = title;

    // Helper for meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Primary Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'robots', noIndex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'author', 'Al Arbab Travels (Pvt) Ltd');

    // 3. Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // 4. Open Graph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:image', absoluteImage);
    setMetaTag('property', 'og:site_name', 'Al Arbab Travels');
    setMetaTag('property', 'og:locale', 'en_US');

    // 5. Twitter Card Tags
    setMetaTag('property', 'twitter:card', 'summary_large_image');
    setMetaTag('property', 'twitter:title', title);
    setMetaTag('property', 'twitter:description', description);
    setMetaTag('property', 'twitter:image', absoluteImage);
    setMetaTag('property', 'twitter:url', currentUrl);

    // 6. Dynamic JSON-LD Structured Data
    const existingSchemaScript = document.getElementById('route-schema-jsonld');
    if (existingSchemaScript) {
      existingSchemaScript.remove();
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = 'route-schema-jsonld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema, null, 2);
      document.head.appendChild(script);
    }

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      const cleanupSchema = document.getElementById('route-schema-jsonld');
      if (cleanupSchema) {
        cleanupSchema.remove();
      }
    };
  }, [title, description, keywords, currentUrl, absoluteImage, type, noIndex, schema]);

  return null;
}
