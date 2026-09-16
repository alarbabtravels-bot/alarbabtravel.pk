import { ShieldCheck, Award, Users, MapPin, Building, Globe2, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import AnimatedCounter from '../components/AnimatedCounter';

export default function About({ onOpenEligibility }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://alarbabtravel.pk/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Us",
        "item": "https://alarbabtravel.pk/about"
      }
    ]
  };

  return (
    <>
      <SEO 
        title="About Al Arbab Travels | Premier Visa Consultancy Islamabad Pakistan"
        description="Learn about Al Arbab Travels, an SECP-registered travel agency and visa consultancy in Blue Area, Islamabad. Dedicated to high-approval visa solutions."
        keywords="about Al Arbab Travels, Islamabad travel agency, visa consultant Pakistan, travel agency Islamabad, SECP registered visa consultancy"
        canonicalPath="/about"
        schema={breadcrumbSchema}
      />

      <main style={{ paddingBottom: '5rem' }}>
        {/* Page Banner */}
        <section style={{
          paddingTop: '4rem',
          paddingBottom: '3.5rem',
          position: 'relative',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div className="container">
            <div style={{ maxWidth: '760px' }}>
              <div className="badge-gold" style={{ marginBottom: '0.85rem' }}>
                <Building size={14} /> Our Heritage & Ethics
              </div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1rem', color: 'var(--text-heading)' }}>
                Redefining the Paradigm of <span style={{ color: 'var(--emerald-accent)' }}>Visa Advisory in Pakistan</span>
              </h1>
              <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                Founded in the heart of Islamabad, Al Arbab Travels was established to counter the widespread misinformation and sub-standard document handling prevalent across Pakistan’s travel consultancy market.
              </p>
            </div>
          </div>
        </section>

        {/* Story & Mission Section */}
        <section className="section-py">
          <div className="container">
            <div className="offset-grid">
              <div>
                <div className="badge-gold" style={{ marginBottom: '0.6rem' }}>
                  <ShieldCheck size={14} /> Registered &amp; Verified
                </div>
                <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.3rem)', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-heading)' }}>
                  A Legally Grounded, <span style={{ color: 'var(--emerald-accent)' }}>Client-Centric Philosophy</span>
                </h2>
                <p style={{ color: 'var(--text-body)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                  Every year, thousands of Pakistani applicants face traumatic visa refusals—not because they lacked genuine intentions, but because their cases were hastily filed with generic templates, unverified hotel bookings, or unexplained bank transactions.
                </p>
                <p style={{ color: 'var(--text-body)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                  At Al Arbab Travels, we operate like legal caseworkers. We assess each client’s socio-economic ties to Pakistan, perform line-by-line financial statement audits, and prepare bespoke cover letters that preemptively answer the exact concerns of embassy clearance officers.
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1.25rem',
                  padding: '1.25rem',
                  background: 'rgba(13, 17, 26, 0.75)',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
                }}>
                  <div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#38bdf8', fontFamily: 'var(--font-heading)' }}>
                      <AnimatedCounter endValue={98.4} decimals={1} suffix="%" />
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-heading)', fontFamily: 'var(--font-heading)' }}>Approval Benchmark</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-body)' }}>Rigorous pre-submission vetting.</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#eed88a', fontFamily: 'var(--font-heading)' }}>
                      <AnimatedCounter endValue={14500} suffix="+" />
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-heading)', fontFamily: 'var(--font-heading)' }}>Happy Travelers</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-body)' }}>Over 50 countries traveled.</div>
                  </div>
                </div>
              </div>

              {/* Accreditations & Badges */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="glass-card" style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.65rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(0, 168, 255, 0.12)',
                      border: '1px solid rgba(0, 168, 255, 0.3)',
                      boxShadow: '0 0 12px rgba(0, 168, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <ShieldCheck size={20} color="#38bdf8" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-heading)' }}>Corporate Credentials</h3>
                      <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600 }}>Registered Travel Consultancy</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                    Formally recognized and registered to operate travel, tourism, and visa advisory services under federal guidelines.
                  </p>
                </div>

                <div className="glass-card" style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.65rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(0, 168, 255, 0.12)',
                      border: '1px solid rgba(0, 168, 255, 0.3)',
                      boxShadow: '0 0 12px rgba(0, 168, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Building size={20} color="#38bdf8" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-heading)' }}>SECP Corporate Registration</h3>
                      <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600 }}>Securities & Exchange Commission of Pakistan</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                    Incorporated with full tax compliance (FBR Active Taxpayer), ensuring financial security and strict ethical governance.
                  </p>
                </div>

                <div className="glass-card" style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.65rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(0, 168, 255, 0.12)',
                      border: '1px solid rgba(0, 168, 255, 0.3)',
                      boxShadow: '0 0 12px rgba(0, 168, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Globe2 size={20} color="#38bdf8" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-heading)' }}>Global Airline & Embassy Network</h3>
                      <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600 }}>IATA Certified Global Distribution</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                    Direct access to international ticketing engines, embassy drop-box channels, and sworn translators for MOFA attestation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="section-py" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <div className="container">
            <div className="section-header text-center">
              <div className="badge-gold" style={{ marginBottom: '0.6rem' }}>
                <Award size={14} /> The Four Pillars
              </div>
              <h2 className="section-title">
                What Sets Our <span style={{ color: 'var(--emerald-accent)' }}>Practice Apart</span>
              </h2>
              <p className="section-subtitle">
                We believe that every applicant deserves transparent truth, ethical pricing, and flawless attention to detail.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}>
              {[
                {
                  title: "Zero False Promises",
                  desc: "We never guarantee a visa because embassies make the final call. Instead, we guarantee that your file will be presented in the strongest legal light possible."
                },
                {
                  title: "Forensic Document Audit",
                  desc: "We cross-reference every tax return, FRC, pay slip, and bank entry to ensure total mathematical and narrative harmony before submission."
                },
                {
                  title: "Embassy Liaison",
                  desc: "From monitoring elusive appointment slots in Islamabad, Lahore, and Karachi to scheduling fast-track biometric appointments."
                },
                {
                  title: "Complete Transparency",
                  desc: "All embassy fee receipts, confirmation pages, and reservation codes are handed directly to you. No hidden charges or opaque markups."
                }
              ].map((pillar, i) => (
                <div key={i} className="glass-card" style={{ padding: '1.75rem' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--emerald-accent)', marginBottom: '0.6rem', fontFamily: 'var(--font-heading)' }}>
                    0{i + 1}.
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-heading)' }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.65 }}>
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="section-py" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <div className="container">
            <div className="section-header text-center">
              <div className="badge-gold" style={{ marginBottom: '0.6rem' }}>
                <Users size={14} /> Senior Leadership
              </div>
              <h2 className="section-title">
                Guided by Experienced <span style={{ color: 'var(--emerald-accent)' }}>Travel Strategists</span>
              </h2>
              <p className="section-subtitle">
                Meet the senior counselors steering your visa applications and international itineraries.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              maxWidth: '1020px',
              margin: '0 auto'
            }}>
              {[
                {
                  name: "Malik Arbab",
                  role: "Founder & Principal Immigration Counselor",
                  desc: "With 15+ years navigating UKVI, Schengen, and North American consular procedures, Malik has counseled thousands of Pakistani families and entrepreneurs.",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                },
                {
                  name: "Zainab Chaudhry",
                  role: "Lead Documentation & Refusal Strategist",
                  desc: "Former immigration paralegal specializing in Appendix V compliance, funds justification dossiers, and Canadian GCMS note appeals.",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                },
                {
                  name: "Engr. Bilal Arbab",
                  role: "Managing Director & Operations Head",
                  desc: "Oversees embassy liaison logistics, GDS airline ticketing integrations, and fast-track MOFA/HEC document legalization.",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
                }
              ].map((member, i) => (
                <div key={i} className="glass-card" style={{ overflow: 'hidden' }}>
                  <div style={{ height: '240px', overflow: 'hidden' }}>
                    <img 
                      src={member.image} 
                      alt={`${member.name} - ${member.role}`}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-heading)' }}>{member.name}</h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--emerald-accent)', fontWeight: 600, marginBottom: '0.65rem', fontFamily: 'var(--font-heading)' }}>
                      {member.role}
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                      {member.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <button 
                type="button" 
                className="btn-primary"
                onClick={onOpenEligibility}
              >
                Schedule an In-Person Consultation <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
