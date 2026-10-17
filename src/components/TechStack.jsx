import React from 'react';
import { TechLogoMap } from './icons/TechIcons';

export default function TechStack() {
  const categories = [
    {
      name: 'FRONTEND',
      items: [
        { name: 'React', key: 'React' },
        { name: 'Next.js', key: 'Next.js' },
        { name: 'TypeScript', key: 'TypeScript' },
        { name: 'Vue.js', key: 'Vue.js' },
        { name: 'Angular', key: 'Angular' }
      ]
    },
    {
      name: 'BACKEND',
      items: [
        { name: 'Node.js', key: 'Node.js' },
        { name: '.NET Core', key: '.NET Core' },
        { name: 'Laravel', key: 'Laravel' },
        { name: 'Python', key: 'Python' },
        { name: 'Go', key: 'Go' }
      ]
    },
    {
      name: 'DATABASE',
      items: [
        { name: 'PostgreSQL', key: 'PostgreSQL' },
        { name: 'MongoDB', key: 'MongoDB' },
        { name: 'MySQL', key: 'MySQL' },
        { name: 'Redis', key: 'Redis' },
        { name: 'ElasticSearch', key: 'ElasticSearch' }
      ]
    },
    {
      name: 'CLOUD & DEVOPS',
      items: [
        { name: 'AWS', key: 'AWS' },
        { name: 'Azure', key: 'Azure' },
        { name: 'Docker', key: 'Docker' },
        { name: 'Kubernetes', key: 'Kubernetes' },
        { name: 'Terraform', key: 'Terraform' }
      ]
    },
    {
      name: 'BLOCKCHAIN',
      items: [
        { name: 'Ethereum', key: 'Ethereum' },
        { name: 'Solidity', key: 'Solidity' },
        { name: 'Polkadot', key: 'Polkadot' },
        { name: 'Rust', key: 'Rust' },
        { name: 'Hyperledger', key: 'Hyperledger' }
      ]
    }
  ];

  return (
    <section className="tech-stack-section" id="tech-stack" aria-label="Technology Stack">
      <div className="clay-container">
        <div className="tech-stack-header">
          <span className="clay-eyebrow">TECHNOLOGY STACK</span>
          <h2 className="tech-stack-heading">Mission-Critical Technologies We Master.</h2>
        </div>

        <div className="tech-stack-grid">
          {categories.map((cat, idx) => (
            <div key={idx} className="tech-category-group">
              <span className="tech-category-label">{cat.name}</span>
              <div className="tech-pill-list">
                {cat.items.map((tech, techIdx) => {
                  const IconComponent = TechLogoMap[tech.key];
                  return (
                    <span 
                      key={techIdx} 
                      className="tech-pill-chip glass-surface"
                      title={tech.name}
                    >
                      {IconComponent && (
                        <span className="tech-pill-logo-wrap" aria-hidden="true">
                          <IconComponent size={18} />
                        </span>
                      )}
                      <span className="tech-pill-name">{tech.name}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
