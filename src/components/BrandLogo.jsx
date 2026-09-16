/**
 * Official BrandLogo Component for Al Arbab Travels.
 * Renders the authentic original logo:
 * Stylized white 'A' with dynamic red ascending aircraft and orbital flight loop,
 * paired with 'Al Arbab Travel PK' typography.
 */
export default function BrandLogo({ 
  variant = 'horizontal', 
  height = 42,
  showBadge = true,
  style = {}
}) {
  if (variant === 'mark') {
    return (
      <div 
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: `${height}px`,
          width: `${height * 1.15}px`,
          ...style 
        }}
        title="Al Arbab Travel PK"
      >
        <img 
          src="/logo_mark.svg" 
          alt="Al Arbab Travel PK Emblem" 
          width={Math.round(height * 1.15)}
          height={height}
          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
        />
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div 
        style={{ 
          display: 'inline-flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          ...style 
        }}
        title="Al Arbab Travel PK"
      >
        <img 
          src="/logo.svg" 
          alt="Al Arbab Travel PK Official Logo" 
          height={height}
          style={{ height: `${height}px`, width: 'auto', objectFit: 'contain', display: 'block' }}
        />
      </div>
    );
  }

  // Default: 'horizontal' (Emblem + Al Arbab Travel PK Typography)
  return (
    <div 
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '12px', 
        textDecoration: 'none',
        ...style 
      }}
      title="Al Arbab Travel PK"
    >
      {/* Official Emblem Mark */}
      <div style={{
        height: `${height}px`,
        width: `${height * 1.18}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <img 
          src="/logo_mark.svg" 
          alt="Al Arbab Travel Emblem" 
          width={Math.round(height * 1.18)}
          height={height}
          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
        />
      </div>

      {/* Official Typography */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span style={{
            fontFamily: "'Montserrat', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontSize: `${height * 0.42}px`,
            fontWeight: 800,
            letterSpacing: '0.02em',
            color: '#ffffff',
            whiteSpace: 'nowrap'
          }}>
            Al Arbab Travel
          </span>
          <span style={{
            fontFamily: "'Montserrat', 'Inter', sans-serif",
            fontSize: `${height * 0.22}px`,
            fontWeight: 800,
            color: '#e61e2b', // Brand Red
            marginLeft: '4px',
            transform: 'translateY(-2px)'
          }}>
            PK
          </span>
        </div>

        {showBadge && (
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: `${Math.max(9, height * 0.2)}px`,
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: '#eed88a', // Warm Gold Accent
            textTransform: 'uppercase',
            marginTop: '2px',
            opacity: 0.95
          }}>
            Islamabad
          </span>
        )}
      </div>
    </div>
  );
}
