import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MapPin, Briefcase, BookOpen, HelpCircle, ArrowRight } from 'lucide-react';
import { destinations } from '../data/destinationsData';
import { services } from '../data/servicesData';
import { blogPosts } from '../data/blogData';
import { faqs } from '../data/faqData';

/**
 * Site-wide search overlay. Builds a single flat searchable index out of
 * destinations, services, blog posts and FAQs, then filters it client-side
 * as the user types. Triggered by the navbar search icon.
 */
export default function SiteSearch({ open, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const index = useMemo(() => {
    const items = [];

    destinations.forEach((d) => {
      items.push({
        type: 'Destination',
        icon: MapPin,
        color: '#2563eb',
        title: d.country,
        desc: d.badge || d.popularVisa || '',
        path: `/destinations/${d.slug || d.id}`,
        keywords: `${d.country} ${d.continent} ${d.popularVisa} ${d.badge || ''}`.toLowerCase()
      });
    });

    services.forEach((s) => {
      items.push({
        type: 'Service',
        icon: Briefcase,
        color: '#16a34a',
        title: s.title,
        desc: s.tagline || s.shortDesc || '',
        path: `/services/${s.slug || s.id}`,
        keywords: `${s.title} ${s.tagline || ''} ${s.shortDesc || ''}`.toLowerCase()
      });
    });

    blogPosts.forEach((b) => {
      items.push({
        type: 'Travel Insight',
        icon: BookOpen,
        color: '#7c3aed',
        title: b.title,
        desc: b.excerpt || '',
        path: `/blog/${b.slug || b.id}`,
        keywords: `${b.title} ${b.excerpt || ''}`.toLowerCase()
      });
    });

    faqs.forEach((f) => {
      items.push({
        type: 'FAQ',
        icon: HelpCircle,
        color: '#d97706',
        title: f.question,
        desc: f.category || '',
        path: '/faq',
        keywords: `${f.question} ${f.answer || ''} ${f.category || ''}`.toLowerCase()
      });
    });

    return items;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index.filter((item) => item.keywords.includes(q)).slice(0, 8);
  }, [query, index]);

  useEffect(() => {
    if (open) {
      setQuery('');
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const goTo = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 5000,
        background: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(3px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '10vh 1rem 1rem'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '600px',
          background: 'var(--bg-surface)',
          borderRadius: '18px',
          boxShadow: '0 30px 80px rgba(15, 23, 42, 0.35)',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden',
          animation: 'siteSearchFadeIn 0.18s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <Search size={18} color="#2563eb" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations, services, blog, FAQs..."
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontSize: '1rem', color: 'var(--text-heading)', fontFamily: 'var(--font-body)'
            }}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            style={{
              width: '30px', height: '30px', borderRadius: '50%', border: 'none',
              background: 'var(--bg-surface-hover)', color: 'var(--text-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0
            }}
          >
            <X size={15} />
          </button>
        </div>

        <div style={{ maxHeight: '58vh', overflowY: 'auto' }}>
          {query.trim() && results.length === 0 && (
            <div style={{ padding: '2.5rem 1.25rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              No results for "{query}". Try "visa", "Umrah", "Malaysia"...
            </div>
          )}

          {!query.trim() && (
            <div style={{ padding: '1.5rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Start typing to search destinations, services, travel insights and FAQs across the whole website.
            </div>
          )}

          {results.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div
                key={idx}
                onClick={() => goTo(r.path)}
                className="site-search-result"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.85rem',
                  padding: '0.8rem 1.25rem', cursor: 'pointer',
                  borderBottom: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                  background: `${r.color}18`, color: r.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon size={16} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: r.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {r.type}
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {r.title}
                  </div>
                  {r.desc && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {r.desc}
                    </div>
                  )}
                </div>
                <ArrowRight size={14} color="var(--text-muted)" style={{ flexShrink: 0 }} />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .site-search-result:hover {
          background: var(--bg-surface-hover);
        }
        @keyframes siteSearchFadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
