import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Building2, Plane, Hotel, ArrowRight, Search, MapPin, ChevronDown } from 'lucide-react';

export default function HeroSearchWidget({ onOpenEligibilityWithCountry }) {
  const [activeTab, setActiveTab] = useState('visa');
  const [selectedCountry, setSelectedCountry] = useState('uk');
  const [selectedFlightDest, setSelectedFlightDest] = useState('Dubai (UAE)');
  const [selectedHotelDest, setSelectedHotelDest] = useState('Makkah, Saudi Arabia');

  const countryOptions = [
    { value: 'uk', label: 'United Kingdom (UK)' },
    { value: 'schengen', label: 'Schengen Area (Europe)' },
    { value: 'usa', label: 'United States (File Prep)' },
    { value: 'canada', label: 'Canada' },
    { value: 'australia', label: 'Australia' },
    { value: 'malaysia', label: 'Malaysia' },
    { value: 'thailand', label: 'Thailand' },
    { value: 'singapore', label: 'Singapore' },
    { value: 'uae', label: 'Dubai & UAE' },
    { value: 'turkey', label: 'Turkey' },
    { value: 'saudi', label: 'Saudi Arabia' }
  ];

  const tabs = [
    { id: 'visa', label: 'Visa Check', icon: <ShieldCheck size={16} /> },
    { id: 'umrah', label: 'Umrah Packages', icon: <Building2 size={16} /> },
    { id: 'flights', label: 'Flights', icon: <Plane size={16} /> },
    { id: 'hotels', label: 'Hotels', icon: <Hotel size={16} /> }
  ];

  const waLink = (msg) => `https://wa.me/923099923232?text=${encodeURIComponent(msg)}`;

  return (
    <div className="liquid-glass-widget">
      {/* 1. Frosted Glass Tab Row Track */}
      <div className="glass-tab-track">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`glass-tab-pill ${isActive ? 'is-active' : ''}`}
            >
              <span className="glass-tab-icon">{tab.icon}</span>
              <span className="glass-tab-label">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Glass Content Body Area */}
      <div className="glass-content-body">
        {/* TAB 1: VISA CHECK */}
        {activeTab === 'visa' && (
          <div className="glass-form-grid">
            <div className="glass-field-group">
              <label className="glass-field-label">
                <Search size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: '-1px' }} />
                Destination Country
              </label>
              <div className="glass-select-wrapper">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="glass-search-select"
                >
                  {countryOptions.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                <ChevronDown size={17} className="glass-select-chevron" />
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenEligibilityWithCountry?.(selectedCountry)}
              className="glass-action-button"
            >
              <span>Check Eligibility</span>
              <ArrowRight size={17} />
            </button>
          </div>
        )}

        {/* TAB 2: UMRAH PACKAGES */}
        {activeTab === 'umrah' && (
          <div className="glass-form-grid glass-umrah-grid">
            <div className="glass-info-text-box">
              <div className="glass-field-label">
                <Building2 size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: '-1px' }} />
                Sacred Pilgrimages
              </div>
              <p className="glass-info-desc">
                Official Nusuk visa processing, verified 3★ to 5★ Haram-adjacent hotel vouchers, and Haramain high-speed train tickets.
              </p>
            </div>

            <Link to="/services/umrah-hajj" className="glass-action-button">
              <span>Explore Umrah Packages</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        )}

        {/* TAB 3: FLIGHTS */}
        {activeTab === 'flights' && (
          <div className="glass-form-grid">
            <div className="glass-field-group">
              <label className="glass-field-label">
                <Plane size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: '-1px' }} />
                Flying To
              </label>
              <div className="glass-select-wrapper">
                <select
                  value={selectedFlightDest}
                  onChange={(e) => setSelectedFlightDest(e.target.value)}
                  className="glass-search-select"
                >
                  {[
                    'Dubai (UAE)',
                    'Jeddah / Madinah (Saudi Arabia)',
                    'Kuala Lumpur (Malaysia)',
                    'Bangkok (Thailand)',
                    'Istanbul (Turkey)',
                    'London (UK)',
                    'Toronto (Canada)',
                    'Sydney (Australia)'
                  ].map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <ChevronDown size={17} className="glass-select-chevron" />
              </div>
            </div>

            <a
              href={waLink(`Assalam o Alaikum, I would like a flight fare quote to ${selectedFlightDest} from Islamabad.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-action-button"
            >
              <span>Get Fare on WhatsApp</span>
              <ArrowRight size={17} />
            </a>
          </div>
        )}

        {/* TAB 4: HOTELS */}
        {activeTab === 'hotels' && (
          <div className="glass-form-grid">
            <div className="glass-field-group">
              <label className="glass-field-label">
                <Hotel size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: '-1px' }} />
                Hotel Destination
              </label>
              <div className="glass-select-wrapper">
                <select
                  value={selectedHotelDest}
                  onChange={(e) => setSelectedHotelDest(e.target.value)}
                  className="glass-search-select"
                >
                  {[
                    'Makkah, Saudi Arabia',
                    'Madinah, Saudi Arabia',
                    'Dubai, UAE',
                    'Istanbul, Turkey',
                    'Kuala Lumpur, Malaysia',
                    'Bangkok, Thailand',
                    'London, UK'
                  ].map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <ChevronDown size={17} className="glass-select-chevron" />
              </div>
            </div>

            <a
              href={waLink(`Assalam o Alaikum, I would like hotel booking assistance for ${selectedHotelDest}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-action-button"
            >
              <span>Check Availability</span>
              <ArrowRight size={17} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
