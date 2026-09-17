import { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, 
  Building, Sparkles 
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

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
      "telephone": "+92-309-9923232",
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
        title="Contact Us & Islamabad Office Location | Al Arbab Travels"
        description="Visit Al Arbab Travels in Blue Area, Islamabad. Call +92 345 5320968 or WhatsApp +92 315 5436696 for in-person visa consultancy & Umrah consultations."
        keywords="contact Al Arbab Travels, Islamabad travel agency address, visa consultant Blue Area Islamabad phone, travel agency Islamabad contact number"
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
              <h1 style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1rem', color: '#ffffff' }}>
                Connect With Our <span style={{ color: 'var(--gold-accent)' }}>Visa Counselors</span>
              </h1>
              <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                Visit our Islamabad office for confidential document verification, or connect immediately through direct telephone and WhatsApp.
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

                <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.3rem)', fontWeight: 700, marginBottom: '1rem', color: '#ffffff' }}>
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
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '2px', color: '#ffffff' }}>Physical Office Address</h3>
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
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '2px', color: '#ffffff' }}>Telephone &amp; WhatsApp</h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                        Calling Number: <a href="tel:+923099923232" style={{ color: 'var(--gold-accent)', fontWeight: 600 }}>+92 309 9923232</a><br />
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
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '2px', color: '#ffffff' }}>Consulting Hours</h3>
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
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.35rem', color: '#ffffff' }}>
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
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.35rem', color: '#ffffff' }}>
                  Schedule Case Evaluation
                </h3>
                <p style={{ color: 'var(--text-body)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                  Fill out your preliminary travel plans and our senior advisor will contact you with a tailored review.
                </p>

                {submitted ? (
                  <div style={{
                    padding: '2rem',
                    background: 'rgba(212, 175, 55, 0.08)',
                    border: '1px solid var(--gold-border)',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <CheckCircle2 size={40} color="var(--gold-accent)" style={{ margin: '0 auto 0.75rem' }} />
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.35rem', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
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
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
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
                        <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
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
                        <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
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
                        <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                          Intended Destination
                        </label>
                        <select
                          value={formData.destination}
                          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                          className="glass-input"
                          style={{ background: 'var(--bg-primary)' }}
                        >
                          {destinations.map((d) => (
                            <option key={d.id} value={d.id} style={{ background: '#0a0e1a', color: '#fff' }}>
                              {d.flag} {d.country}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                          Visa Category
                        </label>
                        <select
                          value={formData.visaType}
                          onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                          className="glass-input"
                          style={{ background: 'var(--bg-primary)' }}
                        >
                          <option value="Tourist / Visit" style={{ background: '#0a0e1a', color: '#fff' }}>Tourist / Visit</option>
                          <option value="Student Visa" style={{ background: '#0a0e1a', color: '#fff' }}>Student Study Permit</option>
                          <option value="Work / Skilled Visa" style={{ background: '#0a0e1a', color: '#fff' }}>Work / Skilled Visa</option>
                          <option value="Business / Commercial" style={{ background: '#0a0e1a', color: '#fff' }}>Business / Commercial</option>
                          <option value="Document Attestation" style={{ background: '#0a0e1a', color: '#fff' }}>MOFA / Attestation</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.82rem', fontWeight: 600, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
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
                      className="btn-primary"
                      style={{ width: '100%', justifyContent: 'center', marginTop: '0.25rem' }}
                    >
                      <Send size={15} /> Submit Consultation Request
                    </button>
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
                <h2 style={{ fontSize: '1.65rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
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
