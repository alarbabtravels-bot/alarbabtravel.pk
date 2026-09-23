import React from 'react';

// Country definitions with distinct color accents and national flags
export const row1Countries = [
  { id: 'thailand', name: 'Thailand', code: 'th', flag: '🇹🇭', color: '#0284c7', bg: '#e0f2fe' },
  { id: 'malaysia', name: 'Malaysia', code: 'my', flag: '🇲🇾', color: '#d97706', bg: '#fef3c7' },
  { id: 'singapore', name: 'Singapore', code: 'sg', flag: '🇸🇬', color: '#dc2626', bg: '#fee2e2' },
  { id: 'indonesia', name: 'Indonesia', code: 'id', flag: '🇮🇩', color: '#e11d48', bg: '#ffe4e6' },
  { id: 'bahrain', name: 'Bahrain', code: 'bh', flag: '🇧🇭', color: '#be123c', bg: '#ffe4e6' },
  { id: 'uae', name: 'UAE (Dubai)', code: 'ae', flag: '🇦🇪', color: '#059669', bg: '#d1fae5' },
  { id: 'saudi', name: 'Saudi Arabia', code: 'sa', flag: '🇸🇦', color: '#16a34a', bg: '#dcfce7' },
  { id: 'qatar', name: 'Qatar', code: 'qa', flag: '🇶🇦', color: '#881337', bg: '#fce7f3' },
  { id: 'turkey', name: 'Turkey', code: 'tr', flag: '🇹🇷', color: '#e11d48', bg: '#fee2e2' },
  { id: 'uk', name: 'United Kingdom', code: 'gb', flag: '🇬🇧', color: '#2563eb', bg: '#dbeafe' },
  { id: 'usa', name: 'United States', code: 'us', flag: '🇺🇸', color: '#1d4ed8', bg: '#eff6ff' },
  { id: 'germany', name: 'Germany', code: 'de', flag: '🇩🇪', color: '#ca8a04', bg: '#fef9c3' },
  { id: 'azerbaijan', name: 'Azerbaijan', code: 'az', flag: '🇦🇿', color: '#0891b2', bg: '#cffafe' }
];

export const row2Countries = [
  { id: 'nepal', name: 'Nepal', code: 'np', flag: '🇳🇵', color: '#dc2626', bg: '#fee2e2' },
  { id: 'sri-lanka', name: 'Sri Lanka', code: 'lk', flag: '🇱🇰', color: '#ea580c', bg: '#ffedd5' },
  { id: 'uzbekistan', name: 'Uzbekistan', code: 'uz', flag: '🇺🇿', color: '#0284c7', bg: '#e0f2fe' },
  { id: 'tajikistan', name: 'Tajikistan', code: 'tj', flag: '🇹🇯', color: '#10b981', bg: '#d1fae5' },
  { id: 'oman', name: 'Oman', code: 'om', flag: '🇴🇲', color: '#f97316', bg: '#ffedd5' },
  { id: 'canada', name: 'Canada', code: 'ca', flag: '🇨🇦', color: '#ef4444', bg: '#fee2e2' },
  { id: 'australia', name: 'Australia', code: 'au', flag: '🇦🇺', color: '#0284c7', bg: '#e0f2fe' },
  { id: 'france', name: 'France', code: 'fr', flag: '🇫🇷', color: '#4f46e5', bg: '#e0e7ff' },
  { id: 'italy', name: 'Italy', code: 'it', flag: '🇮🇹', color: '#15803d', bg: '#dcfce7' },
  { id: 'china', name: 'China', code: 'cn', flag: '🇨🇳', color: '#e11d48', bg: '#fee2e2' },
  { id: 'georgia', name: 'Georgia', code: 'ge', flag: '🇬🇪', color: '#dc2626', bg: '#fee2e2' },
  { id: 'japan', name: 'Japan', code: 'jp', flag: '🇯🇵', color: '#f43f5e', bg: '#ffe4e6' }
];

function PillBadge({ country, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(country.id)}
      className="country-pill-badge"
      title={`Check visa requirements & eligibility for ${country.name}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        padding: '0.62rem 1.45rem 0.62rem 0.72rem',
        background: '#ffffff',
        borderRadius: '9999px',
        border: '1.5px solid rgba(226, 232, 240, 0.95)',
        boxShadow: '0 6px 20px rgba(15, 31, 48, 0.08), 0 2px 6px rgba(15, 31, 48, 0.04)',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        userSelect: 'none',
        flexShrink: 0
      }}
    >
      {/* Icon: small colored circular accent with national flag inside */}
      <span
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          backgroundColor: country.bg,
          border: `2px solid ${country.color}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          boxShadow: `0 2px 8px ${country.color}33`,
          flexShrink: 0
        }}
      >
        <img
          src={`/flags/${country.code}.png`}
          alt={`${country.name} Flag`}
          width="24"
          height="16"
          loading="lazy"
          style={{
            width: '24px',
            height: '16px',
            objectFit: 'cover',
            borderRadius: '3px',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
            display: 'block'
          }}
          onError={(e) => {
            // Fallback to emoji if image fails
            e.currentTarget.style.display = 'none';
            if (e.currentTarget.parentNode) {
              e.currentTarget.parentNode.textContent = country.flag;
            }
          }}
        />
      </span>

      {/* Country Name */}
      <span
        style={{
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          fontWeight: 700,
          fontSize: '0.98rem',
          color: '#0f1f30',
          letterSpacing: '-0.015em'
        }}
      >
        {country.name}
      </span>
    </button>
  );
}

export default function CountryMarqueeStrip({ onCountrySelect }) {
  // Duplicate arrays once for continuous infinite loop without any visual jump
  const loopRow1 = [...row1Countries, ...row1Countries];
  const loopRow2 = [...row2Countries, ...row2Countries];

  return (
    <section
      aria-label="Popular Visa Destinations"
      className="country-marquee-section"
      style={{
        position: 'relative',
        background: '#ffffff',
        padding: '2.5rem 0 2.5rem 0',
        overflow: 'hidden',
        borderBottom: '1px solid #f1f5f9'
      }}
    >
      {/* Left gradient fade mask */}
      <div
        className="marquee-fade-left"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '140px',
          background: 'linear-gradient(to right, #ffffff 25%, rgba(255, 255, 255, 0) 100%)',
          zIndex: 10,
          pointerEvents: 'none'
        }}
      />

      {/* Right gradient fade mask */}
      <div
        className="marquee-fade-right"
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '140px',
          background: 'linear-gradient(to left, #ffffff 25%, rgba(255, 255, 255, 0) 100%)',
          zIndex: 10,
          pointerEvents: 'none'
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
        {/* ROW 1: Scrolling Right to Left */}
        <div className="marquee-row-wrapper">
          <div className="marquee-track marquee-scroll-left">
            {loopRow1.map((country, idx) => (
              <PillBadge
                key={`r1-${country.id}-${idx}`}
                country={country}
                onSelect={onCountrySelect}
              />
            ))}
          </div>
        </div>

        {/* ROW 2: Scrolling Left to Right (offset horizontally) */}
        <div className="marquee-row-wrapper" style={{ marginLeft: '-50px' }}>
          <div className="marquee-track marquee-scroll-right">
            {loopRow2.map((country, idx) => (
              <PillBadge
                key={`r2-${country.id}-${idx}`}
                country={country}
                onSelect={onCountrySelect}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
