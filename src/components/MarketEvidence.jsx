import React from 'react';
import { Zap, Search, Smartphone } from 'lucide-react';

export default function MarketEvidence() {
  const evidenceCards = [
    {
      id: 'speed',
      icon: Zap,
      title: 'Speed Optimized',
      description: 'Every piece of software we ship is optimized for millisecond-level responsiveness. Performance isn’t just a feature; it’s our baseline.'
    },
    {
      id: 'seo',
      icon: Search,
      title: 'SEO Integrated',
      description: 'We build code that search engines love. From structural Schema to semantic HTML5, your visibility is baked into the development.'
    },
    {
      id: 'mobile',
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Our designs prioritize the mobile touchpoint first, ensuring a seamless high-convert UX across every device and browser.'
    }
  ];

  return (
    <section className="market-evidence-section" id="market-evidence" aria-label="Market Evidence">
      <div className="clay-container">
        
        {/* Typographic Market Evidence Header */}
        <div className="evidence-header">
          <span className="clay-eyebrow">MARKET EVIDENCE</span>

          <h2 className="evidence-heading">
            Research from{' '}
            <span className="evidence-source-pill">Google &amp; HubSpot</span>
            <br />
            proves: 70% of B2B buyers search
            <br />
            via Mobile.
          </h2>
        </div>

        {/* 3 Evidence Cards Grid (Frosted Glass Surfaces) */}
        <div className="evidence-cards-grid">
          {evidenceCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.id} className="evidence-card glass-surface">
                <div className="evidence-card-icon-box">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="evidence-card-title">{card.title}</h3>
                <p className="evidence-card-desc">{card.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
