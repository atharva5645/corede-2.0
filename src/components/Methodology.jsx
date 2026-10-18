import React from 'react';
import { Compass, PenTool, Code, Rocket } from 'lucide-react';
import BounceCards from './BounceCards';

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

        {/* Spring Physics BounceCards 4-Step Process Row */}
        <div className="methodology-bounce-wrapper">
          <BounceCards
            cardWidth={260}
            cardHeight={250}
            spread={284}
            rotation={0}
            arc={0}
            pushDistance={22}
            hoverScale={1.05}
            hoverLift={8}
            hoverRotate={0}
            bounciness={0.58}
            popStiffness={180}
            moveStiffness={210}
            animationDelay={0.12}
            animationStagger={0.09}
            containerHeight={320}
          >
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="process-card-content">
                  <div className="process-card-header">
                    <span className="process-card-number">{step.num}</span>
                    <div className="process-card-icon-badge" aria-hidden="true">
                      <Icon size={18} strokeWidth={2} />
                    </div>
                  </div>
                  <div className="process-card-body">
                    <h3 className="process-card-title">{step.title}</h3>
                    <p className="process-card-desc">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </BounceCards>
        </div>
      </div>
    </section>
  );
}
