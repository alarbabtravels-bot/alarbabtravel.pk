import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * QuickFeatureBar: Fast, minimal scannable trust/quick-navigation strip.
 * Strictly 1-2 word labels + icons that link directly to matching service pillars.
 * Zero duplicate descriptions to ensure clean visual hierarchy and SEO hygiene.
 */
export default function QuickFeatureBar({ onOpenEligibility }) {
  const quickNavItems = [
    {
      id: 'flights',
      title: 'Flights',
      link: '/services/flights',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
        </svg>
      )
    },
    {
      id: 'umrah',
      title: 'Umrah & Hajj',
      link: '/services/umrah-hajj',
      icon: (
        /* Kaaba / Mosque Courtyard */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 10h16v11H4z" />
          <path d="M4 14h16" />
          <path d="M8 10V6a4 4 0 0 1 8 0v4" />
          <path d="M12 2v4" />
          <circle cx="12" cy="18" r="1.5" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'hotels',
      title: 'Hotels',
      link: '/services/hotel-booking',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 22v-6.57a2 2 0 0 1 4 0V22" />
          <path d="M18 2h-4a2 2 0 0 0-2 2v4" />
          <rect width="16" height="20" x="4" y="2" rx="2" />
          <path d="M8 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
        </svg>
      )
    },
    {
      id: 'visas',
      title: 'Visas',
      link: '/services/visa-services',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    },
    {
      id: 'tours',
      title: 'Holiday Tours',
      link: '/services/group-corporate-travel',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      )
    },
    {
      id: 'support',
      title: '24/7 Support',
      href: 'https://wa.me/923099923232?text=Assalam%20o%20Alaikum,%20I%20need%20assistance%20from%20Al%20Arbab%20Travels.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      )
    }
  ];

  return (
    <section 
      aria-label="Quick Service Navigation"
      style={{
        width: '100%',
        background: 'rgba(7, 10, 17, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0.85rem 0',
        position: 'relative',
        zIndex: 20
      }}
    >
      <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.25rem' }}>
        <nav 
          aria-label="Quick Travel Pillars"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '0.85rem',
            alignItems: 'center'
          }}
          className="quick-nav-grid"
        >
          {quickNavItems.map((item) => {
            const itemInner = (
              <div 
                className="quick-nav-pill"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '0.65rem 0.95rem',
                  borderRadius: '9999px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  color: '#ffffff',
                  cursor: 'pointer'
                }}
              >
                {/* Compact Glowing Icon Pod */}
                <div 
                  className="quick-nav-icon"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(0, 168, 255, 0.12)',
                    border: '1px solid rgba(0, 168, 255, 0.35)',
                    boxShadow: '0 0 12px rgba(0, 168, 255, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#38bdf8',
                    flexShrink: 0,
                    transition: 'all 0.25s ease'
                  }}
                >
                  {item.icon}
                </div>

                {/* Single / Two Word Clean Label */}
                <span style={{
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: '#f1f5f9',
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.01em'
                }} className="quick-nav-label">
                  {item.title}
                </span>

                {/* Subtle Indicator Arrow */}
                <ChevronRight 
                  size={14} 
                  className="quick-nav-arrow"
                  style={{ 
                    marginLeft: 'auto', 
                    color: '#94a3b8', 
                    opacity: 0.6,
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }} 
                />
              </div>
            );

            if (item.href) {
              return (
                <a 
                  key={item.id} 
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ textDecoration: 'none' }}
                  title={`${item.title} - Contact Al Arbab Travels Concierge`}
                >
                  {itemInner}
                </a>
              );
            }

            return (
              <Link 
                key={item.id} 
                to={item.link} 
                style={{ textDecoration: 'none' }}
                title={`Explore ${item.title} at Al Arbab Travels`}
              >
                {itemInner}
              </Link>
            );
          })}
        </nav>
      </div>

      <style>{`
        .quick-nav-pill:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(56, 189, 248, 0.45) !important;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.4), 0 0 16px rgba(56, 189, 248, 0.25) !important;
          transform: translateY(-2px);
        }
        .quick-nav-pill:hover .quick-nav-icon {
          background: rgba(238, 216, 138, 0.2) !important;
          border-color: rgba(238, 216, 138, 0.6) !important;
          color: #eed88a !important;
          box-shadow: 0 0 16px rgba(238, 216, 138, 0.4) !important;
        }
        .quick-nav-pill:hover .quick-nav-label {
          color: #ffffff !important;
        }
        .quick-nav-pill:hover .quick-nav-arrow {
          color: #eed88a !important;
          opacity: 1 !important;
          transform: translateX(3px);
        }

        @media (max-width: 1100px) {
          .quick-nav-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 0.75rem !important;
          }
        }
        @media (max-width: 640px) {
          .quick-nav-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.65rem !important;
          }
          .quick-nav-pill {
            padding: 0.55rem 0.75rem !important;
          }
        }
      `}</style>
    </section>
  );
}
