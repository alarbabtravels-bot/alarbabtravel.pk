import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, ArrowUpRight } from 'lucide-react';

function DestinationCardItem({ dest, onCardHoverChange }) {
  const cardRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    // Normalized offset from center: -0.5 to +0.5
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;

    // Smooth subtle parallax shift (14px max)
    const maxShift = 14;
    setOffset({
      x: normX * maxShift,
      y: normY * maxShift
    });
  };

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    handleMouseMove(e);
    onCardHoverChange(true, dest.title);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
    onCardHoverChange(false, '');
  };

  return (
    <Link
      ref={cardRef}
      to={dest.link}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="destination-card-item premium-hover-card"
      style={{
        position: 'relative',
        height: '290px',
        borderRadius: '16px',
        overflow: 'hidden',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '1.25rem 1rem',
        boxShadow: isHovered
          ? '0 20px 42px rgba(15, 32, 55, 0.25)'
          : '0 8px 22px rgba(15, 32, 55, 0.14)',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1), box-shadow 0.35s ease',
        cursor: 'pointer'
      }}
    >
      {/* Background Image with Parallax Slide / Drift */}
      <img
        src={dest.image}
        alt={`${dest.title} Visit Visa & Tour Packages Islamabad - Al Arbab Travels`}
        loading="lazy"
        decoding="async"
        width="240"
        height="290"
        className="dest-card-img"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: isHovered
            ? `scale(1.10) translate3d(${offset.x}px, ${offset.y}px, 0)`
            : 'scale(1) translate3d(0px, 0px, 0)',
          transition: isHovered
            ? 'transform 0.12s ease-out'
            : 'transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1)',
          willChange: 'transform'
        }}
      />

      {/* Dark gradient overlay for text readability, smoothly deepens on hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 25%, rgba(6, 20, 36, 0.72) 70%, rgba(6, 20, 36, 0.95) 100%)',
          opacity: isHovered ? 0.95 : 0.82,
          transition: 'opacity 0.35s ease',
          pointerEvents: 'none'
        }}
      />

      {/* Top-left status badge */}
      <div
        style={{
          position: 'absolute',
          top: '0.75rem',
          left: '0.75rem',
          zIndex: 2,
          background: dest.badgeColor,
          color: '#ffffff',
          fontSize: '0.62rem',
          fontWeight: 700,
          letterSpacing: '0.02em',
          padding: '4px 9px',
          borderRadius: '9999px',
          boxShadow: `0 4px 10px ${dest.badgeColor}66`,
          whiteSpace: 'nowrap',
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'translateY(-1px)' : 'none'
        }}
      >
        {dest.badge}
      </div>

      {/* Card Content Footer */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.2rem',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.2
            }}
          >
            {dest.title}
          </h3>
          <p style={{ fontSize: '0.74rem', color: '#dbe8f3', margin: '2px 0 4px 0' }}>
            {dest.subtitle}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Star size={12} fill="#eeb42b" color="#eeb42b" />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#ffffff' }}>
              {dest.rating}
            </span>
          </div>
        </div>

        {/* Small circle icon button */}
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: isHovered ? '#0b6fce' : 'rgba(255, 255, 255, 0.2)',
            border: isHovered ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            flexShrink: 0,
            transform: isHovered ? 'scale(1.1) rotate(-15deg)' : 'scale(1)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {isHovered ? <ArrowUpRight size={15} /> : <ArrowRight size={14} />}
        </div>
      </div>
    </Link>
  );
}

export default function InteractiveDestinationCards({ destinations }) {
  const sectionRef = useRef(null);
  const cursorRef = useRef(null);

  // Position coordinates for smooth lerping
  const targetPos = useRef({ x: -200, y: -200 });
  const currentPos = useRef({ x: -200, y: -200 });
  const animFrameId = useRef(null);

  const [cursorVisible, setCursorVisible] = useState(false);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  // Detect pointer device (mouse / trackpad)
  useEffect(() => {
    const checkPointer = () => {
      // Primary check: fine pointer (mouse/trackpad)
      const hasFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
      // Secondary check: can hover
      const canHover = window.matchMedia && window.matchMedia('(hover: hover)').matches;
      return hasFinePointer || canHover;
    };
    setIsPointerDevice(checkPointer());
  }, []);

  // Butter-smooth spring / lerp animation loop for the trailing cursor
  const updateCursor = useCallback(() => {
    if (isPointerDevice) {
      const lerpFactor = 0.2;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpFactor;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }
    }
    animFrameId.current = requestAnimationFrame(updateCursor);
  }, [isPointerDevice]);

  useEffect(() => {
    if (!isPointerDevice) return;
    animFrameId.current = requestAnimationFrame(updateCursor);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [updateCursor, isPointerDevice]);

  // Global mousemove handler to seamlessly track within the destinations section
  useEffect(() => {
    if (!isPointerDevice) return;

    const onMouseMove = (e) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Check if mouse is inside the destinations section
        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (isInside) {
          if (!cursorVisible) setCursorVisible(true);
        } else {
          if (cursorVisible) {
            setCursorVisible(false);
            setIsHoveringCard(false);
          }
        }
      }
    };

    const onMouseLeaveDoc = () => {
      setCursorVisible(false);
      setIsHoveringCard(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeaveDoc);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeaveDoc);
    };
  }, [isPointerDevice, cursorVisible]);

  const handleCardHoverChange = (hovered) => {
    setIsHoveringCard(hovered);
  };

  return (
    <div
      ref={sectionRef}
      className={`interactive-destinations-wrapper ${isPointerDevice ? 'has-custom-cursor' : ''}`}
      style={{ position: 'relative' }}
    >
      {/* Custom Trailing Circular Cursor (desktop / pointer only) */}
      {isPointerDevice && (
        <div
          ref={cursorRef}
          className="custom-destination-cursor"
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 99999,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            opacity: cursorVisible ? 1 : 0,
            visibility: cursorVisible ? 'visible' : 'hidden',
            width: isHoveringCard ? '74px' : '14px',
            height: isHoveringCard ? '74px' : '14px',
            backgroundColor: isHoveringCard ? '#0b6fce' : '#0b6fce',
            boxShadow: isHoveringCard
              ? '0 14px 34px rgba(11, 111, 206, 0.45), 0 0 0 2.5px rgba(255, 255, 255, 0.7)'
              : '0 3px 10px rgba(11, 111, 206, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.85)',
            transition:
              'width 0.32s cubic-bezier(0.16, 1, 0.3, 1), height 0.32s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, opacity 0.25s ease, box-shadow 0.3s ease',
            color: '#ffffff',
            transformOrigin: 'center center',
            overflow: 'hidden'
          }}
        >
          {/* Label visible inside circle when hovering a card */}
          <div
            style={{
              opacity: isHoveringCard ? 1 : 0,
              transform: isHoveringCard ? 'scale(1)' : 'scale(0.4)',
              transition: 'opacity 0.22s ease, transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              textAlign: 'center',
              userSelect: 'none'
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.7rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                lineHeight: 1
              }}
            >
              Explore
            </span>
            <ArrowUpRight size={13} strokeWidth={2.8} />
          </div>
        </div>
      )}

      {/* Destination Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '1rem'
        }}
        className="destinations-cards-row"
      >
        {destinations.map((dest) => (
          <DestinationCardItem
            key={dest.id}
            dest={dest}
            onCardHoverChange={handleCardHoverChange}
          />
        ))}
      </div>
    </div>
  );
}
