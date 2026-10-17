import React from 'react';

export default function TechStack() {
  const categories = [
    {
      name: 'FRONTEND',
      items: [
        { name: 'React', color: '#61dafb' },
        { name: 'Next.js', color: '#0f172a' },
        { name: 'TypeScript', color: '#3178c6' },
        { name: 'Vue.js', color: '#42b883' },
        { name: 'Angular', color: '#dd0031' }
      ]
    },
    {
      name: 'BACKEND',
      items: [
        { name: 'Node.js', color: '#5fa04e' },
        { name: '.Net Core', color: '#512bd4' },
        { name: 'Laravel', color: '#ff2d20' },
        { name: 'Python', color: '#3776ab' },
        { name: 'Go', color: '#00add8' }
      ]
    },
    {
      name: 'DATABASE',
      items: [
        { name: 'PostgreSQL', color: '#336791' },
        { name: 'MongoDB', color: '#13aa52' },
        { name: 'MySQL', color: '#00758f' },
        { name: 'Redis', color: '#dc382d' },
        { name: 'ElasticSearch', color: '#005571' }
      ]
    },
    {
      name: 'CLOUD & DEVOPS',
      items: [
        { name: 'AWS', color: '#ff9900' },
        { name: 'Azure', color: '#0089d6' },
        { name: 'Docker', color: '#2496ed' },
        { name: 'Kubernetes', color: '#326ce5' },
        { name: 'Terraform', color: '#844fba' }
      ]
    },
    {
      name: 'BLOCKCHAIN',
      items: [
        { name: 'Ethereum', color: '#627eea' },
        { name: 'Solidity', color: '#6366f1' },
        { name: 'Polkadot', color: '#e6007a' },
        { name: 'Rust', color: '#f74c00' },
        { name: 'Hyperledger', color: '#2563eb' }
      ]
    }
  ];

  return (
    <section className="tech-stack-section" id="tech-stack">
      <div className="section-container">
        <div className="tech-stack-header">
          <span className="section-eyebrow">TECHNOLOGY STACK</span>
          <h2 className="section-heading">Mission-Critical Technologies We Master.</h2>
        </div>

        <div className="tech-stack-grid">
          {categories.map((cat, idx) => (
            <div key={idx} className="tech-category-group">
              <span className="tech-category-label">{cat.name}</span>
              <div className="tech-pill-list">
                {cat.items.map((tech, techIdx) => (
                  <span 
                    key={techIdx} 
                    className="tech-pill-item"
                    style={{ '--pill-color': tech.color }}
                  >
                    <span 
                      className="tech-pill-dot" 
                      style={{ backgroundColor: tech.color }} 
                      aria-hidden="true"
                    />
                    <span className="tech-pill-name">{tech.name}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
