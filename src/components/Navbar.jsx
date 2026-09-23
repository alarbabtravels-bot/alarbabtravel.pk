import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown, Search, Menu, X, ArrowRight,
  Sun, Moon, Phone, FileCheck2
} from 'lucide-react';
import BrandLogo from './BrandLogo';
import SiteSearch from './SiteSearch';

/**
 * Light Travelora-style Navbar: thin blue utility strip + liquid glass sliding
 * pill main nav row with icon buttons and a blue "Check Eligibility" CTA.
 */
export default function Navbar({ onOpenEligibility }) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [destinationsDropdownOpen, setDestinationsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  // Sliding glass pill state & refs
  const trackRef = useRef(null);
  const itemRefs = useRef({});
  const [hoveredPath, setHoveredPath] = useState(null);
  const [pillStyle, setPillStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0
  });

  useEffect(() => {
    const saved = localStorage.getItem('alarbab-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved ? saved === 'dark' : prefersDark;
    setIsDark(shouldBeDark);
    document.documentElement.setAttribute('data-theme', shouldBeDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
      localStorage.setItem('alarbab-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 12);
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Resolve active nav path based on route
  const getActiveNavPath = (pathname) => {
    if (pathname === '/') return '/';
    if (pathname.startsWith('/services')) return '/services';
    if (pathname.startsWith('/destinations')) return '/destinations';
    if (pathname.startsWith('/about')) return '/about';
    if (pathname.startsWith('/faq')) return '/faq';
    if (pathname.startsWith('/blog')) return '/blog';
    if (pathname.startsWith('/contact')) return '/contact';
    const match = navLinks.find(link => link.path === pathname || (link.path !== '/' && pathname.startsWith(link.path)));
    return match ? match.path : '/';
  };

  const activeNavPath = getActiveNavPath(location.pathname);
  const currentPillTarget = hoveredPath || activeNavPath;

  const updatePill = useCallback((targetPath) => {
    const trackEl = trackRef.current;
    const targetEl = itemRefs.current[targetPath];
    if (!trackEl || !targetEl) return;

    const trackRect = trackEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    setPillStyle({
      left: Math.round(targetRect.left - trackRect.left),
      top: Math.round(targetRect.top - trackRect.top),
      width: Math.round(targetRect.width),
      height: Math.round(targetRect.height),
      opacity: 1
    });
  }, []);

  useEffect(() => {
    updatePill(currentPillTarget);
  }, [currentPillTarget, updatePill]);

  useEffect(() => {
    if (!trackRef.current) return;
    const ro = new ResizeObserver(() => {
      updatePill(currentPillTarget);
    });
    ro.observe(trackRef.current);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        updatePill(currentPillTarget);
      });
    }

    return () => ro.disconnect();
  }, [currentPillTarget, updatePill]);

  return (
    <header style={{ width: '100%', position: 'sticky', top: 0, zIndex: 1000 }}>
      {/* =========================================================================
          1. THIN BLUE UTILITY STRIP
          ========================================================================= */}
      <div style={{
        background: '#2563eb',
        color: '#ffffff',
        fontSize: '0.78rem',
        fontWeight: 600,
        padding: '0.42rem 0'
      }} className="hidden-mobile">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileCheck2 size={13} /> Free Initial Consultation
          </span>
          <a
            href="tel:0512000066"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ffffff', textDecoration: 'none', fontWeight: 600 }}
          >
            <Phone size={13} /> PTCL: 051 2000066
          </a>
          <a
            href="tel:+923152323811"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ffffff', textDecoration: 'none', fontWeight: 600 }}
          >
            <Phone size={13} /> Call: 0315 2323811
          </a>
          <a
            href="https://wa.me/923099923232"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ffffff', textDecoration: 'none', fontWeight: 600 }}
          >
            <Phone size={13} /> WhatsApp: 0309 9923232
          </a>
        </div>
      </div>

      {/* =========================================================================
          2. MAIN WHITE NAV ROW
          ========================================================================= */}
      <nav style={{
        width: '100%',
        background: '#ffffff',
        borderBottom: '1px solid #eef2f6',
        boxShadow: isScrolled ? '0 4px 20px rgba(15, 23, 42, 0.08)' : 'none',
        padding: '0.85rem 0'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <BrandLogo height={38} light={!isDark} />
          </Link>

          {/* Desktop Nav Links with Liquid Glass Sliding Pill */}
          <div className="hidden-tablet" style={{ display: 'flex', alignItems: 'center' }}>
            <div
              ref={trackRef}
              className="nav-liquid-track"
              onMouseLeave={() => setHoveredPath(null)}
            >
              {/* Liquid Glass Sliding Pill with Ambient Light & Reflection */}
              <div
                className="nav-sliding-glass-pill"
                style={{
                  transform: `translate3d(${pillStyle.left}px, ${pillStyle.top}px, 0)`,
                  width: `${pillStyle.width}px`,
                  height: `${pillStyle.height}px`,
                  opacity: pillStyle.opacity,
                  visibility: pillStyle.width > 0 ? 'visible' : 'hidden'
                }}
                aria-hidden="true"
              >
                <div className="nav-glass-pill-light" />
                <div className="nav-glass-pill-reflection" />
              </div>

              {navLinks.map((item) => {
                const isPillTarget = currentPillTarget === item.path;

                if (item.hasDropdown) {
                  const isOpen = item.name === 'Services' ? servicesDropdownOpen : destinationsDropdownOpen;
                  const setOpen = item.name === 'Services' ? setServicesDropdownOpen : setDestinationsDropdownOpen;

                  return (
                    <div
                      key={item.name}
                      style={{ position: 'relative' }}
                      onMouseEnter={() => {
                        setHoveredPath(item.path);
                        setOpen(true);
                      }}
                      onMouseLeave={() => setOpen(false)}
                    >
                      <Link
                        to={item.path}
                        ref={(el) => { itemRefs.current[item.path] = el; }}
                        onClick={() => setHoveredPath(item.path)}
                        className={`nav-link-pill ${isPillTarget ? 'nav-link-illuminated' : ''}`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          size={13}
                          className="nav-chevron-icon"
                          style={{
                            transform: isOpen ? 'rotate(180deg)' : 'none'
                          }}
                        />
                      </Link>

                      {isOpen && (
                        <div className="navbar-dropdown-menu" style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: item.name === 'Services' ? '320px' : '270px',
                          padding: '8px',
                          marginTop: '8px',
                          background: '#ffffff',
                          border: '1px solid #eef2f6',
                          borderRadius: '16px',
                          boxShadow: '0 20px 48px rgba(15, 23, 42, 0.18)',
                          zIndex: 2000,
                          animation: 'fadeIn 0.18s ease'
                        }}>
                          {item.items.map((sub, idx) => (
                            <Link
                              key={idx}
                              to={sub.path}
                              className="dropdown-item-hover"
                              style={{ display: 'block', padding: '9px 12px', borderRadius: '10px', textDecoration: 'none' }}
                            >
                              <div style={{ color: '#0f1f30', fontSize: '0.86rem', fontWeight: 600 }}>{sub.title}</div>
                              {sub.desc && <div style={{ color: '#64748b', fontSize: '0.74rem', marginTop: '2px' }}>{sub.desc}</div>}
                              {sub.tag && (
                                <span style={{
                                  display: 'inline-block', fontSize: '0.66rem', background: 'rgba(37, 99, 235, 0.08)',
                                  color: '#2563eb', padding: '1px 7px', borderRadius: '9999px', marginTop: '4px', fontWeight: 600
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
                  <Link
                    key={item.name}
                    to={item.path}
                    ref={(el) => { itemRefs.current[item.path] = el; }}
                    onMouseEnter={() => setHoveredPath(item.path)}
                    onClick={() => setHoveredPath(item.path)}
                    className={`nav-link-pill ${isPillTarget ? 'nav-link-illuminated' : ''}`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: Icon buttons + CTA */}
          <div className="hidden-tablet" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
            <button
              type="button"
              aria-label="Search the website"
              className="navbar-icon-btn"
              onClick={() => setSearchOpen(true)}
              style={{
                width: '38px', height: '38px', borderRadius: '50%', border: '1px solid #e2e9f0', background: '#ffffff',
                color: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
              }}
            >
              <Search size={16} />
            </button>
            <button
              type="button"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="navbar-icon-btn navbar-theme-toggle"
              onClick={toggleTheme}
              style={{
                width: '38px', height: '38px', borderRadius: '50%', border: '1px solid #e2e9f0', background: '#ffffff',
                color: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
              }}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              type="button"
              onClick={onOpenEligibility}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '0.65rem 1.35rem',
                borderRadius: '9999px', background: '#2563eb', color: '#ffffff', border: 'none',
                fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
                boxShadow: '0 8px 20px rgba(37, 99, 235, 0.35)'
              }}
            >
              <ArrowRight size={14} />
              <span>Check Eligibility</span>
            </button>
          </div>

          {/* Mobile: Search + Theme Toggle + Menu Trigger (grouped so space-between doesn't scatter them) */}
          <div className="hidden-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
            <button
              type="button"
              aria-label="Search the website"
              onClick={() => setSearchOpen(true)}
              style={{
                width: '44px', height: '44px', minWidth: '44px', minHeight: '44px', borderRadius: '50%', border: '1px solid #e2e9f0', background: '#ffffff',
                color: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, touchAction: 'manipulation'
              }}
            >
              <Search size={17} />
            </button>
            <button
              type="button"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={toggleTheme}
              className="navbar-theme-toggle"
              style={{
                width: '44px', height: '44px', minWidth: '44px', minHeight: '44px', borderRadius: '50%', border: '1px solid #e2e9f0', background: '#ffffff',
                color: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, touchAction: 'manipulation'
              }}
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              aria-label="Toggle Navigation Menu"
              style={{
                background: '#f1f5f9', border: '1px solid #e2e9f0', borderRadius: '9999px', color: '#0f1f30',
                padding: '8px 14px', minHeight: '44px', display: 'flex', alignItems: 'center', gap: '6px',
                cursor: 'pointer', fontSize: '0.84rem', fontWeight: 600, touchAction: 'manipulation'
              }}
            >
              <span>Menu</span>
              {mobileDrawerOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* =========================================================================
          3. MOBILE SLIDE-DOWN DRAWER
          ========================================================================= */}
      {mobileDrawerOpen && (
        <div className="navbar-mobile-drawer" style={{
          background: '#ffffff',
          borderBottom: '1px solid #eef2f6',
          padding: '1.25rem',
          boxShadow: '0 20px 40px rgba(15, 23, 42, 0.14)',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{ maxWidth: '540px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileDrawerOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 0.85rem',
                    background: location.pathname === item.path ? 'rgba(37, 99, 235, 0.08)' : '#f8fafc',
                    border: location.pathname === item.path ? '1px solid rgba(37, 99, 235, 0.3)' : '1px solid #eef2f6',
                    borderRadius: '10px',
                    color: location.pathname === item.path ? '#2563eb' : '#0f1f30',
                    textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600
                  }}
                >
                  <span>{item.name}</span>
                  <ArrowRight size={13} style={{ opacity: 0.5 }} />
                </Link>
              ))}
            </div>

            <button
              type="button"
              onClick={() => { setMobileDrawerOpen(false); onOpenEligibility?.(); }}
              style={{
                width: '100%', padding: '0.8rem', borderRadius: '12px', background: '#2563eb', color: '#ffffff',
                border: 'none', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}
            >
              <FileCheck2 size={16} />
              <span>Check Visa Eligibility Now</span>
              <ArrowRight size={15} />
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.15rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                <a
                  href="tel:0512000066"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    padding: '0.65rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0',
                    color: '#0f1f30', textDecoration: 'none', fontSize: '0.84rem', fontWeight: 600
                  }}
                >
                  <Phone size={14} color="#2563eb" />
                  <span>051 2000066</span>
                </a>
                <a
                  href="tel:+923152323811"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    padding: '0.65rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0',
                    color: '#0f1f30', textDecoration: 'none', fontSize: '0.84rem', fontWeight: 600
                  }}
                >
                  <Phone size={14} color="#2563eb" />
                  <span>0315 2323811</span>
                </a>
              </div>
              <a
                href="https://wa.me/923099923232"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  padding: '0.65rem', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.25)',
                  color: '#2563eb', textDecoration: 'none', fontSize: '0.84rem', fontWeight: 600
                }}
              >
                <Phone size={14} />
                <span>WhatsApp: 0309 9923232</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <SiteSearch open={searchOpen} onClose={() => setSearchOpen(false)} />

      <style>{`
        .nav-link-pill:hover {
          background: transparent !important;
        }
        .navbar-icon-btn:hover {
          border-color: #2563eb !important;
          color: #2563eb !important;
        }
        .navbar-theme-toggle {
          transition: box-shadow 0.25s ease, border-color 0.25s ease, transform 0.2s ease;
        }
        .navbar-theme-toggle:hover {
          box-shadow: 0 0 0 4px rgba(201, 147, 46, 0.16), 0 0 18px rgba(201, 147, 46, 0.55);
          border-color: #c9932e !important;
          color: #c9932e !important;
          transform: translateY(-1px);
        }
        html[data-theme="dark"] .navbar-theme-toggle {
          box-shadow: 0 0 0 3px rgba(201, 147, 46, 0.18), 0 0 14px rgba(201, 147, 46, 0.45);
          border-color: rgba(201, 147, 46, 0.55) !important;
          color: #c9932e !important;
        }
        .dropdown-item-hover:hover {
          background: #f8fafc;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}
