import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plane, ArrowRight, ShieldCheck, Hotel, Users,
  Phone, MessageCircle, Building2, MapPin,
  Compass, FileCheck, Award, CheckCircle2, Sparkles,
  Quote, Star, Globe2, BadgeCheck, Clock3
} from 'lucide-react';
import SEO from '../components/SEO';
import CountryMarqueeStrip from '../components/CountryMarqueeStrip';
import InteractiveDestinationCards from '../components/InteractiveDestinationCards';
import { testimonials } from '../data/testimonialsData';
import HeroSearchWidget from '../components/HeroSearchWidget';

export default function Home({ onOpenEligibility, onOpenEligibilityWithCountry }) {
  const handleCountrySelect = (countryId) => {
    if (onOpenEligibilityWithCountry) {
      onOpenEligibilityWithCountry(countryId);
    } else {
      onOpenEligibility?.();
    }
  };

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = (newsletterEmail || '').replace(/[<>]/g, '').trim();
    if (!cleanEmail || cleanEmail.length < 5) return;
    const msg = `Assalam o Alaikum, please add me to your travel offers & Umrah deals updates. My email: ${cleanEmail}`;
    window.open(`https://wa.me/923099923232?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    setNewsletterEmail('');
  };

  // Top Featured Destinations
  const popularDestinations = [
    {
      id: 'malaysia',
      title: 'Malaysia',
      subtitle: '30-Day eVisa & Employment Pass Support',
      image: '/dest_malaysia.webp',
      link: '/destinations/malaysia',
      badge: '5-7 Day Processing',
      badgeColor: '#2563eb',
      rating: '4.8'
    },
    {
      id: 'thailand',
      title: 'Thailand',
      subtitle: '60-Day Tourist eVisa & DTV Nomad Support',
      image: '/dest_thailand.webp',
      link: '/destinations/thailand',
      badge: 'Fast-Track Available',
      badgeColor: '#16a34a',
      rating: '4.9'
    },
    {
      id: 'singapore',
      title: 'Singapore',
      subtitle: 'Electronic Visit Visa & Family Holiday Entry',
      image: '/dest_singapore.webp',
      link: '/destinations/singapore',
      badge: 'Family Friendly',
      badgeColor: '#d97706',
      rating: '4.7'
    },
    {
      id: 'indonesia',
      title: 'Indonesia',
      subtitle: 'Bali Electronic Visa on Arrival (e-VoA)',
      image: '/dest_indonesia.webp',
      link: '/destinations/indonesia',
      badge: 'e-VoA on Arrival',
      badgeColor: '#7c3aed',
      rating: '4.8'
    },
    {
      id: 'nepal',
      title: 'Nepal',
      subtitle: 'Kathmandu Tourist Visa (15 / 30 / 90 Days)',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
      link: '/destinations/nepal',
      badge: '2-4 Day Processing',
      badgeColor: '#dc2626',
      rating: '4.9'
    },
    {
      id: 'sri-lanka',
      title: 'Sri Lanka',
      subtitle: 'Colombo 30-Day Electronic Travel Authorization',
      image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1000&q=80',
      link: '/destinations/sri-lanka',
      badge: '24-48 Hour ETA',
      badgeColor: '#0f8a5f',
      rating: '4.8'
    }
  ];

  // 6 Value-Led Distinct Pillars
  const detailedServices = [
    {
      id: 'visa-consultancy',
      slug: 'visa-services',
      category: 'IMMIGRATION & PERMITS',
      title: 'Work Visas & Global Visa Consultancy',
      badge: 'Asian Processing · Schengen/USA File Prep',
      badgeColor: '#a3720b',
      badgeBg: 'rgba(238, 173, 40, 0.12)',
      badgeBorder: 'rgba(238, 173, 40, 0.35)',
      highlights: ['Asian Visit Visas (Full Service)', 'Overseas Work Visa Advisory', 'Schengen File Preparation Only', 'USA DS-160 & Interview Prep'],
      description: 'Complete visa filing assistance for Malaysia, UAE, and Thailand visit visas alongside overseas employment file advisory. For European Schengen and USA B1/B2 visas, we provide professional file preparation only—covering document checklists, DS-160 drafting, financial presentation, and embassy interview coaching without false approval guarantees.',
      actionText: 'Check Visa Requirements',
      isHero: true,
      gridSpan: 'hero-card-1',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0b6fce" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
      badgeColor: '#0f8a5f',
      badgeBg: 'rgba(15, 138, 95, 0.1)',
      badgeBorder: 'rgba(15, 138, 95, 0.3)',
      highlights: ['Makkah Clock Tower Hotels', 'Madinah Courtyard Properties', 'Haramain High-Speed Train', 'Direct Jeddah & Madinah Flights'],
      description: 'End-to-end Umrah arrangements featuring official Nusuk visa processing, verified 3-star to 5-star hotel vouchers within walking distance of the Harams, high-speed rail bookings, and reliable ground transportation.',
      actionText: 'Explore Umrah Packages',
      isHero: true,
      gridSpan: 'hero-card-2',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f8a5f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 10h16v11H4z" />
          <path d="M4 14h16" />
          <path d="M8 10V6a4 4 0 0 1 8 0v4" />
          <path d="M12 2v4" />
          <circle cx="12" cy="18" r="1.5" fill="#0f8a5f" />
        </svg>
      )
    },
    {
      id: 'flights-ticketing',
      slug: 'flights',
      category: 'AIR TICKETING',
      title: 'Flights & Global Route Management',
      badge: 'Full Air Ticketing Service',
      badgeColor: '#0b6fce',
      badgeBg: 'rgba(11, 111, 206, 0.1)',
      badgeBorder: 'rgba(11, 111, 206, 0.3)',
      highlights: ['PIA, Saudia, Emirates & Qatar', 'Real-Time GDS Seat Allocation', 'Flexible Reissue Assistance', 'Direct WhatsApp Fare Support'],
      description: 'Comprehensive domestic and international flight reservation service. We search global distribution systems for optimized routings, transparent baggage allowances, urgent date reissues, and tailored corporate itineraries.',
      actionText: 'Find Route Fares',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0b6fce" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
      badgeColor: '#a3720b',
      badgeBg: 'rgba(238, 173, 40, 0.12)',
      badgeBorder: 'rgba(238, 173, 40, 0.35)',
      highlights: ['Confirmed Hotel Vouchers', 'Embassy-Acceptable Bookings', 'Budget to 5-Star Properties', 'Dubai, London, Istanbul & Saudi'],
      description: 'Hotel reservations with verified confirmation vouchers suitable for visa submissions and personal travel, securing competitive wholesale rates across major destinations including Saudi Arabia, UAE, Turkey, and Europe.',
      actionText: 'Browse Accommodations',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a3720b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
      badgeColor: '#7c3aed',
      badgeBg: 'rgba(124, 58, 237, 0.1)',
      badgeBorder: 'rgba(124, 58, 237, 0.3)',
      highlights: ['Custom Family Holiday Itineraries', 'Corporate Delegation Logistics', 'Private Airport & Intercity Coaches', 'Dedicated Travel Coordinator'],
      description: 'Custom-tailored international tour packages and group logistics for corporate delegations, conferences, trade exhibitions, and family vacations with coordinated flights, accommodations, and guided excursions.',
      actionText: 'Plan Group Tour',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
      badgeColor: '#0e9384',
      badgeBg: 'rgba(14, 147, 132, 0.1)',
      badgeBorder: 'rgba(14, 147, 132, 0.3)',
      highlights: ['€30,000+ Schengen Medical Cover', 'Instant Policy Issuance', 'COVID-19 & Repatriation Included', 'Diplomatic Enclave Proximity'],
      description: 'Embassy-approved international medical travel insurance with mandatory €30,000 / $50,000 coverage issued instantly. Our Blue Area office also assists travelers with document attestation guidance for diplomatic submissions.',
      actionText: 'Verify Insurance & Docs',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0e9384" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
        title="Best Travel Agency in Islamabad | Visa Consultancy & Umrah Packages | Al Arbab Travels"
        description="Al Arbab Travels is the best travel agency in Islamabad & Blue Area. Trusted visa consultancy for visit visas, verified Umrah packages, flight booking & embassy file preparation."
        keywords="best travel agency in Islamabad, best travel agency near me, best visa consultant in Islamabad, best visa consultants near me, best travel agency in Blue Area Islamabad, visa consultancy in Islamabad, Umrah packages Islamabad, Umrah packages Pakistan, air ticketing agency Islamabad, visit visa agency Islamabad, travel agency near me Blue Area, travel agency Rawalpindi, Al Arbab Travels"
        canonicalPath="/"
        schema={websiteSchema}
      />

      <main style={{ width: '100%', overflow: 'hidden', background: '#ffffff' }}>

        {/* =========================================================================
            1. HERO — pink blob + floating info cards, headline + search widget
            ========================================================================= */}
        <section style={{
          position: 'relative',
          background: '#f7eff4',
          padding: '4.5rem 0 8.5rem 0'
        }}>
          <div className="container blob-hero-grid" style={{
            maxWidth: '1360px',
            margin: '0 auto',
            padding: '0 1.25rem',
            position: 'relative',
            zIndex: 2,
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) 560px',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            {/* Left: copy */}
            <div>
              <div style={{ fontSize: '1rem', color: '#2b2b33', marginBottom: '0.6rem' }}>
                Hi, there!
              </div>

              <h1 style={{
                fontFamily: "Arial, Helvetica, sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(2.1rem, 4.4vw, 3.25rem)',
                lineHeight: 1.08,
                color: '#1a1a1f',
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                margin: '0 0 1.3rem 0'
              }}>
                <span style={{ color: '#e91e63' }}>Best Travel Agency</span> in Islamabad — Al Arbab Travels
              </h1>

              <p style={{
                fontSize: '1.02rem',
                color: '#5c5c66',
                lineHeight: 1.7,
                marginBottom: '1.8rem',
                maxWidth: '460px'
              }}>
                Visit visas, business visas, Umrah packages, hotel bookings and air ticketing — handled personally by our senior visa consultants in Blue Area, Islamabad &amp; Rawalpindi.
              </p>

              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '2.75rem' }}>
                <button
                  type="button"
                  onClick={onOpenEligibility}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '0.95rem 1.75rem',
                    borderRadius: '9999px',
                    background: '#e91e63',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '0 14px 30px rgba(233, 30, 99, 0.35)'
                  }}
                >
                  <span>Check Visa Eligibility</span>
                  <ArrowRight size={16} />
                </button>

                <a
                  href="https://wa.me/923099923232?text=Assalam%20o%20Alaikum,%20I%20would%20like%20to%20plan%20my%20trip%20with%20Al%20Arbab%20Travels."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '0.95rem 1.75rem',
                    borderRadius: '9999px',
                    background: '#ffffff',
                    border: '1.5px solid #e7dbe3',
                    color: '#1a1a1f',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    textDecoration: 'none'
                  }}
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Us</span>
                </a>
              </div>

              {/* Small feature row */}
              <div style={{ display: 'flex', gap: '2.25rem', flexWrap: 'wrap' }}>
                {[
                  { icon: <ShieldCheck size={22} color="#e91e63" strokeWidth={1.8} />, label: '100+ Countries Visa Support' },
                  { icon: <BadgeCheck size={22} color="#e91e63" strokeWidth={1.8} />, label: 'Verified Umrah Packages' },
                  { icon: <Clock3 size={22} color="#e91e63" strokeWidth={1.8} />, label: '24/7 WhatsApp Response' }
                ].map((item) => (
                  <div key={item.label} style={{ maxWidth: '130px' }}>
                    <div style={{ marginBottom: '0.5rem' }}>{item.icon}</div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1a1a1f' }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: blob + floating cards */}
            <div className="blob-hero-visual" style={{ position: 'relative', width: '100%', maxWidth: '560px', height: '560px', margin: '0 auto' }}>
              <div style={{
                position: 'absolute',
                left: '8%',
                top: '4%',
                width: '82%',
                height: '82%',
                background: '#e91e63',
                borderRadius: '64% 36% 58% 42% / 48% 60% 40% 52%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 45px rgba(233, 30, 99, 0.25)',
                zIndex: 1
              }}>
                <Globe2 size={160} color="rgba(255,255,255,0.22)" strokeWidth={1.1} />
                <Plane size={85} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: '8%', bottom: '10%', transform: 'rotate(-30deg)' }} />
              </div>

              <div style={{
                position: 'absolute',
                left: '-2%',
                top: '28%',
                width: '28%',
                height: '28%',
                background: '#0f1f30',
                opacity: 0.92,
                borderRadius: '60% 40% 55% 45% / 45% 55% 45% 55%',
                zIndex: 1
              }} />

              {/* Couple Character Image */}
              <img
                src="/hero_couple_travelers.webp"
                alt="Best travel agency in Islamabad - Al Arbab Travels clients planning international visit visas and Umrah packages"
                loading="eager"
                fetchpriority="high"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  height: '98%',
                  width: 'auto',
                  objectFit: 'contain',
                  zIndex: 3,
                  pointerEvents: 'none',
                  filter: 'drop-shadow(0 18px 36px rgba(15, 31, 48, 0.25))'
                }}
              />

              {/* stat card */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: '26%',
                zIndex: 5,
                background: '#ffffff',
                borderRadius: '16px',
                padding: '0.75rem 1.1rem',
                boxShadow: '0 14px 32px rgba(15,31,48,0.18)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <div style={{ width: 34, height: 34, borderRadius: '10px', background: '#e91e63', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Globe2 size={16} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 900, fontSize: '1rem', color: '#1a1a1f', lineHeight: 1 }}>100+</div>
                  <div style={{ fontSize: '0.68rem', color: '#8a8a92', marginTop: '2px' }}>Countries</div>
                </div>
              </div>

              {/* rating card */}
              <div style={{
                position: 'absolute',
                right: 0,
                top: '19%',
                zIndex: 5,
                background: '#ffffff',
                borderRadius: '16px',
                padding: '0.75rem 1.1rem',
                boxShadow: '0 14px 32px rgba(15,31,48,0.18)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Star size={18} color="#f5b100" fill="#f5b100" />
                <div>
                  <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 900, fontSize: '1rem', color: '#1a1a1f', lineHeight: 1 }}>4.9</div>
                  <div style={{ fontSize: '0.68rem', color: '#8a8a92', marginTop: '2px' }}>Satisfaction</div>
                </div>
              </div>

              {/* role card */}
              <div style={{
                position: 'absolute',
                right: '5%',
                bottom: '3%',
                zIndex: 5,
                background: '#ffffff',
                borderRadius: '16px',
                padding: '0.85rem 1.25rem',
                boxShadow: '0 14px 32px rgba(15,31,48,0.18)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#e91e63', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={18} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 900, fontSize: '0.85rem', color: '#1a1a1f' }}>Visa Consultant</div>
                  <div style={{ fontSize: '0.68rem', color: '#8a8a92', marginTop: '2px' }}>8 Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Floating Liquid Glass Search / Booking Widget */}
        <div className="hero-search-bridge" style={{
          position: 'relative',
          zIndex: 25,
          padding: '0 1.25rem',
          maxWidth: '1240px',
          margin: '-4.25rem auto 1.25rem auto'
        }}>
          <HeroSearchWidget onOpenEligibilityWithCountry={handleCountrySelect} />
        </div>

        {/* =========================================================================
            AUTO-SCROLLING COUNTRY DESTINATIONS MARQUEE STRIP
            ========================================================================= */}
        <CountryMarqueeStrip onCountrySelect={handleCountrySelect} />

        {/* =========================================================================
            2. TRUST / QUICK FEATURE STRIP
            ========================================================================= */}
        <section style={{ padding: '3.5rem 0 2.5rem 0', background: '#ffffff' }}>
          <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.25rem' }}>
            <div className="trust-strip-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '1rem'
            }}>
              {[
                { icon: <Award size={20} />, title: 'Best Price Guarantee', desc: 'Transparent, competitive rates' },
                { icon: <Phone size={20} />, title: '24/7 WhatsApp Support', desc: 'We are always reachable' },
                { icon: <ShieldCheck size={20} />, title: 'Secure Visa Filing', desc: 'Document care, done right' },
                { icon: <FileCheck size={20} />, title: 'Easy Rescheduling', desc: 'Flexible flight & hotel changes' },
                { icon: <CheckCircle2 size={20} />, title: 'Verified Bookings', desc: 'Embassy-acceptable vouchers' }
              ].map((f) => (
                <div key={f.title} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '0.6rem',
                  padding: '1.25rem',
                  borderRadius: '14px',
                  background: '#f8fafc',
                  border: '1px solid #eef2f6'
                }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: '#eaf4fd',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {f.icon}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f1f30' }}>{f.title}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. POPULAR DESTINATIONS
            ========================================================================= */}
        <section id="popular-destinations" style={{ padding: '3rem 0 4.5rem 0', background: '#ffffff' }}>
          <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.25rem' }}>

            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
              marginBottom: '2.25rem'
            }} className="destinations-header-row">
              <div style={{ maxWidth: '560px' }}>
                <div style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#0b6fce',
                  marginBottom: '0.5rem'
                }}>
                  EXPLORE THE WORLD
                </div>

                <h2 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2rem, 3.2vw, 2.6rem)',
                  fontWeight: 700,
                  color: '#0f1f30',
                  lineHeight: 1.15,
                  margin: '0 0 0.75rem 0'
                }}>
                  Popular Destinations
                </h2>

                <p style={{ fontSize: '0.94rem', color: '#64748b', lineHeight: 1.65, margin: 0 }}>
                  From spiritual journeys to dream vacations, we handle your visa and travel arrangements end to end.
                </p>
              </div>

              <Link
                to="/destinations"
                className="outline-link-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#ffffff',
                  border: '1.5px solid #2563eb',
                  color: '#2563eb',
                  textDecoration: 'none',
                  borderRadius: '9999px',
                  padding: '0.75rem 1.65rem',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap'
                }}
              >
                <span>View All Destinations</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            <InteractiveDestinationCards destinations={popularDestinations} />
          </div>
        </section>

        {/* =========================================================================
            3B. THIS WEEK'S OFFERS
            ========================================================================= */}
        <section style={{ padding: '0 0 4.5rem 0', background: '#ffffff' }}>
          <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr 1fr 1fr', gap: '1.1rem' }} className="weekly-offers-grid">

              {/* Big promo card */}
              <div style={{
                position: 'relative',
                borderRadius: '18px',
                overflow: 'hidden',
                padding: '2rem',
                minHeight: '210px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundImage: `linear-gradient(100deg, rgba(15, 42, 90, 0.88) 0%, rgba(29, 78, 216, 0.7) 45%, rgba(37, 99, 235, 0.35) 100%), url('/offer_plane_globe_blue.webp')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#bfdbfe', marginBottom: '0.5rem' }}>
                    This Week's Offers
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', fontWeight: 700, color: '#ffffff', margin: '0 0 0.6rem 0', lineHeight: 1.2 }}>
                    Limited Priority Filing Slots
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: '#dbeafe', margin: '0 0 1.25rem 0', maxWidth: '300px' }}>
                    Book this week and get expedited document review at no extra cost.
                  </p>
                  <button
                    type="button"
                    onClick={onOpenEligibility}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px', width: 'fit-content',
                      background: '#ffffff', color: '#2563eb', border: 'none', borderRadius: '9999px',
                      padding: '0.7rem 1.35rem', fontSize: '0.86rem', fontWeight: 700, cursor: 'pointer'
                    }}
                  >
                    <span>Grab This Offer</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Small offer cards, image-backed like a deal card */}
              {[
                { image: '/dest_turkey.webp', tag: 'Best Seller', tagColor: '#16a34a', title: 'Turkey Visa Fast-Track', desc: '5-Day Priority Filing' },
                { image: '/dest_makkah.webp', tag: 'Hot Deal', tagColor: '#dc2626', title: 'Umrah Group Discount', desc: '4+ Travelers Together' },
                { image: '/dest_singapore.webp', tag: 'New Offer', tagColor: '#7c3aed', title: 'Free First Consultation', desc: 'All New Enquiries' }
              ].map((offer) => (
                <Link
                  key={offer.title}
                  to="/destinations"
                  style={{
                    position: 'relative',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    minHeight: '210px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1rem',
                    textDecoration: 'none',
                    boxShadow: '0 8px 22px rgba(15, 32, 55, 0.14)'
                  }}
                  className="destination-card-item"
                >
                  <img
                    src={offer.image}
                    alt={`${offer.title} - Al Arbab Travels Islamabad`}
                    loading="lazy"
                    decoding="async"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    className="dest-card-img"
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(6, 20, 36, 0.88) 100%)',
                    pointerEvents: 'none'
                  }} />
                  <div style={{
                    position: 'absolute', top: '0.75rem', left: '0.75rem', zIndex: 2,
                    background: offer.tagColor, color: '#ffffff', fontSize: '0.62rem', fontWeight: 700,
                    letterSpacing: '0.02em', padding: '4px 9px', borderRadius: '9999px',
                    boxShadow: `0 4px 10px ${offer.tagColor}66`
                  }}>
                    {offer.tag}
                  </div>
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>{offer.title}</h4>
                    <p style={{ fontSize: '0.76rem', color: '#dbe8f3', margin: '2px 0 0 0' }}>{offer.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. COMPLETE TRAVEL SOLUTIONS (BENTO GRID)
            ========================================================================= */}
        <section id="services-directory" style={{ background: '#f7fafc', borderTop: '1px solid #eef2f6', borderBottom: '1px solid #eef2f6', padding: '5rem 0' }}>
          <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.25rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '2rem',
              marginBottom: '2.5rem'
            }} className="services-header-row">
              <div style={{ maxWidth: '720px' }}>
                <div style={{
                  fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: '#0b6fce', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px'
                }}>
                  <Sparkles size={14} color="#eeb42b" />
                  <span>OUR COMPREHENSIVE EXPERTISE</span>
                </div>

                <h2 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2.1rem, 3.2vw, 2.8rem)',
                  fontWeight: 700,
                  color: '#0f1f30',
                  lineHeight: 1.15,
                  margin: '0 0 0.85rem 0'
                }}>
                  Complete Travel Solutions Under One Roof
                </h2>

                <p style={{ fontSize: '0.96rem', color: '#64748b', lineHeight: 1.65, margin: 0 }}>
                  From full-assistance Asian visit visas and complete Umrah pilgrimages to worldwide flight ticketing and expert Schengen &amp; USA file preparation, our senior consultants in Blue Area Islamabad handle every detail with meticulous care.
                </p>
              </div>

              <Link
                to="/services"
                className="explore-services-btn"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.8rem 1.65rem',
                  borderRadius: '9999px', background: '#0b6fce', color: '#ffffff', fontWeight: 700,
                  fontSize: '0.88rem', textDecoration: 'none', boxShadow: '0 10px 24px rgba(11, 111, 206, 0.3)',
                  whiteSpace: 'nowrap'
                }}
              >
                <span>Explore All Services</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="services-bento-grid">
              {detailedServices.map((srv) => {
                if (srv.isHero) {
                  return (
                    <Link
                      key={srv.id}
                      to={`/services/${srv.slug}`}
                      className={`bento-card bento-hero-card ${srv.gridSpan}`}
                      style={{
                        background: '#ffffff', border: '1px solid #e7edf3', borderRadius: '20px',
                        padding: '1.85rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                        textDecoration: 'none', position: 'relative', overflow: 'hidden',
                        boxShadow: '0 6px 20px rgba(15, 32, 55, 0.06)'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                              width: '46px', height: '46px', borderRadius: '12px', background: '#eaf4fd',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                            }}>
                              {srv.icon}
                            </div>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', color: '#94a3b8', textTransform: 'uppercase' }}>
                              {srv.category}
                            </span>
                          </div>

                          <div style={{
                            padding: '0.35rem 0.85rem', borderRadius: '9999px', background: srv.badgeBg,
                            border: `1px solid ${srv.badgeBorder}`, color: srv.badgeColor, fontSize: '0.78rem',
                            fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px'
                          }}>
                            <CheckCircle2 size={13} />
                            <span>{srv.badge}</span>
                          </div>
                        </div>

                        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.45rem', fontWeight: 700, color: '#0f1f30', margin: '0 0 0.85rem 0', lineHeight: 1.25 }} className="bento-title">
                          {srv.title}
                        </h3>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '0.95rem' }}>
                          {srv.highlights.map((tag) => (
                            <span key={tag} style={{ fontSize: '0.72rem', color: '#42586e', background: '#f1f5f9', border: '1px solid #e7edf3', padding: '2px 8px', borderRadius: '6px' }}>
                              {tag}
                            </span>
                          ))}
                        </div>

                        <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.65, margin: 0 }}>
                          {srv.description}
                        </p>
                      </div>

                      <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #eef2f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2563eb', display: 'flex', alignItems: 'center', gap: '6px' }} className="bento-cta">
                          <span>{srv.actionText}</span>
                          <ArrowRight size={14} className="bento-arrow" />
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Explore Details</span>
                      </div>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={srv.id}
                    to={`/services/${srv.slug}`}
                    className="bento-card bento-specialist-card"
                    style={{
                      background: '#ffffff', border: '1px solid #e7edf3', borderRadius: '18px',
                      padding: '1.4rem 1.35rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                      textDecoration: 'none', boxShadow: '0 6px 20px rgba(15, 32, 55, 0.06)'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {srv.icon}
                        </div>
                        <span style={{ padding: '0.25rem 0.65rem', borderRadius: '9999px', background: srv.badgeBg, border: `1px solid ${srv.badgeBorder}`, color: srv.badgeColor, fontSize: '0.7rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                          {srv.badge}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>
                        {srv.category}
                      </div>

                      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.12rem', fontWeight: 700, color: '#0f1f30', margin: '0 0 0.65rem 0', lineHeight: 1.25 }} className="bento-title">
                        {srv.title}
                      </h3>

                      <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                        {srv.description}
                      </p>
                    </div>

                    <div style={{ marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid #eef2f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563eb', display: 'flex', alignItems: 'center', gap: '5px' }} className="bento-cta">
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
            5. WHAT OUR TRAVELERS SAY
            ========================================================================= */}
        <section style={{ padding: '5rem 0', background: '#ffffff' }}>
          <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.25rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 2.75rem auto' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0b6fce', marginBottom: '0.5rem' }}>
                CLIENT EXPERIENCES
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 3.2vw, 2.6rem)', fontWeight: 700, color: '#0f1f30', margin: '0 0 0.75rem 0' }}>
                What Our Travelers Say
              </h2>
              <p style={{ fontSize: '0.94rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                Real experiences from clients we've helped with visas, Umrah, and travel across Pakistan.
              </p>
            </div>

            <div className="testimonial-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {testimonials.slice(0, 3).map((t) => (
                <div key={t.id} style={{
                  background: '#f8fafc',
                  border: '1px solid #eef2f6', borderRadius: '18px',
                  padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem'
                }}>
                  <Quote size={26} color="#2563eb" style={{ opacity: 0.5 }} />
                  <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.65, margin: 0, flex: 1 }}>
                    "{t.text.length > 220 ? `${t.text.slice(0, 220)}…` : t.text}"
                  </p>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} fill="#eeb42b" color="#eeb42b" />
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f1f30' }}>{t.name}</div>
                    <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>{t.location} · {t.visaType}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. BOTTOM CTA BANNER & MAJOR AIRLINES STRIP
            ========================================================================= */}
        <section id="plan-trip-banner" style={{ background: '#f7fafc', padding: '1rem 0 4.5rem 0' }}>
          <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: '1.25rem', alignItems: 'stretch' }} className="bottom-banner-grid">

              {/* Scenic CTA Banner */}
              <div style={{
                position: 'relative', borderRadius: '18px', overflow: 'hidden', minHeight: '150px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem',
                backgroundImage: `linear-gradient(90deg, rgba(5, 12, 20, 0.9) 0%, rgba(5, 12, 20, 0.7) 55%, rgba(5, 12, 20, 0.4) 100%), url('/cta_mountain_lake.webp')`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                boxShadow: '0 16px 36px rgba(15, 32, 55, 0.18)'
              }} className="scenic-cta-banner">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: '#eeb42b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Plane size={22} fill="#1a1204" color="#1a1204" style={{ transform: 'rotate(-45deg)' }} />
                  </div>
                  <div>
                    <h3 style={{ color: '#ffffff', fontSize: '1.18rem', fontWeight: 700, margin: '0 0 4px 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
                      Ready to Plan Your Next Trip?
                    </h3>
                    <p style={{ color: '#cbd5e1', fontSize: '0.82rem', margin: 0 }}>
                      Get expert guidance and personalized travel support today.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <a
                    href="https://wa.me/923099923232?text=Assalam%20o%20Alaikum,%20I%20would%20like%20to%20plan%20my%20next%20trip%20with%20Al%20Arbab%20Travels."
                    target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#eeb42b', color: '#1a1204', textDecoration: 'none', borderRadius: '9999px', padding: '0.55rem 1.15rem', fontSize: '0.82rem', fontWeight: 700, whiteSpace: 'nowrap' }}
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp: 0309 9923232</span>
                  </a>
                  <a
                    href="tel:0512000066"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255, 255, 255, 0.4)', color: '#ffffff', textDecoration: 'none', borderRadius: '9999px', padding: '0.55rem 1.15rem', fontSize: '0.82rem', fontWeight: 600, whiteSpace: 'nowrap' }}
                  >
                    <Phone size={14} />
                    <span>PTCL: 051 2000066</span>
                  </a>
                </div>
              </div>

              {/* Airlines Strip */}
              <div style={{
                background: '#ffffff',
                borderRadius: '18px', border: '1px solid #eef2f6',
                padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(15, 32, 55, 0.06)'
              }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748b', marginBottom: '0.75rem' }}>
                  We Work With Major Airlines
                </div>
                <div className="airline-logos-strip" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                  {[
                    { src: '/airlines/pia.png', alt: 'PIA - Pakistan International Airlines', h: 24 },
                    { src: '/airlines/saudia.png', alt: 'Saudia Airlines', h: 24 },
                    { src: '/airlines/qatar.png', alt: 'Qatar Airways', h: 20 },
                    { src: '/airlines/emirates.svg', alt: 'Emirates Airlines', h: 20 },
                    { src: '/airlines/flyjinnah.png', alt: 'Fly Jinnah', h: 26 },
                    { src: '/airlines/airblue.png', alt: 'Airblue Airlines', h: 18 }
                  ].map((a) => (
                    <div
                      key={a.alt}
                      className="airline-logo-item"
                      title={a.alt}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: '#f8fafc', border: '1px solid #eef2f6', borderRadius: '10px',
                        padding: '0.55rem 0.9rem', minWidth: '84px', minHeight: '52px'
                      }}
                    >
                      <img src={a.src} alt={a.alt} loading="lazy" decoding="async" style={{ height: `${a.h}px`, width: 'auto', maxWidth: '76px', objectFit: 'contain', display: 'block' }} />
                    </div>
                  ))}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px dashed #cbd5e1', borderRadius: '10px',
                    padding: '0.55rem 0.9rem', minWidth: '84px', minHeight: '52px'
                  }}>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontStyle: 'italic', whiteSpace: 'nowrap' }}>and more...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. NEWSLETTER SIGNUP
            ========================================================================= */}
        <section style={{ padding: '0 0 5rem 0', background: '#ffffff' }}>
          <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.25rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              borderRadius: '20px',
              padding: '2.75rem 2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
              flexWrap: 'wrap'
            }} className="newsletter-banner">
              <div style={{ maxWidth: '460px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.4rem, 2.4vw, 1.85rem)', fontWeight: 700, color: '#ffffff', margin: '0 0 0.5rem 0' }}>
                  Get Exclusive Offers & Travel Inspiration
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#dbeafe', margin: 0, lineHeight: 1.6 }}>
                  Subscribe for visa deadline reminders, Umrah package updates, and seasonal travel deals.
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', flex: '1 1 340px', maxWidth: '440px' }}>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  style={{
                    flex: '1 1 200px',
                    padding: '0.85rem 1.1rem',
                    borderRadius: '9999px',
                    border: 'none',
                    fontSize: '0.9rem',
                    color: '#0f1f30',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    background: '#0f1f30', color: '#ffffff', border: 'none',
                    borderRadius: '9999px', padding: '0.85rem 1.5rem',
                    fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap'
                  }}
                >
                  <span>Subscribe</span>
                  <ArrowRight size={15} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Responsive Styles */}
      <style>{`
        .outline-link-btn:hover {
          background: #0b6fce !important;
          color: #ffffff !important;
        }
        .services-bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1.25rem;
          margin-top: 1rem;
        }
        .hero-card-1 { grid-column: span 7; }
        .hero-card-2 { grid-column: span 5; }
        .bento-specialist-card { grid-column: span 3; }

        .bento-card {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease !important;
        }
        .bento-card:hover {
          transform: translateY(-4px);
          border-color: rgba(11, 111, 206, 0.35) !important;
          box-shadow: 0 18px 36px rgba(15, 32, 55, 0.14) !important;
        }
        .bento-card:hover .bento-title { color: #0b6fce !important; }
        .bento-card:hover .bento-arrow { transform: translateX(4px); }
        .bento-arrow { transition: transform 0.2s ease; }

        .destination-card-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px rgba(15, 32, 55, 0.22) !important;
        }

        .airline-logo-item { transition: transform 0.2s ease, opacity 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease; opacity: 0.9; }
        .airline-logo-item:hover { transform: translateY(-2px); opacity: 1; border-color: #2563eb !important; box-shadow: 0 6px 16px rgba(37, 99, 235, 0.14); }

        @media (max-width: 1080px) {
          .destinations-layout-grid { grid-template-columns: 1fr !important; }
          .hero-card-1, .hero-card-2 { grid-column: span 6 !important; }
          .bento-specialist-card { grid-column: span 6 !important; }
          .bottom-banner-grid { grid-template-columns: 1fr !important; }
          .destinations-cards-row { grid-template-columns: repeat(3, 1fr) !important; }
          .trust-strip-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .testimonial-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .destinations-cards-row { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-card-1, .hero-card-2, .bento-specialist-card { grid-column: span 12 !important; }
          .services-header-row { flex-direction: column !important; align-items: flex-start !important; gap: 1.5rem !important; }
          .scenic-cta-banner { flex-direction: column !important; align-items: flex-start !important; gap: 1.25rem !important; }
          .trust-strip-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .testimonial-grid { grid-template-columns: 1fr !important; }
          .hero-widget-grid { grid-template-columns: 1fr !important; }
          .hero-widget-cta { width: 100%; }
        }
        @media (max-width: 640px) {
          .airline-logos-strip { gap: 14px 20px !important; justify-content: flex-start !important; }
        }
        @media (max-width: 480px) {
          .destinations-cards-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
