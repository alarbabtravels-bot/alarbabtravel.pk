import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, Search, Menu, X, ArrowRight, 
  MapPin, Phone, Plane, ShieldCheck, FileCheck2
} from 'lucide-react';
import BrandLogo from './BrandLogo';

/**
 * OrganicBridge SVG Component:
 * Creates the exact scooped black waist/metaball bridge between the pods
 * with smooth concave upper and lower curves and subtle rim lighting.
 */
function OrganicBridge({ height = 54, width = 20 }) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 20 54" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: '0 -1px', flexShrink: 0, display: 'block', pointerEvents: 'none' }}
    >
      {/* Solid Black Fill across the bridge */}
      <path 
        d="M 0 0 C 6.5 0, 7.5 13, 10 13 C 12.5 13, 13.5 0, 20 0 L 20 54 C 13.5 54, 12.5 41, 10 41 C 7.5 41, 6.5 54, 0 54 Z" 
        fill="#000000" 
      />
      {/* Top Scooped Precision Rim */}
      <path 
        d="M 0 0.75 C 6.5 0.75, 7.5 13.75, 10 13.75 C 12.5 13.75, 13.5 0.75, 20 0.75" 
        stroke="rgba(255, 255, 255, 0.22)" 
        strokeWidth="1.5" 
        fill="none" 
      />
      {/* Bottom Scooped Precision Rim */}
      <path 
        d="M 0 53.25 C 6.5 53.25, 7.5 40.25, 10 40.25 C 12.5 40.25, 13.5 53.25, 20 53.25" 
        stroke="rgba(255, 255, 255, 0.22)" 
        strokeWidth="1.5" 
        fill="none" 
      />
    </svg>
  );
}

export default function Navbar({ onOpenEligibility }) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [destinationsDropdownOpen, setDestinationsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    setMobileDrawerOpen(false);
    setServicesDropdownOpen(false);
    setDestinationsDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Services', 
      path: '/services',
      hasDropdown: true,
      items: [
        { title: 'Umrah & Hajj Luxury Packages', desc: 'Spiritual pilgrimages with 5-star clock tower stays', path: '/services/umrah-hajj' },
        { title: 'Visit Visas & Embassy File Prep', desc: 'Asian visit visa processing & Schengen/USA file preparation', path: '/services/visa-services' },
        { title: 'Air Ticketing & Route Concierge', desc: 'Domestic & international flight booking with best fares', path: '/services/flights' },
        { title: 'Worldwide Hotel Bookings', desc: 'Verified accommodation vouchers for all embassies', path: '/services/hotel-booking' },
        { title: 'International Holiday Tours', desc: 'Curated vacations, family getaways & corporate retreats', path: '/services/group-corporate-travel' },
        { title: 'Travel Medical Insurance', desc: 'Embassy-compliant €30,000 to $100,000 policies', path: '/services/travel-insurance' },
        { title: 'Document Attestation & Legalization', desc: 'Fast-track MOFA, IBCC, HEC & Embassy stamps in Islamabad', path: '/services/document-attestation' },
        { title: 'Student Visas & Global Study Permits', desc: 'Admissions and visas for UK, Canada, Australia & Europe', path: '/services/student-visas' },
        { title: 'Skilled Work & Employment Visas', desc: 'Malaysia, Gulf & Central Asia employment visas', path: '/services/work-visas' }
      ]
    },
    { 
      name: 'Destinations', 
      path: '/destinations',
      hasDropdown: true,
      items: [
        { title: 'Malaysia', tag: 'Top Pick', path: '/destinations/malaysia' },
        { title: 'Thailand', tag: 'Top Holiday', path: '/destinations/thailand' },
        { title: 'Singapore', tag: 'Business Hub', path: '/destinations/singapore' },
        { title: 'Saudi Arabia (Umrah & Work)', tag: 'Spiritual', path: '/destinations/saudi-arabia' },
        { title: 'Dubai & UAE', tag: 'Fast-Track', path: '/destinations/uae' },
        { title: 'Turkey & Istanbul', tag: 'Heritage', path: '/destinations/turkey' },
        { title: 'United States (USA)', tag: 'File Prep', path: '/destinations/usa' },
        { title: 'Schengen Area (Europe)', tag: 'File Prep', path: '/destinations/schengen' }
      ]
    },
    { name: 'About Us', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Travel Insights', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <div style={{ width: '100%', position: 'relative', zIndex: 1000 }}>
      {/* =========================================================================
          1. TOP UTILITY STRIP (Address, Dual Phone Numbers, Social, PK)
          ========================================================================= */}
      <div style={{
        background: '#041712',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        color: '#c4dbd2',
        fontSize: '0.8rem',
        padding: '0.45rem 0'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          {/* Left: Location & Phones */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={13} color="#eed88a" />
              <span style={{ fontSize: '0.78rem' }}>Eagle Plaza, Blue Area, Islamabad</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem' }}>
              <Phone size={12} color="#eed88a" />
              <a 
                href="tel:+923099923232" 
                style={{ color: '#e8f5f0', textDecoration: 'none', transition: 'color 0.2s' }}
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
                style={{ color: '#eed88a', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#4ade80'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#eed88a'}
              >
                WhatsApp: 0309 9923232
              </a>
            </div>
          </div>

          {/* Right: Social Icons + Country Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: '#d1e3dc', display: 'flex' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: '#d1e3dc', display: 'flex' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ color: '#d1e3dc', display: 'flex' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: '#d1e3dc', display: 'flex' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
            </div>

            <span style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.15)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '16px',
                height: '11px',
                borderRadius: '2px',
                overflow: 'hidden',
                background: '#01411c',
                position: 'relative'
              }}>
                <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '30%', background: '#ffffff' }} />
                <span style={{ position: 'absolute', right: '15%', top: '20%', width: '5px', height: '5px', borderRadius: '50%', background: '#ffffff' }} />
              </span>
              <span style={{ fontWeight: 600, color: '#e8f5f0', fontSize: '0.78rem' }}>PK</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. THE SIGNATURE CONNECTED METABALL PILL CHAIN NAVBAR
          ========================================================================= */}
      <nav style={{
        width: '100%',
        padding: '10px 1rem',
        display: 'flex',
        justifyContent: 'center',
        background: '#051f18',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
      }}>
        {/* DESKTOP VIEW (> 992px): FULL METABALL CHAIN */}
        <div className="desktop-metaball-chain" style={{
          display: 'flex',
          alignItems: 'center',
          filter: 'drop-shadow(0 14px 30px rgba(0, 0, 0, 0.6))',
          maxWidth: '100%'
        }}>
          {/* Left: Official Original Logo Pod */}
          <Link
            to="/"
            style={{
              height: '54px',
              borderRadius: '9999px 0 0 9999px',
              background: '#000000',
              border: '1.5px solid rgba(255, 255, 255, 0.22)',
              borderRight: 'none',
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px 0 12px',
              gap: '10px',
              textDecoration: 'none',
              flexShrink: 0
            }}
            title="Al Arbab Travel PK"
          >
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 35%, #181c24 0%, #080a0e 100%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s ease',
              padding: '4px'
            }} className="disc-hover-effect">
              <img 
                src="/logo_mark.svg" 
                alt="Al Arbab Travel Emblem" 
                width="28" 
                height="24"
                style={{ width: '28px', height: '24px', objectFit: 'contain', display: 'block' }} 
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={{
                fontFamily: "'Montserrat', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: '0.98rem',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap'
              }}>
                Al Arbab Travel
              </span>
              <span style={{
                fontFamily: "'Montserrat', 'Inter', sans-serif",
                fontSize: '0.58rem',
                fontWeight: 800,
                color: '#e61e2b',
                marginLeft: '3px',
                transform: 'translateY(-3px)'
              }}>
                PK
              </span>
            </div>
          </Link>

          {/* Organic Bridge 1 */}
          <OrganicBridge />

          {/* Center: Main Track with Links */}
          <div style={{
            height: '54px',
            background: '#000000',
            borderTop: '1.5px solid rgba(255, 255, 255, 0.22)',
            borderBottom: '1.5px solid rgba(255, 255, 255, 0.22)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 6px',
            position: 'relative'
          }}>
            <div style={{
              height: '40px',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              background: '#000000',
              display: 'flex',
              alignItems: 'center',
              padding: '0 12px',
              gap: '2px',
              whiteSpace: 'nowrap'
            }}>
              {navLinks.map((item, index) => {
                const isActive = location.pathname === item.path;

                if (item.hasDropdown) {
                  const isOpen = item.name === 'Services' ? servicesDropdownOpen : destinationsDropdownOpen;
                  const setOpen = item.name === 'Services' ? setServicesDropdownOpen : setDestinationsDropdownOpen;

                  return (
                    <div 
                      key={item.name}
                      style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
                      onMouseEnter={() => setOpen(true)}
                      onMouseLeave={() => setOpen(false)}
                    >
                      {index > 0 && <span className="nav-pipe">|</span>}
                      <Link
                        to={item.path}
                        style={{
                          color: isActive ? '#eed88a' : '#d8dce2',
                          background: isActive ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                          fontWeight: isActive ? 600 : 450,
                          fontSize: '0.88rem',
                          fontFamily: "'Inter', sans-serif",
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'all 0.15s ease'
                        }}
                        className="nav-link-pill"
                      >
                        <span>{item.name}</span>
                        <ChevronDown size={11} style={{ opacity: 0.6, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                      </Link>

                      {isOpen && (
                        <div style={{
                          position: 'absolute',
                          top: '115%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: item.name === 'Services' ? '300px' : '260px',
                          background: '#090b0e',
                          border: '1px solid rgba(255, 255, 255, 0.18)',
                          borderRadius: '14px',
                          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.85)',
                          padding: '6px',
                          zIndex: 2000,
                          animation: 'fadeIn 0.2s ease'
                        }}>
                          {item.items.map((sub, idx) => (
                            <Link
                              key={idx}
                              to={sub.path}
                              style={{
                                display: 'block',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                transition: 'background 0.15s ease'
                              }}
                              className="dropdown-item-hover"
                            >
                              <div style={{ color: '#ffffff', fontSize: '0.84rem', fontWeight: 600 }}>{sub.title}</div>
                              {sub.desc && <div style={{ color: '#8b949e', fontSize: '0.72rem', marginTop: '2px' }}>{sub.desc}</div>}
                              {sub.tag && (
                                <span style={{
                                  display: 'inline-block',
                                  fontSize: '0.66rem',
                                  background: 'rgba(238, 216, 138, 0.15)',
                                  color: '#eed88a',
                                  padding: '1px 6px',
                                  borderRadius: '9999px',
                                  marginTop: '3px'
                                }}>
                                  {sub.tag}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div key={item.name} style={{ display: 'flex', alignItems: 'center' }}>
                    {index > 0 && <span className="nav-pipe">|</span>}
                    <Link
                      to={item.path}
                      style={{
                        color: isActive ? '#eed88a' : '#d8dce2',
                        background: isActive ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                        fontWeight: isActive ? 600 : 450,
                        fontSize: '0.88rem',
                        fontFamily: "'Inter', sans-serif",
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        textDecoration: 'none',
                        transition: 'all 0.15s ease'
                      }}
                      className="nav-link-pill"
                    >
                      {item.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Organic Bridge 2 */}
          <OrganicBridge />

          {/* Right: Action Pod */}
          <div style={{
            height: '54px',
            background: '#000000',
            border: '1.5px solid rgba(255, 255, 255, 0.22)',
            borderLeft: 'none',
            borderRadius: '0 9999px 9999px 0',
            display: 'flex',
            alignItems: 'center',
            padding: '0 6px 0 0',
            flexShrink: 0
          }}>
            <button
              type="button"
              onClick={onOpenEligibility}
              style={{
                height: '40px',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                background: '#000000',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0 18px',
                fontSize: '0.88rem',
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
              className="cta-capsule-btn"
            >
              <span>Check Eligibility</span>
              <ArrowRight size={13} style={{ color: '#eed88a' }} />
            </button>
          </div>
        </div>

        {/* =========================================================================
            TABLET & MOBILE VIEW (<= 992px): COMPACT RESPONSIVE METABALL CHAIN
            ========================================================================= */}
        <div className="mobile-tablet-metaball-chain" style={{
          display: 'none',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '600px'
        }}>
          {/* Left: Disc "A." */}
          <Link
            to="/"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: '#000000',
              border: '1.5px solid rgba(255, 255, 255, 0.22)',
              borderRight: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              flexShrink: 0
            }}
            title="Al Arbab Travel PK"
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#0a0d14',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px'
            }}>
              <img 
                src="/logo_mark.svg" 
                alt="Al Arbab Travel PK" 
                width="24" 
                height="20"
                style={{ width: '24px', height: '20px', objectFit: 'contain' }} 
              />
            </div>
          </Link>

          <OrganicBridge height={46} width={16} />

          {/* Center: Brand Title + Menu Trigger Button */}
          <div style={{
            flex: 1,
            height: '46px',
            background: '#000000',
            borderTop: '1.5px solid rgba(255, 255, 255, 0.22)',
            borderBottom: '1.5px solid rgba(255, 255, 255, 0.22)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={{
                fontSize: '0.86rem',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '0.02em',
                fontFamily: "'Montserrat', 'Inter', sans-serif"
              }}>
                Al Arbab Travel
              </span>
              <span style={{
                fontSize: '0.52rem',
                fontWeight: 800,
                color: '#e61e2b',
                marginLeft: '3px',
                transform: 'translateY(-2px)'
              }}>
                PK
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              aria-label="Toggle Navigation Menu"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '9999px',
                color: '#ffffff',
                padding: '8px 14px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: 600,
                touchAction: 'manipulation'
              }}
            >
              <span>Menu</span>
              {mobileDrawerOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>

          <OrganicBridge height={46} width={16} />

          {/* Right: Check Visa Quick Button */}
          <div style={{
            height: '46px',
            background: '#000000',
            border: '1.5px solid rgba(255, 255, 255, 0.22)',
            borderLeft: 'none',
            borderRadius: '0 9999px 9999px 0',
            display: 'flex',
            alignItems: 'center',
            padding: '0 6px 0 0',
            flexShrink: 0
          }}>
            <button
              type="button"
              onClick={onOpenEligibility}
              style={{
                height: '40px',
                minHeight: '40px',
                borderRadius: '9999px',
                border: '1px solid rgba(238, 216, 138, 0.3)',
                background: '#000000',
                color: '#eed88a',
                padding: '0 14px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap',
                touchAction: 'manipulation'
              }}
            >
              <span>Visa</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </nav>

      {/* =========================================================================
          3. FULL MOBILE / TABLET SLIDE-DOWN DRAWER
          ========================================================================= */}
      {mobileDrawerOpen && (
        <div style={{
          background: '#05070a',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '1.25rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
          animation: 'fadeIn 0.25s ease'
        }}>
          <div style={{ maxWidth: '540px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {/* Top Brand Banner in Mobile Drawer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '0.85rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <BrandLogo height={34} showBadge={true} />
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  minWidth: '44px',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  cursor: 'pointer',
                  touchAction: 'manipulation'
                }}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Links Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileDrawerOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    background: location.pathname === item.path ? 'rgba(238, 216, 138, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                    border: location.pathname === item.path ? '1px solid rgba(238, 216, 138, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    color: location.pathname === item.path ? '#eed88a' : '#ffffff',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 600
                  }}
                >
                  <span>{item.name}</span>
                  <ArrowRight size={13} style={{ opacity: 0.5 }} />
                </Link>
              ))}
            </div>

            {/* Quick Action Button */}
            <button
              type="button"
              onClick={() => {
                setMobileDrawerOpen(false);
                onOpenEligibility?.();
              }}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '12px',
                background: '#eed88a',
                color: '#072018',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <FileCheck2 size={16} />
              <span>Check Visa Eligibility Now</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Global CSS for Navbar breakpoints */}
      <style>{`
        .nav-pipe {
          color: rgba(255, 255, 255, 0.28);
          font-size: 0.85rem;
          font-weight: 300;
          margin: 0 4px;
          user-select: none;
        }
        .nav-link-pill:hover {
          color: #eed88a !important;
          background: rgba(255, 255, 255, 0.08) !important;
        }
        .cta-capsule-btn:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: #eed88a !important;
          color: #eed88a !important;
          box-shadow: 0 0 14px rgba(238, 216, 138, 0.25);
        }
        .dropdown-item-hover:hover {
          background: rgba(255, 255, 255, 0.08);
        }
        .disc-hover-effect:hover {
          transform: scale(1.08) rotate(-4deg);
        }

        @media (max-width: 992px) {
          .desktop-metaball-chain {
            display: none !important;
          }
          .mobile-tablet-metaball-chain {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
