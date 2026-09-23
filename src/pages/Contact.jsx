import { useState, useRef, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, 
  Building, Sparkles, ShieldCheck, AlertCircle 
} from 'lucide-react';
import SEO from '../components/SEO';
import { destinations } from '../data/destinationsData';

export default function Contact({ onOpenEligibility }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: 'uk',
    visaType: 'Tourist / Visit',
    travelDate: '',
    message: ''
  });

  // Anti-spam, Honeypot & Rate-limiting security state
  const [honeypot, setHoneypot] = useState('');
  const [rateLimitError, setRateLimitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formLoadTimeRef = useRef(Date.now());

  useEffect(() => {
    formLoadTimeRef.current = Date.now();
  }, []);

  const RATE_LIMIT_KEY = 'alarbab_consultation_timestamps';
  const MAX_ATTEMPTS = 3;
  const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

  const checkRateLimit = () => {
    try {
      const raw = localStorage.getItem(RATE_LIMIT_KEY);
      const history = raw ? JSON.parse(raw) : [];
      const now = Date.now();
      const recent = history.filter(ts => (now - ts) < WINDOW_MS);

      if (recent.length >= MAX_ATTEMPTS) {
        return false;
      }
      recent.push(now);
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent));
      return true;
    } catch {
      return true;
    }
  };

  const sanitize = (str) => (str || '').replace(/[<>]/g, '').trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    setRateLimitError('');

    // 1. Honeypot check: If the hidden honeypot field is filled, it's an automated bot
    if (honeypot.trim().length > 0) {
      console.warn('Bot submission blocked via honeypot.');
      setSubmitted(true); // Fake success response to neutralize automated scraper
      return;
    }

    // 2. Time-trap check: Humans take at least 2.5 seconds to fill out this form
    const elapsedTime = Date.now() - formLoadTimeRef.current;
    if (elapsedTime < 2500) {
      console.warn('Inhuman submission speed detected (<2.5s).');
      setSubmitted(true); // Neutralize bot submission
      return;
    }

    // 3. Client-side Rate Limiting (max 3 submissions per 10 minutes)
    if (!checkRateLimit()) {
      setRateLimitError('Submission limit reached. To prevent automated spam, please wait a few minutes or contact our duty counselor directly on WhatsApp (+92 309 9923232).');
      return;
    }

    // 4. Sanitize inputs
    const cleanData = {
      name: sanitize(formData.name),
      phone: sanitize(formData.phone),
      email: sanitize(formData.email),
      destination: formData.destination,
      visaType: formData.visaType,
      message: sanitize(formData.message)
    };

    setIsSubmitting(true);
    setTimeout(() => {
      setFormData(prev => ({ ...prev, ...cleanData }));
      setIsSubmitting(false);
      setSubmitted(true);
    }, 350);
  };

  const handleWhatsAppDirect = () => {
    const destName = destinations.find(d => d.id === formData.destination)?.country || 'International';
    const text = `Assalam o Alaikum Al Arbab Travels!
Name: ${formData.name || 'Applicant'}
Phone: ${formData.phone || 'N/A'}
Destination: ${destName}
Visa Type: ${formData.visaType}
Message: ${formData.message || 'I would like to schedule a consultation in Islamabad.'}`;

    window.open(`https://wa.me/923099923232?text=${encodeURIComponent(text)}`, '_blank');
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Al Arbab Travels (Pvt) Ltd",
    "description": "Get in touch with Al Arbab Travels in Blue Area, Islamabad for visa consultancy and travel packages.",
    "mainEntity": {
      "@type": "TravelAgency",
      "@id": "https://alarbabtravel.pk/#organization",
      "name": "Al Arbab Travels (Pvt) Ltd",
      "telephone": ["+92-51-2000066", "+92-309-9923232", "+92-315-2323811"],
      "email": "consult@alarbabtravel.pk",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Eagle Plaza, Mezzanine No. 121, Fazal-e-Haq Road, Blue Area",
        "addressLocality": "Islamabad",
        "addressRegion": "Islamabad Capital Territory",
        "postalCode": "44000",
        "addressCountry": "PK"
      }
    }
  };

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
        "name": "Contact Us",
        "item": "https://alarbabtravel.pk/contact"
      }
    ]
  };

  return (
    <>
      <SEO 
        title="Contact Best Travel Agency in Blue Area Islamabad | Al Arbab Travels"
        description="Contact Al Arbab Travels in Blue Area, Islamabad. Best travel agency near you for visa consultancy, Umrah packages & air ticketing. Call +92 309 9923232."
        keywords="best travel agency in Blue Area Islamabad, best travel agency near me, travel agency near me Blue Area, best visa consultants near me, visa consultancy in Islamabad, travel agency Islamabad contact number, travel agency Rawalpindi Islamabad"
        canonicalPath="/contact"
        schema={[contactSchema, breadcrumbSchema]}
      />

      <main style={{ paddingBottom: '5rem' }}>
        {/* Banner */}
        <section style={{
          paddingTop: '4rem',
          paddingBottom: '3.5rem',
          position: 'relative',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div className="container">
            <div style={{ maxWidth: '760px' }}>
              <div className="badge-gold" style={{ marginBottom: '0.85rem' }}>
                <MapPin size={14} /> Blue Area, Islamabad
              </div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1rem', color: 'var(--text-heading)' }}>
                Contact Best Travel Agency in <span style={{ color: 'var(--gold-accent)' }}>Blue Area Islamabad</span>
              </h1>
              <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                Visit our Blue Area Islamabad office for in-person profile evaluations, Umrah bookings, and visa file reviews, or connect via telephone and WhatsApp.
              </p>
            </div>
          </div>
        </section>

        <section className="section-py">
          <div className="container">
            <div className="offset-grid" style={{ alignItems: 'flex-start' }}>
              {/* Left Column: Office Details */}
              <div>
                <div className="badge-gold" style={{ marginBottom: '0.6rem' }}>
                  <Building size={14} /> Head Office Islamabad
                </div>

                <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.3rem)', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-heading)' }}>
                  Visit Our Office or <span style={{ color: 'var(--gold-accent)' }}>Call Us Directly</span>
                </h2>

                <p style={{ color: 'var(--text-body)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Centrally located on Jinnah Avenue in Blue Area, Islamabad—just minutes from Gerry's Visa Drop Box and diplomatic enclaves.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                  <div className="glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'var(--gold-muted)',
                      border: '1px solid var(--gold-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <MapPin size={20} color="var(--gold-accent)" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '2px', color: 'var(--text-heading)' }}>Physical Office Address</h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                        Eagle Plaza, Mezzanine No. 121, Fazal-e-Haq Road, Blue Area, Islamabad, 44000, Pakistan.
                      </p>
                    </div>
                  </div>

                  <div className="glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'var(--gold-muted)',
                      border: '1px solid var(--gold-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Phone size={20} color="var(--gold-accent)" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '2px', color: 'var(--text-heading)' }}>Telephone &amp; WhatsApp</h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                        Direct Calling: <a href="tel:+923099923232" style={{ color: 'var(--gold-accent)', fontWeight: 600 }}>0309 9923232</a> / <a href="tel:+923152323811" style={{ color: 'var(--gold-accent)', fontWeight: 600 }}>0315 2323811</a><br />
                        PTCL Landline: <a href="tel:0512000066" style={{ color: 'var(--gold-accent)', fontWeight: 600 }}>051 2000066</a><br />
                        WhatsApp Support: <a href="https://wa.me/923099923232" target="_blank" rel="noopener noreferrer" style={{ color: '#4ade80', fontWeight: 600 }}>0309 9923232</a>
                      </p>
                    </div>
                  </div>

                  <div className="glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'var(--gold-muted)',
                      border: '1px solid var(--gold-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Clock size={20} color="var(--gold-accent)" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '2px', color: 'var(--text-heading)' }}>Consulting Hours</h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                        Monday to Saturday: 9:30 AM – 6:30 PM (PKT)<br />
                        Sunday: Closed / 24/7 WhatsApp Available
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp Action Box */}
                <div 
                  className="glass-card"
                  style={{
                    padding: '1.5rem',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--gold-border)'
                  }}
                >
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-heading)' }}>
                    Prefer Immediate WhatsApp Discussion?
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', marginBottom: '1rem' }}>
                    Send your questions directly to our duty counselor on <strong>0309 9923232</strong> for swift assessment without filling forms.
                  </p>
                  <a
                    href="https://wa.me/923099923232?text=Assalam%20o%20Alaikum,%20I%20would%20like%20to%20consult%20Al%20Arbab%20Travels."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <MessageCircle size={18} /> Chat on WhatsApp (0309 9923232)
                  </a>
                </div>
              </div>

              {/* Right Column: Consultation Form */}
              <div 
                className="glass-card"
                style={{
                  padding: 'clamp(1.25rem, 3.5vw, 2rem)',
                  background: 'var(--bg-surface)'
                }}
              >
                <div className="badge-gold" style={{ marginBottom: '0.65rem' }}>
                  <Sparkles size={14} /> Priority Booking
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-heading)' }}>
                  Schedule Case Evaluation
                </h3>
                <p style={{ color: 'var(--text-body)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                  Fill out your preliminary travel plans and our senior advisor will contact you with a tailored review.
                </p>

                {rateLimitError && (
                  <div style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ef4444',
                    fontSize: '0.84rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '1rem',
                    lineHeight: 1.5
                  }}>
                    <AlertCircle size={16} style={{ flexShrink: 0 }} />
                    <span>{rateLimitError}</span>
                  </div>
                )}

                {submitted ? (
                  <div style={{
                    padding: '2rem',
                    background: 'rgba(212, 175, 55, 0.08)',
                    border: '1px solid var(--gold-border)',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <CheckCircle2 size={40} color="var(--gold-accent)" style={{ margin: '0 auto 0.75rem' }} />
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-heading)', fontFamily: 'var(--font-heading)' }}>
                      Inquiry Received!
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      Thank you, <strong>{formData.name}</strong>. A senior counselor from our Islamabad office will review your profile and reach out within 2 business hours.
                    </p>
                    <button
                      type="button"
                      className="btn-whatsapp"
                      onClick={handleWhatsAppDirect}
                      style={{ margin: '0 auto' }}
                    >
                      Continue to WhatsApp for Fast Review
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
                    {/* Anti-Spam Honeypot Field (invisible to real visitors, traps automated scrapers) */}
                    <div 
                      style={{ 
                        opacity: 0, 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        height: 0, 
                        width: 0, 
                        zIndex: -1, 
                        overflow: 'hidden', 
                        pointerEvents: 'none' 
                      }}
                      aria-hidden="true"
                    >
                      <label htmlFor="company_website">Do not fill this field</label>
                      <input 
                        type="text" 
                        id="company_website" 
                        name="company_website" 
                        tabIndex="-1" 
                        autoComplete="off" 
                        value={honeypot} 
                        onChange={(e) => setHoneypot(e.target.value)} 
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-heading)', fontFamily: 'var(--font-heading)' }}>
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Muhammad Hamza"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="glass-input"
                      />
                    </div>

                    <div className="form-row-2col">
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-heading)', fontFamily: 'var(--font-heading)' }}>
                          WhatsApp / Mobile *
                        </label>
                        <input 
                          type="tel" 
                          required
                          placeholder="0300 1234567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="glass-input"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-heading)', fontFamily: 'var(--font-heading)' }}>
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          placeholder="hamza@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="glass-input"
                        />
                      </div>
                    </div>

                    <div className="form-row-2col">
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-heading)', fontFamily: 'var(--font-heading)' }}>
                          Intended Destination
                        </label>
                        <select
                          value={formData.destination}
                          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                          className="glass-input"
                          style={{ background: 'var(--bg-primary)' }}
                        >
                          {destinations.map((d) => (
                            <option key={d.id} value={d.id} style={{ background: '#ffffff', color: '#0f1f30' }}>
                              {d.flag} {d.country}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-heading)', fontFamily: 'var(--font-heading)' }}>
                          Visa Category
                        </label>
                        <select
                          value={formData.visaType}
                          onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                          className="glass-input"
                          style={{ background: 'var(--bg-primary)' }}
                        >
                          <option value="Tourist / Visit" style={{ background: '#ffffff', color: '#0f1f30' }}>Tourist / Visit</option>
                          <option value="Student Visa" style={{ background: '#ffffff', color: '#0f1f30' }}>Student Study Permit</option>
                          <option value="Work / Skilled Visa" style={{ background: '#ffffff', color: '#0f1f30' }}>Work / Skilled Visa</option>
                          <option value="Business / Commercial" style={{ background: '#ffffff', color: '#0f1f30' }}>Business / Commercial</option>
                          <option value="Document Attestation" style={{ background: '#ffffff', color: '#0f1f30' }}>MOFA / Attestation</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-heading)', fontFamily: 'var(--font-heading)' }}>
                        Case Notes / Specific Inquiries
                      </label>
                      <textarea 
                        rows="3"
                        placeholder="Provide details such as intended travel date or previous refusal history..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="glass-input"
                        style={{ resize: 'vertical' }}
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="btn-primary"
                      style={{ width: '100%', justifyContent: 'center', marginTop: '0.25rem', opacity: isSubmitting ? 0.7 : 1 }}
                    >
                      <Send size={15} /> {isSubmitting ? 'Verifying & Submitting...' : 'Submit Consultation Request'}
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                      <ShieldCheck size={14} color="#2563eb" />
                      <span>Confidential &bull; Protected by Anti-Spam Rate Limiting</span>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Embedded Google Map */}
            <div style={{ marginTop: '4rem' }}>
              <div className="badge-gold" style={{ marginBottom: '0.65rem' }}>
                <MapPin size={14} /> Interactive Map &amp; Directions
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--text-heading)', margin: 0 }}>
                  Eagle Plaza, <span style={{ color: 'var(--gold-accent)' }}>Blue Area, Islamabad</span>
                </h2>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Eagle+Plaza,+Fazal-e-Haq+Road,+Blue+Area,+Islamabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
                >
                  <MapPin size={14} /> Open in Google Maps
                </a>
              </div>

              <div 
                className="glass-card" 
                style={{ 
                  height: '380px', 
                  overflow: 'hidden', 
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '16px'
                }}
              >
                <iframe
                  title="Al Arbab Travels Islamabad Office Location - Eagle Plaza"
                  src="https://maps.google.com/maps?q=Eagle+Plaza,+Fazal-e-Haq+Road,+Blue+Area,+Islamabad&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
