import React from 'react';
import { Compass, PenTool, Code, Rocket } from 'lucide-react';

export default function Methodology() {
  const steps = [
    {
      num: '01',
      title: 'Define',
      desc: 'Deep requirement gathering and KPI alignment.',
      icon: Compass
    },
    {
      num: '02',
      title: 'Design',
      desc: 'Interactive Wireframes and UI/UX prototypes.',
      icon: PenTool
    },
    {
      num: '03',
      title: 'Develop',
      desc: 'Agile sprints with CI/CD deployments.',
      icon: Code
    },
    {
      num: '04',
      title: 'Deploy',
      desc: 'Cloud optimization and go-live security.',
      icon: Rocket
    }
  ];

  return (
    <section className="methodology-section" id="methodology" aria-label="Methodology">
      <div className="clay-container">
        <div className="methodology-header">
          <span className="clay-eyebrow">OUR METHODOLOGY</span>
          <h2 className="methodology-heading">
            The <span className="methodology-heading-accent">Enterprise Delivery</span> Framework.
          </h2>
        </div>

        {/* Numbered Editorial Timeline Grid */}
        <div className="methodology-timeline-grid">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="methodology-step-item glass-surface">
                <div className="step-item-top">
                  <span className="step-giant-number">{step.num}</span>
                  <div className="step-icon-box">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
