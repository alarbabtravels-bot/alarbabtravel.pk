import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, Award, CheckCircle2, ChevronDown, Sparkles, MapPin } from 'lucide-react';
import { destinations } from '../data/destinationsData';

export default function LandingHero({ onOpenEligibility }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchTerm.trim().toLowerCase();
    if (query) {
      const match = destinations.find(d => 
        (d.slug && d.slug.toLowerCase() === query) ||
        d.id.toLowerCase() === query || 
        d.country.toLowerCase().includes(query) ||
        query.includes(d.id.toLowerCase()) ||
        d.aliases?.some(a => a.toLowerCase() === query)
      );
      if (match) {
        navigate(`/destinations/${match.slug || match.id}`);
      } else {
        navigate('/destinations');
      }
    }
  };

  const scrollToDestinations = () => {
    const el = document.getElementById('popular-destinations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      style={{
        position: 'relative',
        minHeight: '88vh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#050609',
        backgroundImage: `
          linear-gradient(90deg, #050609 0%, rgba(5, 6, 9, 0.94) 38%, rgba(5, 6, 9, 0.62) 70%, rgba(5, 6, 9, 0.88) 100%),
          linear-gradient(180deg, rgba(5, 6, 9, 0.4) 0%, transparent 40%, #050609 100%),
          url('/hero_travel_lux.webp')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        backgroundRepeat: 'no-repeat',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3.5rem 0 2rem 0'
      }}
      className="travel-hero-section"
    >
      {/* Subtle Warm Atmospheric Ambient Glows (Evoking Makkah & Islamabad Dusk) */}
      <div 
        style={{
          position: 'absolute',
          top: '10%',
          right: '25%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229, 169, 60, 0.12) 0%, rgba(5, 6, 9, 0) 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }} 
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(2, 132, 199, 0.08) 0%, rgba(5, 6, 9, 0) 70%)',
          filter: 'blur(110px)',
          pointerEvents: 'none'
        }} 
      />

      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: 'clamp(2rem, 4vw, 4rem)',
          alignItems: 'center'
        }} className="travel-hero-grid">
          
          {/* =========================================================================
              LEFT COLUMN: TRUST HEADLINE, VALUE PROPOSITION, SEARCH & CTAS
              ========================================================================= */}
          <div style={{ maxWidth: '680px' }} className="hero-content-col">
            {/* Trust & Location Authority Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              background: 'rgba(238, 216, 138, 0.09)',
              border: '1px solid rgba(238, 216, 138, 0.28)',
              marginBottom: '1.4rem',
              color: '#eed88a',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif"
            }}>
              <span style={{ 
                width: '7px', 
                height: '7px', 
                borderRadius: '50%', 
                background: '#e5a93c', 
                boxShadow: '0 0 10px #e5a93c' 
              }} />
              <span>AL ARBAB TRAVELS (PVT) LTD · BLUE AREA, ISLAMABAD</span>
            </div>

            {/* Clear, High-Trust Business Headline */}
            <h1 style={{
              fontSize: 'clamp(2.6rem, 5.4vw, 4.4rem)',
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: '0 0 1.25rem 0',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
            }}>
              Pakistan’s Trusted <br />
              <span style={{
                background: 'linear-gradient(135deg, #ffffff 15%, #eed88a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 30px rgba(229, 169, 60, 0.25)'
              }}>
                Visa &amp; Travel Partner
              </span>
            </h1>

            {/* Subtitle Communicating End-to-End Reliability */}
            <p style={{
              fontSize: 'clamp(0.95rem, 1.35vw, 1.08rem)',
              lineHeight: 1.68,
              color: '#cbd5e1',
              margin: '0 0 1.75rem 0',
              maxWidth: '580px',
              fontFamily: "'Inter', sans-serif"
            }}>
              Your journey, handled with meticulous care. Full assistance for Asian visit visas, certified Umrah &amp; Hajj packages, worldwide flight ticketing, and expert Schengen &amp; USA file preparation.
            </p>

            {/* Prominent Capsule Search Bar */}
            <form 
              onSubmit={handleSearchSubmit}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '540px',
                marginBottom: '1.25rem'
              }}
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search visas, flights, Umrah packages..."
                style={{
                  width: '100%',
                  height: '54px',
                  borderRadius: '9999px',
                  background: 'rgba(10, 14, 22, 0.75)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1.5px solid rgba(255, 255, 255, 0.22)',
                  padding: '0 56px 0 22px',
                  color: '#ffffff',
                  fontSize: '0.94rem',
                  outline: 'none',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.25s ease',
                  fontFamily: "'Inter', sans-serif"
                }}
                className="hero-capsule-input"
              />

              {/* Magnifying Glass Submit Button with Warm Hover Accent */}
              <button
                type="submit"
                aria-label="Search destinations"
                style={{
                  position: 'absolute',
                  right: '6px',
                  top: '6px',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(229, 169, 60, 0.15)',
                  border: '1px solid rgba(229, 169, 60, 0.35)',
                  color: '#eed88a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                className="search-btn-icon"
              >
                <Search size={18} strokeWidth={2.4} />
              </button>
            </form>

            {/* Quick Search Suggestions */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              alignItems: 'center', 
              gap: '8px', 
              fontSize: '0.8rem', 
              color: '#94a3b8', 
              marginBottom: '2rem' 
            }}>
              <span style={{ opacity: 0.7 }}>Popular searches:</span>
              <button 
                type="button" 
                onClick={() => setSearchTerm('Umrah')} 
                style={{ background: 'transparent', border: 'none', color: '#eed88a', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
              >
                Umrah Packages
              </button>
              <span>·</span>
              <button 
                type="button" 
                onClick={() => setSearchTerm('Dubai')} 
                style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
              >
                Dubai Visa
              </button>
              <span>·</span>
              <button 
                type="button" 
                onClick={() => setSearchTerm('UK')} 
                style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
              >
                UK Visit
              </button>
              <span>·</span>
              <button 
                type="button" 
                onClick={() => setSearchTerm('Flight')} 
                style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
              >
                PIA &amp; International Flights
              </button>
            </div>

            {/* Dual Action Buttons (Warm Gold Primary + Frosted Secondary) */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.1rem', marginBottom: '2.2rem' }}>
              {/* Primary Warm Gold/Amber Button ("Free Consultation") */}
              <button
                type="button"
                onClick={onOpenEligibility}
                style={{
                  background: 'linear-gradient(135deg, #e5a93c 0%, #d97706 100%)',
                  color: '#05070c',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '0.78rem 2rem',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  boxShadow: '0 4px 22px rgba(229, 169, 60, 0.45), 0 0 12px rgba(217, 119, 6, 0.3)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="gold-primary-cta-btn"
              >
                FREE CONSULTATION
              </button>

              {/* Secondary Refined Glass Button ("See More") */}
              <button
                type="button"
                onClick={scrollToDestinations}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  color: '#ffffff',
                  border: '1.5px solid rgba(255, 255, 255, 0.32)',
                  borderRadius: '9999px',
                  padding: '0.74rem 1.85rem',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="glass-secondary-btn"
              >
                See more
              </button>
            </div>

            {/* Integrated Trust & License Badges (Visually In-Hero Flow) */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '12px',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }} className="hero-trust-badges-row">
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '5px 14px',
                borderRadius: '9999px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                color: '#6ee7b7',
                fontSize: '0.8rem',
                fontWeight: 600
              }}>
                <MapPin size={15} color="#10b981" />
                <span>Based in Blue Area, Islamabad</span>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '5px 14px',
                borderRadius: '9999px',
                background: 'rgba(238, 216, 138, 0.1)',
                border: '1px solid rgba(238, 216, 138, 0.25)',
                color: '#eed88a',
                fontSize: '0.8rem',
                fontWeight: 600
              }}>
                <Award size={15} color="#e5a93c" />
                <span>Personalized Visa &amp; Travel Consultancy</span>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '5px 14px',
                borderRadius: '9999px',
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                color: '#7dd3fc',
                fontSize: '0.8rem',
                fontWeight: 600
              }}>
                <ShieldCheck size={15} color="#38bdf8" />
                <span>Direct WhatsApp &amp; In-Person Support</span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: REAL DESTINATION SPOTLIGHT CARD (MATCHES POPULAR DESTINATIONS)
              ========================================================================= */}
          <div style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end'
          }} className="hero-dest-spotlight-col">
            
            {/* Translucent Glass Travel Spotlight Box */}
            <div style={{
              width: '100%',
              maxWidth: '430px',
              borderRadius: '20px',
              background: 'rgba(9, 13, 22, 0.65)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.65), 0 0 30px rgba(229, 169, 60, 0.1)',
              padding: '1.6rem',
              overflow: 'hidden'
            }}>
              {/* Header inside card */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: 'rgba(238, 216, 138, 0.15)',
                    border: '1px solid rgba(238, 216, 138, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#eed88a'
                  }}>
                    <Sparkles size={15} />
                  </span>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#eed88a', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      Featured Focus
                    </div>
                    <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#ffffff' }}>
                      Pilgrimage &amp; Global Tours
                    </div>
                  </div>
                </div>

                <span style={{
                  fontSize: '0.72rem',
                  padding: '3px 9px',
                  borderRadius: '9999px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#6ee7b7',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  fontWeight: 600
                }}>
                  Live Bookings
                </span>
              </div>

              {/* 3 Quick Destination Highlights connecting directly to Popular Destinations */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Destination Item 1: Umrah */}
                <div 
                  onClick={scrollToDestinations}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  className="spotlight-quick-item"
                >
                  <img 
                    src="/dest_makkah.jpg" 
                    alt="Makkah Umrah"
                    width="46"
                    height="46"
                    loading="lazy"
                    decoding="async"
                    style={{ width: '46px', height: '46px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
                      Makkah &amp; Madinah
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Umrah 2026 packages &amp; luxury hotel vouchers
                    </div>
                  </div>
                  <span style={{ color: '#eed88a', fontSize: '0.8rem', fontWeight: 700 }}>VIP</span>
                </div>

                {/* Destination Item 2: Dubai */}
                <div 
                  onClick={scrollToDestinations}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  className="spotlight-quick-item"
                >
                  <img 
                    src="/dest_dubai.jpg" 
                    alt="Dubai Visas"
                    width="46"
                    height="46"
                    loading="lazy"
                    decoding="async"
                    style={{ width: '46px', height: '46px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
                      Dubai &amp; UAE
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      30/60 Days tourist visas &amp; flight packages
                    </div>
                  </div>
                  <span style={{ color: '#38bdf8', fontSize: '0.8rem', fontWeight: 700 }}>Fast</span>
                </div>

                {/* Destination Item 3: UK & Worldwide Visas */}
                <div 
                  onClick={onOpenEligibility}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  className="spotlight-quick-item"
                >
                  <img 
                    src="/dest_turkey.jpg" 
                    alt="International Travel"
                    width="46"
                    height="46"
                    loading="lazy"
                    decoding="async"
                    style={{ width: '46px', height: '46px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
                      UK, Schengen &amp; Turkey
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Embassy file preparation &amp; appointment slots
                    </div>
                  </div>
                  <span style={{ color: '#6ee7b7', fontSize: '0.8rem', fontWeight: 700 }}>File Prep</span>
                </div>
              </div>

              {/* Action link */}
              <div 
                onClick={scrollToDestinations}
                style={{
                  marginTop: '1.1rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.82rem',
                  color: '#eed88a',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                <span>View all verified destinations</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM CENTER: ANCHORED PURPOSEFUL SCROLL INDICATOR
            ========================================================================= */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2.8rem'
        }}>
          <button
            type="button"
            onClick={scrollToDestinations}
            aria-label="Scroll to popular destinations"
            style={{
              background: 'transparent',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              color: '#cbd5e1',
              padding: '6px 16px',
              borderRadius: '9999px',
              transition: 'all 0.2s ease'
            }}
            className="hero-scroll-anchor-btn"
          >
            <span style={{
              fontSize: '0.75rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: '#94a3b8'
            }}>
              Explore Destinations
            </span>

            {/* Anchored Animated Mouse Indicator with Warm Amber/Gold Dot */}
            <div 
              style={{
                width: '22px',
                height: '34px',
                borderRadius: '9999px',
                border: '1.8px solid rgba(238, 216, 138, 0.55)',
                boxShadow: '0 0 12px rgba(229, 169, 60, 0.25)',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '6px'
              }}
            >
              <div 
                style={{
                  width: '4px',
                  height: '7px',
                  borderRadius: '9999px',
                  background: '#e5a93c',
                  boxShadow: '0 0 6px #e5a93c',
                  animation: 'mouseScroll 1.6s ease-in-out infinite'
                }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Responsive & Dynamic Interaction Styles */}
      <style>{`
        .hero-capsule-input:focus {
          border-color: #e5a93c !important;
          box-shadow: 0 0 24px rgba(229, 169, 60, 0.3) !important;
        }
        .search-btn-icon:hover {
          background: #e5a93c !important;
          color: #05070c !important;
          transform: scale(1.05);
        }
        .gold-primary-cta-btn:hover {
          background: linear-gradient(135deg, #fbbf24 0%, #e5a93c 100%) !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 28px rgba(229, 169, 60, 0.6) !important;
        }
        .glass-secondary-btn:hover {
          border-color: #eed88a !important;
          background: rgba(238, 216, 138, 0.1) !important;
          color: #eed88a !important;
          transform: translateY(-2px);
        }
        .spotlight-quick-item:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(238, 216, 138, 0.35) !important;
          transform: translateX(4px);
        }
        .hero-scroll-anchor-btn:hover span {
          color: #eed88a !important;
        }
        .hero-scroll-anchor-btn:hover div {
          border-color: #e5a93c !important;
        }

        @keyframes mouseScroll {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.3; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 992px) {
          .travel-hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-content-col {
            margin: 0 auto !important;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-dest-spotlight-col {
            margin: 1.5rem auto 0 auto !important;
            align-items: center !important;
          }
          .hero-capsule-input {
            text-align: center;
            padding-right: 50px !important;
          }
          .hero-trust-badges-row {
            justify-content: center !important;
          }
        }

        @media (max-width: 640px) {
          .travel-hero-section {
            padding: 2.5rem 0 2rem 0 !important;
          }
          .gold-primary-cta-btn, .glass-secondary-btn {
            width: 100% !important;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
