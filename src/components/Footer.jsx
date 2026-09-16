import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Footer({ onOpenEligibility }) {
  const footerNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'About Us', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Travel Insights', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <footer style={{
      background: 'rgba(6, 8, 14, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '2.5rem 0 2rem 0',
      color: '#cbd5e1',
      width: '100%',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.25rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          paddingBottom: '1.75rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }} className="footer-top-row">
          {/* Left: Brand Logo in Gold */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <BrandLogo height={42} />
          </Link>

          {/* Center: Quick Links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }} className="footer-links-wrap">
            {footerNavLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                style={{
                  color: '#d5ebe2',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  transition: 'color 0.2s ease',
                  fontFamily: "'Inter', sans-serif"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#eed88a'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#d5ebe2'}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right: Location Pin & Direct Call/WhatsApp */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }} className="footer-contact-wrap">
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Eagle+Plaza,+Fazal-e-Haq+Road,+Blue+Area,+Islamabad"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#c4dbd2', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#eed88a'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#c4dbd2'}
              title="Open office address in Google Maps"
            >
              <MapPin size={15} color="#e5c572" />
              <span>Eagle Plaza, Mezzanine 121, Blue Area, Islamabad</span>
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
              <Phone size={13} color="#eed88a" />
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

            {/* Social Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: '#d1e3dc', transition: 'color 0.2s', display: 'flex' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: '#d1e3dc', transition: 'color 0.2s', display: 'flex' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ color: '#d1e3dc', transition: 'color 0.2s', display: 'flex' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: '#d1e3dc', transition: 'color 0.2s', display: 'flex' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div style={{
          paddingTop: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.78rem',
          color: '#89a99f'
        }} className="footer-bottom-row">
          <div>
            &copy; {new Date().getFullYear()} Al Arbab Travels (Pvt) Ltd. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-top-row {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .footer-links-wrap {
            justify-content: center !important;
            gap: 1rem !important;
          }
          .footer-contact-wrap {
            justify-content: center !important;
          }
          .footer-bottom-row {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
