import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plane, ArrowRight, ShieldCheck, Hotel, Users, 
  Phone, MessageSquare, ChevronRight, Building2,
  Compass, FileCheck, Award, CheckCircle2, Sparkles
} from 'lucide-react';
import SEO from '../components/SEO';
import LandingHero from '../components/LandingHero';
import QuickFeatureBar from '../components/QuickFeatureBar';

export default function Home({ onOpenEligibility }) {
  // Top Featured Destinations
  const popularDestinations = [
    {
      id: 'malaysia',
      title: 'Malaysia',
      subtitle: '30-Day eVisa & Employment Pass Support · Full Assistance',
      image: '/dest_malaysia.webp',
      link: '/destinations/malaysia'
    },
    {
      id: 'thailand',
      title: 'Thailand',
      subtitle: '60-Day Tourist eVisa & DTV Nomad Support · Full Assistance',
      image: '/dest_thailand.webp',
      link: '/destinations/thailand'
    },
    {
      id: 'singapore',
      title: 'Singapore',
      subtitle: 'Electronic Visit Visa & Family Holiday Entry · Full Assistance',
      image: '/dest_singapore.webp',
      link: '/destinations/singapore'
    },
    {
      id: 'indonesia',
      title: 'Indonesia',
      subtitle: 'Bali Electronic Visa on Arrival (e-VoA) · Full Assistance',
      image: '/dest_indonesia.webp',
      link: '/destinations/indonesia'
    },
    {
      id: 'umrah',
      title: 'Saudi Arabia',
      subtitle: 'Nusuk Umrah Packages & Electronic Visas · Full Service',
      image: '/dest_makkah.webp',
      link: '/destinations/saudi-arabia'
    },
    {
      id: 'turkey',
      title: 'Turkey',
      subtitle: 'Sticker Visa Dossier & Transit e-Visa · File Prep & Support',
      image: '/dest_turkey.webp',
      link: '/destinations/turkey'
    }
  ];

  // 6 Value-Led Distinct Pillars for Section 2 (Unique Content & Benefit-Led Copy)
  const detailedServices = [
    {
      id: 'visa-consultancy',
      slug: 'visa-services',
      category: 'IMMIGRATION & PERMITS',
      title: 'Work Visas & Global Visa Consultancy',
      badge: 'Asian Processing · Schengen/USA File Prep',
      badgeColor: '#eed88a',
      badgeBg: 'rgba(238, 216, 138, 0.12)',
      badgeBorder: 'rgba(238, 216, 138, 0.35)',
      highlights: ['Asian Visit Visas (Full Service)', 'Overseas Work Visa Advisory', 'Schengen File Preparation Only', 'USA DS-160 & Interview Prep', 'Blue Area In-Person Desk'],
      description: 'Complete visa filing assistance for Malaysia, UAE, and Thailand visit visas alongside overseas employment file advisory. For European Schengen and USA B1/B2 visas, we provide professional file preparation only—covering document checklists, DS-160 drafting, financial presentation, and embassy interview coaching without false approval guarantees.',
      actionText: 'Check Visa Requirements',
      isHero: true,
      gridSpan: 'hero-card-1',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    },
    {
      id: 'hajj-umrah',
      slug: 'umrah-hajj',
      category: 'SACRED PILGRIMAGES',
      title: 'Hajj & Umrah Pilgrimage Packages',
      badge: 'Full Umrah Package & Visa Processing',
      badgeColor: '#34d399',
      badgeBg: 'rgba(52, 211, 153, 0.12)',
      badgeBorder: 'rgba(52, 211, 153, 0.35)',
      highlights: ['Makkah Clock Tower Hotels', 'Madinah Courtyard Properties', 'Haramain High-Speed Train', 'Direct Jeddah & Madinah Flights'],
      description: 'End-to-end Umrah arrangements featuring official Nusuk visa processing, verified 3-star to 5-star hotel vouchers within walking distance of the Harams, high-speed rail bookings, and reliable ground transportation.',
      actionText: 'Explore Umrah Packages',
      isHero: true,
      gridSpan: 'hero-card-2',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#eed88a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 10h16v11H4z" />
          <path d="M4 14h16" />
          <path d="M8 10V6a4 4 0 0 1 8 0v4" />
          <path d="M12 2v4" />
          <circle cx="12" cy="18" r="1.5" fill="#eed88a" />
        </svg>
      )
    },
    {
      id: 'flights-ticketing',
      slug: 'flights',
      category: 'AIR TICKETING',
      title: 'Flights & Global Route Management',
      badge: 'Full Air Ticketing Service',
      badgeColor: '#38bdf8',
      badgeBg: 'rgba(56, 189, 248, 0.12)',
      badgeBorder: 'rgba(56, 189, 248, 0.35)',
      highlights: ['PIA, Saudia, Emirates & Qatar', 'Real-Time GDS Seat Allocation', 'Flexible Reissue Assistance', 'Direct WhatsApp Fare Support'],
      description: 'Comprehensive domestic and international flight reservation service. We search global distribution systems for optimized routings, transparent baggage allowances, urgent date reissues, and tailored corporate itineraries.',
      actionText: 'Find Route Fares',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
        </svg>
      )
    },
    {
      id: 'hotel-accommodations',
      slug: 'hotel-booking',
      category: 'HOSPITALITY',
      title: 'Hotel & Accommodation Booking',
      badge: 'Embassy-Compliant Reservations',
      badgeColor: '#eed88a',
      badgeBg: 'rgba(238, 216, 138, 0.12)',
      badgeBorder: 'rgba(238, 216, 138, 0.35)',
      highlights: ['Confirmed Hotel Vouchers', 'Embassy-Acceptable Bookings', 'Budget to 5-Star Properties', 'Dubai, London, Istanbul & Saudi'],
      description: 'Hotel reservations with verified confirmation vouchers suitable for visa submissions and personal travel, securing competitive wholesale rates across major destinations including Saudi Arabia, UAE, Turkey, and Europe.',
      actionText: 'Browse Accommodations',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#eed88a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 22v-6.57a2 2 0 0 1 4 0V22" />
          <path d="M18 2h-4a2 2 0 0 0-2 2v4" />
          <rect width="16" height="20" x="4" y="2" rx="2" />
          <path d="M8 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
        </svg>
      )
    },
    {
      id: 'corporate-group',
      slug: 'group-corporate-travel',
      category: 'EXECUTIVE TOURS',
      title: 'Group & Corporate Travel',
      badge: 'Curated International Packages',
      badgeColor: '#c084fc',
      badgeBg: 'rgba(192, 132, 252, 0.12)',
      badgeBorder: 'rgba(192, 132, 252, 0.35)',
      highlights: ['Custom Family Holiday Itineraries', 'Corporate Delegation Logistics', 'Private Airport & Intercity Coaches', 'Dedicated Travel Coordinator'],
      description: 'Custom-tailored international tour packages and group logistics for corporate delegations, conferences, trade exhibitions, and family vacations with coordinated flights, accommodations, and guided excursions.',
      actionText: 'Plan Group Tour',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      id: 'insurance-compliance',
      slug: 'travel-insurance',
      category: 'DOCUMENT CARE',
      title: 'Travel Insurance & Support',
      badge: 'Statutory Travel Protection',
      badgeColor: '#2dd4bf',
      badgeBg: 'rgba(45, 212, 191, 0.12)',
      badgeBorder: 'rgba(45, 212, 191, 0.35)',
      highlights: ['€30,000+ Schengen Medical Cover', 'Instant Policy Issuance', 'COVID-19 & Repatriation Included', 'Diplomatic Enclave Proximity'],
      description: 'Embassy-approved international medical travel insurance with mandatory €30,000 / $50,000 coverage issued instantly. Our Blue Area office also assists travelers with document attestation guidance for diplomatic submissions.',
      actionText: 'Verify Insurance & Docs',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    }
  ];

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Al Arbab Travels",
    "url": "https://alarbabtravel.pk/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://alarbabtravel.pk/destinations?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <SEO 
        title="Al Arbab Travels (Pvt) Ltd | Premier Visa & Travel Agency Islamabad"
        description="Al Arbab Travels is Pakistan's premier visa consultancy and travel agency in Islamabad. Verified Umrah packages, worldwide visit visas, and air ticketing."
        keywords="Al Arbab Travels, air tickets Pakistan, Umrah packages Islamabad, visa assistance Islamabad, travel agency Islamabad, domestic flights Pakistan"
        canonicalPath="/"
        schema={websiteSchema}
      />

      <main style={{ width: '100%', overflow: 'hidden' }}>
        {/* =========================================================================
            1. HERO SECTION (Exact Reference Mockup)
            ========================================================================= */}
        <LandingHero onOpenEligibility={onOpenEligibility} />

        {/* =========================================================================
            2. 6-CARD FLOATING QUICK FEATURE BAR
            ========================================================================= */}
        <QuickFeatureBar onOpenEligibility={onOpenEligibility} />

        {/* =========================================================================
            3. POPULAR DESTINATIONS SECTION (Exact Mockup Match)
            ========================================================================= */}
        <section 
          id="popular-destinations" 
          style={{ 
            padding: '4.5rem 0',
            background: 'rgba(6, 8, 14, 0.55)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.25rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '300px 1fr',
              gap: '2.5rem',
              alignItems: 'center'
            }} className="destinations-layout-grid">
              
              {/* Left Column: Heading & Action */}
              <div>
                <div style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#38bdf8',
                  marginBottom: '0.5rem',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  EXPLORE THE WORLD
                </div>

                <h2 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2rem, 3.2vw, 2.6rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.15,
                  margin: '0 0 1rem 0'
                }}>
                  Popular Destinations
                </h2>

                <p style={{
                  fontSize: '0.94rem',
                  color: '#cbd5e1',
                  lineHeight: 1.65,
                  marginBottom: '2rem',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  From spiritual journeys to dream vacations, we help you explore the world with ease and comfort.
                </p>

                <Link
                  to="/destinations"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1.5px solid rgba(56, 189, 248, 0.4)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    borderRadius: '9999px',
                    padding: '0.75rem 1.65rem',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                    transition: 'all 0.2s ease',
                    fontFamily: "'Inter', sans-serif"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#00a8ff';
                    e.currentTarget.style.borderColor = '#00a8ff';
                    e.currentTarget.style.boxShadow = '0 0 24px rgba(0, 168, 255, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <span>View All Destinations</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Right Column: 6 Tall Rounded Destination Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '0.85rem'
              }} className="destinations-cards-row">
                {popularDestinations.map((dest) => (
                  <Link
                    key={dest.id}
                    to={dest.link}
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
                      boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                    className="destination-card-item"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.16)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.08)';
                    }}
                  >
                    {/* Background Image */}
                    <img
                      src={dest.image}
                      alt={dest.title}
                      loading="lazy"
                      decoding="async"
                      width="240"
                      height="290"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                      className="dest-card-img"
                    />

                    {/* Gradient Overlay for Legibility */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(6, 35, 27, 0.85) 100%)',
                      pointerEvents: 'none'
                    }} />

                    {/* Card Content & Circular Arrow Action */}
                    <div style={{
                      position: 'relative',
                      zIndex: 2,
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      width: '100%'
                    }}>
                      <div>
                        <h3 style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: '1.2rem',
                          fontWeight: 700,
                          color: '#ffffff',
                          margin: 0,
                          lineHeight: 1.2
                        }}>
                          {dest.title}
                        </h3>
                        <p style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.74rem',
                          color: '#d1e5dd',
                          margin: '2px 0 0 0'
                        }}>
                          {dest.subtitle}
                        </p>
                      </div>

                      {/* Circular Dark Arrow Button */}
                      <div style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        background: 'rgba(0, 0, 0, 0.45)',
                        border: '1px solid rgba(255, 255, 255, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        flexShrink: 0,
                        transition: 'background 0.2s ease'
                      }}>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. "OUR SERVICES" - COMPLETE TRAVEL SOLUTIONS UNDER ONE ROOF (BENTO GRID)
            ========================================================================= */}
        <section 
          id="services-directory"
          style={{
            background: 'linear-gradient(180deg, #04060a 0%, #080c14 50%, #04060a 100%)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '5.5rem 0',
            color: '#ffffff',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div style={{
            position: 'absolute',
            top: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            height: '450px',
            background: 'radial-gradient(ellipse at center, rgba(0, 168, 255, 0.07) 0%, rgba(238, 216, 138, 0.03) 50%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0
          }} />

          <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.25rem', position: 'relative', zIndex: 1 }}>
            
            {/* Top Row: Section Header & Signature Gold Calligraphy Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '2rem',
              marginBottom: '2.75rem'
            }} className="services-header-row">
              <div style={{ maxWidth: '720px' }}>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#38bdf8',
                  marginBottom: '0.75rem',
                  fontFamily: "'Inter', sans-serif",
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Sparkles size={14} color="#eed88a" />
                  <span>OUR COMPREHENSIVE EXPERTISE</span>
                </div>

                <h2 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2.1rem, 3.2vw, 2.8rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.15,
                  margin: '0 0 0.85rem 0'
                }}>
                  Complete Travel Solutions Under One Roof
                </h2>

                <p style={{
                  fontSize: '0.96rem',
                  color: '#cbd5e1',
                  lineHeight: 1.65,
                  margin: 0,
                  fontFamily: "'Inter', sans-serif"
                }}>
                  From full-assistance Asian visit visas and complete Umrah pilgrimages to worldwide flight ticketing and expert Schengen &amp; USA file preparation, our senior consultants in Blue Area Islamabad handle every detail with meticulous care.
                </p>
              </div>

              {/* Right Side: Calligraphy Signature Badge & All Services Button */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                flexWrap: 'wrap'
              }} className="services-header-actions">
                {/* Signature Gold Calligraphy Quote */}
                <div style={{
                  fontFamily: "'Caveat', 'Alex Brush', cursive",
                  color: '#eed88a',
                  lineHeight: 1.1,
                  transform: 'rotate(-3deg)',
                  textAlign: 'center',
                  padding: '0 0.5rem'
                }}>
                  <div style={{ fontSize: '1.85rem', fontWeight: 700, letterSpacing: '0.02em' }}>
                    Travel More
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f5e29f', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    <span>Worry Less</span>
                    <Plane size={15} fill="#eed88a" color="#eed88a" style={{ transform: 'rotate(45deg)' }} />
                  </div>
                </div>

                <Link
                  to="/services"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '0.75rem 1.65rem',
                    borderRadius: '9999px',
                    background: '#00a8ff',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    boxShadow: '0 0 20px rgba(0, 168, 255, 0.4)',
                    transition: 'all 0.25s ease',
                    whiteSpace: 'nowrap'
                  }}
                  className="explore-services-btn"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#38bdf8';
                    e.currentTarget.style.boxShadow = '0 0 28px rgba(56, 189, 248, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#00a8ff';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 168, 255, 0.4)';
                  }}
                >
                  <span>Explore All Services</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Bento Grid Architecture */}
            <div className="services-bento-grid">
              {detailedServices.map((srv) => {
                if (srv.isHero) {
                  return (
                    <Link
                      key={srv.id}
                      to={`/services/${srv.slug}`}
                      className={`bento-card bento-hero-card ${srv.gridSpan}`}
                      style={{
                        background: 'rgba(11, 15, 24, 0.78)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '20px',
                        padding: '1.85rem 2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        textDecoration: 'none',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      <div>
                        {/* Header: Icon + Category + Stat Badge */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '10px',
                          marginBottom: '1rem'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                              width: '46px',
                              height: '46px',
                              borderRadius: '12px',
                              background: 'rgba(0, 168, 255, 0.14)',
                              border: '1px solid rgba(0, 168, 255, 0.35)',
                              boxShadow: '0 0 16px rgba(0, 168, 255, 0.2)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              {srv.icon}
                            </div>
                            <span style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              letterSpacing: '0.12em',
                              color: '#94a3b8',
                              textTransform: 'uppercase'
                            }}>
                              {srv.category}
                            </span>
                          </div>

                          {/* Distinct Stat Badge */}
                          <div style={{
                            padding: '0.35rem 0.85rem',
                            borderRadius: '9999px',
                            background: srv.badgeBg,
                            border: `1px solid ${srv.badgeBorder}`,
                            color: srv.badgeColor,
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            letterSpacing: '0.02em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}>
                            <CheckCircle2 size={13} />
                            <span>{srv.badge}</span>
                          </div>
                        </div>

                        {/* Title H3 */}
                        <h3 style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: '1.45rem',
                          fontWeight: 700,
                          color: '#ffffff',
                          margin: '0 0 0.85rem 0',
                          lineHeight: 1.25
                        }} className="bento-title">
                          {srv.title}
                        </h3>

                        {/* Highlights Chips */}
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '6px',
                          marginBottom: '0.95rem'
                        }}>
                          {srv.highlights.map((tag) => (
                            <span
                              key={tag}
                              style={{
                                fontSize: '0.72rem',
                                color: '#d8e4f0',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                padding: '2px 8px',
                                borderRadius: '6px'
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Benefit Copy */}
                        <p style={{
                          fontSize: '0.9rem',
                          color: '#94a3b8',
                          lineHeight: 1.65,
                          margin: 0
                        }}>
                          {srv.description}
                        </p>
                      </div>

                      {/* Footer Link */}
                      <div style={{
                        marginTop: '1.5rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <span style={{
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          color: '#eed88a',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'gap 0.2s ease'
                        }} className="bento-cta">
                          <span>{srv.actionText}</span>
                          <ArrowRight size={14} className="bento-arrow" />
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Explore Details</span>
                      </div>
                    </Link>
                  );
                }

                // 4 Specialist Cards (Bottom Row)
                return (
                  <Link
                    key={srv.id}
                    to={`/services/${srv.slug}`}
                    className="bento-card bento-specialist-card"
                    style={{
                      background: 'rgba(11, 15, 24, 0.72)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '18px',
                      padding: '1.4rem 1.35rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      textDecoration: 'none',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <div>
                      {/* Top: Icon + Stat Badge */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.85rem'
                      }}>
                        <div style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '10px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {srv.icon}
                        </div>

                        <span style={{
                          padding: '0.25rem 0.65rem',
                          borderRadius: '9999px',
                          background: srv.badgeBg,
                          border: `1px solid ${srv.badgeBorder}`,
                          color: srv.badgeColor,
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          letterSpacing: '0.02em',
                          whiteSpace: 'nowrap'
                        }}>
                          {srv.badge}
                        </span>
                      </div>

                      <div style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        color: '#64748b',
                        textTransform: 'uppercase',
                        marginBottom: '4px'
                      }}>
                        {srv.category}
                      </div>

                      <h3 style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '1.12rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        margin: '0 0 0.65rem 0',
                        lineHeight: 1.25
                      }} className="bento-title">
                        {srv.title}
                      </h3>

                      <p style={{
                        fontSize: '0.82rem',
                        color: '#94a3b8',
                        lineHeight: 1.6,
                        margin: 0
                      }}>
                        {srv.description}
                      </p>
                    </div>

                    <div style={{
                      marginTop: '1.25rem',
                      paddingTop: '0.85rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: '#38bdf8',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }} className="bento-cta">
                        <span>{srv.actionText}</span>
                        <ArrowRight size={13} className="bento-arrow" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

          </div>
        </section>

        {/* =========================================================================
            5. BOTTOM CTA BANNER (SCENIC LAKE) & MAJOR AIRLINES STRIP
            ========================================================================= */}
        <section id="plan-trip-banner" style={{ background: 'transparent', padding: '3.5rem 0 4rem 0' }}>
          <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.25rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.25fr 0.75fr',
              gap: '1.25rem',
              alignItems: 'stretch'
            }} className="bottom-banner-grid">
              
              {/* Part A: Scenic Alpine Lake Travel Planner Banner */}
              <div style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                minHeight: '130px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.5rem 2rem',
                backgroundImage: `
                  linear-gradient(90deg, rgba(5, 12, 20, 0.95) 0%, rgba(5, 12, 20, 0.78) 55%, rgba(5, 12, 20, 0.45) 100%),
                  url('/cta_mountain_lake.webp')
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)'
              }} className="scenic-cta-banner">
                
                {/* Left icon + text */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: '#eed88a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 0 16px rgba(238, 216, 138, 0.4)'
                  }}>
                    <Plane size={22} fill="#072018" color="#072018" style={{ transform: 'rotate(-45deg)' }} />
                  </div>

                  <div>
                    <h3 style={{
                      color: '#ffffff',
                      fontSize: '1.18rem',
                      fontWeight: 700,
                      margin: '0 0 4px 0',
                      fontFamily: "'Playfair Display', Georgia, serif"
                    }}>
                      Ready to Plan Your Next Trip?
                    </h3>
                    <p style={{
                      color: '#cbd5e1',
                      fontSize: '0.82rem',
                      margin: 0,
                      fontFamily: "'Inter', sans-serif"
                    }}>
                      Get the best deals, expert guidance and personalized travel support.
                    </p>
                  </div>
                </div>

                {/* Right buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  {/* WhatsApp Pill */}
                  <a
                    href="https://wa.me/923099923232?text=Assalam%20o%20Alaikum,%20I%20would%20like%20to%20plan%20my%20next%20trip%20with%20Al%20Arbab%20Travels."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#eed88a',
                      color: '#072018',
                      textDecoration: 'none',
                      borderRadius: '9999px',
                      padding: '0.55rem 1.15rem',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      boxShadow: '0 2px 10px rgba(238, 216, 138, 0.25)',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f5e29f'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#eed88a'}
                  >
                    <MessageSquare size={14} fill="#072018" color="#072018" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  {/* Call Pill */}
                  <a
                    href="tel:+923099923232"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(13, 17, 26, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      color: '#ffffff',
                      textDecoration: 'none',
                      borderRadius: '9999px',
                      padding: '0.55rem 1.15rem',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#38bdf8';
                      e.currentTarget.style.color = '#38bdf8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                  >
                    <Phone size={14} />
                    <span>Call Us Now</span>
                  </a>
                </div>
              </div>

              {/* Part B: We Work With Major Airlines (Obsidian Dark Glass) */}
              <div style={{
                background: 'rgba(13, 17, 26, 0.85)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)'
              }}>
                <div style={{
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  color: '#94a3b8',
                  marginBottom: '0.75rem',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  We Work With Major Airlines
                </div>

                <div className="airline-logos-strip" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '14px',
                  flexWrap: 'wrap'
                }}>
                  {/* PIA */}
                  <div className="airline-logo-item" title="PIA - Pakistan International Airlines">
                    <img 
                      src="/airlines/pia_light.png" 
                      alt="PIA - Pakistan International Airlines logo"
                      width="80"
                      height="28"
                      loading="lazy"
                      decoding="async"
                      style={{
                        height: '28px',
                        width: 'auto',
                        objectFit: 'contain',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* Saudia */}
                  <div className="airline-logo-item" title="Saudia Airlines">
                    <img 
                      src="/airlines/saudia_white.png" 
                      alt="Saudia Airlines logo"
                      width="90"
                      height="28"
                      loading="lazy"
                      decoding="async"
                      style={{
                        height: '28px',
                        width: 'auto',
                        objectFit: 'contain',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* Qatar Airways */}
                  <div className="airline-logo-item" title="Qatar Airways">
                    <img 
                      src="/airlines/qatar_white.png" 
                      alt="Qatar Airways logo"
                      width="95"
                      height="24"
                      loading="lazy"
                      decoding="async"
                      style={{
                        height: '24px',
                        width: 'auto',
                        objectFit: 'contain',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* Emirates */}
                  <div className="airline-logo-item" title="Emirates Airlines">
                    <img 
                      src="/airlines/emirates.svg" 
                      alt="Emirates Airlines logo"
                      width="90"
                      height="24"
                      loading="lazy"
                      decoding="async"
                      style={{
                        height: '24px',
                        width: 'auto',
                        objectFit: 'contain',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* Fly Jinnah */}
                  <div className="airline-logo-item" title="Fly Jinnah">
                    <img 
                      src="/airlines/flyjinnah.png" 
                      alt="Fly Jinnah Airlines logo"
                      width="85"
                      height="34"
                      loading="lazy"
                      decoding="async"
                      style={{
                        height: '34px',
                        width: 'auto',
                        objectFit: 'contain',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* airblue */}
                  <div className="airline-logo-item" title="Airblue">
                    <img 
                      src="/airlines/airblue_white.png" 
                      alt="Airblue Airlines logo"
                      width="85"
                      height="21"
                      loading="lazy"
                      decoding="async"
                      style={{
                        height: '21px',
                        width: 'auto',
                        objectFit: 'contain',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* and more... */}
                  <span style={{ fontSize: '0.72rem', color: '#64748b', fontStyle: 'italic', whiteSpace: 'nowrap' }}>
                    and more...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Responsive Styles */}
      <style>{`
        /* Bento Grid Styles */
        .services-bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1.25rem;
          margin-top: 1rem;
        }
        .hero-card-1 {
          grid-column: span 7;
        }
        .hero-card-2 {
          grid-column: span 5;
        }
        .bento-specialist-card {
          grid-column: span 3;
        }

        .bento-card {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease !important;
        }
        .bento-card:hover {
          transform: translateY(-4px);
          border-color: rgba(56, 189, 248, 0.45) !important;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.65), 0 0 24px rgba(56, 189, 248, 0.2) !important;
        }
        .bento-hero-card:hover {
          border-color: rgba(238, 216, 138, 0.5) !important;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.7), 0 0 28px rgba(238, 216, 138, 0.22) !important;
        }
        .bento-card:hover .bento-title {
          color: #eed88a !important;
        }
        .bento-card:hover .bento-arrow {
          transform: translateX(4px);
        }
        .bento-arrow {
          transition: transform 0.2s ease;
        }

        @media (max-width: 1080px) {
          .destinations-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-card-1 {
            grid-column: span 6 !important;
          }
          .hero-card-2 {
            grid-column: span 6 !important;
          }
          .bento-specialist-card {
            grid-column: span 6 !important;
          }
          .bottom-banner-grid {
            grid-template-columns: 1fr !important;
          }
          .destinations-cards-row {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .destinations-cards-row {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .hero-card-1,
          .hero-card-2,
          .bento-specialist-card {
            grid-column: span 12 !important;
          }
          .services-header-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
          }
          .scenic-cta-banner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.25rem !important;
          }
        }
        .airline-logo-item {
          transition: transform 0.2s ease, filter 0.2s ease, opacity 0.2s ease;
          opacity: 0.92;
        }
        .airline-logo-item:hover {
          transform: translateY(-2px);
          opacity: 1;
          filter: drop-shadow(0 4px 12px rgba(255, 255, 255, 0.18));
        }
        @media (max-width: 640px) {
          .airline-logos-strip {
            gap: 14px 20px !important;
            justify-content: flex-start !important;
          }
        }
        @media (max-width: 480px) {
          .destinations-cards-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
