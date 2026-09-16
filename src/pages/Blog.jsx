import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ArrowRight, X } from 'lucide-react';
import SEO from '../components/SEO';
import { blogPosts } from '../data/blogData';

export default function Blog({ onOpenEligibility }) {
  const { postSlug } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    if (postSlug) {
      const found = blogPosts.find(p => p.slug === postSlug || p.id === postSlug);
      if (found) {
        setSelectedArticle(found);
      }
    }
  }, [postSlug]);

  const categories = ['All', 'Visa Guides', 'Refusal Analysis', 'Work & Migration'];

  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  const pageTitle = selectedArticle
    ? `${selectedArticle.title} | Al Arbab Travels`
    : "Visa Guides & Travel Insights 2026 | Al Arbab Travels Islamabad";

  const pageDescription = selectedArticle
    ? selectedArticle.excerpt
    : "Authoritative visa guides, embassy financial guidelines, and immigration insights for Pakistani passport holders by Al Arbab Travels counselors.";

  const blogSchema = selectedArticle ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": selectedArticle.title,
    "description": selectedArticle.excerpt,
    "image": selectedArticle.image,
    "datePublished": selectedArticle.date,
    "author": {
      "@type": "Person",
      "name": selectedArticle.author
    },
    "publisher": {
      "@type": "TravelAgency",
      "@id": "https://alarbabtravel.pk/#organization",
      "name": "Al Arbab Travels (Pvt) Ltd"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://alarbabtravel.pk/blog/${selectedArticle.slug || selectedArticle.id}`
    }
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://alarbabtravel.pk/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Travel Insights",
        "item": "https://alarbabtravel.pk/blog"
      },
      ...(selectedArticle ? [{
        "@type": "ListItem",
        "position": 3,
        "name": selectedArticle.title,
        "item": `https://alarbabtravel.pk/blog/${selectedArticle.slug || selectedArticle.id}`
      }] : [])
    ]
  };

  const pageSchemas = [breadcrumbSchema];
  if (blogSchema) pageSchemas.push(blogSchema);

  return (
    <>
      <SEO 
        title={pageTitle}
        description={pageDescription}
        keywords="Pakistan visa guide 2026, Schengen visa Pakistan tips, UK visa refusal reasons Pakistan, Germany opportunity card Pakistan"
        canonicalPath={selectedArticle ? `/blog/${selectedArticle.slug || selectedArticle.id}` : "/blog"}
        image={selectedArticle?.image || "https://alarbabtravel.pk/hero_travel_lux.jpg"}
        type={selectedArticle ? "article" : "website"}
        schema={pageSchemas}
      />

      <main style={{ paddingBottom: '5rem' }}>
        {/* Banner */}
        <section style={{
          paddingTop: '4rem',
          paddingBottom: '3.5rem',
          position: 'relative',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div className="container">
            <div style={{ maxWidth: '760px' }}>
              <div className="badge-gold" style={{ marginBottom: '0.85rem' }}>
                <BookOpen size={14} /> Immigration Insights
              </div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1rem', color: '#ffffff' }}>
                Expert Visa Guides & <span style={{ color: 'var(--gold-accent)' }}>Travel Intelligence</span>
              </h1>
              <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                Directly from the desks of our Islamabad visa caseworkers. Stay informed on recent policy changes, financial rules, and consular trends.
              </p>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section style={{ padding: '1.75rem 0' }}>
          <div className="container">
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '0.5rem 1.15rem',
                    borderRadius: 'var(--radius-btn)',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    border: activeCategory === cat ? '1px solid var(--gold-accent)' : '1px solid var(--border-subtle)',
                    background: activeCategory === cat ? 'var(--gold-muted)' : 'var(--bg-surface)',
                    color: activeCategory === cat ? 'var(--gold-accent)' : 'var(--text-body)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section style={{ paddingTop: '0.5rem', paddingBottom: '3.5rem' }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '2rem'
            }}>
              {filteredPosts.map((post) => (
                <article 
                  key={post.id}
                  className="glass-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                    <img 
                      src={post.image} 
                      alt={post.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      background: 'rgba(10, 14, 26, 0.85)',
                      backdropFilter: 'blur(8px)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: 'var(--gold-accent)',
                      border: '1px solid var(--gold-border)',
                      fontFamily: 'var(--font-heading)'
                    }}>
                      {post.category}
                    </div>
                  </div>

                  <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={13} /> {post.date}
                        </span>
                        <span>•</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={13} /> {post.readTime}
                        </span>
                      </div>

                      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.35, marginBottom: '0.75rem', color: '#ffffff' }}>
                        {post.title}
                      </h2>

                      <p style={{ color: 'var(--text-body)', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                        {post.excerpt}
                      </p>
                    </div>

                    <div style={{
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--gold-accent)', fontWeight: 500, fontFamily: 'var(--font-heading)' }}>
                        {post.author}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedArticle(post)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ffffff',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                          transition: 'color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold-accent)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
                      >
                        Read Guide <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Full Article Reader Modal */}
        {selectedArticle && (
          <div 
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              backgroundColor: 'rgba(10, 14, 26, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)'
            }}
            onClick={() => setSelectedArticle(null)}
          >
            <div 
              style={{
                width: '100%',
                maxWidth: '760px',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '2.25rem',
                position: 'relative',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-card)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                aria-label="Close Article"
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-body)',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>

              <div className="badge-gold" style={{ marginBottom: '0.75rem' }}>
                {selectedArticle.category}
              </div>

              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.25, marginBottom: '0.85rem', color: '#ffffff' }}>
                {selectedArticle.title}
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <span>By {selectedArticle.author}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <div style={{
                color: 'var(--text-body)',
                fontSize: '0.96rem',
                lineHeight: 1.75,
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}>
                {selectedArticle.content.split('\n\n').map((paragraph, pIdx) => {
                  const trimmed = paragraph.trim();
                  if (!trimmed) return null;
                  if (trimmed.startsWith('### ')) {
                    return (
                      <h3 key={pIdx} style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--gold-accent)', marginTop: '0.5rem' }}>
                        {trimmed.replace('### ', '')}
                      </h3>
                    );
                  }
                  return <p key={pIdx}>{trimmed}</p>;
                })}
              </div>

              <div style={{
                marginTop: '2rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    setSelectedArticle(null);
                    onOpenEligibility();
                  }}
                >
                  Consult on This Topic <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setSelectedArticle(null)}
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
