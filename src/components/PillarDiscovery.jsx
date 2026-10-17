import React, { useState } from 'react';
import { 
  TrendingUp, 
  Cpu, 
  Monitor, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';

export default function PillarDiscovery({ onOpenQuote }) {
  const [selectedObjective, setSelectedObjective] = useState(null);

  const objectives = [
    {
      id: 'roi',
      theme: 'emerald',
      icon: TrendingUp,
      title: 'Maximize ROI & Sales',
      recommendation: {
        track: 'Performance Growth & Conversion Engine',
        summary: 'Targeted performance marketing, 360-degree technical SEO, and conversion-optimized sales funnels engineered for high ROAS.',
        bestFit: 'Digital Marketing & Growth Systems'
      }
    },
    {
      id: 'scale',
      theme: 'blue',
      icon: Cpu,
      title: 'Scale Tech Infrastructure',
      recommendation: {
        track: 'Cloud Microservices & High-Concurrency Systems',
        summary: 'Automated CI/CD pipelines, containerized AWS/Azure orchestration, and distributed database clustering.',
        bestFit: 'Custom Software & DevOps Architecture'
      }
    },
    {
      id: 'website',
      theme: 'purple',
      icon: Monitor,
      title: 'Launch High-Perf Website',
      recommendation: {
        track: 'Sub-2s Web Platform & Enterprise CMS',
        summary: 'Headless Next.js/React engineering, WCAG compliance, and millisecond-level Core Web Vitals optimization.',
        bestFit: 'Enterprise Web Development'
      }
    },
    {
      id: 'mobile',
      theme: 'orange',
      icon: Smartphone,
      title: 'Build Mobile Ecosystem',
      recommendation: {
        track: 'Cross-Platform Mobile Application',
        summary: 'Native iOS & Android architectures built on Flutter/React Native with real-time API synchronization.',
        bestFit: 'Mobile App Engineering'
      }
    }
  ];

  const activeRec = objectives.find(o => o.id === selectedObjective);

  return (
    <section className="pillar-discovery-section" id="pillar-discovery">
      <div className="section-container">
        
        <div className="pillar-discovery-header">
          <span className="section-eyebrow">STRATEGIC PILLAR DISCOVERY</span>
          <h2 className="section-heading">
            Not Sure Where to Start? <span className="text-highlight-green">Find Your Pillar.</span>
          </h2>
          <p className="pillar-subtitle">
            Use our interactive consultant to identify the high-impact solution for your business.
          </p>
        </div>

        <div className="pillar-interactive-card">
          <div className="pillar-card-progress">
            <span className="step-tag">
              {selectedObjective ? 'STEP 2 OF 2: RECOMMENDED STRATEGY' : 'STEP 1 OF 2: CHOOSE OBJECTIVE'}
            </span>
          </div>

          {!selectedObjective ? (
            <div>
              <h3 className="pillar-question-heading">What is your primary digital objective?</h3>
              <div className="pillar-options-grid">
                {objectives.map((obj) => {
                  const Icon = obj.icon;
                  return (
                    <button
                      key={obj.id}
                      type="button"
                      className={`pillar-option-btn pillar-btn-${obj.theme}`}
                      onClick={() => setSelectedObjective(obj.id)}
                    >
                      <div className={`pillar-option-icon icon-badge-${obj.theme}`}>
                        <Icon size={22} strokeWidth={2.2} />
                      </div>
                      <span className="pillar-option-title">{obj.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="pillar-result-view">
              <div className="pillar-result-badge">
                <CheckCircle2 size={18} className="result-check-icon" />
                <span>MATCH IDENTIFIED: {activeRec.recommendation.bestFit}</span>
              </div>
              <h3 className="pillar-result-title">{activeRec.recommendation.track}</h3>
              <p className="pillar-result-desc">{activeRec.recommendation.summary}</p>
              
              <div className="pillar-result-actions">
                <button
                  type="button"
                  className="btn-quote-pill"
                  onClick={onOpenQuote}
                >
                  <span>Request Custom Blueprint for this Pillar</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  className="btn-brochure-pill"
                  onClick={() => setSelectedObjective(null)}
                >
                  <RotateCcw size={15} />
                  <span>Choose Another Objective</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
