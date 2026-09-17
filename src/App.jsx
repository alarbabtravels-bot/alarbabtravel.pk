import { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VisaEligibilityModal from './components/VisaEligibilityModal';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';

// Lazy load page components for Core Web Vitals performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Destinations = lazy(() => import('./pages/Destinations'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));

function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div style={{
        width: '44px',
        height: '44px',
        border: '3px solid rgba(212, 175, 55, 0.2)',
        borderTopColor: 'var(--gold-400)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        Loading Al Arbab Concierge...
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

import SEO from './components/SEO';

function NotFound() {
  return (
    <>
      <SEO 
        title="404 - Page Not Found | Al Arbab Travels Islamabad"
        description="The requested page could not be found. Please browse our verified visa services, Umrah packages, and destination guides."
        noIndex={true}
      />
      <div className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 1rem' }}>
        <div className="glass-card" style={{ padding: '3.5rem 2rem', maxWidth: '540px' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--gold-400)', marginBottom: '0.5rem' }}>404</h1>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Page Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            The page you are looking for does not exist or has been relocated.
          </p>
          <Link to="/" className="btn-primary">
            Return to Homepage
          </Link>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [eligibilityModalOpen, setEligibilityModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('uk');

  const handleOpenEligibility = () => {
    setSelectedCountry('uk');
    setEligibilityModalOpen(true);
  };

  const handleOpenEligibilityWithCountry = (countryId) => {
    setSelectedCountry(countryId);
    setEligibilityModalOpen(true);
  };

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Full-Body Ambient Travel Canvas (Deep Atmospheric Glows) */}
        <div className="fullbody-topographic-canvas" aria-hidden="true">
          <div className="topo-mesh-grid" />
          <div className="topo-ambient-cyan" />
          <div className="topo-ambient-purple" />
          <div className="topo-ambient-magenta" />
          <div className="topo-dark-vignette" />
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar onOpenEligibility={handleOpenEligibility} />

        <Suspense fallback={<PageLoader />}>
          <div style={{ flex: 1, minHeight: '80vh' }}>
            <Routes>
              <Route path="/" element={<Home onOpenEligibility={handleOpenEligibility} />} />
              <Route path="/about" element={<About onOpenEligibility={handleOpenEligibility} />} />
              <Route path="/services" element={<Services onOpenEligibility={handleOpenEligibility} />} />
              <Route path="/services/:serviceSlug" element={<Services onOpenEligibility={handleOpenEligibility} />} />
              <Route 
                path="/destinations" 
                element={<Destinations onOpenEligibilityWithCountry={handleOpenEligibilityWithCountry} />} 
              />
              <Route 
                path="/destinations/:countrySlug" 
                element={<Destinations onOpenEligibilityWithCountry={handleOpenEligibilityWithCountry} />} 
              />
              <Route path="/faq" element={<FAQ onOpenEligibility={handleOpenEligibility} />} />
              <Route path="/blog" element={<Blog onOpenEligibility={handleOpenEligibility} />} />
              <Route path="/blog/:postSlug" element={<Blog onOpenEligibility={handleOpenEligibility} />} />
              <Route path="/contact" element={<Contact onOpenEligibility={handleOpenEligibility} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          <Footer onOpenEligibility={handleOpenEligibility} />
        </Suspense>

        {/* Global Floating Glass Widgets */}
        <WhatsAppFloatingButton />

        <VisaEligibilityModal 
          isOpen={eligibilityModalOpen} 
          onClose={() => setEligibilityModalOpen(false)} 
          preselectedCountry={selectedCountry}
        />
        </div>
      </div>
    </BrowserRouter>
  );
}
