import React, { useState } from 'react';
import { 
  TrendingUp, 
  Cpu, 
  Monitor, 
  Smartphone, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import './PillarDiscovery.css';

export default function PillarDiscovery({ onOpenQuote }) {
  const [selectedObjective, setSelectedObjective] = useState(null);

  const objectives = [
    {
      id: 'roi',
      icon: TrendingUp,
      shortTitle: 'ROI & Sales',
      title: 'Maximize ROI & Sales',
      subtext: 'High-converting funnels & attribution',
      recommendation: {
        track: 'Performance Growth & Conversion Engine',
        bestFit: 'Digital Marketing & Growth Systems',
        summary: 'Engineered for high ROAS through targeted omni-channel acquisition funnels, technical SEO architecture, and rigorous revenue data attribution.',
        deliverables: ['Omni-Channel Funnels', 'Technical SEO', 'Attribution Modeling', 'A/B Testing Loops'],
        metrics: [
          { title: 'Avg. Conversion Lift', value: '+34%', delta: 'Verified across 40+ SaaS deployments' },
          { title: 'Target ROAS Benchmark', value: '4.5x', delta: 'Achieved within first 120 days' },
          { title: 'CAC Efficiency Gain', value: '-28%', delta: 'Via technical and organic funnels' }
        ]
      }
    },
    {
      id: 'scale',
      icon: Cpu,
      shortTitle: 'Infrastructure',
      title: 'Scale Tech Infrastructure',
      subtext: 'Cloud microservices & orchestration',
      recommendation: {
        track: 'Cloud Microservices & Distributed Architecture',
        bestFit: 'Custom Software & DevOps Architecture',
        summary: 'Resilient cloud infrastructure with automated zero-downtime CI/CD pipelines, containerized AWS/Azure orchestration, and distributed database clustering.',
        deliverables: ['Zero-Downtime CI/CD', 'Kubernetes Orchestration', 'Database Clustering', 'Multi-Region Failover'],
        metrics: [
          { title: 'System Uptime SLA', value: '99.99%', delta: 'Enterprise high-availability cluster' },
          { title: 'Global Edge Latency', value: '<15ms', delta: 'Sub-second server response at edge' },
          { title: 'Peak Concurrency', value: '10M+', delta: 'Daily requests processed seamlessly' }
        ]
      }
    },
    {
      id: 'website',
      icon: Monitor,
      shortTitle: 'High-Perf Web',
      title: 'Launch High-Perf Website',
      subtext: 'Sub-2s load speed & enterprise CMS',
      recommendation: {
        track: 'Sub-2s Web Platform & Enterprise CMS',
        bestFit: 'Enterprise Web Development',
        summary: 'Headless Next.js & React enterprise platforms engineered with WCAG 2.2 AA accessibility, zero layout shifts, and sub-2 second Core Web Vitals across all networks.',
        deliverables: ['Headless Next.js/React', 'Sub-2s Speed Guarantee', 'WCAG 2.2 AA Compliance', 'Edge-Cached Dynamic Pages'],
        metrics: [
          { title: 'Lighthouse Score', value: '100/100', delta: 'Maximum speed and technical SEO rank' },
          { title: 'P99 Load Guarantee', value: '<1.4s', delta: 'Sub-2s load benchmark across devices' },
          { title: 'Core Web Vitals', value: '100%', delta: 'Zero layout shift, 40% faster FCP' }
        ]
      }
    },
    {
      id: 'mobile',
      icon: Smartphone,
      shortTitle: 'Mobile Ecosystem',
      title: 'Build Mobile Ecosystem',
      subtext: 'iOS, Android & Flutter cross-platform',
      recommendation: {
        track: 'Cross-Platform Mobile Application Architecture',
        bestFit: 'Mobile App Engineering',
        summary: 'High-performance iOS & Android enterprise applications built with Flutter or React Native, backed by real-time bidirectional WebSocket API synchronization.',
        deliverables: ['iOS & Android Unified', '60fps Native Performance', 'Offline-First Cache', 'Biometric & Push Sync'],
        metrics: [
          { title: 'Frame Rate Guarantee', value: '60 FPS', delta: 'Fluid native animations & gestures' },
          { title: 'Codebase Reusability', value: '95%', delta: 'Unified single-codebase velocity' },
          { title: 'Offline Resilience', value: '100%', delta: 'Automatic local sync upon reconnection' }
        ]
      }
    }
  ];

  const activeRec = objectives.find(o => o.id === selectedObjective) || objectives[0];

  return (
    <section className="pillar-discovery-section" id="pillar-discovery" aria-label="Find Your Pillar">
      <div className="clay-container">
        
        {/* Section Header */}
        <div className="pillar-discovery-header">
          <span className="clay-eyebrow">STRATEGIC PILLAR DISCOVERY</span>
          <h2 className="pillar-heading">
            Not Sure Where to Start? <span className="pillar-heading-accent">Find Your Pillar.</span>
          </h2>
          <p className="pillar-subtitle">
            Use our interactive consultant to identify the high-impact solution for your business.
          </p>
        </div>

        {/* Solid White Interactive Shell (Zero Glassmorphism) */}
        <div className="pillar-solid-card">
          
          {/* Top Bar with Step Badge & Optional Back Link */}
          <div className="pillar-card-topbar">
            <span className="pillar-step-badge">
              {selectedObjective ? 'STEP 2 OF 2: RECOMMENDED STRATEGY' : 'STEP 1 OF 2: CHOOSE OBJECTIVE'}
            </span>

            {selectedObjective && (
              <button
                type="button"
                className="pillar-back-link"
                onClick={() => setSelectedObjective(null)}
                aria-label="Back to all objectives"
              >
                <RotateCcw size={13} />
                <span>All Objectives</span>
              </button>
            )}
          </div>

          {/* STEP 1: 2x2 Grid View */}
          {!selectedObjective ? (
            <div className="pillar-step1-view">
              <h3 className="pillar-question-heading">What is your primary digital objective?</h3>
              
              <div className="pillar-options-grid">
                {objectives.map((obj) => {
                  const Icon = obj.icon;
                  return (
                    <button
                      key={obj.id}
                      type="button"
                      className="pillar-option-card"
                      onClick={() => setSelectedObjective(obj.id)}
                    >
                      <div className="pillar-option-icon-box">
                        <Icon size={22} strokeWidth={2} />
                      </div>
                      <div className="pillar-option-text-wrap">
                        <span className="pillar-option-title">{obj.title}</span>
                        <span className="pillar-option-subtext">{obj.subtext}</span>
                      </div>
                      <ArrowRight size={18} className="pillar-option-arrow" />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* STEP 2: Transitioned Strategy View */
            <div className="pillar-step2-view">
              
              {/* Mini-Switcher Tab Bar (Instant Switching Without "Back" Button) */}
              <div className="pillar-switcher-tabs" role="tablist" aria-label="Objective Switcher">
                {objectives.map((obj) => {
                  const Icon = obj.icon;
                  const isActive = selectedObjective === obj.id;
                  return (
                    <button
                      key={obj.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`pillar-tab-btn ${isActive ? 'is-active' : ''}`}
                      onClick={() => setSelectedObjective(obj.id)}
                    >
                      <Icon size={16} strokeWidth={2} className="pillar-tab-icon" />
                      <span>{obj.shortTitle}</span>
                    </button>
                  );
                })}
              </div>

              {/* Split Strategy Content: Left Solution Brief · Right Verified Metric Cards */}
              <div className="pillar-split-layout">
                
                {/* Left Column: Solution Brief */}
                <div className="pillar-strategy-left">
                  <h3 className="pillar-strategy-title">{activeRec.recommendation.track}</h3>
                  <p className="pillar-strategy-desc">{activeRec.recommendation.summary}</p>

                  {/* Deliverables / Architectural Scope */}
                  <div className="pillar-deliverables-wrap">
                    <span className="pillar-deliverables-label">Core Deliverables & Specifications</span>
                    <div className="pillar-chips-row">
                      {activeRec.recommendation.deliverables.map((item, idx) => (
                        <span key={idx} className="pillar-chip">{item}</span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Actions */}
                  <div className="pillar-cta-row">
                    <button
                      type="button"
                      className="pillar-blueprint-btn"
                      onClick={onOpenQuote}
                    >
                      <span>Request Custom Blueprint for this Pillar</span>
                      <ArrowRight size={16} />
                    </button>
                    <button
                      type="button"
                      className="pillar-switch-link-btn"
                      onClick={() => setSelectedObjective(null)}
                    >
                      <RotateCcw size={14} />
                      <span>Choose Another</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Solid Light Metric Indicator Cards (Fills Previous Empty Space) */}
                <div className="pillar-strategy-right">
                  <div className="pillar-metrics-panel">
                    
                    <div className="pillar-panel-header">
                      <span className="pillar-panel-tag">Expected Performance Outcomes</span>
                    </div>

                    {activeRec.recommendation.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="pillar-metric-card">
                        <div className="pillar-metric-value-row">
                          <span className="pillar-metric-val">{metric.value}</span>
                          <span className="pillar-metric-title">{metric.title}</span>
                        </div>
                        <div className="pillar-metric-delta">{metric.delta}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
