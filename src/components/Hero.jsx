import React, { useState } from 'react';
import { ArrowRight, Phone, MessageSquare, Video, X } from 'lucide-react';

export default function Hero({ onOpenQuote }) {
  const [showCallPopup, setShowCallPopup] = useState(false);

  return (
    <section className="hero-section">
      <div className="section-container">
        <div className="hero-grid-layout">
          {/* Left Column: Copy & Actions */}
          <div className="hero-content-clean">
            <h1 className="hero-headline">
              Global IT <br />
              Partner for <br />
              <span className="text-gradient-sustainable">
                Sustainable Growth
              </span> &amp; <br />
              Innovation.
            </h1>

            <p className="hero-summary">
              CoreDe Technologies is a premier{' '}
              <strong>Software Development Company in India</strong>,{' '}
              specializing in{' '}
              <strong>Custom Software Solutions</strong>{' '}
              and high-performance digital strategies for global enterprises.
            </p>

            {/* Actions Row */}
            <div className="hero-actions-row">
              <button 
                type="button" 
                className="btn-quote-pill"
                onClick={onOpenQuote}
                id="hero-quote-trigger"
              >
                <span>Request a Quote</span>
                <ArrowRight size={17} className="btn-icon-shift" />
              </button>

              <div className="hero-call-wrapper">
                <button 
                  type="button"
                  className="btn-phone-pill"
                  onClick={() => setShowCallPopup(!showCallPopup)}
                  aria-label="Direct Phone Contact"
                >
                  <span className="phone-icon-wrap">
                    <Phone size={15} />
                  </span>
                  <span className="phone-number-text">91 8951029849</span>
                </button>

                {/* Call Contact Options Popup */}
                {showCallPopup && (
                  <div className="call-popup-card">
                    <div className="call-popup-header">
                      <h4>Choose how to contact</h4>
                      <button 
                        type="button" 
                        className="call-popup-close"
                        onClick={() => setShowCallPopup(false)}
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
          </div>

          {/* Right Column: Hero Visual Illustration */}
          <div className="hero-visual-column">
            <div className="hero-img-frame">
              <img 
                src="/images/Global%20Network%20Innovation%20Dashboard.png" 
                alt="CoreDe Global Network Innovation Dashboard" 
                className="hero-floating-img" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
