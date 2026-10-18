import React from 'react';

export default function MarketEvidence() {
  const evidenceCards = [
    {
      id: 'speed',
      image: '/assets/3d/speed-optimized.jpg',
      title: 'Speed Optimized',
      description: 'Every piece of software we ship is optimized for millisecond-level responsiveness. Performance isn’t just a feature; it’s our baseline.'
    },
    {
      id: 'seo',
      image: '/assets/3d/seo-integrated.jpg',
      title: 'SEO Integrated',
      description: 'We build code that search engines love. From structural Schema to semantic HTML5, your visibility is baked into the development.'
    },
    {
      id: 'mobile',
      image: '/assets/3d/mobile-first.jpg',
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

        {/* 3 Evidence Cards Grid (Luxury Editorial Cards) */}
        <div className="evidence-cards-grid">
          {evidenceCards.map((card) => (
            <div 
              key={card.id} 
              className="evidence-card luxury-editorial"
              tabIndex={0}
            >
              {/* 3D Visual Frame Container */}
              <div className="evidence-card-visual">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="evidence-card-img" 
                  loading="lazy"
                />
              </div>

              {/* Card Typography */}
              <h3 className="evidence-card-title">{card.title}</h3>
              <p className="evidence-card-desc">{card.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


