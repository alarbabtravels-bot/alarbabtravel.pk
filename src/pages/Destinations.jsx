import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Search, MapPin, CheckCircle2, ShieldAlert, ArrowRight, 
  ArrowLeft, Clock, Banknote, ShieldCheck, FileText, Globe
} from 'lucide-react';
import SEO from '../components/SEO';
import { destinations } from '../data/destinationsData';

export default function Destinations({ onOpenEligibilityWithCountry }) {
  const { countrySlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('All');

  const selectedDestination = countrySlug 
    ? destinations.find(d => (d.slug || d.id) === countrySlug || d.id === countrySlug || d.aliases?.includes(countrySlug)) 
    : null;

  // Handle legacy query-string navigation (e.g. ?search=Singapore or ?search=Malaysia)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      const clean = searchParam.trim().toLowerCase();
      const match = destinations.find(d => 
        (d.slug && d.slug.toLowerCase() === clean) ||
        d.id.toLowerCase() === clean || 
        d.country.toLowerCase().includes(clean) ||
        clean.includes(d.id.toLowerCase()) ||
        d.aliases?.some(a => a.toLowerCase() === clean)
      );
      if (match) {
        navigate(`/destinations/${match.slug || match.id}`, { replace: true });
      } else {
        setSearchQuery(searchParam);
        navigate('/destinations', { replace: true });
      }
    }
  }, [location.search, navigate]);

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
        "item": `https://alarbabtravel.pk/destinations/${selectedDestination.slug || selectedDestination.id}`
      }] : [])
    ]
  };

  const pageTitle = selectedDestination 
    ? (selectedDestination.id === 'schengen'
        ? "Schengen Visa File Preparation Pakistan | Al Arbab Travels Islamabad"
        : selectedDestination.id === 'usa'
        ? "USA Visa Application Support Pakistan | Al Arbab Travels Islamabad"
        : `${selectedDestination.country} Visa Requirements for Pakistan | Al Arbab Travels`)
    : "Visa Destinations & Requirements Guide | Al Arbab Travels Islamabad";

  const pageDescription = selectedDestination
    ? (selectedDestination.id === 'schengen'
        ? "Professional Schengen visa file preparation in Pakistan. Meticulous document checklist, VFS/Gerry's appointment scheduling, financial audit, and €30K travel insurance."
        : selectedDestination.id === 'usa'
        ? "Expert USA visa application support in Islamabad & Karachi. DS-160 petition drafting, MRV appointment booking, financial statement audit, and mock interview coaching."
        : `Apply for ${selectedDestination.country} visa from Pakistan. Processing: ${selectedDestination.processingTime}, min bank balance: ${selectedDestination.minBankStatement}. Professional casework in Islamabad.`)
    : "Complete visa guides for Pakistani passport holders: full processing for Asian visit visas (Malaysia, Thailand, Singapore, UAE) and expert file preparation for Schengen & USA.";

  const pageKeywords = selectedDestination
    ? (selectedDestination.id === 'schengen'
        ? "Schengen visa file preparation Pakistan, Schengen visa application support Pakistan, European visa file preparation Islamabad, VFS appointment Pakistan"
        : selectedDestination.id === 'usa'
        ? "USA visa application support Pakistan, USA visa file preparation Pakistan, DS-160 drafting Islamabad, US embassy mock interview Pakistan"
        : `${selectedDestination.country} visa Pakistan, apply for ${selectedDestination.country} visa, ${selectedDestination.country} visa requirements`)
    : "visa destinations Pakistan, Asian visit visas Pakistan, Schengen visa file preparation Pakistan, USA visa application support Pakistan, Dubai visit visa Islamabad";

  return (
    <>
      <SEO 
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
        canonicalPath={selectedDestination ? `/destinations/${selectedDestination.slug || selectedDestination.id}` : "/destinations"}
        schema={breadcrumbSchema}
      />

      <main style={{ paddingBottom: '5rem' }}>
        {/* Banner Section */}
        <section style={{
          paddingTop: '3.5rem',
          paddingBottom: '3rem',
          position: 'relative',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div className="container">
            {/* Breadcrumb Trail */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1.25rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <ol style={{ listStyle: 'none', display: 'flex', alignItems: 'center', gap: '8px', padding: 0, margin: 0, flexWrap: 'wrap' }}>
                <li>
                  <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
                </li>
                <li>/</li>
                <li>
                  <Link to="/destinations" style={{ color: selectedDestination ? 'var(--text-muted)' : 'var(--gold-accent)', textDecoration: 'none' }}>
                    Destinations
                  </Link>
                </li>
                {selectedDestination && (
                  <>
                    <li>/</li>
                    <li style={{ color: 'var(--gold-accent)', fontWeight: 600 }}>
                      {selectedDestination.country}
                    </li>
                  </>
                )}
              </ol>
            </nav>

            <div style={{ maxWidth: '820px' }}>
              <div className="badge-gold" style={{ marginBottom: '0.85rem' }}>
                <MapPin size={14} /> Al Arbab Travels (Pvt) Ltd · Blue Area, Islamabad Portfolio
              </div>
              
              <h1 style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1rem', color: '#ffffff' }}>
                {selectedDestination ? (
                  <>
                    {selectedDestination.country} <span style={{ color: 'var(--gold-accent)' }}>Visa Requirements</span>
                  </>
                ) : (
                  <>
                    Explore Global Visa <span style={{ color: 'var(--gold-accent)' }}>Requirements & Guidelines</span>
                  </>
                )}
              </h1>

              <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                {selectedDestination 
                  ? selectedDestination.description 
                  : "Detailed breakdowns of required bank statements, embassy processing durations, and document checklists for Pakistani passport holders across 25+ global destinations."}
              </p>

              {/* Scope Advisory Strip */}
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
                  <span>Asian Visit Visas & Work Permits Specialist</span>
                </div>
                <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>|</span>
                <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>
                  <strong style={{ color: '#ffffff' }}>Notice:</strong> For <strong style={{ color: '#38bdf8' }}>Schengen & USA</strong>, we provide <em>Expert File Preparation & Interview Coaching Only</em> (personal biometric/consular appearance required).
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Single Destination Page View */}
        {selectedDestination ? (
          <section style={{ paddingTop: '2.5rem', paddingBottom: '3.5rem' }}>
            <div className="container">
              {/* Back to All Destinations Button */}
              <div style={{ marginBottom: '2rem' }}>
                <Link 
                  to="/destinations" 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '9999px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    color: '#cbd5e1',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 500,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--gold-accent)';
                    e.currentTarget.style.color = 'var(--gold-accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  <ArrowLeft size={16} /> Back to All 25 Destinations
                </Link>
              </div>

              {/* Main Destination Hero Panel */}
              <div className="glass-card" style={{ padding: '2rem', overflow: 'hidden', marginBottom: '2.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
                  <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', height: '340px' }}>
                    <img 
                      src={selectedDestination.image} 
                      alt={`${selectedDestination.country} visa consultancy Pakistan`}
                      width="600"
                      height="340"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(5, 6, 9, 0.85) 100%)' }} />
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '2rem' }}>{selectedDestination.flag}</span>
                      <span className="badge-gold">{selectedDestination.badge}</span>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#38bdf8', fontWeight: 600, marginBottom: '0.5rem' }}>
                      {selectedDestination.continent} · {selectedDestination.popularVisa}
                    </div>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
                      {selectedDestination.country} Visa File Preparation
                    </h2>
                    <p style={{ color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.96rem' }}>
                      {selectedDestination.description}
                    </p>

                    {/* Key Metrics Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                      gap: '12px',
                      padding: '1rem',
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderRadius: '12px',
                      border: '1px solid var(--border-subtle)',
                      marginBottom: '1.5rem'
                    }}>
                      <div>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem', display: 'block' }}>Min Statement</span>
                        <strong style={{ color: '#ffffff', fontSize: '0.95rem' }}>{selectedDestination.minBankStatement}</strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem', display: 'block' }}>Processing Time</span>
                        <strong style={{ color: 'var(--gold-accent)', fontSize: '0.95rem' }}>{selectedDestination.processingTime}</strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem', display: 'block' }}>
                          Service Scope
                        </span>
                        <strong style={{ color: (selectedDestination.serviceScope?.includes('Only') || selectedDestination.approvalRate?.includes('Only')) ? '#38bdf8' : '#10b981', fontSize: '0.95rem' }}>
                          {selectedDestination.serviceScope || selectedDestination.approvalRate}
                        </strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem', display: 'block' }}>Embassy / Consular Fee</span>
                        <strong style={{ color: '#cbd5e1', fontSize: '0.92rem' }}>{selectedDestination.consularFee}</strong>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="btn-primary"
                        style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
                        onClick={() => onOpenEligibilityWithCountry(selectedDestination.id)}
                      >
                        Check Eligibility Now <ArrowRight size={15} />
                      </button>
                      <a
                        href={`https://wa.me/923099923232?text=Assalam%20o%20Alaikum,%20I%20would%20like%20to%20apply%20for%20a%20${encodeURIComponent(selectedDestination.country)}%20visa%20with%20Al%20Arbab%20Travels.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
                      >
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visa Types & Mandatory Requirements Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {/* Requirements Column */}
                <div className="glass-card" style={{ padding: '1.75rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={18} color="var(--gold-accent)" /> Mandatory Document Checklist
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {selectedDestination.keyRequirements.map((req, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: 1.5 }}>
                        <CheckCircle2 size={16} color="var(--gold-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visa Categories Column */}
                <div className="glass-card" style={{ padding: '1.75rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Globe size={18} color="#38bdf8" /> Supported Visa Subcategories
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedDestination.types.map((type, idx) => (
                      <div 
                        key={idx} 
                        style={{ 
                          padding: '10px 14px', 
                          borderRadius: '10px', 
                          background: 'rgba(255, 255, 255, 0.02)', 
                          border: '1px solid var(--border-subtle)',
                          fontSize: '0.88rem',
                          color: '#ffffff'
                        }}
                      >
                        ✓ {type}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Other Popular Destinations Strip */}
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
                  Explore Other Featured Destinations
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                  {destinations.filter(d => d.id !== selectedDestination.id).slice(0, 5).map(other => (
                    <Link
                      key={other.id}
                      to={`/destinations/${other.slug || other.id}`}
                      style={{
                        padding: '1rem',
                        borderRadius: '12px',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                        textDecoration: 'none',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--gold-accent)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.4rem' }}>{other.flag}</span>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{other.country}</div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{other.processingTime}</div>
                        </div>
                      </div>
                      <ArrowRight size={14} color="var(--gold-accent)" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : (
          /* All Destinations Grid View */
          <>
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
                      placeholder="Search country (e.g. UK, Malaysia, Singapore)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="glass-input"
                      style={{ paddingLeft: '38px', fontSize: '0.88rem' }}
                      aria-label="Search destinations"
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
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
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
                        {/* Clickable Image to clean URL */}
                        <Link 
                          to={`/destinations/${dest.slug || dest.id}`}
                          style={{ position: 'relative', height: '210px', overflow: 'hidden', display: 'block', textDecoration: 'none' }}
                        >
                          <img 
                            src={dest.image} 
                            alt={`Travel and visa consultancy for ${dest.country} from Pakistan`}
                            loading="lazy"
                            decoding="async"
                            width="380"
                            height="210"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
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
                        </Link>

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
                                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>
                                  Scope:
                                </span>
                                <strong style={{ color: (dest.serviceScope?.includes('Only') || dest.approvalRate?.includes('Only')) ? '#38bdf8' : '#10b981' }}>
                                  {dest.serviceScope || dest.approvalRate}
                                </strong>
                              </div>
                            </div>

                            <div style={{ marginBottom: '1.25rem' }}>
                              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold-accent)', marginBottom: '0.4rem', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
                                Key Requirements:
                              </div>
                              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px', padding: 0, margin: 0 }}>
                                {dest.keyRequirements.slice(0, 3).map((req, rIdx) => (
                                  <li key={rIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-light)' }}>
                                    <CheckCircle2 size={13} color="var(--gold-accent)" style={{ flexShrink: 0 }} />
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Dual Action: View Full Guide + Eligibility */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                            <Link
                              to={`/destinations/${dest.slug || dest.id}`}
                              className="btn-secondary"
                              style={{ flex: 1, padding: '0.6rem 0.75rem', fontSize: '0.82rem', textAlign: 'center', textDecoration: 'none' }}
                            >
                              View Guide
                            </Link>
                            <button
                              type="button"
                              className="btn-primary"
                              style={{ flex: 1, padding: '0.6rem 0.75rem', fontSize: '0.82rem' }}
                              onClick={() => onOpenEligibilityWithCountry(dest.id)}
                            >
                              Check Eligibility <ArrowRight size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}
