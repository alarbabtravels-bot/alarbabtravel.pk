
import { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function MoodyAtmosphericHero({ onOpenEligibility }) {
  const [hoveredThumb, setHoveredThumb] = useState(null);

  const previewDestinations = [
    {
      id: 'uk',
      code: '01 / GBR',
      name: 'United Kingdom',
      type: 'Standard Visitor',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80',
      tag: '18 Days'
    },
    {
      id: 'schengen',
      code: '02 / EUR',
      name: 'Schengen Zone',
      type: 'Uniform Type C',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
      tag: '29 States'
    },
    {
      id: 'uae',
      code: '03 / ARE',
      name: 'Dubai & UAE',
      type: '5-Yr Multiple Entry',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
      tag: 'Express 24h'
    }
  ];

  const scrollToNextSection = () => {
    const nextEl = document.getElementById('services-overview');
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '3rem 0 2.5rem 0',
        overflow: 'hidden',
        backgroundColor: '#0a0e1a'
      }}
    >
      {/* 1. Dramatic Moody Travel Background Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(180deg, rgba(10, 14, 26, 0.75) 0%, rgba(10, 14, 26, 0.4) 45%, rgba(10, 14, 26, 0.95) 100%),
            linear-gradient(90deg, rgba(10, 14, 26, 0.95) 0%, rgba(10, 14, 26, 0.6) 45%, rgba(10, 14, 26, 0.88) 100%),
            url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          filter: 'saturate(0.65) contrast(1.15) brightness(0.65)',
          zIndex: 1
        }}
      />

      {/* 2. Warm Amber/Gold Sunset Focal Glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '18%',
          width: '560px',
          height: '560px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, rgba(212, 175, 55, 0.12) 35%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 2,
          animation: 'amberPulse 8s ease-in-out infinite'
        }}
      />

      {/* 3. Subtle Animated Fog / Mist Drifting Overlay */}
      <div
        className="mist-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.02) 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 3
        }}
      />

      {/* 4. Top Status Ribbon */}
      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-heading)',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold-accent)' }} />
            <span style={{ color: '#ffffff' }}>ISLAMABAD, PAKISTAN</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
            <span>33.7128° N, 73.0645° E</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: 'var(--text-body)' }}>SECP REGISTERED</span>
          </div>
        </div>
      </div>

      {/* 5. Main Hero Body */}
      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%', margin: 'auto 0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.75fr)',
          gap: '3rem',
          alignItems: 'center'
        }}
          className="hero-grid-responsive"
        >
          {/* Left Column: Bold Typography & A/B Stats */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.78rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold-accent)',
              marginBottom: '1rem',
              fontWeight: 600,
              fontFamily: 'var(--font-heading)'
            }}>
              <span style={{ width: '20px', height: '1.5px', background: 'var(--gold-accent)' }} />
              IMMIGRATION & TRAVEL STRATEGISTS
            </div>

            {/* IMPACTFUL SORA HEADING */}
            <h1 style={{
              fontSize: 'clamp(2.8rem, 6.8vw, 5.8rem)',
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-heading)',
              textTransform: 'uppercase',
              color: '#ffffff'
            }}>
              RISE ABOVE <br />
              <span style={{
                background: 'linear-gradient(180deg, #ffffff 15%, #d4af37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                BORDERS.
              </span>
            </h1>

            {/* Readable Inter body copy */}
            <p style={{
              fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
              color: 'var(--text-body)',
              fontWeight: 400,
              lineHeight: 1.7,
              maxWidth: '560px',
              marginBottom: '2.5rem'
            }}>
              Navigating global visa compliance with forensic legal precision. Islamabad’s trusted visa consultancy for Pakistani families, corporate executives, and students.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={onOpenEligibility}
                style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }}
              >
                Check Visa Eligibility <ArrowRight size={16} />
              </button>

              <a
                href="https://wa.me/923099923232?text=Assalam%20o%20Alaikum,%20I%20would%20like%20to%20consult%20Al%20Arbab%20Travels%20regarding%20my%20visa."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ padding: '0.85rem 1.85rem', fontSize: '0.95rem' }}
              >
                WhatsApp Concierge
              </a>
            </div>

            {/* Two Text/Stat Columns: [A] & [B] */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}
              className="ab-columns-responsive"
            >
              <div>
                <div style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.18em',
                  color: 'var(--gold-accent)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                  fontFamily: 'var(--font-heading)'
                }}>
                  [A] GLOBAL FOOTPRINT
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px', fontFamily: 'var(--font-heading)' }}>
                  190+ Destinations
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                  Seamless casework across UK, Schengen 29 states, North America, and Gulf.
                </p>
              </div>

              <div>
                <div style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.18em',
                  color: 'var(--gold-accent)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                  fontFamily: 'var(--font-heading)'
                }}>
                  [B] REGULATORY BENCHMARK
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--gold-accent)', marginBottom: '4px', fontFamily: 'var(--font-heading)' }}>
                  98.4% Precision
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                  Forensic bank statement auditing, verified PNR tickets, and registered caseworkers.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual breathing space */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', minHeight: '280px' }} />
        </div>
      </div>

      {/* 6. Bottom Bar: Scroll Indicator & 3-Thumbnail Preview Gallery */}
      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%', marginTop: 'auto' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '1.5rem',
          paddingTop: '1.5rem'
        }}>
          {/* Scroll Down Prompt Indicator */}
          <div
            onClick={scrollToNextSection}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold-accent)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.03)'
            }}>
              <ChevronDown size={15} />
            </div>
            <span>EXPLORE CONCIERGE</span>
          </div>

          {/* Bottom-Right 3-Thumbnail Preview Gallery (16px radius, unified palette) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-card)',
            padding: '10px 14px',
            boxShadow: 'var(--shadow-card)'
          }}>
            <div style={{
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--gold-accent)',
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontWeight: 700,
              fontFamily: 'var(--font-heading)',
              paddingLeft: '4px'
            }}
              className="hidden-mobile"
            >
              PREVIEW
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {previewDestinations.map((thumb) => (
                <div
                  key={thumb.id}
                  onClick={onOpenEligibility}
                  onMouseEnter={() => setHoveredThumb(thumb.id)}
                  onMouseLeave={() => setHoveredThumb(null)}
                  style={{
                    position: 'relative',
                    width: '104px',
                    height: '76px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: hoveredThumb === thumb.id
                      ? '1.5px solid var(--gold-accent)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.25s ease',
                    transform: hoveredThumb === thumb.id ? 'translateY(-3px)' : 'none',
                    boxShadow: hoveredThumb === thumb.id ? '0 8px 20px rgba(212, 175, 55, 0.25)' : 'none'
                  }}
                >
                  <img
                    src={thumb.image}
                    alt={thumb.name}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: hoveredThumb === thumb.id ? 'brightness(1.05)' : 'brightness(0.75)',
                      transition: 'filter 0.25s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 25%, rgba(10, 14, 26, 0.95) 100%)'
                  }} />

                  <div style={{
                    position: 'absolute',
                    bottom: '6px',
                    left: '8px',
                    right: '8px'
                  }}>
                    <div style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--gold-accent)', lineHeight: 1, fontFamily: 'var(--font-heading)' }}>
                      {thumb.code}
                    </div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {thumb.name.split(' ')[0]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes amberPulse {
          0%, 100% {
            opacity: 0.75;
            transform: scale(1);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.06);
          }
        }
        @keyframes driftMist {
          0% { transform: translateX(-4%); }
          50% { transform: translateX(4%); }
          100% { transform: translateX(-4%); }
        }
        .mist-overlay {
          animation: driftMist 20s ease-in-out infinite;
        }
        @media (max-width: 991px) {
          .hero-grid-responsive {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 640px) {
          .ab-columns-responsive {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
