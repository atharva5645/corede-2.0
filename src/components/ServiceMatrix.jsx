import React from 'react';
import { 
  Monitor, 
  Smartphone, 
  ShoppingBag, 
  Link2, 
  Cpu, 
  Database,
  Sparkles
} from 'lucide-react';

export default function ServiceMatrix() {
  const servicePillars = [
    {
      id: 'web-dev',
      theme: 'blue',
      title: 'Web Development',
      description: 'Enterprise-grade scalable web portals and applications.',
      icon: Monitor,
      iconColor: '#2563eb', // Royal Blue
      iconBg: '#eff6ff',
      tags: ['PORTALS', 'DASHBOARDS', 'FINTECH'],
      highlight: 'Improved Core Web Vitals by 40% for global portal.'
    },
    {
      id: 'mobile-app',
      theme: 'purple',
      title: 'Mobile App Development',
      description: 'High-performance mobile apps (iOS, Android, Flutter).',
      icon: Smartphone,
      iconColor: '#9333ea', // Violet/Purple
      iconBg: '#faf5ff',
      tags: ['IOS', 'ANDROID', 'FLUTTER'],
      highlight: 'Logistics app used by 1000+ drivers.'
    },
    {
      id: 'ecommerce',
      theme: 'emerald',
      title: 'Ecommerce Development',
      description: 'High-volume platforms with 99.9% uptime and seamless checkout.',
      icon: ShoppingBag,
      iconColor: '#059669', // Emerald Green
      iconBg: '#ecfdf5',
      tags: ['SHOPIFY', 'MAGENTO', 'WORDPRESS'],
      highlight: 'Multi-vendor marketplaces with zero downtime at peak.'
    },
    {
      id: 'digital-marketing',
      theme: 'orange',
      title: 'Digital Marketing',
      description: 'Traffic is vanity; conversion is sanity. Our Growth Marketing focuses on maximizing ROAS through rigorous data attribution, omni-channel funnels, and technical SEO excellence.',
      icon: Link2,
      iconColor: '#ea580c', // Orange/Coral
      iconBg: '#fff7ed',
      tags: ['Performance Marketing', '360-Degree SEO'],
      highlight: 'Achieved a 4.5x ROAS for SaaS firm within 120 days.'
    },
    {
      id: 'tech-covered',
      theme: 'cyan',
      title: 'Technologies We Cover',
      description: 'Mastery over industry stacks from Java, Python to MERN and Next.js.',
      icon: Cpu,
      iconColor: '#0891b2', // Cyan/Teal
      iconBg: '#ecfeff',
      tags: ['PHP', 'JAVA', 'PYTHON', 'MERN'],
      highlight: 'Architected systems processing millions daily.'
    },
    {
      id: 'custom-software',
      theme: 'indigo',
      title: 'Custom Software Development',
      description: 'ERP, CRM, and enterprise systems tailored to workflow.',
      icon: Database,
      iconColor: '#4f46e5', // Indigo/Rose
      iconBg: '#eef2ff',
      tags: ['ERP', 'CRM', 'HRM'],
      highlight: 'Reduced operational cost by 65%.'
    }
  ];

  return (
    <section className="service-matrix-section" id="service-matrix">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="matrix-section-header">
          <span className="matrix-section-eyebrow">SERVICE EXCELLENCE PILLARS</span>
          <h2 className="matrix-section-heading">
            The CoreDe <span className="text-matrix-highlight">Service Matrix</span>: Engineering B2B Dominance.
          </h2>
          <p className="matrix-section-subtitle">
            We provide a full-spectrum technology stack designed to empower global enterprises with a resilient, scalable, and highly performant digital footprint.
          </p>
        </div>

        {/* 6 Pillars Grid with Vibrant Multi-Color Themes & Lift Transitions */}
        <div className="matrix-cards-grid">
          {servicePillars.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className={`matrix-card matrix-card-${item.theme}`}>
                {/* Top vibrant gradient accent bar */}
                <div className={`matrix-card-top-bar bar-${item.theme}`} />

                {/* Icon */}
                <div 
                  className={`matrix-card-icon-wrap icon-wrap-${item.theme}`}
                  style={{ backgroundColor: item.iconBg, color: item.iconColor }}
                >
                  <Icon size={24} strokeWidth={2.3} />
                </div>

                {/* Content */}
                <h3 className="matrix-card-title">{item.title}</h3>
                <p className="matrix-card-desc">{item.description}</p>

                {/* Stack Tags */}
                <div className="matrix-card-tags">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="matrix-tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Proof Highlight - Solid Gradient Pill Badge */}
                <div className={`matrix-pill-badge pill-${item.theme}`}>
                  <Sparkles size={14} className="pill-badge-icon" />
                  <span className="pill-badge-text">{item.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
