import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Compass, GraduationCap, Briefcase, Building2, Plane, Hotel, 
  FileCheck2, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Clock, 
  HelpCircle, ChevronDown, ChevronRight, ExternalLink, MapPin
} from 'lucide-react';
import SEO from '../components/SEO';
import { services } from '../data/servicesData';

export default function Services({ onOpenEligibility }) {
  const { serviceSlug } = useParams();
  const navigate = useNavigate();

  // Find service by slug, id, or alias
  const getMatchedService = (slug) => {
    if (!slug) return services[0];
    const match = services.find(
      s => s.slug === slug || s.id === slug || s.aliases?.includes(slug)
    );
    return match || services[0];
  };

  const [activeService, setActiveService] = useState(() => getMatchedService(serviceSlug));
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Sync state when URL param changes
  useEffect(() => {
    setActiveService(getMatchedService(serviceSlug));
  }, [serviceSlug]);

  const handleSelectService = (srv) => {
    setActiveService(srv);
    navigate(`/services/${srv.slug}`);
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Compass': return <Compass size={22} color="var(--gold-accent)" />;
      case 'GraduationCap': return <GraduationCap size={22} color="var(--gold-accent)" />;
      case 'Briefcase': return <Briefcase size={22} color="var(--gold-accent)" />;
      case 'Building2': return <Building2 size={22} color="var(--gold-accent)" />;
      case 'Plane': return <Plane size={22} color="var(--gold-accent)" />;
      case 'Hotel': return <Hotel size={22} color="var(--gold-accent)" />;
      case 'FileCheck2': return <FileCheck2 size={22} color="var(--gold-accent)" />;
      case 'ShieldCheck': return <ShieldCheck size={22} color="var(--gold-accent)" />;
      default: return <Compass size={22} color="var(--gold-accent)" />;
    }
  };

  // Structured Data (Breadcrumbs + Service + FAQ schema)
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
        "name": "Services",
        "item": "https://alarbabtravel.pk/services"
      },
      ...(serviceSlug ? [{
        "@type": "ListItem",
        "position": 3,
        "name": activeService.title,
        "item": `https://alarbabtravel.pk/services/${activeService.slug}`
      }] : [])
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": activeService.title,
    "provider": {
      "@type": "TravelAgency",
      "name": "Al Arbab Travels (Pvt) Ltd",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Eagle Plaza, Mezzanine 121, Fazal-e-Haq Road, Blue Area",
        "addressLocality": "Islamabad",
        "addressCountry": "PK"
      }
    },
    "description": activeService.summary,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  };

  const faqSchema = activeService.faqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": activeService.faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  } : null;

  const pageSchemas = [breadcrumbSchema, serviceSchema];
  if (faqSchema) pageSchemas.push(faqSchema);

  const pageTitle = serviceSlug 
    ? `${activeService.title} | Al Arbab Travels Islamabad`
    : "Visa Consultancy, Umrah & Travel Services | Al Arbab Travels Islamabad";

  const pageDescription = serviceSlug
    ? (activeService.summary.length > 155 ? `${activeService.summary.substring(0, 152)}...` : activeService.summary)
    : "Comprehensive travel services in Islamabad: full Asian visit visas, Umrah packages, flight ticketing, and expert file preparation for Schengen & USA.";

  return (
    <>
      <SEO 
        title={pageTitle}
        description={pageDescription}
        keywords={`${activeService.title}, Asian visa processing Islamabad, Schengen visa file preparation Pakistan, USA visa application support Islamabad, Umrah packages 2026, air ticketing Pakistan`}
        canonicalPath={serviceSlug ? `/services/${activeService.slug}` : "/services"}
        schema={pageSchemas}
      />

      <main style={{ paddingBottom: '5rem' }}>
        {/* Page Hero Banner */}
        <section style={{
          paddingTop: '4rem',
          paddingBottom: '3rem',
          position: 'relative',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div className="container">
            {/* Breadcrumb Visual Trail */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1.25rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <ol style={{ listStyle: 'none', display: 'flex', alignItems: 'center', gap: '8px', padding: 0, margin: 0, flexWrap: 'wrap' }}>
                <li>
                  <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
                </li>
                <li><ChevronRight size={13} /></li>
                <li>
                  <Link to="/services" style={{ color: serviceSlug ? 'var(--text-muted)' : 'var(--gold-accent)', textDecoration: 'none' }}>
                    Services
                  </Link>
                </li>
                {serviceSlug && (
                  <>
                    <li><ChevronRight size={13} /></li>
                    <li style={{ color: 'var(--gold-accent)', fontWeight: 600 }}>{activeService.title}</li>
                  </>
                )}
              </ol>
            </nav>

            <div style={{ maxWidth: '820px' }}>
              <div className="badge-gold" style={{ marginBottom: '0.85rem' }}>
                <MapPin size={14} /> Al Arbab Travels (Pvt) Ltd · Blue Area, Islamabad
              </div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1rem', color: '#ffffff' }}>
                {activeService.title}
              </h1>
              <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                {activeService.tagline}
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Services Explorer */}
        <section className="section-py">
          <div className="container">
            <div className="services-layout-grid">
              {/* Left Column: Service Selector Tabs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Select Travel Service
                </div>
                {services.map((srv) => {
                  const isCurrent = srv.id === activeService.id;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => handleSelectService(srv)}
                      style={{
                        padding: '1.1rem 1.25rem',
                        borderRadius: 'var(--radius-card)',
                        border: isCurrent ? '1.5px solid var(--gold-accent)' : '1px solid var(--border-subtle)',
                        background: isCurrent ? 'var(--gold-muted)' : 'var(--bg-surface)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '8px',
                          background: isCurrent ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {getIcon(srv.icon)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                            {srv.title}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: isCurrent ? 'var(--gold-accent)' : 'var(--text-muted)' }}>
                            {srv.stats}
                          </div>
                        </div>
                      </div>

                      <ArrowRight 
                        size={16} 
                        color={isCurrent ? 'var(--gold-accent)' : 'var(--text-muted)'} 
                        style={{ transform: isCurrent ? 'translateX(3px)' : 'none', transition: 'transform 0.2s' }} 
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Detailed Service Panel */}
              <div 
                className="glass-card"
                style={{
                  padding: '2.25rem',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--gold-border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div className="badge-gold">
                    <ShieldCheck size={14} /> {activeService.id === 'visa-services' ? 'Asian Processing & Schengen/USA File Prep' : 'Verified Service Scope'}
                  </div>
                  <span style={{ fontSize: '0.82rem', color: 'var(--gold-accent)', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>
                    {activeService.stats}
                  </span>
                </div>

                <h2 style={{ fontSize: '1.95rem', fontWeight: 700, marginBottom: '0.4rem', color: '#ffffff' }}>
                  {activeService.title}
                </h2>

                <p style={{ fontSize: '1rem', color: 'var(--gold-accent)', fontWeight: 500, marginBottom: '1.25rem', fontFamily: 'var(--font-heading)' }}>
                  {activeService.tagline}
                </p>

                {/* In-Depth 400-600 Word Content Article */}
                <div style={{ 
                  color: 'var(--text-body)', 
                  fontSize: '0.96rem', 
                  lineHeight: 1.8, 
                  marginBottom: '2rem',
                  whiteSpace: 'pre-line'
                }}>
                  {activeService.overview || activeService.summary}
                </div>

                {/* Key Deliverables List */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.95rem', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    What Is Included in Our Service:
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {activeService.deliverables.map((item, idx) => (
                      <div 
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          background: 'rgba(255, 255, 255, 0.02)',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-subtle)',
                          fontSize: '0.9rem',
                          color: 'var(--text-light)'
                        }}
                      >
                        <CheckCircle2 size={16} color="var(--gold-accent)" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Profile Box */}
                <div style={{
                  background: 'var(--gold-muted)',
                  border: '1px solid var(--gold-border)',
                  borderRadius: '10px',
                  padding: '1rem 1.25rem',
                  marginBottom: '2rem',
                  fontSize: '0.9rem'
                }}>
                  <strong style={{ color: 'var(--gold-accent)', fontFamily: 'var(--font-heading)' }}>Target Profile: </strong>
                  <span style={{ color: 'var(--text-light)' }}>{activeService.idealFor}</span>
                </div>

                {/* Service-Specific FAQ Section */}
                {activeService.faqs && activeService.faqs.length > 0 && (
                  <div style={{ marginBottom: '2.25rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                      <HelpCircle size={18} color="var(--gold-accent)" />
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                        Frequently Asked Questions about {activeService.title}
                      </h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {activeService.faqs.map((faq, fIdx) => (
                        <div 
                          key={fIdx}
                          style={{
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '10px',
                            background: 'rgba(255, 255, 255, 0.02)',
                            overflow: 'hidden'
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => setOpenFaqIndex(openFaqIndex === fIdx ? null : fIdx)}
                            style={{
                              width: '100%',
                              padding: '1rem 1.25rem',
                              background: 'transparent',
                              border: 'none',
                              color: '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              textAlign: 'left',
                              fontWeight: 600,
                              fontSize: '0.92rem'
                            }}
                          >
                            <span>{faq.question}</span>
                            <ChevronDown 
                              size={16} 
                              color="var(--gold-accent)" 
                              style={{ 
                                transform: openFaqIndex === fIdx ? 'rotate(180deg)' : 'none', 
                                transition: 'transform 0.2s ease',
                                flexShrink: 0
                              }} 
                            />
                          </button>
                          {openFaqIndex === fIdx && (
                            <div style={{ padding: '0 1.25rem 1.1rem 1.25rem', color: 'var(--text-body)', fontSize: '0.88rem', lineHeight: 1.7 }}>
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Structured Internal Linking Section */}
                {activeService.relatedServices && activeService.relatedServices.length > 0 && (
                  <div style={{ marginBottom: '2.25rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Related Travel &amp; Visa Solutions
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                      {activeService.relatedServices.map((rel, rIdx) => (
                        <Link
                          key={rIdx}
                          to={`/services/${rel.slug}`}
                          style={{
                            padding: '1rem',
                            borderRadius: '10px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid var(--border-subtle)',
                            textDecoration: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            transition: 'all 0.2s ease'
                          }}
                          className="related-service-card"
                        >
                          <div>
                            <div style={{ color: 'var(--gold-accent)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                              {rel.title}
                            </div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.5, margin: 0 }}>
                              {rel.desc}
                            </p>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '0.75rem', fontSize: '0.76rem', color: '#ffffff', fontWeight: 600 }}>
                            <span>Explore Details</span>
                            <ArrowRight size={12} color="var(--gold-accent)" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Action Buttons */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  <button 
                    type="button" 
                    className="btn-primary"
                    onClick={onOpenEligibility}
                  >
                    Check Eligibility for This Service <ArrowRight size={16} />
                  </button>

                  <a 
                    href={`https://wa.me/923099923232?text=Assalam%20o%20Alaikum,%20I%20am%20interested%20in%20your%20${encodeURIComponent(activeService.title)}%20service.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                  >
                    Inquire on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Standards Grid */}
        <section className="section-py" style={{ backgroundColor: 'rgba(19, 24, 36, 0.5)' }}>
          <div className="container">
            <div className="section-header text-center">
              <div className="badge-gold" style={{ marginBottom: '0.6rem' }}>
                <Clock size={14} /> Service Excellence
              </div>
              <h2 className="section-title">
                The Al Arbab <span style={{ color: 'var(--gold-accent)' }}>Service Protocol</span>
              </h2>
              <p className="section-subtitle">
                How we execute your documentation and embassy requirements with utmost precision from Islamabad.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              <div className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--gold-accent)', fontFamily: 'var(--font-heading)' }}>
                  1. Comprehensive Intake
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.65 }}>
                  We do not file cases blindly. If your bank statement requires cash-flow justification or ties to Pakistan require reinforcement, our caseworkers provide concrete pre-filing remedies.
                </p>
              </div>

              <div className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--gold-accent)', fontFamily: 'var(--font-heading)' }}>
                  2. Dual-Layer Legal Review
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.65 }}>
                  Every cover letter, SOP, and invitation letter is vetted by two independent caseworkers to eliminate typographical inconsistencies, itinerary mismatches, or conflicting dates.
                </p>
              </div>

              <div className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--gold-accent)', fontFamily: 'var(--font-heading)' }}>
                  3. Verified Reservations
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.65 }}>
                  All air tickets and hotel reservations carry active PNR references in airline and hotel global reservation systems, easily verifiable by consular staff.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        .services-layout-grid {
          display: grid;
          grid-template-columns: minmax(280px, 340px) 1fr;
          gap: 2.25rem;
          align-items: flex-start;
        }
        @media (max-width: 991px) {
          .services-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
        .related-service-card:hover {
          border-color: var(--gold-accent) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}
