import { ArrowRight, Plane, MapPin } from 'lucide-react';

export default function ExactScreenshotHero({ onOpenEligibility }) {
  const scrollToDestinations = () => {
    const el = document.getElementById('popular-destinations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: 600, behavior: 'smooth' });
    }
  };

  return (
    <section 
      style={{
        position: 'relative',
        minHeight: '620px',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#eaf7f2',
        backgroundImage: `
          linear-gradient(90deg, rgba(240, 253, 248, 0.98) 0%, rgba(240, 253, 248, 0.88) 42%, rgba(240, 253, 248, 0.35) 60%, rgba(255, 255, 255, 0.1) 100%),
          url('/hero_panoramic_travel.jpg')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'right center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        padding: '4.5rem 0 5.5rem 0'
      }}
      className="exact-hero-section"
    >
      {/* Script Text "More Than Just A Trip" in sky */}
      <div 
        style={{
          position: 'absolute',
          top: '2.5rem',
          right: '5%',
          fontFamily: "'Playfair Display', 'Brush Script MT', 'Caveat', cursive, serif",
          fontStyle: 'italic',
          fontSize: 'clamp(1.8rem, 3.2vw, 2.7rem)',
          fontWeight: 700,
          color: '#267b66',
          transform: 'rotate(-4deg)',
          pointerEvents: 'none',
          zIndex: 5,
          letterSpacing: '0.02em',
          textShadow: '0 2px 10px rgba(255, 255, 255, 0.8)'
        }}
        className="hidden-mobile"
      >
        More Than Just<br />&nbsp;&nbsp;&nbsp;A Trip
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div style={{ maxWidth: '640px' }}>
          {/* Top Label with horizontal flanking lines */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '1rem'
          }}>
            <span style={{ width: '28px', height: '2px', background: '#0d7857', display: 'inline-block' }} />
            <span style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#0d7857',
              fontFamily: "'Sora', sans-serif"
            }}>
              EXPLORE · TRAVEL · DISCOVER
            </span>
            <span style={{ width: '28px', height: '2px', background: '#0d7857', display: 'inline-block' }} />
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5.2vw, 3.9rem)',
            fontWeight: 800,
            lineHeight: 1.14,
            letterSpacing: '-0.025em',
            marginBottom: '1.25rem',
            fontFamily: "'Sora', sans-serif",
            color: '#15292b'
          }}>
            Your Trusted Partner for <br />
            <span style={{ color: '#0d7857' }}>
              Visa & Travel Solutions
            </span>
          </h1>

          {/* Subtitle Paragraph */}
          <p style={{
            fontSize: '1.05rem',
            lineHeight: 1.7,
            color: '#47635c',
            maxWidth: '540px',
            marginBottom: '2.25rem',
            fontFamily: "'Inter', sans-serif"
          }}>
            Directly from the desks of our Islamabad visa caseworkers. Stay informed on recent policy changes, financial rules, and consular trends.
          </p>

          {/* Action Pill Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
            {/* Primary Button */}
            <button
              type="button"
              onClick={onOpenEligibility}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#0d7857',
                color: '#ffffff',
                border: 'none',
                borderRadius: '9999px',
                padding: '0.85rem 1.85rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(13, 120, 87, 0.28)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                fontFamily: "'Inter', sans-serif"
              }}
              className="hero-btn-primary"
            >
              <Plane size={18} fill="currentColor" stroke="none" />
              <span>Get Visa Guidance</span>
              <ArrowRight size={16} />
            </button>

            {/* Secondary Button */}
            <button
              type="button"
              onClick={scrollToDestinations}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#ffffff',
                color: '#15292b',
                border: '1.5px solid #0d7857',
                borderRadius: '9999px',
                padding: '0.82rem 1.8rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                fontFamily: "'Inter', sans-serif"
              }}
              className="hero-btn-secondary"
            >
              <MapPin size={18} color="#0d7857" />
              <span>Explore Destinations</span>
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        .hero-btn-primary:hover {
          background: #095c42 !important;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(13, 120, 87, 0.38) !important;
        }
        .hero-btn-secondary:hover {
          background: #f0fdf4 !important;
          color: #0d7857 !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(13, 120, 87, 0.15) !important;
        }
        @media (max-width: 900px) {
          .exact-hero-section {
            background-image: 
              linear-gradient(180deg, rgba(240, 253, 248, 0.94) 0%, rgba(240, 253, 248, 0.96) 100%),
              url('/hero_panoramic_travel.jpg') !important;
            padding: 3.5rem 0 5rem 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
