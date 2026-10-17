import React from 'react';
import { 
  Monitor, 
  Smartphone, 
  ShoppingBag, 
  Link2, 
  Cpu, 
  Database,
  ArrowUpRight
} from 'lucide-react';

export default function ServiceMatrix() {
  const servicePillars = [
    {
      id: 'web-dev',
      title: 'Web Development',
      description: 'Enterprise-grade scalable web portals and applications.',
      icon: Monitor,
      tags: ['PORTALS', 'DASHBOARDS', 'FINTECH'],
      highlight: 'Improved Core Web Vitals by 40% for global portal.'
    },
    {
      id: 'mobile-app',
      title: 'Mobile App Development',
      description: 'High-performance mobile apps (iOS, Android, Flutter).',
      icon: Smartphone,
      tags: ['IOS', 'ANDROID', 'FLUTTER'],
      highlight: 'Logistics app used by 1000+ drivers.'
    },
    {
      id: 'ecommerce',
      title: 'Ecommerce Development',
      description: 'High-volume platforms with 99.9% uptime and seamless checkout.',
      icon: ShoppingBag,
      tags: ['SHOPIFY', 'MAGENTO', 'WORDPRESS'],
      highlight: 'Multi-vendor marketplaces with zero downtime at peak.'
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      description: 'Traffic is vanity; conversion is sanity. Our Growth Marketing focuses on maximizing ROAS through rigorous data attribution, omni-channel funnels, and technical SEO excellence.',
      icon: Link2,
      tags: ['Performance Marketing', '360-Degree SEO'],
      highlight: 'Achieved a 4.5x ROAS for SaaS firm within 120 days.'
    },
    {
      id: 'tech-covered',
      title: 'Technologies We Cover',
      description: 'Mastery over industry stacks from Java, Python to MERN and Next.js.',
      icon: Cpu,
      tags: ['PHP', 'JAVA', 'PYTHON', 'MERN'],
      highlight: 'Architected systems processing millions daily.'
    },
    {
      id: 'custom-software',
      title: 'Custom Software Development',
      description: 'ERP, CRM, and enterprise systems tailored to workflow.',
      icon: Database,
      tags: ['ERP', 'CRM', 'HRM'],
      highlight: 'Reduced operational cost by 65%.'
    }
  ];

  return (
    <section className="service-matrix-section" id="service-matrix" aria-label="Service Matrix">
      <div className="clay-container">
        
        {/* Section Header */}
        <div className="matrix-section-header">
          <span className="clay-eyebrow">SERVICE EXCELLENCE PILLARS</span>
          <h2 className="matrix-section-heading">
            The CoreDe <span className="matrix-heading-accent">Service Matrix</span>: Engineering B2B Dominance.
          </h2>
          <p className="matrix-section-subtitle">
            We provide a full-spectrum technology stack designed to empower global enterprises with a resilient, scalable, and highly performant digital footprint.
          </p>
        </div>

        {/* 6 Pillars Architectural Frosted Glass Grid */}
        <div className="matrix-cards-grid">
          {servicePillars.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="matrix-card glass-surface">
                {/* Header Row: Icon + Arrow */}
                <div className="matrix-card-header">
                  <div className="matrix-icon-box">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <span className="matrix-card-arrow" aria-hidden="true">
                    <ArrowUpRight size={18} />
                  </span>
                </div>

                {/* Content */}
                <h3 className="matrix-card-title">{item.title}</h3>
                <p className="matrix-card-desc">{item.description}</p>

                {/* Stack Tags */}
                <div className="matrix-card-tags">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="matrix-tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Verified Outcome Badge */}
                <div className="matrix-outcome-badge">
                  <span className="outcome-indicator-dot" aria-hidden="true" />
                  <span className="outcome-text">{item.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
