import React, { useState } from 'react';
import { 
  ArrowRight, 
  Check, 
  Terminal, 
  Server, 
  ShieldCheck, 
  GitBranch, 
  Code2, 
  Users2, 
  Laptop, 
  Layers,
  ArrowUpRight
} from 'lucide-react';

export default function Features({ onOpenBrochure, onOpenQuote }) {
  const [selectedTrack, setSelectedTrack] = useState('enterprise');

  const tracks = {
    enterprise: {
      index: 'SYSTEM 01',
      title: 'Full-Lifecycle Custom Software & Cloud Platforms',
      overview: 'We engineer dedicated web applications, API microservices, and multi-tenant architectures designed for high concurrency and zero-downtime operations.',
      capabilities: [
        { label: 'Frontend Architecture', detail: 'High-performance React & Next.js systems with strict design-system token alignment and WCAG 2.1 compliance.' },
        { label: 'Backend Microservices', detail: 'Node.js, Go, and Python REST/GraphQL services backed by PostgreSQL, Redis caching, and automated testing suites.' },
        { label: 'Cloud Infrastructure', detail: 'Automated Terraform/AWS provisioning, containerized Docker deployments, Kubernetes orchestration, and monitoring.' },
        { label: 'Code Quality Governance', detail: 'Comprehensive linting, automated pull-request review gates, static security scans, and continuous integration.' }
      ],
      deliverable: 'Production codebase handed over with comprehensive documentation, schema migrations, and 90-day deployment warranty.'
    },
    internship: {
      index: 'SYSTEM 02',
      title: 'Experiential 12-Week Engineering Internships',
      overview: 'A zero-fluff, production-first training model. Cohort participants build, test, and ship real product features within active multi-developer repositories.',
      capabilities: [
        { label: 'Version Control Mastery', detail: 'Branching models, semantic commit conventions, rebase workflows, and peer pull-request approvals.' },
        { label: 'Full-Stack Execution', detail: 'Complete end-to-end full-stack feature delivery: database schema design, secured API endpoints, and responsive UI.' },
        { label: 'Staff Engineer Mentorship', detail: 'Weekly 1-on-1 code reviews with senior engineering leads addressing algorithmic efficiency and clean architecture.' },
        { label: 'Verifiable Credentials', detail: 'Cryptographically verifiable completion certificates, GitHub portfolio validation, and direct hiring consideration.' }
      ],
      deliverable: 'A live production deployment running on cloud infrastructure, verified by senior engineering leads.'
    },
    workshops: {
      index: 'SYSTEM 03',
      title: 'Applied Engineering Workshops & Tech Bootcamps',
      overview: 'Intensive weekend sprints designed for corporate engineering teams and university tech campuses seeking practical modern stack mastery.',
      capabilities: [
        { label: 'Deep-Dive Modules', detail: 'Surgical deep-dives into microservices, containerization, scalable database indexing, and AI application engineering.' },
        { label: 'Live Laboratory Sessions', detail: 'Participants code live with instructor-led debugging of production-simulated incidents and bottleneck scenarios.' },
        { label: 'Institutional Seminars', detail: 'Hands-on college campus bootcamps bridging the gap between theoretical curricula and enterprise software practices.' },
        { label: 'Custom Corporate Tracks', detail: 'Tailored curriculums designed around the specific technology migration roadmap of corporate sponsors.' }
      ],
      deliverable: 'Complete starter repositories, reproducible devcontainer setups, and curated ongoing reference handbooks.'
    }
  };

  const active = tracks[selectedTrack];

  return (
    <section className="features-editorial-section" id="services">
      <div className="section-container">
        
        {/* Section Header with Typographic Hierarchy */}
        {/* Market Evidence Header (from user reference image) */}
        <div className="evidence-header">
          <span className="evidence-eyebrow">MARKET EVIDENCE</span>

          <h2 className="evidence-heading">
            Research from <span className="evidence-source-tag">Google & HubSpot</span><br />
            proves: 70% of B2B buyers search<br />
            via Mobile.
          </h2>
        </div>

        {/* Asymmetrical Tab Switcher (Sharp, Architectural, No Generic Bento Cards) */}
        <div className="editorial-track-nav">
          <button 
            type="button" 
            className={`track-nav-btn ${selectedTrack === 'enterprise' ? 'active' : ''}`}
            onClick={() => setSelectedTrack('enterprise')}
          >
            <span className="track-index">01</span>
            <span className="track-title">Custom Software Engineering</span>
          </button>

          <button 
            type="button" 
            className={`track-nav-btn ${selectedTrack === 'internship' ? 'active' : ''}`}
            onClick={() => setSelectedTrack('internship')}
          >
            <span className="track-index">02</span>
            <span className="track-title">Project-First Internships</span>
          </button>

          <button 
            type="button" 
            className={`track-nav-btn ${selectedTrack === 'workshops' ? 'active' : ''}`}
            onClick={() => setSelectedTrack('workshops')}
          >
            <span className="track-index">03</span>
            <span className="track-title">Technical Workshops & Bootcamps</span>
          </button>
        </div>

        {/* Architectural Technical Detail Table */}
        <div className="editorial-spec-board">
          <div className="spec-board-header">
            <div>
              <span className="spec-mono-label">{active.index} // SPECIFICATION BREAKDOWN</span>
              <h3 className="spec-title">{active.title}</h3>
            </div>
            <span className="spec-badge">VERIFIED SPEC</span>
          </div>

          <p className="spec-overview">{active.overview}</p>

          <div className="spec-grid-rows">
            {active.capabilities.map((cap, i) => (
              <div key={i} className="spec-row-item">
                <div className="spec-label-col">
                  <span className="spec-bullet-num">0{i + 1}</span>
                  <span className="spec-label-text">{cap.label}</span>
                </div>
                <div className="spec-detail-col">
                  <p className="spec-detail-text">{cap.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="spec-board-footer">
            <div className="spec-deliverable-wrap">
              <span className="deliverable-tag">CORE DELIVERABLE:</span>
              <span className="deliverable-text">{active.deliverable}</span>
            </div>
            <div className="spec-actions">
              <button 
                type="button" 
                className="btn-primary-pill"
                onClick={onOpenQuote}
              >
                <span>Initiate Engagement</span>
                <ArrowRight size={16} />
              </button>
              <button 
                type="button" 
                className="btn-brochure-pill"
                onClick={onOpenBrochure}
              >
                <span>Download Syllabus & Specs</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
