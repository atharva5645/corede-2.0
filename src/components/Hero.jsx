import React, { useState } from 'react';
import { ArrowRight, Phone, MessageSquare, Video, X } from 'lucide-react';

export default function Hero({ onOpenQuote, onOpenBrochure }) {
  const [showCallPopup, setShowCallPopup] = useState(false);

  return (
    <section className="hero-section" id="hero">
      <div className="clay-container">
        <div className="hero-grid-layout">
          {/* Left Column: Copy & Actions */}
          <div className="hero-content-clean">
            {/* Editorial Eyebrow with Live Status Indicator */}
            <div className="hero-status-badge">
              <span className="status-dot-pulse" aria-hidden="true" />
              <span className="hero-eyebrow-text">COREDE DIGITAL ECOSYSTEM — LIVE</span>
            </div>

            {/* Fluid Editorial Headline */}
            <h1 className="hero-headline">
              Global IT Partner for <br className="hero-desktop-br" />
              <span className="hero-headline-accent">Sustainable Growth</span> &amp; Innovation.
            </h1>

            {/* Lead Summary */}
            <p className="hero-summary">
              CoreDe Technologies is a premier{' '}
              <strong>Software Development Company in India</strong>,{' '}
              specializing in{' '}
              <strong>Custom Software Solutions</strong>{' '}
              and high-performance digital strategies for global enterprises.
            </p>

            {/* Actions Row (Clay Pill Buttons) */}
            <div className="hero-actions-row">
              <button 
                type="button" 
                className="btn-primary hero-btn-quote"
                onClick={onOpenQuote}
                id="hero-quote-trigger"
              >
                <span>Request a Quote</span>
                <ArrowRight size={16} />
              </button>

              <div className="hero-call-wrapper">
                <button 
                  type="button"
                  className="btn-secondary hero-btn-phone"
                  onClick={() => setShowCallPopup(!showCallPopup)}
                  aria-label="Direct Phone Contact"
                  aria-expanded={showCallPopup}
                >
                  <Phone size={14} />
                  <span>91 8951029849</span>
                </button>

                {/* Call Contact Options Popup (Frosted Glass Surface) */}
                {showCallPopup && (
                  <div className="call-popup-card glass-surface">
                    <div className="call-popup-header">
                      <h4>Choose how to contact</h4>
                      <button 
                        type="button" 
                        className="call-popup-close"
                        onClick={() => setShowCallPopup(false)}
                        aria-label="Close options"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <div className="call-popup-options">
                      <a 
                        href="https://wa.me/919008110807" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="call-option-item whatsapp-opt"
                      >
                        <span className="opt-icon">💬</span>
                        <span>WhatsApp (+91 9008110807)</span>
                      </a>
                      <a 
                        href="skype:+919008110807?call" 
                        className="call-option-item skype-opt"
                      >
                        <span className="opt-icon">📞</span>
                        <span>Skype Call</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Architectural Hairline Proof Row */}
            <div className="hero-proof-row">
              <div className="hero-proof-item">
                <span className="proof-number">350+</span>
                <span className="proof-label">Enterprise Deployments</span>
              </div>
              <div className="hero-proof-divider" />
              <div className="hero-proof-item">
                <span className="proof-number">25+</span>
                <span className="proof-label">Global Partners</span>
              </div>
              <div className="hero-proof-divider" />
              <div className="hero-proof-item">
                <span className="proof-number">12+</span>
                <span className="proof-label">Industry Sectors</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Frame */}
          <div className="hero-visual-column">
            <div className="hero-visual-frame glass-surface">
              <img 
                src="/images/Global%20Network%20Innovation%20Dashboard.png" 
                alt="CoreDe Global Network Innovation Dashboard" 
                className="hero-dashboard-img" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
