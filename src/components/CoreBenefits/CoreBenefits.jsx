import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Brain, Shield, Zap, Sparkles, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { BENEFITS } from '../../data/siteData';
import './CoreBenefits.css';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = {
  Lightbulb,
  Brain,
  Shield,
  Zap,
};

const PILLAR_METAS = [
  {
    number: '01',
    tag: 'Game & App Design',
    colorHex: '#F26A1B',
    rgb: '242, 106, 27',
    badge: 'Creative Coding',
  },
  {
    number: '02',
    tag: 'Algorithmic Mindset',
    colorHex: '#0F7B83',
    rgb: '15, 123, 131',
    badge: 'Logic & Systems',
  },
  {
    number: '03',
    tag: 'Real-World Proof',
    colorHex: '#F59E0B',
    rgb: '245, 158, 11',
    badge: 'Self Confidence',
  },
  {
    number: '04',
    tag: 'Analytical Power',
    colorHex: '#8B5CF6',
    rgb: '139, 92, 246',
    badge: 'Problem Solver',
  },
];

// Combine into enriched items
const ENRICHED_ITEMS = BENEFITS.map((b, i) => ({
  ...b,
  ...PILLAR_METAS[i % PILLAR_METAS.length],
  originalIndex: i,
}));

// Duplicate to 8 items to form a complete 360-degree cylinder (45 degrees per item)
const CARDS = [
  ...ENRICHED_ITEMS.map((item, idx) => ({ ...item, id: `card-a-${idx}`, ringIndex: idx })),
  ...ENRICHED_ITEMS.map((item, idx) => ({ ...item, id: `card-b-${idx}`, ringIndex: idx + 4 })),
];

const TOTAL_CARDS = CARDS.length; // 8
const STEP_ANGLE = 360 / TOTAL_CARDS; // 45 degrees

export default function CoreBenefits() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  const [currentAngle, setCurrentAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const dragStartX = useRef(0);
  const dragStartAngle = useRef(0);
  const autoPlayRef = useRef(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.core-benefits-stage',
        { scale: 0.94, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          clearProps: 'opacity,scale',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Next and Previous rotations
  const rotateNext = useCallback(() => {
    setCurrentAngle(prev => prev - STEP_ANGLE);
  }, []);

  const rotatePrev = useCallback(() => {
    setCurrentAngle(prev => prev + STEP_ANGLE);
  }, []);

  // Rotate to specific pillar index (0 to 3)
  const rotateToPillar = useCallback((pillarIndex) => {
    setCurrentAngle(prev => {
      // Find current normalized step
      const currentStep = Math.round(prev / STEP_ANGLE);
      const currentPillar = ((-currentStep) % 4 + 4) % 4;
      let diff = pillarIndex - currentPillar;
      if (diff > 2) diff -= 4;
      if (diff < -2) diff += 4;
      return (currentStep - diff) * STEP_ANGLE;
    });
  }, []);

  // Auto rotation every 3.8s when not interacting
  useEffect(() => {
    if (isDragging || isHovered) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentAngle(prev => prev - STEP_ANGLE);
    }, 3800);

    return () => clearInterval(autoPlayRef.current);
  }, [isDragging, isHovered]);

  // Pointer drag handling
  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartAngle.current = currentAngle;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    // Map pixels to rotation degrees
    const sensitivity = isMobile ? 0.35 : 0.22;
    setCurrentAngle(dragStartAngle.current + deltaX * sensitivity);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Snap to nearest 45-degree angle
    setCurrentAngle(prev => Math.round(prev / STEP_ANGLE) * STEP_ANGLE);
  };

  // Determine current active pillar (0..3)
  const activePillarIndex = ((-Math.round(currentAngle / STEP_ANGLE)) % 4 + 4) % 4;

  return (
    <section
      className="core-benefits-section"
      id="core-benefits"
      ref={containerRef}
      aria-labelledby="core-benefits-heading"
    >
      {/* Ambient background glows */}
      <div className="cb-glow-sphere cb-glow-1" aria-hidden="true" />
      <div className="cb-glow-sphere cb-glow-2" aria-hidden="true" />

      <div className="container">
        {/* Header */}
        <div className="core-benefits-header">
          <div className="core-benefits-eyebrow">
            <span>Foundational Skill Development</span>
          </div>
          <h2 className="core-benefits-title" id="core-benefits-heading">
            Essential Skills Built Through Coding
          </h2>
          <p className="core-benefits-sub">
            Beyond syntax and programming tools, our curriculum cultivates foundational cognitive, logical, and creative capabilities for lifelong academic and career excellence.
          </p>
        </div>

        {/* 3D Circular Rotation Stage */}
        <div
          className="core-benefits-stage-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={stageRef}
            className={`core-benefits-stage ${isDragging ? 'is-dragging' : ''}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {CARDS.map((card) => {
              const Icon = ICON_MAP[card.icon] || Sparkles;

              // Compute normalized angle for this card in [-180, 180]
              const baseAngle = card.ringIndex * STEP_ANGLE;
              let theta = (baseAngle + currentAngle) % 360;
              if (theta > 180) theta -= 360;
              if (theta < -180) theta += 360;

              // Arc math parameters
              const radius = isMobile ? 185 : 380;
              const rad = (theta * Math.PI) / 180;
              const cosTheta = Math.cos(rad);
              const sinTheta = Math.sin(rad);

              const x = sinTheta * radius;
              const z = (cosTheta - 1) * radius;

              // Natural fanning & perspective tilt matching Attachment 2
              const rotY = -theta * 0.58;
              const rotZ = sinTheta * -2.2;
              const scale = isMobile
                ? Math.max(0.72, 0.72 + 0.28 * cosTheta)
                : Math.max(0.76, 0.76 + 0.24 * cosTheta);

              // Occlusion and visibility: only show cards facing the camera
              const isFront = Math.abs(theta) < STEP_ANGLE / 2;
              const isFacingCamera = cosTheta > 0.05 && Math.abs(theta) <= 88;
              const opacity = isFacingCamera
                ? Math.max(0.22, Math.pow(cosTheta, 1.8))
                : 0;

              // Front-to-back sorting
              const zIndex = isFacingCamera ? Math.round(200 + cosTheta * 100) : 1;

              return (
                <div
                  key={card.id}
                  className={`core-benefit-card-3d ${isFront ? 'is-front' : ''}`}
                  style={{
                    transform: `translate3d(${x}px, 0px, ${z}px) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                    pointerEvents: isFacingCamera ? 'auto' : 'none',
                    '--card-rgb': card.rgb,
                    '--card-hex': card.colorHex,
                  }}
                  onClick={() => {
                    // Click side card to rotate it directly to front
                    if (!isFront) {
                      setCurrentAngle(prev => prev - theta);
                    }
                  }}
                  role="button"
                  tabIndex={isFront ? 0 : -1}
                  aria-label={`${card.title}: ${card.desc}`}
                >
                  {/* Frosted Glass Specular Rim Highlight */}
                  <div className="cb-card-rim-light" aria-hidden="true" />

                  {/* Top Bar with Number & Badge */}
                  <div className="cb-card-topbar">
                    <span className="cb-card-pillar-tag">
                      PILLAR {card.number}
                    </span>
                    <span className="cb-card-badge-pill" style={{ borderColor: `rgba(${card.rgb}, 0.35)` }}>
                      <span className="cb-card-badge-dot" style={{ backgroundColor: card.colorHex }} />
                      {card.badge}
                    </span>
                  </div>

                  {/* Icon Box */}
                  <div
                    className="cb-card-icon-box"
                    style={{
                      background: `linear-gradient(135deg, rgba(${card.rgb}, 0.22) 0%, rgba(${card.rgb}, 0.08) 100%)`,
                      borderColor: `rgba(${card.rgb}, 0.45)`,
                      boxShadow: `0 8px 24px -4px rgba(${card.rgb}, 0.35)`,
                    }}
                  >
                    <Icon size={28} color={card.colorHex} strokeWidth={2.3} />
                  </div>

                  {/* Title & Description */}
                  <div className="cb-card-body">
                    <h3 className="cb-card-title">{card.title}</h3>
                    <p className="cb-card-desc">{card.desc}</p>
                  </div>

                  {/* Footer Tag */}
                  <div className="cb-card-footer">
                    <span className="cb-card-feature-pill">
                      <Compass size={13} style={{ marginRight: 5, opacity: 0.8 }} />
                      {card.tag}
                    </span>
                  </div>

                  {/* Bottom Color Glow Line */}
                  <div
                    className="cb-card-bottom-glow"
                    style={{
                      background: `radial-gradient(ellipse at 50% 100%, ${card.colorHex} 0%, transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />
                </div>
              );
            })}
          </div>

          {/* Navigation Controls: Arrows & Pillar Dots */}
          <div className="cb-controls-bar">
            <button
              type="button"
              className="cb-nav-btn cb-nav-prev"
              onClick={rotatePrev}
              aria-label="Previous core pillar"
              title="Previous pillar"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="cb-pillar-dots" role="tablist" aria-label="Core pillars selector">
              {BENEFITS.map((b, idx) => (
                <button
                  key={b.title}
                  type="button"
                  role="tab"
                  aria-selected={activePillarIndex === idx}
                  className={`cb-dot-item ${activePillarIndex === idx ? 'active' : ''}`}
                  onClick={() => rotateToPillar(idx)}
                  aria-label={`View ${b.title}`}
                >
                  <span className="cb-dot-indicator" />
                  <span className="cb-dot-label">{b.title}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="cb-nav-btn cb-nav-next"
              onClick={rotateNext}
              aria-label="Next core pillar"
              title="Next pillar"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
