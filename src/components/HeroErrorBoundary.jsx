import React from 'react';

export default class HeroErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Hero component error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section style={{
          minHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '4rem 1.5rem',
          background: '#070a10'
        }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem' }}>
            AL ARBAB <span className="text-gold-gradient">TRAVELS</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '2rem' }}>
            Where Your Journey Begins. Premier Visa Consultancy & Luxury Travel Concierge in Islamabad.
          </p>
          <button 
            type="button"
            className="btn-primary" 
            onClick={this.props.onOpenEligibility}
          >
            Check Visa Eligibility
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}
