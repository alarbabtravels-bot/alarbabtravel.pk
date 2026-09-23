/**
 * Official BrandLogo Component for Al Arbab Travels.
 * Renders the authentic original logo:
 * Stylized white 'A' with dynamic red ascending aircraft and orbital flight loop,
 * paired with 'Al Arbab Travel PK' typography.
 *
 * `light` renders the wordmark in dark navy for use on white/light backgrounds
 * (e.g. the light-theme Navbar/Footer) instead of the default white wordmark
 * used on dark backgrounds. The emblem itself always keeps the same dark
 * circular badge behind it (matching the Navbar) so the white mark stays
 * crisp and visible on any background.
 */
export default function BrandLogo({
  variant = 'horizontal',
  height = 42,
  showBadge = true,
  light = false,
  style = {}
}) {
  const textColor = light ? '#0b1c2c' : '#ffffff';
  const badgeColor = light ? '#0284c7' : '#eed88a';

  if (variant === 'mark') {
    return (
      <div
        style={{
          height: `${height}px`,
          width: `${height}px`,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 35%, #181c24 0%, #080a0e 100%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${height * 0.12}px`,
          boxSizing: 'border-box',
          ...style
        }}
        title="Al Arbab Travel PK"
      >
        <img
          src="/logo_mark.svg"
          alt="Al Arbab Travel PK Emblem"
          width={Math.round(height * 0.8)}
          height={Math.round(height * 0.68)}
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
      {/* Official Emblem Mark — dark circular badge (matches Navbar) so the
          white mark stays crisp on both dark and light backgrounds */}
      <div style={{
        height: `${height}px`,
        width: `${height}px`,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 40% 35%, #181c24 0%, #080a0e 100%)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        padding: `${height * 0.12}px`,
        boxSizing: 'border-box'
      }}>
        <img
          src="/logo_mark.svg"
          alt="Al Arbab Travel Emblem"
          width={Math.round(height * 0.8)}
          height={Math.round(height * 0.68)}
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
            color: textColor,
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
            color: badgeColor,
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
