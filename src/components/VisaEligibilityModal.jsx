import { useState } from 'react';
import { X, CheckCircle, ArrowRight, ShieldCheck, FileCheck } from 'lucide-react';
import { destinations } from '../data/destinationsData';

export default function VisaEligibilityModal({ isOpen, onClose, preselectedCountry = '' }) {
  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(preselectedCountry || 'uk');
  const [visaType, setVisaType] = useState('Tourist / Visit');
  const [employmentStatus, setEmploymentStatus] = useState('Salaried Professional');
  const [hasPreviousRefusal, setHasPreviousRefusal] = useState('No');
  const [hasValidPassport, setHasValidPassport] = useState('Yes (6+ Months)');

  if (!isOpen) return null;

  const currentDest = destinations.find(d => d.id === selectedCountry) || destinations[0];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const generateWhatsAppInquiry = () => {
    const text = `Assalam o Alaikum Al Arbab Travels!
I completed the Visa Assessment on alarbabtravel.pk:
- Destination: ${currentDest.country}
- Visa Category: ${visaType}
- Employment: ${employmentStatus}
- Previous Refusals: ${hasPreviousRefusal}
- Passport Status: ${hasValidPassport}

Please review my eligibility and advise on next steps.`;
    
    window.open(`https://wa.me/923099923232?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        backgroundColor: 'rgba(26, 46, 40, 0.55)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          position: 'relative',
          background: 'rgba(11, 15, 24, 0.96)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          borderRadius: 'var(--radius-card)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 168, 255, 0.18)',
          color: '#ffffff'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close Assessment Modal"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '8px',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 168, 255, 0.25)';
            e.currentTarget.style.borderColor = '#00a8ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div className="badge-gold" style={{ marginBottom: '0.5rem' }}>
            <ShieldCheck size={14} /> Instant Visa Eligibility
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
            Check Your <span style={{ color: 'var(--emerald-accent)' }}>Approval Chances</span>
          </h2>
          <p style={{ color: 'var(--text-body)', fontSize: '0.9rem' }}>
            Get an instant custom document checklist and bank statement estimate for Pakistani applicants.
          </p>

          {/* Stepper Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '1.25rem'
          }}>
            {[1, 2, 3].map((s) => (
              <div 
                key={s}
                style={{
                  flex: 1,
                  height: '4px',
                  borderRadius: '2px',
                  backgroundColor: step >= s ? '#00a8ff' : 'rgba(255, 255, 255, 0.15)',
                  boxShadow: step >= s ? '0 0 8px #00a8ff' : 'none',
                  transition: 'background-color 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Destination & Visa */}
        {step === 1 && (
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-heading)', fontFamily: 'var(--font-heading)' }}>
              1. Select Intended Destination
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(125px, 1fr))',
              gap: '8px',
              marginBottom: '1.5rem'
            }}>
              {destinations.map((dest) => (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() => setSelectedCountry(dest.id)}
                  style={{
                    padding: '0.75rem 0.5rem',
                    borderRadius: '10px',
                    border: selectedCountry === dest.id 
                      ? '1.5px solid #00a8ff' 
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    background: selectedCountry === dest.id 
                      ? 'rgba(0, 168, 255, 0.18)' 
                      : 'rgba(255, 255, 255, 0.03)',
                    color: selectedCountry === dest.id ? '#ffffff' : '#cbd5e1',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: selectedCountry === dest.id ? '0 0 16px rgba(0, 168, 255, 0.3)' : 'none'
                  }}
                >
                  <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>{dest.flag}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{dest.country.split(' ')[0]}</div>
                </button>
              ))}
            </div>

            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-heading)', fontFamily: 'var(--font-heading)' }}>
              2. Visa Category
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '1.75rem' }}>
              {["Tourist / Visit", "Student Visa", "Business / Conference", "Work / Skilled Migration"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setVisaType(type)}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: visaType === type ? '1.5px solid #00a8ff' : '1px solid rgba(255, 255, 255, 0.1)',
                    background: visaType === type ? 'rgba(0, 168, 255, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                    color: visaType === type ? '#ffffff' : '#cbd5e1',
                    fontSize: '0.85rem',
                    fontWeight: visaType === type ? 600 : 500,
                    textAlign: 'left',
                    cursor: 'pointer',
                    boxShadow: visaType === type ? '0 0 14px rgba(0, 168, 255, 0.25)' : 'none'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                type="button" 
                className="btn-primary"
                onClick={handleNext}
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Applicant Profile */}
        {step === 2 && (
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-heading)', fontFamily: 'var(--font-heading)' }}>
                Your Employment / Income Status
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {[
                  "Salaried Professional", 
                  "Business Owner", 
                  "Freelancer / Remote", 
                  "Student / Dependent"
                ].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setEmploymentStatus(status)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: employmentStatus === status ? '1.5px solid #00a8ff' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: employmentStatus === status ? 'rgba(0, 168, 255, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                      color: employmentStatus === status ? '#ffffff' : '#cbd5e1',
                      fontSize: '0.82rem',
                      fontWeight: employmentStatus === status ? 600 : 500,
                      textAlign: 'left',
                      cursor: 'pointer',
                      boxShadow: employmentStatus === status ? '0 0 14px rgba(0, 168, 255, 0.25)' : 'none'
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-heading)', fontFamily: 'var(--font-heading)' }}>
                Previous Visa Refusals?
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {["No (Clean Travel History)", "Yes (1+ Refusals)"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setHasPreviousRefusal(opt)}
                    style={{
                      flex: 1,
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: hasPreviousRefusal === opt ? '1.5px solid #00a8ff' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: hasPreviousRefusal === opt ? 'rgba(0, 168, 255, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                      color: hasPreviousRefusal === opt ? '#ffffff' : '#cbd5e1',
                      fontSize: '0.85rem',
                      fontWeight: hasPreviousRefusal === opt ? 600 : 500,
                      cursor: 'pointer',
                      boxShadow: hasPreviousRefusal === opt ? '0 0 14px rgba(0, 168, 255, 0.25)' : 'none'
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-heading)', fontFamily: 'var(--font-heading)' }}>
                Pakistani Passport Status
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {["Yes (6+ Months Validity)", "Needs Renewal"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setHasValidPassport(opt)}
                    style={{
                      flex: 1,
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: hasValidPassport === opt ? '1.5px solid #00a8ff' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: hasValidPassport === opt ? 'rgba(0, 168, 255, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                      color: hasValidPassport === opt ? '#ffffff' : '#cbd5e1',
                      fontSize: '0.85rem',
                      fontWeight: hasValidPassport === opt ? 600 : 500,
                      cursor: 'pointer',
                      boxShadow: hasValidPassport === opt ? '0 0 14px rgba(0, 168, 255, 0.25)' : 'none'
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={handlePrev}
              >
                Back
              </button>
              <button 
                type="button" 
                className="btn-primary"
                onClick={handleNext}
              >
                Generate Assessment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Assessment Result */}
        {step === 3 && (
          <div>
            <div style={{
              background: 'rgba(16, 22, 34, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '12px',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.8rem' }}>{currentDest.flag}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-heading)', fontFamily: 'var(--font-heading)' }}>{currentDest.country}</div>
                    <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600 }}>{visaType}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Service Scope
                  </div>
                  <div style={{ color: '#eed88a', fontWeight: 700, fontSize: '0.95rem', fontFamily: 'var(--font-heading)' }}>
                    {hasPreviousRefusal.startsWith('Yes') ? 'Case Audit Required' : (currentDest.serviceScope || currentDest.approvalRate)}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '0.82rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Min Closing Balance:</span>
                  <div style={{ fontWeight: 700, color: '#ffffff' }}>{currentDest.minBankStatement}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Processing Time:</span>
                  <div style={{ fontWeight: 700, color: '#38bdf8' }}>{currentDest.processingTime.split('(')[0]}</div>
                </div>
              </div>

              {(currentDest.id === 'schengen' || currentDest.id === 'usa') && (
                <div style={{
                  marginTop: '0.75rem',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  background: 'rgba(56, 189, 248, 0.08)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  fontSize: '0.75rem',
                  color: '#7dd3fc',
                  lineHeight: 1.4
                }}>
                  ℹ️ <strong>Scope Notice:</strong> Application support &amp; file preparation only. We do not process, submit, or guarantee visa approvals.
                </div>
              )}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.65rem', color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-heading)' }}>
                <FileCheck size={16} color="#38bdf8" /> Document Checklist:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto' }}>
                {currentDest.keyRequirements.map((req, idx) => (
                  <div 
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      fontSize: '0.82rem',
                      color: 'var(--text-body)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    <CheckCircle size={14} color="#38bdf8" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                type="button"
                className="btn-whatsapp"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={generateWhatsAppInquiry}
              >
                Send Assessment to WhatsApp Counselor
              </button>

              <button
                type="button"
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={onClose}
              >
                Close Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
