import React from 'react';
import { Compass, PenTool, Code, Rocket } from 'lucide-react';

export default function Methodology() {
  const steps = [
    {
      num: '01',
      theme: 'blue',
      title: 'Define',
      desc: 'Deep requirement gathering and KPI alignment.',
      icon: Compass,
      accent: '#2563eb'
    },
    {
      num: '02',
      theme: 'amber',
      title: 'Design',
      desc: 'Interactive Wireframes and UI/UX prototypes.',
      icon: PenTool,
      accent: '#f59e0b'
    },
    {
      num: '03',
      theme: 'emerald',
      title: 'Develop',
      desc: 'Agile sprints with CI/CD deployments.',
      icon: Code,
      accent: '#10b981'
    },
    {
      num: '04',
      theme: 'rose',
      title: 'Deploy',
      desc: 'Cloud optimization and go-live security.',
      icon: Rocket,
      accent: '#f43f5e'
    }
  ];

  return (
    <section className="methodology-section" id="methodology">
      <div className="section-container">
        <div className="methodology-header">
          <span className="section-eyebrow">OUR METHODOLOGY</span>
          <h2 className="section-heading">
            The <span className="text-highlight-green">Enterprise Delivery</span> Framework.
          </h2>
        </div>

        <div className="methodology-pipeline">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className={`methodology-step-card step-card-${step.theme}`}>
                <div className="step-card-top">
                  <span className={`step-num step-num-${step.theme}`}>{step.num}</span>
                  <div className={`step-icon-wrap step-icon-${step.theme}`}>
                    <Icon size={20} strokeWidth={2.4} />
                  </div>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
                {idx < steps.length - 1 && (
                  <div className="step-connector-arrow" aria-hidden="true">→</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
