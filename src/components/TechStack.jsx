import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { TechLogoMap } from './icons/TechIcons';

export const TECH_CATEGORIES = [
  {
    id: 'frontend',
    name: 'Frontend',
    benefit: 'Fast, accessible interfaces for every device',
    items: [
      { name: 'React', desc: 'Interactive, component-based web apps' },
      { name: 'Next.js', desc: 'SEO-friendly, high-performance websites' },
      { name: 'TypeScript', desc: 'Safer, more maintainable code' },
      { name: 'Vue.js', desc: 'Lightweight, flexible user interfaces' },
      { name: 'Angular', desc: 'Structured apps for large enterprises' }
    ]
  },
  {
    id: 'backend',
    name: 'Backend',
    benefit: 'Reliable APIs and business logic that scale',
    items: [
      { name: 'Node.js', desc: 'Fast, real-time APIs and services' },
      { name: '.NET Core', desc: 'Secure, enterprise-grade applications' },
      { name: 'Laravel', desc: 'Rapid development for custom web platforms' },
      { name: 'Python', desc: 'Automation, data, and AI-ready services' },
      { name: 'Go', desc: 'High-performance, concurrent systems' }
    ]
  },
  {
    id: 'database',
    name: 'Database',
    benefit: 'Data storage built for speed and growth',
    items: [
      { name: 'PostgreSQL', desc: 'Dependable relational data and complex queries' },
      { name: 'MongoDB', desc: 'Flexible storage for fast-changing data' },
      { name: 'MySQL', desc: 'Proven database for web and ecommerce' },
      { name: 'Redis', desc: 'Caching and queues for instant responses' },
      { name: 'ElasticSearch', desc: 'Powerful search and analytics' }
    ]
  },
  {
    id: 'cloud-devops',
    name: 'Cloud & DevOps',
    benefit: 'Deploy, monitor, and scale with confidence',
    items: [
      { name: 'AWS', desc: 'Scalable cloud infrastructure and hosting' },
      { name: 'Azure', desc: 'Cloud services for Microsoft-based stacks' },
      { name: 'Docker', desc: 'Consistent builds across every environment' },
      { name: 'Kubernetes', desc: 'Automated scaling and orchestration' },
      { name: 'Terraform', desc: 'Repeatable infrastructure as code' }
    ]
  },
  {
    id: 'blockchain',
    name: 'Blockchain',
    benefit: 'Secure, transparent decentralized solutions',
    items: [
      { name: 'Ethereum', desc: 'Smart contracts and decentralized apps' },
      { name: 'Solidity', desc: 'Smart contract development and auditing' },
      { name: 'Polkadot', desc: 'Interoperable multi-chain networks' },
      { name: 'Rust', desc: 'Safe, fast blockchain and systems code' },
      { name: 'Hyperledger', desc: 'Permissioned blockchains for enterprises' }
    ]
  }
];

export default function TechStack() {
  const [openCategories, setOpenCategories] = useState({});

  const handleToggle = (id) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="tech-stack-section" id="tech-stack" aria-label="Technology Stack">
      <div className="clay-container">
        <div className="tech-stack-header">
          <span className="clay-eyebrow">TECHNOLOGY STACK</span>
          <h2 className="tech-stack-heading">Mission-Critical Technologies We Master.</h2>
        </div>

        <div className="tech-expandable-grid">
          {TECH_CATEGORIES.map((cat) => {
            const isOpen = Boolean(openCategories[cat.id]);
            const buttonId = `tech-header-btn-${cat.id}`;
            const panelId = `tech-panel-${cat.id}`;

            return (
              <article
                key={cat.id}
                className={`tech-expandable-card ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  id={buttonId}
                  className="tech-card-header-btn"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => handleToggle(cat.id)}
                >
                  <div className="tech-card-header-text">
                    <h3 className="tech-card-title">{cat.name}</h3>
                    <p className="tech-card-benefit">{cat.benefit}</p>
                  </div>
                  <span className="tech-card-chevron-wrap" aria-hidden="true">
                    <ChevronDown
                      size={20}
                      className={`tech-card-chevron ${isOpen ? 'is-rotated' : ''}`}
                    />
                  </span>
                </button>

                {/* Collapsed state preview chips: first 3 + more (hidden when open) */}
                {!isOpen && (
                  <div
                    className="tech-card-collapsed-chips"
                    aria-hidden="true"
                  >
                    {cat.items.slice(0, 3).map((item) => (
                      <span key={item.name} className="tech-preview-chip">
                        {item.name}
                      </span>
                    ))}
                    {cat.items.length > 3 && (
                      <span className="tech-preview-chip tech-preview-more">
                        +{cat.items.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Expanded state detailed panel: stays in DOM for SEO */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  className="tech-card-expanded-panel"
                >
                  <div className="tech-card-expanded-inner">
                    <ul className="tech-card-tech-list">
                      {cat.items.map((tech) => {
                        const IconComponent = TechLogoMap[tech.name];
                        return (
                          <li key={tech.name} className="tech-detail-row">
                            <div className="tech-detail-logo-box" aria-hidden="true">
                              {IconComponent ? (
                                <IconComponent size={28} />
                              ) : (
                                <span className="tech-logo-fallback" />
                              )}
                            </div>
                            <div className="tech-detail-info">
                              <span className="tech-detail-name">{tech.name}</span>
                              <span className="tech-detail-desc">{tech.desc}</span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
