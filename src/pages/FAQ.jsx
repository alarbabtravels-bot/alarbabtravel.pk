import { useState } from 'react';
import { Search, ChevronDown, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { faqs } from '../data/faqData';

export default function FAQ({ onOpenEligibility }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIndexes, setOpenIndexes] = useState([0]);

  const categories = ['All', 'Financials & Bank Statements', 'Refusals & Appeals', 'Appointments & Biometrics', 'Processing Times', 'Documentation & Ties', 'General & Licensing'];

  const toggleFaq = (idx) => {
    if (openIndexes.includes(idx)) {
      setOpenIndexes(openIndexes.filter(i => i !== idx));
    } else {
      setOpenIndexes([...openIndexes, idx]);
    }
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

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
        "name": "FAQ",
        "item": "https://alarbabtravel.pk/faq"
      }
    ]
  };

  return (
    <>
      <SEO 
        title="Frequently Asked Questions (FAQ) | Al Arbab Travels Islamabad"
        description="Authentic guidance on Pakistan passport visa bank statements, funds parking rules, refusal appeals, Gerry's appointments, and processing times."
        keywords="Pakistan visa FAQ, bank statement requirement UK visa Pakistan, Schengen visa rejection appeal Pakistan, Gerry's appointment booking Islamabad"
        canonicalPath="/faq"
        schema={[faqSchema, breadcrumbSchema]}
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
                <HelpCircle size={14} /> Knowledge Base
              </div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1rem', color: '#ffffff' }}>
                Frequently Asked <span style={{ color: 'var(--gold-accent)' }}>Questions & Guidance</span>
              </h1>
              <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                Transparent, legally sound answers regarding bank statement requirements, embassy refusal appeals, appointment booking, and genuine documents.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section style={{ padding: '1.75rem 0' }}>
          <div className="container">
            <div 
              className="glass-card"
              style={{
                padding: '1.25rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'var(--bg-surface)'
              }}
            >
              {/* Search Box */}
              <div style={{ position: 'relative', flex: '1 1 260px', maxWidth: '380px' }}>
                <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  placeholder="Search questions (e.g. bank balance, refusal)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-input"
                  style={{ paddingLeft: '38px', fontSize: '0.88rem' }}
                />
              </div>

              {/* Category Pills (10px radius) */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--radius-btn)',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      border: selectedCategory === cat ? '1px solid var(--gold-accent)' : '1px solid var(--border-subtle)',
                      background: selectedCategory === cat ? 'var(--gold-muted)' : 'rgba(255, 255, 255, 0.02)',
                      color: selectedCategory === cat ? 'var(--gold-accent)' : 'var(--text-body)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion List */}
        <section style={{ paddingTop: '0.5rem', paddingBottom: '3.5rem' }}>
          <div className="container" style={{ maxWidth: '920px' }}>
            {filteredFaqs.length === 0 ? (
              <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                <HelpCircle size={40} color="var(--gold-accent)" style={{ margin: '0 auto 0.75rem' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.35rem', color: '#ffffff' }}>No Matching Questions Found</h3>
                <p style={{ color: 'var(--text-body)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  Have a specific question about your individual travel history or financial documents? Ask our counselors directly.
                </p>
                <a 
                  href="https://wa.me/923099923232?text=Assalam%20o%20Alaikum,%20I%20have%20a%20specific%20visa%20question."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  Ask on WhatsApp
                </a>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {filteredFaqs.map((faq, idx) => {
                  const isOpen = openIndexes.includes(idx);
                  return (
                    <div 
                      key={idx}
                      className="glass-card"
                      style={{
                        padding: '1.25rem 1.5rem',
                        cursor: 'pointer',
                        borderColor: isOpen ? 'var(--gold-accent)' : 'var(--border-subtle)',
                        background: 'var(--bg-surface)'
                      }}
                      onClick={() => toggleFaq(idx)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                        <div>
                          <span style={{
                            display: 'inline-block',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            color: 'var(--gold-accent)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            marginBottom: '3px',
                            fontFamily: 'var(--font-heading)'
                          }}>
                            {faq.category}
                          </span>
                          <h2 style={{ fontSize: '1.05rem', fontWeight: 600, color: isOpen ? 'var(--gold-accent)' : '#ffffff', lineHeight: 1.4 }}>
                            {faq.question}
                          </h2>
                        </div>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <ChevronDown 
                            size={16} 
                            color="var(--gold-accent)" 
                            style={{ 
                              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.2s ease'
                            }} 
                          />
                        </div>
                      </div>

                      {isOpen && (
                        <div style={{
                          marginTop: '0.85rem',
                          paddingTop: '0.85rem',
                          borderTop: '1px solid var(--border-subtle)',
                          color: 'var(--text-body)',
                          fontSize: '0.92rem',
                          lineHeight: 1.7
                        }}>
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom Support Callout */}
            <div 
              className="glass-card"
              style={{
                marginTop: '3.5rem',
                padding: '2.5rem',
                textAlign: 'center',
                background: 'var(--bg-surface)',
                border: '1px solid var(--gold-border)'
              }}
            >
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem', color: '#ffffff' }}>
                Still Have Questions Regarding Your Profile?
              </h3>
              <p style={{ color: 'var(--text-body)', fontSize: '0.95rem', maxWidth: '560px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                Every applicant's circumstances are different. Reach out to our senior caseworkers in Islamabad for a confidential evaluation.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button type="button" className="btn-primary" onClick={onOpenEligibility}>
                  Free Assessment Tool <ArrowRight size={16} />
                </button>
                <a 
                  href="https://wa.me/923099923232?text=Assalam%20o%20Alaikum,%20I%20have%20an%20urgent%20visa%20question."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
