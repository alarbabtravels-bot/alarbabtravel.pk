import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Compass, ShieldCheck, Sparkles, MessageCircle, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicHero({ onOpenEligibility }) {
  const containerRef = useRef(null);
  const pinTargetRef = useRef(null);
  const scene1Ref = useRef(null);
  const scene2Ref = useRef(null);
  const scene3Ref = useRef(null);
  const scene4Ref = useRef(null);
  const [activeScene, setActiveScene] = useState(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initialize states
      gsap.set([scene2Ref.current, scene3Ref.current, scene4Ref.current], { 
        autoAlpha: 0,
        y: 40,
        scale: 0.98
      });
      gsap.set(scene1Ref.current, { 
        autoAlpha: 1, 
        y: 0, 
        scale: 1 
      });

      // Master ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=3000',
          pin: pinTargetRef.current,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress < 0.25) {
              setActiveScene(1);
            } else if (progress >= 0.25 && progress < 0.55) {
              setActiveScene(2);
            } else if (progress >= 0.55 && progress < 0.85) {
              setActiveScene(3);
            } else {
              setActiveScene(4);
            }
          }
        }
      });

      // SCENE 1 -> SCENE 2
      tl.to(scene1Ref.current, {
        autoAlpha: 0,
        y: -50,
        scale: 1.05,
        duration: 1,
        ease: 'power2.inOut'
      })
      .to(scene2Ref.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power2.inOut'
      }, '-=0.5')

      // SCENE 2 -> SCENE 3
      .to(scene2Ref.current, {
        autoAlpha: 0,
        y: -50,
        scale: 1.05,
        duration: 1,
        ease: 'power2.inOut'
      }, '+=0.5')
      .to(scene3Ref.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power2.inOut'
      }, '-=0.5')

      // SCENE 3 -> SCENE 4
      .to(scene3Ref.current, {
        autoAlpha: 0,
        y: -50,
        scale: 1.05,
        duration: 1,
        ease: 'power2.inOut'
      }, '+=0.5')
      .to(scene4Ref.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power2.inOut'
      }, '-=0.5')
      .to({}, { duration: 0.5 }); // Buffer at end
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Jump to specific scene when chapter indicator is clicked
  const scrollToScene = (sceneIndex) => {
    if (!containerRef.current) return;
    const startY = containerRef.current.offsetTop;
    const scrollPositions = [0, 900, 1850, 2800];
    window.scrollTo({
      top: startY + scrollPositions[sceneIndex - 1],
      behavior: 'smooth'
    });
  };

  const handleScrollDown = () => {
    if (!containerRef.current) return;
    window.scrollTo({
      top: containerRef.current.offsetTop + 950,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'relative', 
        background: '#06080d',
        color: '#f8fafc'
      }}
    >
      {/* Pinned Viewport Container */}
      <div 
        ref={pinTargetRef}
        style={{
          height: '100vh',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* Atmospheric Dark Canvas Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 40%, rgba(18, 28, 48, 0.7) 0%, #06080d 80%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* Delicate Golden Radial Glow Ambient Spheres */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '650px',
          height: '450px',
          background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.12) 0%, rgba(212, 175, 55, 0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* Minimal Star Dust Overlay (Lightweight SVG) */}
        <svg 
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.35, pointerEvents: 'none', zIndex: 1 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12%" cy="18%" r="1" fill="#d4af37" opacity="0.6" />
          <circle cx="85%" cy="22%" r="1.5" fill="#f5e8c7" opacity="0.4" />
          <circle cx="70%" cy="75%" r="1" fill="#ffffff" opacity="0.5" />
          <circle cx="25%" cy="80%" r="1.2" fill="#d4af37" opacity="0.7" />
          <circle cx="92%" cy="60%" r="1" fill="#ffffff" opacity="0.3" />
          <circle cx="15%" cy="55%" r="1.5" fill="#f5e8c7" opacity="0.5" />
          <circle cx="48%" cy="15%" r="1" fill="#ffffff" opacity="0.4" />
        </svg>

        {/* Top Minimalist Header Tagline */}
        <div style={{
          position: 'absolute',
          top: '24px',
          left: '0',
          right: '0',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 2.5rem',
          fontSize: '0.74rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--text-dim)',
          fontFamily: 'var(--font-heading)'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold-400)' }} />
            33.7128° N, 73.0645° E • ISLAMABAD, PK
          </span>
          <span className="hidden-mobile">EST. 2012 • PREMIER TRAVEL ADVISORY</span>
          <span>GLOBAL IMMIGRATION CONCIERGE</span>
        </div>

        {/* =========================================================================
            SCENE 01: THE MONOLITH (HERO INTRO)
            ========================================================================= */}
        <div
          ref={scene1Ref}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 1.5rem'
          }}
        >
          {/* Subtitle pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.8rem',
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: 'var(--gold-300)',
            marginBottom: '1.25rem',
            padding: '6px 18px',
            borderRadius: '9999px',
            background: 'rgba(212, 175, 55, 0.08)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            backdropFilter: 'blur(10px)'
          }}>
            <Sparkles size={13} color="var(--gold-400)" />
            Where Your Journey Begins
          </div>

          {/* MONUMENTAL KINETIC HEADING */}
          <h1 style={{
            fontSize: 'clamp(3.6rem, 12vw, 9.8rem)',
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            margin: '0 0 1.25rem 0',
            fontFamily: 'var(--font-heading)',
            textTransform: 'uppercase',
            color: '#f8fafc',
            textShadow: '0 15px 50px rgba(0,0,0,0.8)'
          }}>
            AL ARBAB <br />
            <span style={{
              background: 'linear-gradient(180deg, #ffffff 30%, #d4af37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              TRAVELS
            </span>
          </h1>

          {/* Japanese-Minimalist Subtext */}
          <p style={{
            fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)',
            color: 'var(--text-muted)',
            maxWidth: '620px',
            lineHeight: 1.7,
            letterSpacing: '0.04em',
            margin: '0 auto 2.5rem auto',
            fontWeight: 400
          }}>
            Pakistan's high-discretion visa consultancy and private travel concierge. 
            Transforming complex embassy protocols into seamless global approvals.
          </p>

          {/* Quick CTA Actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <button 
              type="button" 
              className="btn-primary" 
              onClick={onOpenEligibility}
              style={{ padding: '0.9rem 2.2rem', fontSize: '0.92rem', letterSpacing: '0.06em' }}
            >
              Check Visa Eligibility <ArrowRight size={16} />
            </button>
            <a 
              href="https://wa.me/923099923232?text=Assalam%20o%20Alaikum,%20I%20would%20like%20to%20consult%20Al%20Arbab%20Travels." 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ padding: '0.9rem 2rem', fontSize: '0.92rem' }}
            >
              WhatsApp Concierge
            </a>
          </div>
        </div>

        {/* =========================================================================
            SCENE 02: SERVICES TEASER (PRECISION VISAS)
            ========================================================================= */}
        <div
          ref={scene2Ref}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 2rem'
          }}
        >
          <div style={{
            fontSize: '0.8rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--gold-400)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ width: '20px', height: '1px', background: 'var(--gold-400)' }} />
            CHAPTER II • THE CRAFT
            <span style={{ width: '20px', height: '1px', background: 'var(--gold-400)' }} />
          </div>

          <h2 style={{
            fontSize: 'clamp(2.8rem, 8.5vw, 6.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 0.98,
            marginBottom: '1.25rem',
            textTransform: 'uppercase'
          }}>
            PRECISION <span className="text-gold-gradient">VISAS</span>
          </h2>

          <p style={{
            fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            lineHeight: 1.7,
            marginBottom: '3rem'
          }}>
            Forensic bank statement auditing, verified flight reservations, and tailor-made cover letters that preempt entry clearance scrutiny.
          </p>

          {/* Minimal 4-Pillar Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            width: '100%',
            maxWidth: '920px',
            textAlign: 'left'
          }}>
            {[
              { num: "01", title: "Tourist & Visit", desc: "UK, Schengen, USA, Canada, UAE 5-Year" },
              { num: "02", title: "Study Permits", desc: "UK CAS, Canada SDS, Germany Blocked Accounts" },
              { num: "03", title: "Skilled & Migration", desc: "Germany Chancenkarte & Gulf Work Permits" },
              { num: "04", title: "Document Legalization", desc: "Fast-Track MOFA Islamabad & Embassy Stamping" }
            ].map((col, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(212, 175, 55, 0.18)',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  transition: 'border-color 0.3s ease'
                }}
              >
                <div style={{ color: 'var(--gold-400)', fontSize: '0.85rem', fontWeight: 800, marginBottom: '6px' }}>
                  {col.num}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.98rem', marginBottom: '4px', color: '#ffffff' }}>
                  {col.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {col.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            SCENE 03: DESTINATIONS TEASER (GLOBAL REACH)
            ========================================================================= */}
        <div
          ref={scene3Ref}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 2rem'
          }}
        >
          <div style={{
            fontSize: '0.8rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--gold-400)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ width: '20px', height: '1px', background: 'var(--gold-400)' }} />
            CHAPTER III • THE HORIZON
            <span style={{ width: '20px', height: '1px', background: 'var(--gold-400)' }} />
          </div>

          <h2 style={{
            fontSize: 'clamp(2.8rem, 8.5vw, 6.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 0.98,
            marginBottom: '1.25rem',
            textTransform: 'uppercase'
          }}>
            GLOBAL <span className="text-gold-gradient">REACH</span>
          </h2>

          <p style={{
            fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            lineHeight: 1.7,
            marginBottom: '2.5rem'
          }}>
            Facilitating travel across 50+ sovereign territories. From London and Paris to Toronto and Dubai.
          </p>

          {/* Territory Badges & Coordinates */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
            maxWidth: '780px',
            marginBottom: '2rem'
          }}>
            {[
              { flag: "🇬🇧", name: "United Kingdom", days: "18 Days" },
              { flag: "🇪🇺", name: "Schengen 29 States", days: "20 Days" },
              { flag: "🇺🇸", name: "United States (B1/B2)", days: "5-Yr Multiple" },
              { flag: "🇨🇦", name: "Canada (TRV / SDS)", days: "4-6 Weeks" },
              { flag: "🇦🇪", name: "Dubai & UAE", days: "24 Hours" },
              { flag: "🇹🇷", name: "Turkey (Sticker & eVisa)", days: "10 Days" }
            ].map((item, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '9999px',
                  padding: '8px 18px',
                  fontSize: '0.85rem'
                }}
              >
                <span style={{ fontSize: '1.15rem' }}>{item.flag}</span>
                <span style={{ fontWeight: 600, color: '#ffffff' }}>{item.name}</span>
                <span style={{ color: 'var(--gold-400)', fontSize: '0.75rem', fontWeight: 700 }}>• {item.days}</span>
              </div>
            ))}
          </div>

          <div style={{
            fontSize: '0.82rem',
            color: 'var(--text-dim)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase'
          }}>
            LONDON • PARIS • BERLIN • NEW YORK • TORONTO • DUBAI • KUALA LUMPUR
          </div>
        </div>

        {/* =========================================================================
            SCENE 04: THE ARRIVAL / CTA
            ========================================================================= */}
        <div
          ref={scene4Ref}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 2rem'
          }}
        >
          <div style={{
            fontSize: '0.8rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--gold-400)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ width: '20px', height: '1px', background: 'var(--gold-400)' }} />
            CHAPTER IV • THE ARRIVAL
            <span style={{ width: '20px', height: '1px', background: 'var(--gold-400)' }} />
          </div>

          <h2 style={{
            fontSize: 'clamp(2.8rem, 8.5vw, 6.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 0.98,
            marginBottom: '1.25rem',
            textTransform: 'uppercase'
          }}>
            COMMENCE <span className="text-gold-gradient">YOUR JOURNEY</span>
          </h2>

          <p style={{
            fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)',
            color: 'var(--text-secondary)',
            maxWidth: '620px',
            lineHeight: 1.7,
            marginBottom: '2.5rem'
          }}>
            Whether applying for the first time or overturning a past refusal, our senior caseworkers in Blue Area, Islamabad are ready to evaluate your profile.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', justifyContent: 'center' }}>
            <button 
              type="button" 
              className="btn-primary" 
              onClick={onOpenEligibility}
              style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}
            >
              Launch Visa Assessment <ArrowRight size={18} />
            </button>
            <a 
              href="https://wa.me/923099923232?text=Assalam%20o%20Alaikum,%20I%20would%20like%20to%20discuss%20my%20visa%20case%20with%20Al%20Arbab%20Travels." 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ padding: '1rem 2.25rem', fontSize: '1rem' }}
            >
              <MessageCircle size={18} /> Direct WhatsApp Chat
            </a>
          </div>

          <div style={{ marginTop: '2rem', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
            ↓ Scroll further down for detailed agency credentials, testimonials & FAQ
          </div>
        </div>

        {/* =========================================================================
            NUMBERED SCENE CHAPTER INDICATORS (01, 02, 03, 04)
            ========================================================================= */}
        <div style={{
          position: 'absolute',
          left: '2.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}
        className="hidden-mobile"
        >
          {[
            { num: "01", label: "Intro" },
            { num: "02", label: "Craft" },
            { num: "03", label: "Reach" },
            { num: "04", label: "Launch" }
          ].map((ch, idx) => {
            const isActive = activeScene === idx + 1;
            return (
              <button
                key={ch.num}
                type="button"
                onClick={() => scrollToScene(idx + 1)}
                aria-label={`Jump to Scene ${ch.num}: ${ch.label}`}
                style={{
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  padding: '4px 0',
                  color: isActive ? 'var(--gold-400)' : 'var(--text-dim)',
                  transition: 'all 0.3s ease',
                  textAlign: 'left'
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 800 : 500,
                  letterSpacing: '0.05em'
                }}>
                  {ch.num}
                </span>
                <span style={{
                  width: isActive ? '28px' : '10px',
                  height: '1.5px',
                  background: isActive ? 'var(--gold-400)' : 'rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease'
                }} />
                <span style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateX(0)' : 'translateX(-5px)',
                  transition: 'all 0.3s ease',
                  fontWeight: 600
                }}>
                  {ch.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Floating Scroll Indicator Arrow at Bottom */}
        <div 
          onClick={handleScrollDown}
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            opacity: activeScene === 4 ? 0.3 : 0.85,
            transition: 'opacity 0.3s ease'
          }}
        >
          <span style={{
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--text-dim)',
            fontWeight: 600
          }}>
            SCROLL TO EXPLORE
          </span>
          <div style={{
            width: '1px',
            height: '22px',
            background: 'linear-gradient(180deg, var(--gold-400), transparent)',
            animation: 'scrollPulse 2s infinite ease-in-out'
          }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(0.4); opacity: 0.3; }
          50% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
