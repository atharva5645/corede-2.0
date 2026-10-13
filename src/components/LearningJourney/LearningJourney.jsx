import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import './LearningJourney.css';

gsap.registerPlugin(ScrollTrigger);

const FIVE_STEPS = [
  {
    num: '01',
    label: 'Enrol',
    pillType: 'soft',
    title: 'Consultation & Roadmap',
    desc: 'Free 1:1 diagnostic assessment with Founder Priyanka Desurkar to map your child’s learning path.',
    color: '#0F7B83', // Brand teal
    badgeColor: '#EDF9FA',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80', // mentor consultation laptop
    tag: '1:1 Assessment',
  },
  {
    num: '02',
    label: 'Spark',
    subLabel: 'Bitesize Content',
    pillType: 'split',
    splitTop: '#F26A1B', // Brand orange
    splitBottom: '#0F7B83', // Brand teal
    title: 'Frontend Foundations',
    desc: 'Master semantic HTML5, modern CSS3 layout, and build responsive portfolio sites.',
    color: '#F26A1B',
    badgeColor: '#FFF4ED',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80', // modern website design on laptop
    tag: 'Hands-on Projects',
  },
  {
    num: '03',
    label: 'Engage',
    pillType: 'soft',
    title: 'Interactive Logic & Games',
    desc: 'Build problem-solving confidence with JavaScript DOM triggers, state, and browser mini-games.',
    color: '#0284C7',
    badgeColor: '#F0F9FF',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80', // clean code on screen
    tag: 'Algorithmic Thinking',
  },
  {
    num: '04',
    label: 'Ignite',
    subLabel: 'Live + Projects',
    pillType: 'split',
    splitTop: '#F26A1B',
    splitBottom: '#7C3AED',
    title: 'Python Mastery & GUIs',
    desc: 'Develop desktop applications and automation tools with OOP classes and Tkinter windows.',
    color: '#F26A1B',
    badgeColor: '#FFF4ED',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80', // python code matrix screen
    tag: 'OOP Architecture',
  },
  {
    num: '05',
    label: 'Achieve',
    pillType: 'soft',
    title: 'AI Machine Learning & Certs',
    desc: 'Train image classifiers in TensorFlow and graduate with verifiable physical credentials.',
    color: '#0F7B83',
    badgeColor: '#EDF9FA',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80', // students celebrating graduation/cert
    tag: 'Verified Credentials',
  },
];

export default function LearningJourney() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const tracerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const tracer = tracerRef.current;
      if (!path) return;

      const pathLength = path.getTotalLength();

      // Setup drawing stroke
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Animate circuit path drawing on scroll
      // Relaxed scroll range so the tracer line trails comfortably within the user's viewport
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%',
          end: 'bottom 90%',
          scrub: 1.4,
          onUpdate: (self) => {
            // Apply slight trailing factor (max 0.96) so the line and tracer never run off the end ahead of user sight
            const progress = Math.min(1, Math.max(0, self.progress * 0.97));

            // Desktop SVG line tracer
            if (tracer) {
              const point = path.getPointAtLength(progress * pathLength);
              gsap.set(tracer, {
                attr: { cx: point.x, cy: point.y },
              });
            }

            // Mobile vertical spine line and tracer dot animation
            const mobileFill = document.querySelector('.lj-mobile-line-fill');
            const mobileDot = document.querySelector('.lj-mobile-tracer-dot');
            if (mobileFill) {
              mobileFill.style.height = `${progress * 100}%`;
            }
            if (mobileDot) {
              mobileDot.style.top = `${progress * 100}%`;
            }
          },
        },
      });

      // Card brightening effect: Cards stay visible on page, they brighten and highlight when active
      const items = gsap.utils.toArray('.lj-step-item');
      items.forEach((item) => {
        const dot = item.querySelector('.lj-node-dot');
        const card = item.querySelector('.lj-card');
        const pill = item.querySelector('.lj-pill');

        ScrollTrigger.create({
          trigger: item,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleClass: { targets: item, className: 'is-active' },
        });

        // Entrance animation: cards enter once and STAY visible (never disappear on scroll back up/down)
        gsap.from(card, {
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            once: true, // Remains permanently in DOM
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="learning-journey-section" id="learning-journey" aria-labelledby="journey-heading">
      <div className="container lj-container">
        
        {/* Section Header matching website clean light palette */}
        <div className="text-center lj-header">
          <span className="section-eyebrow">
            <Sparkles size={14} /> Structured Pathway
          </span>
          <h2 className="section-title" id="journey-heading">
            Your 5-Step Learning Journey
          </h2>
          <p className="section-subtitle">
            From foundational logic to training AI models, follow a guided pathway with continuous mentor feedback.
          </p>
        </div>

        {/* 5-Step Connecting Dots Circuit */}
        <div className="lj-stage">
          
          {/* Desktop Circuit SVG dotted line */}
          <svg
            className="lj-circuit-svg lj-desktop-svg"
            viewBox="0 0 760 920"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="ljCircuitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0F7B83" />
                <stop offset="25%" stopColor="#F26A1B" />
                <stop offset="50%" stopColor="#0284C7" />
                <stop offset="75%" stopColor="#F26A1B" />
                <stop offset="100%" stopColor="#0F7B83" />
              </linearGradient>

              <filter id="ljTracerGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Inactive Dotted Background Path */}
            <path
              className="lj-bg-path"
              d="M 120 70
                 H 640
                 V 255
                 H 120
                 V 440
                 H 640
                 V 625
                 H 120
                 V 810
                 H 380"
            />

            {/* Active Drawing Progressive Grey Path */}
            <path
              ref={pathRef}
              className="lj-active-path"
              d="M 120 70
                 H 640
                 V 255
                 H 120
                 V 440
                 H 640
                 V 625
                 H 120
                 V 810
                 H 380"
              stroke="#475569"
            />

            {/* Luminous Tracer Dot */}
            <circle
              ref={tracerRef}
              className="lj-tracer-dot"
              cx="120"
              cy="70"
              r="6.5"
            />
          </svg>

          {/* Mobile Vertical Track Line (Live Connected Spine) */}
          <div className="lj-mobile-line-track" aria-hidden="true">
            <div className="lj-mobile-line-bg" />
            <div className="lj-mobile-line-fill" />
            <div className="lj-mobile-tracer-dot" />
          </div>

          {/* 5 Milestone Step Blocks */}
          <div className="lj-steps-list">
            {FIVE_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={step.num}
                  className={`lj-step-item ${isEven ? 'step-align-left' : 'step-align-right'}`}
                >
                  {/* Step Connector Dot on the line */}
                  <div className="lj-node-anchor">
                    <div
                      className="lj-node-dot"
                      style={{ borderColor: step.color }}
                    >
                      <span
                        className="lj-node-center"
                        style={{ background: step.color }}
                      />
                    </div>
                  </div>

                  {/* Header Pill matching reference layout */}
                  <div className="lj-pill-row">
                    {step.pillType === 'split' ? (
                      <div className="lj-pill lj-pill-split">
                        <div
                          className="lj-pill-split-top"
                          style={{ background: step.splitTop }}
                        >
                          <span className="lj-pill-icon">✳</span>
                          <span>{step.label}</span>
                        </div>
                        <div
                          className="lj-pill-split-bottom"
                          style={{ background: step.splitBottom }}
                        >
                          <span>{step.subLabel}</span>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="lj-pill lj-pill-soft"
                        style={{
                          background: step.badgeColor,
                          borderColor: `${step.color}35`,
                        }}
                      >
                        <span className="lj-pill-dot" style={{ background: step.color }} />
                        <span className="lj-pill-text" style={{ color: step.color }}>{step.label}</span>
                      </div>
                    )}
                  </div>

                  {/* Structured Visual Card (Compact, Concise, Photographic) */}
                  <div className="lj-card">
                    <div className="lj-card-thumbnail-wrap">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="lj-card-thumbnail"
                        loading="lazy"
                      />
                      <span className="lj-card-tag">{step.tag}</span>
                      <span className="lj-step-number">Step {step.num}</span>
                    </div>

                    <div className="lj-card-body">
                      <h3 className="lj-card-title">{step.title}</h3>
                      <p className="lj-card-desc">{step.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
