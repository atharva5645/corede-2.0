import React, { useRef, useState } from 'react';
import { 
  Monitor, 
  Smartphone, 
  ShoppingBag, 
  Link2, 
  Cpu, 
  Database,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import CardSwap, { Card } from './CardSwap';

export default function ServiceMatrix() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swapRef = useRef(null);

  const serviceCards = [
    {
      id: 'web-dev',
      num: '01',
      title: 'Web Development',
      description: 'Enterprise-grade scalable web portals and applications.',
      icon: Monitor,
      tags: ['PORTALS', 'DASHBOARDS', 'FINTECH'],
      highlightPrefix: 'Improved Core Web Vitals by ',
      highlightMetric: '40%',
      highlightSuffix: ' for global portal.'
    },
    {
      id: 'mobile-app',
      num: '02',
      title: 'Mobile App Development',
      description: 'High-performance mobile apps (iOS, Android, Flutter).',
      icon: Smartphone,
      tags: ['IOS', 'ANDROID', 'FLUTTER'],
      highlightPrefix: 'Logistics app used by ',
      highlightMetric: '1000+',
      highlightSuffix: ' drivers.'
    },
    {
      id: 'ecommerce',
      num: '03',
      title: 'Ecommerce Development',
      description: 'High-volume platforms with 99.9% uptime and seamless checkout.',
      icon: ShoppingBag,
      tags: ['SHOPIFY', 'MAGENTO', 'WORDPRESS'],
      highlightPrefix: 'Multi-vendor marketplaces with ',
      highlightMetric: 'zero downtime',
      highlightSuffix: ' at peak.'
    },
    {
      id: 'digital-marketing',
      num: '04',
      title: 'Digital Marketing',
      description: 'Traffic is vanity; conversion is sanity. Our Growth Marketing focuses on maximizing ROAS through rigorous data attribution, omni-channel funnels, and technical SEO excellence.',
      icon: Link2,
      tags: ['PERFORMANCE MARKETING', '360° SEO'],
      highlightPrefix: 'Achieved a ',
      highlightMetric: '4.5x ROAS',
      highlightSuffix: ' for SaaS firm within 120 days.'
    },
    {
      id: 'tech-covered',
      num: '05',
      title: 'Technologies We Cover',
      description: 'Mastery over industry stacks from Java, Python to MERN and Next.js.',
      icon: Cpu,
      tags: ['PHP', 'JAVA', 'PYTHON', 'MERN'],
      highlightPrefix: 'Architected systems processing ',
      highlightMetric: 'millions daily',
      highlightSuffix: '.'
    },
    {
      id: 'custom-software',
      num: '06',
      title: 'Custom Software Development',
      description: 'ERP, CRM, and enterprise systems tailored to workflow.',
      icon: Database,
      tags: ['ERP', 'CRM', 'HRM'],
      highlightPrefix: 'Reduced operational cost by ',
      highlightMetric: '65%',
      highlightSuffix: '.'
    }
  ];

  const handleSelectCard = (index) => {
    setActiveIndex(index);
    swapRef.current?.jumpToIndex(index);
  };

  return (
    <section className="service-matrix-section" id="service-matrix" aria-label="Service Matrix">
      <div className="card-swap-split-container">
        
        {/* Left Column: Service Index & Controls */}
        <div className="service-split-left">
          <div className="service-split-header">
            <span className="clay-eyebrow">SERVICE EXCELLENCE PILLARS</span>
            <h2 className="service-split-heading">
              The CoreDe <span className="matrix-heading-accent">Service Matrix</span>: Engineering B2B Dominance.
            </h2>
            <p className="service-split-subcopy">
              We provide a full-spectrum technology stack designed to empower global enterprises with a resilient, scalable, and highly performant digital footprint.
            </p>
          </div>

          {/* Compact 6-row interactive directory list */}
          <div className="service-directory-list" role="tablist" aria-label="Service directory">
            {serviceCards.map((service, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`service-directory-row ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleSelectCard(idx)}
                >
                  <span className="directory-active-bar" aria-hidden="true" />
                  <span className="directory-num">{service.num}</span>
                  <span className="directory-title">{service.title}</span>
                  <ArrowUpRight size={14} className="directory-arrow" aria-hidden="true" />
                </button>
              );
            })}
          </div>

          {/* Manual Deck Controls */}
          <div className="service-deck-controls">
            <div className="deck-counter">
              <span className="deck-counter-current">0{activeIndex + 1}</span>
              <span className="deck-counter-sep">/</span>
              <span className="deck-counter-total">0{serviceCards.length}</span>
            </div>
            <div className="deck-btn-group">
              <button
                type="button"
                className="deck-nav-btn"
                onClick={() => swapRef.current?.prev()}
                aria-label="Previous service"
              >
                <ChevronLeft size={18} strokeWidth={2.2} />
              </button>
              <button
                type="button"
                className="deck-nav-btn"
                onClick={() => swapRef.current?.next()}
                aria-label="Next service"
              >
                <ChevronRight size={18} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: CardSwap 3D Interactive Stage */}
        <div className="service-split-right">
          <div className="card-swap-stage-wrapper">
            <CardSwap
              ref={swapRef}
              width={440}
              height={330}
              cardDistance={40}
              verticalDistance={42}
              depth={75}
              skewAmount={3}
              visibleCards={4}
              delay={4500}
              theme="light"
              cardRadius={16}
              onChange={(idx) => setActiveIndex(idx)}
            >
              {serviceCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Card key={card.id}>
                    <div className="card-editorial-layout">
                      <div className="card-editorial-top">
                        <div className="card-editorial-header">
                          <div className="card-editorial-icon">
                            <Icon size={20} strokeWidth={2} />
                          </div>
                          <div className="card-editorial-arrow-btn">
                            <ArrowUpRight size={16} strokeWidth={2.2} className="arrow-icon" />
                          </div>
                        </div>

                        <h3 className="card-editorial-title">{card.title}</h3>
                        <p className="card-editorial-desc">{card.description}</p>

                        <div className="card-editorial-tags">
                          {card.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="card-editorial-tag-chip">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="card-editorial-footer">
                        <span className="card-editorial-dot" aria-hidden="true" />
                        <span className="card-editorial-metric-text">
                          {card.highlightPrefix}
                          <strong className="card-editorial-metric">{card.highlightMetric}</strong>
                          {card.highlightSuffix}
                        </span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </CardSwap>
          </div>
        </div>

      </div>
    </section>
  );
}
