import { useState } from 'react';
import { ArrowRight, ChevronRight, QrCode, ShieldCheck, Plane, Compass, Check, Sparkles } from 'lucide-react';

export default function EmeraldEleganceHero({ onOpenEligibility }) {
  const [activeTab, setActiveTab] = useState(0);

  const scrollToDestinations = () => {
    const el = document.getElementById('popular-destinations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: 650, behavior: 'smooth' });
    }
  };

  return (
    <section 
      style={{
        position: 'relative',
        minHeight: '88vh',
        width: '100%',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 42% 40%, #102d25 0%, #0c231c 45%, #071914 80%, #040e0b 100%)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        padding: '5rem 0 6rem 0'
      }}
      className="emerald-hero-section"
    >
      {/* Subtle organic ambient light blobs */}
      <div 
        style={{
          position: 'absolute',
          top: '-10%',
          left: '15%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(5, 150, 105, 0) 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }} 
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '10%',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.09) 0%, rgba(6, 78, 59, 0) 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none'
        }} 
      />

      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1360px', padding: '0 1.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.08fr 0.92fr',
          gap: '3.5rem',
          alignItems: 'center'
        }} className="emerald-hero-grid">
          
          {/* =========================================================================
              LEFT COLUMN: LUXURY EDITORIAL HEADLINE & CTA (EXACT REFERENCE MATCH)
              ========================================================================= */}
          <div style={{ maxWidth: '620px' }}>
            
            {/* Small subtle pre-header badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '1.75rem',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }} />
              <span style={{
                fontSize: '0.74rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#a7f3d0',
                fontFamily: "'Inter', sans-serif"
              }}>
                AL ARBAB TRAVELS // ISLAMABAD
              </span>
            </div>

            {/* Signature Luxury Editorial Heading (Exact Match for Reference) */}
            <h1 style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontSize: 'clamp(3.1rem, 5.8vw, 5.2rem)',
              lineHeight: 1.05,
              fontWeight: 500,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: '0 0 1.5rem 0'
            }}>
              Let some<br />
              <span style={{
                fontStyle: 'italic',
                fontWeight: 400,
                fontFamily: "'Cormorant Garamond', serif",
                color: '#e6fcf5',
                textShadow: '0 2px 20px rgba(16, 185, 129, 0.2)'
              }}>
                elegance
              </span> into<br />
              your journeys
            </h1>

            {/* Subtitle Paragraph */}
            <p style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '1.05rem',
              lineHeight: 1.75,
              color: 'rgba(215, 235, 225, 0.75)',
              maxWidth: '480px',
              margin: '0 0 2.25rem 0',
              fontWeight: 400
            }}>
              Simplify your global visa and travel journey with us. Join today and experience seamless embassy processing, luxury flights, and borderless mobility.
            </p>

            {/* CTA Button & Secondary Link */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.25rem' }}>
              
              {/* Primary CTA (Exact Reference Style: Dark Translucent Glass Box with Arrow) */}
              <button
                type="button"
                onClick={onOpenEligibility}
                style={{
                  background: 'rgba(0, 0, 0, 0.42)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: '6px',
                  padding: '13px 26px',
                  color: '#ffffff',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8rem',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 6px 24px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                  transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.42)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>Check Visa Eligibility</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, marginLeft: '2px' }}>&gt;</span>
              </button>

              {/* Secondary Action: Explore Destinations */}
              <button
                type="button"
                onClick={scrollToDestinations}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(215, 235, 225, 0.85)',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.86rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '12px 16px',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#34d399'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(215, 235, 225, 0.85)'}
              >
                <span>Explore Top Asian &amp; Umrah Tours</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Quick trust metrics row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              marginTop: '3.25rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div>
                <div style={{ fontSize: '1.65rem', fontWeight: 700, color: '#ffffff', fontFamily: "'Cormorant Garamond', serif" }}>
                  Islamabad
                </div>
                <div style={{ fontSize: '0.76rem', color: 'rgba(215, 235, 225, 0.65)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Blue Area Office
                </div>
              </div>
              <div style={{ width: '1px', height: '36px', background: 'rgba(255, 255, 255, 0.1)' }} />
              <div>
                <div style={{ fontSize: '1.65rem', fontWeight: 700, color: '#ffffff', fontFamily: "'Cormorant Garamond', serif" }}>
                  Direct
                </div>
                <div style={{ fontSize: '0.76rem', color: 'rgba(215, 235, 225, 0.65)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  WhatsApp &amp; Desk Support
                </div>
              </div>
              <div style={{ width: '1px', height: '36px', background: 'rgba(255, 255, 255, 0.1)' }} />
              <div>
                <div style={{ fontSize: '1.65rem', fontWeight: 700, color: '#ffffff', fontFamily: "'Cormorant Garamond', serif" }}>
                  Personal
                </div>
                <div style={{ fontSize: '0.76rem', color: 'rgba(215, 235, 225, 0.65)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Travel Consultancy
                </div>
              </div>
            </div>

          </div>

          {/* =========================================================================
              RIGHT COLUMN: DUAL 3D TILTED SMARTPHONES (EXACT REFERENCE MATCH)
              ========================================================================= */}
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '620px',
            perspective: '1400px'
          }} className="emerald-hero-phones-container">
            
            {/* -------------------------------------------------------------------
                PHONE 2 (BACKGROUND / RIGHT): WHITE LUXURY TRAVEL APP UI
                ------------------------------------------------------------------- */}
            <div style={{
              position: 'absolute',
              right: '2%',
              top: '12px',
              width: '305px',
              height: '595px',
              borderRadius: '44px',
              background: '#ffffff',
              border: '3.5px solid #23272e',
              boxShadow: '24px 36px 80px rgba(0, 0, 0, 0.92), 0 0 2px rgba(255, 255, 255, 0.3)',
              transform: 'rotate(6.5deg) translateY(-10px)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 5,
              color: '#0f172a',
              fontFamily: "'Inter', sans-serif"
            }} className="phone-mockup-back hidden-mobile">
              
              {/* Dynamic Island / Top Speaker */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '84px',
                height: '22px',
                background: '#000000',
                borderRadius: '16px',
                zIndex: 20
              }} />

              {/* Status Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 20px 6px 20px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#0f172a'
              }}>
                <span>9:41</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem' }}>
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* User Header Profile */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 20px',
                marginTop: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0f172a' }}>
                    Michelle Anderson
                  </span>
                  <ChevronRight size={14} color="#64748b" />
                </div>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <QrCode size={16} color="#334155" />
                </div>
              </div>

              {/* Balance / Portfolio Metric (Exact Match for $7,172.85) */}
              <div style={{ textAlign: 'center', padding: '12px 20px 16px 20px' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                  Balance
                </div>
                <div style={{
                  fontSize: '2.4rem',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#0f172a',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  $7,172.85
                </div>
              </div>

              {/* Action Buttons (ADD MONEY / TRANSFER) */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                padding: '0 20px 20px 20px'
              }}>
                <button 
                  type="button"
                  onClick={onOpenEligibility}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    background: '#f1f5f9',
                    border: 'none',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    color: '#0f172a',
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                >
                  ADD MONEY
                </button>
                <button 
                  type="button"
                  onClick={onOpenEligibility}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    background: '#f1f5f9',
                    border: 'none',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    color: '#0f172a',
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                >
                  TRANSFER
                </button>
              </div>

              {/* Card List Items (Primary Card, Debit Card, -120) */}
              <div style={{
                flex: 1,
                background: '#fafbfc',
                borderTop: '1px solid #f1f5f9',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a' }}>
                      Primary Card
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      UK Travel Visa Vault
                    </div>
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0f172a' }}>
                    $2,874.85
                  </div>
                </div>

                <div style={{ height: '1px', background: '#f1f5f9' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a' }}>
                      Debit Card
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      Schengen Expeditions
                    </div>
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0f172a' }}>
                    $4,298.00
                  </div>
                </div>

                <div style={{ height: '1px', background: '#f1f5f9' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a' }}>
                      Umrah Transit Fee
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      Jeddah / Madinah
                    </div>
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#dc2626' }}>
                    -$120.00
                  </div>
                </div>
              </div>

              {/* Bottom Home Line */}
              <div style={{ padding: '8px 0', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100px', height: '4px', background: '#cbd5e1', borderRadius: '4px' }} />
              </div>
            </div>

            {/* -------------------------------------------------------------------
                PHONE 1 (FOREGROUND / LEFT): DARK EMERALD LIQUID MARBLE MOCKUP
                ------------------------------------------------------------------- */}
            <div style={{
              position: 'relative',
              width: '315px',
              height: '615px',
              borderRadius: '44px',
              background: '#071510',
              border: '4px solid #1c3c31',
              boxShadow: '-20px 30px 90px rgba(0, 0, 0, 0.95), 0 0 1px rgba(52, 211, 153, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.25)',
              transform: 'rotate(-6.5deg) translateY(12px)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 10,
              fontFamily: "'Inter', sans-serif"
            }} className="phone-mockup-front">
              
              {/* Dynamic Island / Top Speaker */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '84px',
                height: '22px',
                background: '#000000',
                borderRadius: '16px',
                zIndex: 20
              }} />

              {/* Fluid Marble Background Image with soft dark overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                  linear-gradient(180deg, rgba(6, 21, 16, 0.35) 0%, rgba(6, 21, 16, 0.7) 60%, rgba(6, 21, 16, 0.95) 100%),
                  url('/emerald_liquid_marble.jpg')
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 1
              }} />

              {/* Status Bar */}
              <div style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 22px 6px 22px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.9)'
              }}>
                <span>9:41</span>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.65)', cursor: 'pointer' }}>
                  SKIP
                </span>
              </div>

              {/* Phone Center Content (Exact Match for Reference "Step into the banking future now") */}
              <div style={{
                position: 'relative',
                zIndex: 10,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '24px 24px 20px 24px'
              }}>
                
                {/* Smartphone Headline */}
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
                  fontSize: '2.4rem',
                  lineHeight: 1.1,
                  fontWeight: 500,
                  color: '#ffffff',
                  margin: '0 0 0.75rem 0',
                  letterSpacing: '-0.02em',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
                }}>
                  Step into<br />
                  the travel<br />
                  future now
                </h2>

                {/* Smartphone Subtext */}
                <p style={{
                  fontSize: '0.75rem',
                  lineHeight: 1.6,
                  color: 'rgba(225, 240, 232, 0.72)',
                  margin: '0 0 1.5rem 0',
                  maxWidth: '240px'
                }}>
                  We will do everything from flight booking to visa issuance. Faster, easier, and more convenient.
                </p>

                {/* Segmented Progress Indicator Bar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '1.75rem'
                }}>
                  <div style={{ width: '38px', height: '3px', background: '#ffffff', borderRadius: '3px' }} />
                  <div style={{ width: '38px', height: '3px', background: 'rgba(255, 255, 255, 0.25)', borderRadius: '3px' }} />
                  <div style={{ width: '38px', height: '3px', background: 'rgba(255, 255, 255, 0.25)', borderRadius: '3px' }} />
                </div>

                {/* Smartphone Action Button (Exact Match: OPEN AN ACCOUNT >) */}
                <button
                  type="button"
                  onClick={onOpenEligibility}
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.55)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)'
                  }}
                >
                  <span>Open An Account</span>
                  <span style={{ fontWeight: 700 }}>&gt;</span>
                </button>

              </div>

              {/* Bottom Home Indicator Line */}
              <div style={{ position: 'relative', zIndex: 10, padding: '8px 0 10px 0', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '110px', height: '4px', background: 'rgba(255, 255, 255, 0.85)', borderRadius: '4px' }} />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
