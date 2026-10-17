import React from 'react';
import { Zap, TrendingUp, Smartphone, ArrowRight } from 'lucide-react';

export default function MobileFirstBanner({ onOpenQuote }) {
  return (
    <section className="mobile-first-section" id="mobile-first" aria-label="Mobile First Platform">
      <div className="clay-container">
        <div className="mobile-first-panel-dark">
          <div className="mobile-first-grid">
            
            {/* Left Column: Visual Showcase Card */}
            <div className="mobile-first-visual-wrap">
              <div className="mobile-first-image-card">
                <img 
                  src="/images/b2b_mobile_dashboard_ui.jpg" 
                  alt="Modern B2B enterprise mobile analytics dashboard interface" 
                  className="mobile-first-bg-img"
                />
                <div className="trend-overlay-badge glass-surface">
                  <div className="trend-badge-header">
                    <span className="trend-icon">📱</span>
                    <span className="trend-label">B2B TREND</span>
                  </div>
                  <p className="trend-quote">“70% of B2B buyers now research exclusively via Mobile.”</p>
                  <span className="trend-source">— Source: Google/HubSpot Research</span>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Statement Column */}
            <div className="mobile-first-content-col">
              <span className="mobile-first-eyebrow">EVIDENCE-BASED DEVELOPMENT</span>
              <h2 className="mobile-first-heading">
                Why a <span className="text-highlight-accent">Mobile-First</span> Approach is Non-Negotiable.
              </h2>
              <p className="mobile-first-desc">
                The B2B buying journey has undergone a massive paradigm shift. High-ticket decision-makers are no longer tethered to desktops. They research, compare, and engage on the go.
              </p>
              <p className="mobile-first-subdesc">
                Our <strong>Speed-Optimized development</strong> ensures seamless performance across all devices and networks.
              </p>

              {/* Metric Badges */}
              <div className="mobile-proof-pills">
                <div className="proof-chip-dark">
                  <Zap size={15} className="proof-icon-accent" />
                  <span>Sub-2s Load Time</span>
                </div>
                <div className="proof-chip-dark">
                  <TrendingUp size={15} className="proof-icon-accent" />
                  <span>Enhanced ROAS</span>
                </div>
              </div>

              {/* Inverted White Pill CTA */}
              <button 
                type="button" 
                className="btn-primary mobile-first-cta"
                onClick={onOpenQuote}
              >
                <span>Build Mobile-First Platform</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
