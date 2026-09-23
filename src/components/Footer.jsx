import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Footer({ onOpenEligibility }) {
  const serviceLinks = [
    { name: 'Umrah & Hajj Packages', path: '/services/umrah-hajj' },
    { name: 'Asian Visas & File Prep', path: '/services/visa-services' },
    { name: 'Air Ticketing', path: '/services/flights' },
    { name: 'Hotel Bookings', path: '/services/hotel-booking' },
    { name: 'Group & Corporate Travel', path: '/services/group-corporate-travel' },
    { name: 'Travel Insurance', path: '/services/travel-insurance' }
  ];

  const supportLinks = [
    { name: 'Frequently Asked Questions', path: '/faq' },
    { name: 'About Al Arbab Travels', path: '/about' },
    { name: 'Travel Insights & Guides', path: '/blog' },
    { name: 'Contact Islamabad Office', path: '/contact' },
    { name: 'Schengen Visa Guide 2026', path: '/blog/schengen-visa-pakistan-guide' }
  ];

  const destinationLinks = [
    { name: 'Malaysia', path: '/destinations/malaysia' },
    { name: 'Thailand', path: '/destinations/thailand' },
    { name: 'Singapore', path: '/destinations/singapore' },
    { name: 'Saudi Arabia (Umrah/Work)', path: '/destinations/saudi-arabia' },
    { name: 'Dubai & UAE', path: '/destinations/uae' },
    { name: 'Turkey (Türkiye)', path: '/destinations/turkey' }
  ];

  return (
    <footer style={{
      background: '#f7fafc',
      borderTop: '1px solid #e7edf3',
      padding: '3.75rem 0 1.75rem 0',
      color: '#334155',
      width: '100%',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.25rem' }}>
        {/* Main Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1.1fr',
          gap: '2.5rem',
          paddingBottom: '2.75rem',
          borderBottom: '1px solid #e7edf3'
        }} className="footer-main-grid">

          {/* Column 1: Brand & Description */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1.1rem' }}>
              <BrandLogo height={40} light />
            </Link>

            <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              Al Arbab Travels (Pvt) Ltd is a dedicated travel agency and visa consultancy based in Blue Area, Islamabad — visit visas, business visas, Umrah packages, air ticketing and hotel bookings, with visa file preparation support for 100+ countries.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {[
                { href: 'https://facebook.com', label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { href: 'https://instagram.com', label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { href: 'https://linkedin.com', label: 'LinkedIn', path: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' }
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="footer-social-icon"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: '#ffffff',
                    border: '1px solid #e2e9f0',
                    color: '#42586e'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0f1f30', marginBottom: '1.1rem' }}>
              Company
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {serviceLinks.map((s) => (
                <li key={s.path}>
                  <Link to={s.path} className="footer-link" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.86rem', display: 'inline-flex', alignItems: 'center', minHeight: '34px' }}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0f1f30', marginBottom: '1.1rem' }}>
              Support
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {supportLinks.map((c) => (
                <li key={c.path}>
                  <Link to={c.path} className="footer-link" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.86rem', display: 'inline-flex', alignItems: 'center', minHeight: '34px' }}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Top Destinations + Contact */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0f1f30', marginBottom: '1.1rem' }}>
              Top Destinations
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem 0', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {destinationLinks.slice(0, 4).map((d) => (
                <li key={d.path}>
                  <Link to={d.path} className="footer-link" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.86rem', display: 'inline-flex', alignItems: 'center', minHeight: '30px' }}>
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0f1f30', marginBottom: '0.75rem' }}>
              Contact Us
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.83rem' }}>
              <a href="https://maps.google.com/?q=Eagle+Plaza+Fazal-e-Haq+Road+Blue+Area+Islamabad" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#64748b', textDecoration: 'none' }}>
                <MapPin size={15} color="#0b6fce" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Eagle Plaza, Blue Area, Islamabad</span>
              </a>
              <a href="tel:0512000066" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155', textDecoration: 'none', fontWeight: 600 }}>
                <Phone size={14} color="#0b6fce" style={{ flexShrink: 0 }} />
                <span>051 2000066 (PTCL)</span>
              </a>
              <a href="tel:+923099923232" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155', textDecoration: 'none', fontWeight: 600 }}>
                <Phone size={14} color="#0b6fce" style={{ flexShrink: 0 }} />
                <span>0309 9923232 (Mobile)</span>
              </a>
              <a href="tel:+923152323811" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155', textDecoration: 'none', fontWeight: 600 }}>
                <Phone size={14} color="#0b6fce" style={{ flexShrink: 0 }} />
                <span>0315 2323811 (Mobile)</span>
              </a>
              <a href="https://wa.me/923099923232?text=Assalam%20o%20Alaikum,%20I%20would%20like%20to%20consult%20Al%20Arbab%20Travels." target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#25a55a', textDecoration: 'none', fontWeight: 600 }}>
                <MessageCircle size={14} style={{ flexShrink: 0 }} />
                <span>WhatsApp: 0309 9923232</span>
              </a>
              <a href="mailto:consult@alarbabtravel.pk" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', textDecoration: 'none' }}>
                <Mail size={14} color="#0b6fce" style={{ flexShrink: 0 }} />
                <span>consult@alarbabtravel.pk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Compliance Notice */}
        <div style={{
          margin: '1.75rem 0 1.25rem 0',
          padding: '1rem 1.35rem',
          borderRadius: '10px',
          background: '#ffffff',
          border: '1px solid #e7edf3',
          fontSize: '0.78rem',
          lineHeight: 1.6,
          color: '#64748b'
        }}>
          <strong style={{ color: '#0f1f30' }}>Important Service Scope Notice:</strong> Al Arbab Travels (Pvt) Ltd provides full visa processing and ticketing assistance for Asian destinations and certified Umrah pilgrimages. For the European Schengen Area and the United States (USA), our services are strictly <em>File Preparation &amp; Application Support Only</em>. We do not submit, process, or guarantee visa approvals for Schengen or USA, as personal biometric attendance and embassy interviews by the applicant are legally mandatory and final decisions rest solely with consular authorities.
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.78rem',
          color: '#94a3b8'
        }} className="footer-bottom-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span>&copy; {new Date().getFullYear()} Al Arbab Travels (Pvt) Ltd. All Rights Reserved.</span>
            <span>·</span>
            <span>Family-Run Travel Consultancy · Eagle Plaza, Blue Area, Islamabad</span>
          </div>

          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            <Link to="/about" className="footer-link" style={{ color: '#94a3b8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', minHeight: '36px', padding: '0 8px' }}>About</Link>
            <Link to="/faq" className="footer-link" style={{ color: '#94a3b8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', minHeight: '36px', padding: '0 8px' }}>FAQ</Link>
            <Link to="/contact" className="footer-link" style={{ color: '#94a3b8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', minHeight: '36px', padding: '0 8px' }}>Contact</Link>
            <Link to="/destinations" className="footer-link" style={{ color: '#94a3b8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', minHeight: '36px', padding: '0 8px' }}>All Destinations</Link>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover {
          color: #2563eb !important;
        }
        .footer-social-icon:hover {
          border-color: #2563eb !important;
          color: #2563eb !important;
        }
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
