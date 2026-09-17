import { Link } from 'react-router-dom';
import { MapPin, Phone, ShieldCheck, Mail, ArrowRight, Award, CheckCircle2 } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Footer({ onOpenEligibility }) {
  const serviceLinks = [
    { name: 'Umrah & Hajj Packages', path: '/services/umrah-hajj' },
    { name: 'Asian Visas & File Prep', path: '/services/visa-services' },
    { name: 'Air Ticketing Concierge', path: '/services/flights' },
    { name: 'Worldwide Hotel Bookings', path: '/services/hotel-booking' },
    { name: 'International Holiday Tours', path: '/services/group-corporate-travel' },
    { name: 'Travel Medical Insurance', path: '/services/travel-insurance' },
    { name: 'Document Attestation (MOFA)', path: '/services/document-attestation' },
    { name: 'Student Visas & Study Permits', path: '/services/student-visas' },
    { name: 'Skilled Work & Employment', path: '/services/work-visas' }
  ];

  const destinationLinks = [
    { name: 'Malaysia Visa', path: '/destinations/malaysia' },
    { name: 'Thailand Visa', path: '/destinations/thailand' },
    { name: 'Singapore Visa', path: '/destinations/singapore' },
    { name: 'Saudi Arabia (Umrah/Work)', path: '/destinations/saudi-arabia' },
    { name: 'Dubai & UAE', path: '/destinations/uae' },
    { name: 'Turkey (Türkiye)', path: '/destinations/turkey' },
    { name: 'United Kingdom (UK)', path: '/destinations/uk' },
    { name: 'Schengen Area (File Prep)', path: '/destinations/schengen' },
    { name: 'United States (File Prep)', path: '/destinations/usa' },
    { name: 'Canada Tourist & Work', path: '/destinations/canada' }
  ];

  const companyLinks = [
    { name: 'About Al Arbab Travels', path: '/about' },
    { name: 'Frequently Asked Questions', path: '/faq' },
    { name: 'Travel Insights & Guides', path: '/blog' },
    { name: 'Contact Islamabad Office', path: '/contact' },
    { name: 'Schengen Visa Guide 2026', path: '/blog/schengen-visa-pakistan-guide' },
    { name: 'UK Visa Financial Rules', path: '/blog/uk-visa-refusal-reasons-finances' },
    { name: 'Germany Opportunity Card', path: '/blog/germany-opportunity-card-pakistan' }
  ];

  return (
    <footer style={{
      background: 'rgba(5, 7, 12, 0.96)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '4rem 0 2rem 0',
      color: '#cbd5e1',
      width: '100%',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.25rem' }}>
        {/* Main 4-Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1.1fr',
          gap: '2.5rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }} className="footer-main-grid">
          
          {/* Column 1: Brand & Contact */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1.25rem' }}>
              <BrandLogo height={42} />
            </Link>
            
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              Al Arbab Travels (Pvt) Ltd is a dedicated travel agency and visa consultancy based in Blue Area, Islamabad. Personalized visa advisory, Umrah packages, flight bookings, and embassy file preparation.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem' }}>
              <a 
                href="https://maps.google.com/?q=Eagle+Plaza+Fazal-e-Haq+Road+Blue+Area+Islamabad"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#c4dbd2', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#eed88a'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#c4dbd2'}
              >
                <MapPin size={16} color="#e5c572" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Eagle Plaza, Mezzanine 121, Fazal-e-Haq Road, Blue Area, Islamabad</span>
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} color="#eed88a" style={{ flexShrink: 0 }} />
                <a 
                  href="tel:+923099923232" 
                  style={{ color: '#e8f5f0', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#eed88a'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#e8f5f0'}
                >
                  +92 309 9923232
                </a>
                <span style={{ opacity: 0.35 }}>|</span>
                <a 
                  href="https://wa.me/923099923232?text=Assalam%20o%20Alaikum,%20I%20would%20like%20to%20consult%20Al%20Arbab%20Travels." 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#4ade80', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#eed88a'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#4ade80'}
                >
                  WhatsApp
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} color="#38bdf8" style={{ flexShrink: 0 }} />
                <a 
                  href="mailto:consult@alarbabtravel.pk"
                  style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#eed88a'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
                >
                  consult@alarbabtravel.pk
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '1.25rem' }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '44px', minHeight: '44px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#d1e3dc', transition: 'all 0.2s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '44px', minHeight: '44px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#d1e3dc', transition: 'all 0.2s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '44px', minHeight: '44px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#d1e3dc', transition: 'all 0.2s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Core Travel Services */}
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#eed88a', marginBottom: '1.25rem' }}>
              Travel Services
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {serviceLinks.map((s) => (
                <li key={s.path}>
                  <Link
                    to={s.path}
                    style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', minHeight: '36px', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#eed88a'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured Destinations */}
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#eed88a', marginBottom: '1.25rem' }}>
              Top Destinations
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {destinationLinks.map((d) => (
                <li key={d.path}>
                  <Link
                    to={d.path}
                    style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', minHeight: '36px', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#eed88a'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company & Insights */}
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#eed88a', marginBottom: '1.25rem' }}>
              Company & Guides
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {companyLinks.map((c) => (
                <li key={c.path}>
                  <Link
                    to={c.path}
                    style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', minHeight: '36px', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#eed88a'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Honest Trust Badges Strip */}
        <div style={{
          margin: '2rem 0 1rem 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '12px'
        }} className="footer-trust-grid">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            borderRadius: '8px',
            background: 'rgba(238, 216, 138, 0.05)',
            border: '1px solid rgba(238, 216, 138, 0.18)',
            fontSize: '0.8rem',
            color: '#eed88a'
          }}>
            <MapPin size={16} style={{ flexShrink: 0 }} />
            <span><strong>Blue Area, Islamabad</strong> · Walk-in Desk</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            borderRadius: '8px',
            background: 'rgba(56, 189, 248, 0.05)',
            border: '1px solid rgba(56, 189, 248, 0.18)',
            fontSize: '0.8rem',
            color: '#38bdf8'
          }}>
            <Award size={16} style={{ flexShrink: 0 }} />
            <span><strong>Personalized Visa Consultancy</strong> · 1-on-1</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            borderRadius: '8px',
            background: 'rgba(52, 211, 153, 0.05)',
            border: '1px solid rgba(52, 211, 153, 0.18)',
            fontSize: '0.8rem',
            color: '#34d399'
          }}>
            <Phone size={16} style={{ flexShrink: 0 }} />
            <span><strong>Direct WhatsApp Support</strong> · +92 309 9923232</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            borderRadius: '8px',
            background: 'rgba(192, 132, 252, 0.05)',
            border: '1px solid rgba(192, 132, 252, 0.18)',
            fontSize: '0.8rem',
            color: '#c084fc'
          }}>
            <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
            <span><strong>Asian Visas & Umrah</strong> · Schengen/USA File Prep</span>
          </div>
        </div>

        {/* Statutory Service Scope Disclaimer Banner */}
        <div style={{
          margin: '1rem 0 1.5rem 0',
          padding: '1rem 1.35rem',
          borderRadius: '10px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          fontSize: '0.78rem',
          lineHeight: 1.6,
          color: '#94a3b8'
        }}>
          <strong style={{ color: '#eed88a' }}>Important Service Scope Notice:</strong> Al Arbab Travels (Pvt) Ltd provides full visa processing and ticketing assistance for Asian destinations and certified Umrah pilgrimages. For European Schengen Area and the United States (USA), our services are strictly <em>File Preparation &amp; Application Support Only</em>. We do not submit, process, or guarantee visa approvals for Schengen or USA, as personal biometric attendance and embassy interviews by the applicant are legally mandatory and final decisions rest solely with consular authorities.
        </div>

        {/* Bottom Copyright & Accreditation Strip */}
        <div style={{
          paddingTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.78rem',
          color: '#89a99f'
        }} className="footer-bottom-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span>&copy; {new Date().getFullYear()} Al Arbab Travels (Pvt) Ltd. All Rights Reserved.</span>
            <span>·</span>
            <span>Family-Run Travel Consultancy · Eagle Plaza, Blue Area, Islamabad</span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Link to="/about" style={{ color: '#89a99f', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', minHeight: '44px', padding: '0 8px' }}>About</Link>
            <Link to="/faq" style={{ color: '#89a99f', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', minHeight: '44px', padding: '0 8px' }}>FAQ</Link>
            <Link to="/contact" style={{ color: '#89a99f', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', minHeight: '44px', padding: '0 8px' }}>Contact</Link>
            <Link to="/destinations" style={{ color: '#89a99f', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', minHeight: '44px', padding: '0 8px' }}>All Destinations</Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 580px) {
          .footer-main-grid {
            grid-template-columns: 1fr !important;
            gap: 1.75rem !important;
          }
          .footer-bottom-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
