import React from 'react';
import { Zap, Search, Smartphone } from 'lucide-react';

export default function MarketEvidence() {
  const evidenceCards = [
    {
      id: 'speed',
      icon: Zap,
      iconColor: '#d97706', // amber/warm gold
      iconBg: '#fef3c7',
      title: 'Speed Optimized',
      description: 'Every piece of software we ship is optimized for millisecond-level responsiveness. Performance isn’t just a feature; it’s our baseline.'
    },
    {
      id: 'seo',
      icon: Search,
      iconColor: '#0053B4', // Brand Primary Blue
      iconBg: '#e8f1fc',
      title: 'SEO Integrated',
      description: 'We build code that search engines love. From structural Schema to semantic HTML5, your visibility is baked into the development.'
    },
    {
      id: 'mobile',
      icon: Smartphone,
      iconColor: '#00802F', // Brand Primary Green
      iconBg: '#eaf7ee',
      title: 'Mobile First',
      description: 'Our designs prioritize the mobile touchpoint first, ensuring a seamless high-convert UX across every device and browser.'
    }
  ];

  return (
    <section className="market-evidence-section" id="market-evidence">
      <div className="section-container">
        
        {/* Typographic Market Evidence Header (exact match to user reference) */}
        <div className="evidence-header">
          <span className="evidence-eyebrow">MARKET EVIDENCE</span>

          <h2 className="evidence-heading">
            Research from{' '}
            <span className="evidence-source-tag">Google &amp; HubSpot</span>
            <br />
            proves: 70% of B2B buyers search
            <br />
            via Mobile.
          </h2>
        </div>

        {/* 3 Evidence Cards matching reference and rules.md */}
        <div className="evidence-cards-grid">
          {evidenceCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.id} className="evidence-card">
                <div 
                  className="evidence-card-icon-wrap"
                  style={{ backgroundColor: card.iconBg, color: card.iconColor }}
                >
                  <Icon size={24} strokeWidth={2.4} />
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
