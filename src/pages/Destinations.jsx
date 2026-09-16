import { useState } from 'react';
import { Search, MapPin, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { destinations } from '../data/destinationsData';

import { useParams } from 'react-router-dom';

export default function Destinations({ onOpenEligibilityWithCountry }) {
  const { countrySlug } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('All');

  const selectedDestination = countrySlug ? destinations.find(d => d.id === countrySlug) : null;

  const continents = ['All', 'Asia', 'Middle East', 'Africa', 'Umrah', 'Europe', 'Americas'];

  const filteredDestinations = destinations.filter((item) => {
    if (selectedDestination) {
      return item.id === selectedDestination.id;
    }
    const matchesContinent = selectedContinent === 'All' 
      || item.continent.toLowerCase().includes(selectedContinent.toLowerCase())
      || (selectedContinent === 'Umrah' && (item.id === 'umrah-packages' || item.id === 'saudi'));
    const matchesSearch = item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.popularVisa.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesContinent && matchesSearch;
  });

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
        "name": "Destinations",
        "item": "https://alarbabtravel.pk/destinations"
      },
      ...(selectedDestination ? [{
        "@type": "ListItem",
        "position": 3,
        "name": `${selectedDestination.country} Visa`,
        "item": `https://alarbabtravel.pk/destinations/${selectedDestination.id}`
      }] : [])
    ]
  };

  const pageTitle = selectedDestination 
    ? `${selectedDestination.country} Visa Requirements for Pakistan | Al Arbab Travels`
    : "Visa Destinations & Requirements Guide | Al Arbab Travels Islamabad";

  const pageDescription = selectedDestination
    ? `Apply for ${selectedDestination.country} visa from Pakistan. Processing: ${selectedDestination.processingTime}, min bank balance: ${selectedDestination.minBankStatement}. Verified file preparation in Islamabad.`
    : "Complete visa guides for Pakistani passport holders: UK, Schengen, USA, Canada, UAE, Turkey, Malaysia, and Saudi Arabia. Bank statement requirements and appointment slots.";

  return (
    <>
      <SEO 
        title={pageTitle}
        description={pageDescription}
        keywords="visa destinations Pakistan, Schengen visa countries list, UK visit visa Pakistan requirements, USA visa appointment Pakistan, Dubai visit visa Islamabad"
        canonicalPath={selectedDestination ? `/destinations/${selectedDestination.id}` : "/destinations"}
        schema={breadcrumbSchema}
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
                <MapPin size={14} /> Global Portfolio
              </div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1rem', color: '#ffffff' }}>
                Explore Global Visa <span style={{ color: 'var(--gold-accent)' }}>Requirements & Guidelines</span>
              </h1>
              <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                Detailed breakdowns of required bank statements, embassy processing durations, and document checklists for Pakistani passport holders.
              </p>

              {/* Specialization & Scope Advisory Strip */}
              <div style={{
                marginTop: '1.5rem',
                padding: '0.85rem 1.25rem',
                borderRadius: '12px',
                background: 'rgba(238, 216, 138, 0.06)',
                border: '1px solid rgba(238, 216, 138, 0.22)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#eed88a', fontWeight: 700, fontSize: '0.84rem' }}>
                  <CheckCircle2 size={16} />
                  <span>Work Visas & Employment Permits Specialist</span>
                </div>
                <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>|</span>
                <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>
                  <strong style={{ color: '#ffffff' }}>Notice:</strong> For <strong style={{ color: '#38bdf8' }}>Schengen & USA</strong>, we provide <em>Expert File Preparation, Dossier Audit & Interview Coaching Only</em> (personal biometric/consular appearance required).
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter & Search Bar */}
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
                  placeholder="Search country (e.g. UK, Germany, Canada)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-input"
                  style={{ paddingLeft: '38px', fontSize: '0.88rem' }}
                />
              </div>

              {/* Continent Filter Tabs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {continents.map((cont) => (
                  <button
                    key={cont}
                    type="button"
                    onClick={() => setSelectedContinent(cont)}
                    style={{
                      padding: '0.5rem 1.15rem',
                      borderRadius: 'var(--radius-btn)',
                      fontSize: '0.82rem',
                      fontWeight: 500,
                      border: selectedContinent === cont ? '1px solid var(--gold-accent)' : '1px solid var(--border-subtle)',
                      background: selectedContinent === cont ? 'var(--gold-muted)' : 'rgba(255, 255, 255, 0.02)',
                      color: selectedContinent === cont ? 'var(--gold-accent)' : 'var(--text-body)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {cont}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Destinations Grid */}
        <section style={{ paddingTop: '0.5rem', paddingBottom: '3.5rem' }}>
          <div className="container">
            {filteredDestinations.length === 0 ? (
              <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
                <ShieldAlert size={40} color="var(--gold-accent)" style={{ margin: '0 auto 0.75rem' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.35rem', color: '#ffffff' }}>No Destinations Found</h3>
                <p style={{ color: 'var(--text-body)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  We handle visa processing for over 50 countries. Please contact our Islamabad office directly for unlisted countries.
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => { setSearchQuery(''); setSelectedContinent('All'); }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                gap: '1.5rem'
              }}>
                {filteredDestinations.map((dest) => (
                  <div 
                    key={dest.id}
                    className="glass-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                      <img 
                        src={dest.image} 
                        alt={`Travel and visa consultancy for ${dest.country} from Pakistan`}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(10, 14, 26, 0.1) 0%, rgba(10, 14, 26, 0.9) 100%)'
                      }} />

                      <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.75rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}>{dest.flag}</span>
                        <span style={{
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
                          {dest.badge}
                        </span>
                      </div>

                      <div style={{ position: 'absolute', bottom: '0.85rem', left: '1.25rem', right: '1.25rem' }}>
                        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>{dest.country}</span>
                          <span style={{ fontSize: '1.2rem' }}>{dest.flag}</span>
                        </h2>
                        <div style={{ fontSize: '0.8rem', color: 'var(--gold-accent)' }}>
                          {dest.popularVisa}
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                          {dest.description}
                        </p>

                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: '1.2fr 1fr 1fr',
                          gap: '8px',
                          padding: '10px 12px',
                          background: 'rgba(255, 255, 255, 0.02)',
                          borderRadius: '10px',
                          border: '1px solid var(--border-subtle)',
                          marginBottom: '1.25rem',
                          fontSize: '0.78rem'
                        }}>
                          <div>
                            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>Min Balance:</span>
                            <strong style={{ color: '#ffffff' }}>{dest.minBankStatement.split('(')[0]}</strong>
                          </div>
                          <div>
                            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>Processing:</span>
                            <strong style={{ color: 'var(--gold-accent)' }}>{dest.processingTime.split('(')[0]}</strong>
                          </div>
                          <div>
                            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>Approval:</span>
                            <strong style={{ color: '#10b981' }}>{dest.approvalRate}</strong>
                          </div>
                        </div>

                        <div style={{ marginBottom: '1.25rem' }}>
                          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold-accent)', marginBottom: '0.4rem', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
                            Key Requirements:
                          </div>
                          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            {dest.keyRequirements.slice(0, 3).map((req, rIdx) => (
                              <li key={rIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-light)' }}>
                                <CheckCircle2 size={13} color="var(--gold-accent)" style={{ flexShrink: 0 }} />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                        <button
                          type="button"
                          className="btn-primary"
                          style={{ flex: 1, padding: '0.6rem 1rem', fontSize: '0.85rem' }}
                          onClick={() => onOpenEligibilityWithCountry(dest.id)}
                        >
                          Check Eligibility <ArrowRight size={14} />
                        </button>
                        <a
                          href={`https://wa.me/923099923232?text=Assalam%20o%20Alaikum,%20I%20need%20details%20and%20assistance%20for%20a%20${encodeURIComponent(dest.country)}%20visa.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary"
                          style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
