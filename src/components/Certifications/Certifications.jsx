import { useEffect, useRef, useState } from 'react';
import { Monitor, Terminal, BarChart2, Brain, Award, ShieldCheck, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CERTIFICATIONS, TOOLS } from '../../data/siteData';
import './Certifications.css';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = {
  Monitor,
  Terminal,
  BarChart2,
  Brain,
};

export default function Certifications() {
  const sectionRef = useRef(null);
  const pinContainerRef = useRef(null);
  const mockupRef = useRef(null);
  const stampRef = useRef(null);
  const toolsWallRef = useRef(null);
  const [activeCertIdx, setActiveCertIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.cert-stack-card');
      if (cards.length === 0) return;

      // Pinned Timeline: Alternating Card Stack Reveal
      // Card 0 stays as base.
      // Card 1 enters from Left (-120% x)
      // Card 2 enters from Right (+120% x)
      // Card 3 enters from Left (-120% x)
      // All stack on top of each other with progressive depth scaling and dimming
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainerRef.current,
          start: 'top top+=72',
          end: '+=280%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const step = Math.min(3, Math.floor(self.progress * 4));
            setActiveCertIdx(step);
          },
        },
      });

      // Foundation Card 0: Smooth GSAP card arrival animation as user scrolls into the section
      tl.from(cards[0], {
        y: 40,
        scale: 0.96,
        opacity: 0.7,
        duration: 0.5,
        ease: 'power2.out',
      }, 0);

      cards.forEach((card, i) => {
        if (i === 0) return; // Base card stays

        // Prior cards scale down slightly and dim to create realistic card stack depth
        tl.to(cards.slice(0, i), {
          scale: (idx) => 1 - (i - idx) * 0.04,
          y: (idx) => -(i - idx) * 12,
          opacity: (idx) => 0.45 + idx * 0.15,
          duration: 0.8,
          ease: 'power2.inOut',
        }, `card-${i}`);

        // Current card comes from alternating side (even: right +130%, odd: left -130%)
        const fromLeft = i % 2 === 1;
        const xStart = fromLeft ? -130 : 130;
        const rotateStart = fromLeft ? -6 : 6;

        tl.fromTo(
          card,
          {
            xPercent: xStart,
            rotate: rotateStart,
            opacity: 0.1,
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)',
          },
          {
            xPercent: 0,
            rotate: 0,
            opacity: 1,
            boxShadow: '0 20px 50px rgba(15, 23, 42, 0.14)',
            duration: 1,
            ease: 'power2.inOut',
          },
          `card-${i}`
        );
      });

      // Certificate Mockup 3D float and stamp slam animation
      if (mockupRef.current) {
        gsap.from(mockupRef.current, {
          scrollTrigger: {
            trigger: mockupRef.current,
            start: 'top 80%',
          },
          scale: 0.92,
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      }

      // Stamp badge pop effect
      if (stampRef.current) {
        gsap.from(stampRef.current, {
          scrollTrigger: {
            trigger: mockupRef.current,
            start: 'top 75%',
          },
          scale: 2,
          rotation: -25,
          opacity: 0,
          duration: 0.7,
          ease: 'back.out(2)',
        });
      }

      // Floating tool icons wall scrolling parallax
      if (toolsWallRef.current) {
        const chips = toolsWallRef.current.querySelectorAll('.tool-chip');
        gsap.to(chips, {
          y: (i) => (i % 2 === 0 ? -18 : 18),
          ease: 'none',
          scrollTrigger: {
            trigger: toolsWallRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section certifications-section" id="certifications" aria-labelledby="certifications-heading">
      {/* Pinned Card Stack Stage */}
      <div ref={pinContainerRef} className="cert-stack-pinned">
        <div className="container cert-stack-inner">
          <div className="text-center cert-stack-header">
            <span className="section-eyebrow">Industry Recognition</span>
            <h2 className="section-title" id="certifications-heading">
              Earn 4 Prestigious Course Certifications
            </h2>
            <p className="section-subtitle">
              Validate your coding expertise with verifiable course completion certificates that bolster academic portfolios and college applications.
            </p>

            {/* Step indicator badges with individual distinct filled colors */}
            <div className="cert-step-pills">
              {CERTIFICATIONS.map((c, i) => {
                const isActive = activeCertIdx === i;
                return (
                  <div
                    key={c.title}
                    className={`cert-step-pill ${isActive ? 'active' : ''}`}
                    style={
                      isActive
                        ? {
                            background: c.accentHex,
                            color: '#FFFFFF',
                            borderColor: c.accentHex,
                            boxShadow: `0 6px 20px ${c.accentHex}40`,
                          }
                        : {
                            background: 'var(--color-bg-alt)',
                            color: 'var(--color-text-muted)',
                            borderColor: 'var(--color-border)',
                          }
                    }
                  >
                    <span
                      className="step-num"
                      style={
                        isActive
                          ? { color: 'rgba(255, 255, 255, 0.85)' }
                          : { color: 'var(--color-text-muted)' }
                      }
                    >
                      0{i + 1}
                    </span>
                    <span
                      className="step-title"
                      style={isActive ? { color: '#FFFFFF' } : {}}
                    >
                      {c.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cards Stack Stage: Left/Right Alternating Reveal */}
          <div className="cert-stack-stage">
            {CERTIFICATIONS.map((cert, index) => {
              const Icon = ICON_MAP[cert.icon] || Award;
              const isTeal = cert.color === 'teal';
              const direction = index === 0 ? 'base' : (index % 2 === 1 ? 'from-left' : 'from-right');

              return (
                <div
                  key={cert.title}
                  style={{
                    zIndex: index + 1,
                    backgroundColor: cert.accentHex,
                  }}
                  className={`cert-stack-card cert-card-solid ${direction}`}
                >
                  <div className="cert-card-inner-grid">
                    <div className="cert-card-content-side">
                      <div className="cert-badge-top">
                        <span className="cert-number">Credential 0{index + 1} of 04</span>
                        <span className="cert-entry-direction-pill">
                          {index === 0 ? 'Foundation' : (index % 2 === 1 ? '← Slide from Left' : 'Slide from Right →')}
                        </span>
                      </div>

                      <div className="cert-icon-wrapper cert-icon-solid">
                        <Icon size={32} />
                      </div>

                      <h3 className="cert-title">{cert.title}</h3>
                      <p className="cert-desc">{cert.desc}</p>

                      <div className="cert-highlights-list">
                        <span className="cert-pill">
                          <ShieldCheck size={15} /> Verifiable Digital & Physical Parchment
                        </span>
                        <span className="cert-grade">Grade 9–12 & Diploma Batches</span>
                      </div>
                    </div>

                    <div className="cert-card-media-side">
                      <div className="cert-watermark-icon">
                        <Icon size={120} />
                      </div>
                      <div className="cert-side-badge">
                        <Award size={20} className="text-amber" />
                        <div>
                          <strong>Certified Outcome</strong>
                          <p>Signed by Founder Priyanka Desurkar</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Certificate Sample Mockup Card with GSAP 3D Reveal */}
      <div className="certificate-mockup-showcase">
        <div ref={mockupRef} className="certificate-mockup-card">
          <div className="certificate-mockup-media">
            <img
              src="/images/sample-certificate-mockup.jpg"
              alt="Official Certificate of Completion at The Coding Zone"
              className="certificate-mockup-img"
              loading="lazy"
            />
            <div ref={stampRef} className="certificate-stamp-badge">
              <span>Official Parchment Credential</span>
            </div>
          </div>
          <div className="certificate-mockup-info">
            <span className="badge badge-teal">Verifiable Course Credential</span>
            <h3 className="cert-preview-title">Physical & Verifiable Course Certificate</h3>
            <p className="cert-preview-text">
              Every student who successfully completes their modules receives an official, embossed certificate signed by Founder <strong>Priyanka Desurkar</strong> (B.E & M.Tech).
            </p>
            <div className="cert-feature-tags">
              <span className="cert-feature-tag">🏅 Official Institute Seal</span>
              <span className="cert-feature-tag">📄 Heavy Linen Finish</span>
              <span className="cert-feature-tag">🔗 QR Code Verification</span>
              <span className="cert-feature-tag">🎓 College Portfolio Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tools & Tech ticker / grid with interactive floating GSAP */}
      <div ref={toolsWallRef} className="tools-card">
        <div className="tools-header">
          <div>
            <span className="tools-badge">
              <Sparkles size={14} /> Modern Tech Stack
            </span>
            <h3 className="tools-title">Tools & Technologies You Will Master</h3>
          </div>
          <p className="tools-subtitle">
            Learn the exact platforms and frameworks used by software engineers at top tech companies worldwide.
          </p>
        </div>

        <div className="tools-grid">
          {TOOLS.map((tool) => (
            <div key={tool.name} className="tool-chip">
              <div className="tool-logo-box">
                <img
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  className="tool-logo-img"
                  loading="lazy"
                />
              </div>
              <span className="tool-name">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
