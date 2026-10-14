import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight } from 'lucide-react';
import './LearningJourney.css';

gsap.registerPlugin(ScrollTrigger);

// 4 Guided Milestones data
const JOURNEY_STEPS = [
  {
    num: '01',
    tag: '1:1 Diagnostic',
    title: 'Consultation & Roadmap',
    desc: 'Free 1:1 diagnostic assessment with founder to evaluate logic, problem-solving skills, and map your child’s personalized coding journey.',
    color: '#7C3AED', // Purple
    lightColor: '#F5F3FF',
    glowColor: 'rgba(124, 58, 237, 0.35)',
    dCx: 180,
    dCy: 300,
    dAlign: 'bottom',
    dTrigger: 0.08,
  },
  {
    num: '02',
    tag: 'Modern Web',
    title: 'Frontend Foundations',
    desc: 'Master semantic HTML5, modern CSS3 layout styling, and build hands-on interactive responsive web projects from scratch.',
    color: '#00C0D4', // Vibrant Cyan
    lightColor: '#ECFEFF',
    glowColor: 'rgba(0, 192, 212, 0.35)',
    dCx: 440,
    dCy: 550,
    dAlign: 'top',
    dTrigger: 0.33,
  },
  {
    num: '03',
    tag: 'Python & Logic',
    title: 'Logic & Python Apps',
    desc: 'Develop algorithmic problem-solving confidence with Python programming, OOP structures, and interactive desktop GUI applications.',
    color: '#F26A1B', // Brand Orange
    lightColor: '#FFF4ED',
    glowColor: 'rgba(242, 106, 27, 0.35)',
    dCx: 714,
    dCy: 160,
    dAlign: 'bottom',
    dTrigger: 0.64,
  },
  {
    num: '04',
    tag: 'AI & Certification',
    title: 'AI Projects & Certification',
    desc: 'Train intelligent machine learning models, build an impressive portfolio of live tools, and graduate with verified physical credentials.',
    color: '#EC4899', // Pink / Magenta
    lightColor: '#FDF2F8',
    glowColor: 'rgba(236, 72, 153, 0.35)',
    dCx: 1020,
    dCy: 440,
    dAlign: 'top',
    dTrigger: 0.89,
  },
];

// Desktop Landscape Highway path with continuous cubic beziers (zero arc jumps)
const DESKTOP_ROAD_PATH =
  'M 0 300 H 260 C 285.4 300, 306 320.6, 306 346 V 504 C 306 529.4, 326.6 550, 352 550 H 528 C 553.4 550, 574 529.4, 574 504 V 206 C 574 180.6, 594.6 160, 620 160 H 808 C 833.4 160, 854 180.6, 854 206 V 394 C 854 419.4, 874.6 440, 900 440 H 1200';

export default function LearningJourney() {
  const sectionRef = useRef(null);

  // Desktop landscape refs
  const dPathRef = useRef(null);
  const dProgressRef = useRef(null);
  const dTravelerRef = useRef(null);
  const dCoreRef = useRef(null);
  const dBarRef = useRef(null);

  // Mobile vertical timeline refs
  const mTimelineRef = useRef(null);
  const mTrailRef = useRef(null);
  const mTravelerRef = useRef(null);
  const mCoreRef = useRef(null);

  const activeST = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ============================================================
      // 1. DESKTOP LANDSCAPE ANIMATION (> 768px)
      // ============================================================
      mm.add('(min-width: 769px)', () => {
        const path = dPathRef.current;
        const progressPath = dProgressRef.current;
        const traveler = dTravelerRef.current;
        const travelerCore = dCoreRef.current;
        if (!path) return;

        const pathLength = path.getTotalLength();

        if (progressPath) {
          progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
          progressPath.style.strokeDashoffset = `${pathLength}`;
        }

        const startPt = path.getPointAtLength(0);
        if (traveler && startPt) {
          traveler.setAttribute('transform', `translate(${startPt.x}, ${startPt.y})`);
        }

        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1600',
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = Math.min(1, Math.max(0, self.progress));
            const dist = Math.min(pathLength, Math.max(0, progress * pathLength));
            const pt = path.getPointAtLength(dist);

            if (traveler && pt && !isNaN(pt.x) && !isNaN(pt.y)) {
              traveler.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
            }

            if (progressPath) {
              progressPath.style.strokeDashoffset = `${pathLength * (1 - progress)}`;
            }

            if (dBarRef.current) {
              dBarRef.current.style.width = `${progress * 100}%`;
            }

            if (travelerCore) {
              if (progress < 0.2) travelerCore.setAttribute('fill', '#7C3AED');
              else if (progress < 0.5) travelerCore.setAttribute('fill', '#00C0D4');
              else if (progress < 0.78) travelerCore.setAttribute('fill', '#F26A1B');
              else travelerCore.setAttribute('fill', '#EC4899');
            }

            JOURNEY_STEPS.forEach((step) => {
              const isPassed = progress >= step.dTrigger;
              const nodeEl = document.getElementById(`lj-d-node-${step.num}`);
              const cardEl = document.getElementById(`lj-d-card-${step.num}`);
              if (nodeEl) nodeEl.classList.toggle('is-active', isPassed);
              if (cardEl) cardEl.classList.toggle('is-active', isPassed);
            });

            const summaryEl = document.getElementById('lj-d-summary');
            if (summaryEl) {
              summaryEl.classList.toggle('is-active', progress >= 0.94);
            }
          },
        });

        activeST.current = st;
        return () => st.kill();
      });

      // ============================================================
      // 2. MOBILE CLEAN VERTICAL TIMELINE ANIMATION (<= 768px)
      // Natural vertical scroll: zero clutter, zero overlap, readable cards
      // ============================================================
      mm.add('(max-width: 768px)', () => {
        const timeline = mTimelineRef.current;
        const trail = mTrailRef.current;
        const traveler = mTravelerRef.current;
        const travelerCore = mCoreRef.current;
        if (!timeline) return;

        const st = ScrollTrigger.create({
          trigger: timeline,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 0.6,
          onUpdate: (self) => {
            const progress = Math.min(1, Math.max(0, self.progress));

            // Move mobile vertical traveler dot and trail
            if (trail) {
              trail.style.height = `${progress * 100}%`;
            }
            if (traveler) {
              traveler.style.top = `${progress * 100}%`;
            }

            if (travelerCore) {
              if (progress < 0.25) travelerCore.style.background = '#7C3AED';
              else if (progress < 0.5) travelerCore.style.background = '#00C0D4';
              else if (progress < 0.75) travelerCore.style.background = '#F26A1B';
              else travelerCore.style.background = '#EC4899';
            }

            // Activate cards as traveler dot passes them
            JOURNEY_STEPS.forEach((step, idx) => {
              const triggerPoint = idx / 3.4; // 0, ~0.29, ~0.58, ~0.88
              const isPassed = progress >= triggerPoint;
              const itemEl = document.getElementById(`lj-m-item-${step.num}`);
              if (itemEl) {
                itemEl.classList.toggle('is-active', isPassed);
              }
            });

            const summaryEl = document.getElementById('lj-m-summary');
            if (summaryEl) {
              summaryEl.classList.toggle('is-active', progress >= 0.92);
            }
          },
        });

        activeST.current = st;
        return () => st.kill();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Jump to specific milestone on click (desktop)
  const handleStepClick = useCallback((progressTarget) => {
    if (!activeST.current) return;
    const st = activeST.current;
    const targetScroll = st.start + progressTarget * (st.end - st.start);
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="learning-journey-section"
      id="learning-journey"
      aria-label="Learning Journey Pathway"
    >
      {/* ============================================================
          DESKTOP VIEW: Full Landscape Format (Edge-to-Edge)
          ============================================================ */}
      <div className="lj-desktop-view">
        <div className="lj-landscape-board">
          
          {/* Highway SVG Circuit */}
          <svg
            className="lj-landscape-svg"
            viewBox="0 0 1200 680"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="ljDProgressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="35%" stopColor="#00C0D4" />
                <stop offset="68%" stopColor="#F26A1B" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>

              <filter id="dRoadShadow" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.12" />
              </filter>

              <filter id="dNodeShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.22" />
              </filter>

              <radialGradient id="dTravelerAura" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F26A1B" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#F26A1B" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#F26A1B" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Road Asphalt */}
            <path
              ref={dPathRef}
              className="lj-road-asphalt"
              d={DESKTOP_ROAD_PATH}
              stroke="#374151"
              strokeWidth="54"
              strokeLinecap="butt"
              strokeLinejoin="round"
              filter="url(#dRoadShadow)"
            />

            {/* Road Border Accent */}
            <path
              className="lj-road-subtle-border"
              d={DESKTOP_ROAD_PATH}
              stroke="#1F2937"
              strokeWidth="56"
              strokeLinecap="butt"
              strokeLinejoin="round"
              opacity="0.25"
            />

            {/* White Lane Markings */}
            <path
              className="lj-road-white-dash"
              d={DESKTOP_ROAD_PATH}
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeDasharray="14 16"
              strokeLinecap="round"
            />

            {/* Neon Trail Drawn on Scroll */}
            <path
              ref={dProgressRef}
              className="lj-road-active-trail"
              d={DESKTOP_ROAD_PATH}
              stroke="url(#ljDProgressGrad)"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* 4 Milestones */}
            {JOURNEY_STEPS.map((step) => (
              <g
                key={step.num}
                id={`lj-d-node-${step.num}`}
                className="lj-milestone-node"
                transform={`translate(${step.dCx}, ${step.dCy})`}
                onClick={() => handleStepClick(step.dTrigger)}
                role="button"
                tabIndex="0"
                aria-label={`Step ${step.num}: ${step.title}`}
              >
                <circle className="lj-node-ripple" r="28" fill={step.color} opacity="0" />
                <circle
                  className="lj-node-outer-ring"
                  r="21"
                  fill="#FFFFFF"
                  stroke={step.color}
                  strokeWidth="5.5"
                  filter="url(#dNodeShadow)"
                />
                <circle className="lj-node-gap-ring" r="12.5" fill="#FFFFFF" />
                <circle className="lj-node-center-dot" r="8.5" fill={step.color} />
              </g>
            ))}

            {/* Glitch-Free Traveler Dot */}
            <g
              ref={dTravelerRef}
              className="lj-traveler-group"
              transform="translate(0, 300)"
            >
              <circle className="lj-traveler-halo" r="20" fill="url(#dTravelerAura)" />
              <circle
                className="lj-traveler-rim"
                r="9.5"
                fill="#FFFFFF"
                stroke="#1E293B"
                strokeWidth="2.5"
                filter="url(#dNodeShadow)"
              />
              <circle ref={dCoreRef} className="lj-traveler-core" r="5.5" fill="#7C3AED" />
            </g>
          </svg>

          {/* Top-Left Header */}
          <div className="lj-title-block">
            <span className="lj-eyebrow">
              <Sparkles size={13} className="lj-eyebrow-icon" /> Structured Pathway
            </span>
            <h2 className="lj-main-title">Key Steps in Your Learning Journey</h2>
            <p className="lj-main-subtitle">4 Key Steps to Master Modern Coding & AI</p>
          </div>

          {/* Step Text Cards */}
          {JOURNEY_STEPS.map((step) => (
            <div
              key={step.num}
              id={`lj-d-card-${step.num}`}
              className={`lj-step-card lj-card-${step.num} align-${step.dAlign}`}
              onClick={() => handleStepClick(step.dTrigger)}
              role="button"
              tabIndex="0"
            >
              <div className="lj-step-num" style={{ color: step.color }}>
                {step.num}
              </div>
              <h3 className="lj-step-title">{step.title}</h3>
              <p className="lj-step-desc">{step.desc}</p>
            </div>
          ))}

          {/* Bottom-Right Summary Paragraph */}
          <div id="lj-d-summary" className="lj-summary-block">
            <p className="lj-summary-text">
              A successful learning journey involves clearly defining objectives, building real-world projects through hands-on practice, and continuous 1:1 mentorship. Utilizing modern developer tools from foundational logic to production AI empowers young learners to adapt with confidence to tomorrow’s tech world.
            </p>
          </div>

          {/* Bottom Progress Bar */}
          <div className="lj-progress-bar-track" aria-hidden="true">
            <div ref={dBarRef} className="lj-progress-bar-fill" style={{ width: '0%' }} />
          </div>

        </div>
      </div>

      {/* ============================================================
          MOBILE VIEW: Clean Vertical Highway Timeline (<= 768px)
          Thoughtfully engineered for mobile: zero overlap, uncluttered
          ============================================================ */}
      <div className="lj-mobile-view">
        <div className="lj-mobile-container">
          
          {/* Header */}
          <div className="lj-m-header">
            <span className="lj-eyebrow">
              <Sparkles size={12} className="lj-eyebrow-icon" /> Structured Pathway
            </span>
            <h2 className="lj-m-title">Key Steps in Your Learning Journey</h2>
            <p className="lj-m-subtitle">4 Guided Milestones to Master Modern Coding & AI</p>
          </div>

          {/* Vertical Highway Timeline */}
          <div ref={mTimelineRef} className="lj-mobile-timeline">
            
            {/* The Left Vertical Highway Spine */}
            <div className="lj-m-road-track" aria-hidden="true">
              {/* Asphalt Road Surface */}
              <div className="lj-m-road-surface" />
              {/* White Dashed Centerline */}
              <div className="lj-m-road-dashes" />
              {/* Active Neon Gradient Trail */}
              <div ref={mTrailRef} className="lj-m-road-trail" />
              {/* Animated Traveler Dot */}
              <div ref={mTravelerRef} className="lj-m-traveler-dot">
                <span className="lj-m-traveler-pulse" />
                <span className="lj-m-traveler-rim" />
                <span ref={mCoreRef} className="lj-m-traveler-core" />
              </div>
            </div>

            {/* List of 4 Spacious, Uncluttered Cards */}
            <div className="lj-m-cards-list">
              {JOURNEY_STEPS.map((step) => (
                <div
                  key={step.num}
                  id={`lj-m-item-${step.num}`}
                  className="lj-m-step-item"
                >
                  {/* Concentric Target Node directly on the road */}
                  <div className="lj-m-node-anchor">
                    <div
                      className="lj-m-target-node"
                      style={{ '--step-color': step.color }}
                    >
                      <span className="lj-m-node-ripple" />
                      <span className="lj-m-node-outer" />
                      <span className="lj-m-node-gap" />
                      <span className="lj-m-node-inner" />
                    </div>
                  </div>

                  {/* Card Content Card */}
                  <div className="lj-m-card-box">
                    <div className="lj-m-card-top">
                      <span
                        className="lj-m-step-num"
                        style={{ color: step.color }}
                      >
                        {step.num}
                      </span>
                      <span
                        className="lj-m-tag"
                        style={{
                          color: step.color,
                          background: step.lightColor,
                        }}
                      >
                        {step.tag}
                      </span>
                    </div>

                    <h3 className="lj-m-card-title">{step.title}</h3>
                    <p className="lj-m-card-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Mobile Summary Card */}
          <div id="lj-m-summary" className="lj-m-summary-card">
            <p className="lj-m-summary-text">
              A successful learning journey involves clearly defining objectives, building real-world projects through hands-on practice, and continuous 1:1 mentorship.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
