import { Fragment, useEffect, useRef } from 'react';
import { Sparkles, ArrowUpRight, Terminal, Code } from 'lucide-react';
import gsap from 'gsap';
import { SITE } from '../../data/siteData';
import './Hero.css';

const stats = [
  { label: 'Modules', value: '15' },
  { label: 'Tracks', value: '2' },
  { label: 'Certifications', value: '4' },
  { label: 'Modern Tools', value: '12+' },
  { label: 'Grade 9–12 & Diploma', value: 'Audience' },
];

const techLogos = [
  { name: 'Python', src: '/tools/python.png' },
  { name: 'JavaScript', src: '/tools/javascript.png' },
  { name: 'HTML5', src: '/tools/html5.png' },
  { name: 'CSS3', src: '/tools/css3.png' },
  { name: 'VS Code', src: '/tools/vscode.png' },
  { name: 'TensorFlow', src: '/tools/tensorflow.png' },
  { name: 'Google Colab', src: '/tools/google-colab.png' },
  { name: 'GitHub', src: '/tools/github.png' },
];

function StatItems() {
  return (
    <>
      {stats.map((item, index) => (
        <Fragment key={item.label}>
          <span className="stat-pill-item">
            <span className="stat-pill-value">{item.value}</span>
            <span className="stat-pill-label">{item.label}</span>
          </span>
          {index < stats.length - 1 && (
            <span aria-hidden="true" className="stat-pill-divider" />
          )}
        </Fragment>
      ))}
    </>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const cardContainerRef = useRef(null);
  const cardRef = useRef(null);
  const leftWidgetRef = useRef(null);
  const rightWidgetRef = useRef(null);
  const shineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-pill-container', {
        y: -25,
        opacity: 0,
        duration: 0.8,
      })
      .from('.hero-title-text', {
        y: 35,
        opacity: 0,
        duration: 0.9,
      }, '-=0.5')
      .from('.hero-subtitle-text', {
        y: 25,
        opacity: 0,
        duration: 0.8,
      }, '-=0.6')
      .from('.hero-cta-group', {
        y: 20,
        opacity: 0,
        duration: 0.7,
      }, '-=0.5')
      .from(cardContainerRef.current, {
        scale: 0.88,
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: 'back.out(1.2)',
      }, '-=0.5')
      .from([leftWidgetRef.current, rightWidgetRef.current], {
        x: (index) => (index === 0 ? -40 : 40),
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      }, '-=0.6')
      .from('.hero-tech-chip', {
        scale: 0.6,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.5)',
      }, '-=0.4')
      .from('.hero-badge-bottom', {
        y: 15,
        opacity: 0,
        duration: 0.6,
      }, '-=0.3');

      // Subtle breathing float animation for the side cards
      if (leftWidgetRef.current) {
        gsap.to(leftWidgetRef.current, {
          y: '-=12',
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (rightWidgetRef.current) {
        gsap.to(rightWidgetRef.current, {
          y: '+=12',
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.5,
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Interactive 3D tilt tracking mouse
  const handleMouseMove = (e) => {
    if (!cardRef.current || !cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000,
    });

    if (shineRef.current) {
      const shineX = (x / rect.width) * 100;
      const shineY = (y / rect.height) * 100;
      gsap.to(shineRef.current, {
        opacity: 0.65,
        background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.45) 0%, transparent 60%)`,
        duration: 0.2,
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'power3.out',
    });

    if (shineRef.current) {
      gsap.to(shineRef.current, {
        opacity: 0,
        duration: 0.5,
      });
    }
  };

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} aria-labelledby="hero-heading" className="hero-section" id="hero">
      {/* Background ambient glow with site color grading (Orange & Teal) */}
      <div className="hero-ambient-glow" aria-hidden="true" />
      <div className="hero-grid-pattern" aria-hidden="true" />

      {/* Top Stat Pills */}
      <div className="hero-pill-container">
        {/* Mobile: marquee scroll */}
        <div className="hero-stat-marquee-wrap sm-hidden">
          <div className="hero-stat-marquee-track">
            <div className="hero-stat-marquee-content">
              <StatItems />
              <span aria-hidden="true" className="stat-pill-divider" />
            </div>
            <div className="hero-stat-marquee-content">
              <StatItems />
              <span aria-hidden="true" className="stat-pill-divider" />
            </div>
          </div>
        </div>

        {/* Tablet & Desktop: single pill */}
        <div className="hero-stat-pill sm-inline-flex">
          <StatItems />
        </div>
      </div>

      {/* Main Headline & Lead */}
      <div className="hero-copy-wrap">
        <h1 id="hero-heading" className="hero-title-text">
          Think. Create.{' '}
          <span className="hero-gradient-highlight">
            Code.
          </span>
        </h1>

        <p className="hero-subtitle-text">
          <strong>The Coding Zone</strong> is Belagavi's premier practical coding institute for Grade 9–12 and Diploma students. Turn curiosity into capability with project-driven training in Web Development, Python & Machine Learning.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="hero-cta-group">
        <a
          href="#contact"
          id="cta-book-demo"
          className="hero-btn-primary"
          onClick={(e) => handleScroll(e, '#contact')}
        >
          <Sparkles size={18} className="hero-btn-icon" />
          Book Free Demo
        </a>

        <a
          href="#tracks"
          id="cta-explore-tracks"
          className="hero-btn-secondary"
          onClick={(e) => handleScroll(e, '#tracks')}
        >
          Explore Tracks
          <ArrowUpRight size={18} className="hero-btn-icon" />
        </a>
      </div>

      {/* Hero Visual Showcase with Side Widgets */}
      <div className="hero-visual-wrapper">
        <div
          ref={cardContainerRef}
          className="hero-visual-container"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Ambient Glow Backdrop behind card */}
          <div className="hero-card-glow-backdrop" aria-hidden="true" />

          {/* Left Floating Feature Card */}
          <aside ref={leftWidgetRef} className="hero-side-card hero-side-left" aria-label="Live Project Practice">
            <div className="hero-side-icon-box orange-glow">
              <Terminal size={22} />
            </div>
            <div className="hero-side-content">
              <span className="hero-side-title">Live Coding Labs</span>
              <span className="hero-side-subtitle">Build real portfolios</span>
              <span className="hero-side-badge-pill">
                <span className="live-pulse-dot" style={{ width: 6, height: 6 }} /> Active Batches
              </span>
            </div>
          </aside>

          {/* Right Floating Feature Card */}
          <aside ref={rightWidgetRef} className="hero-side-card hero-side-right" aria-label="Modern Tech Stack">
            <div className="hero-side-icon-box teal-glow">
              <Code size={22} />
            </div>
            <div className="hero-side-content">
              <span className="hero-side-title">Python · Web · AI</span>
              <span className="hero-side-subtitle">Industry tools taught</span>
              <span className="hero-side-badge-pill" style={{ color: 'var(--color-secondary)' }}>
                ⭐ Mentored 1-on-1
              </span>
            </div>
          </aside>

          {/* The Interactive GSAP-enhanced Visual Card */}
          <div ref={cardRef} className="hero-visual-card">
            <div ref={shineRef} className="hero-card-shine" />
            <div className="hero-visual-badge-overlay">
              <span className="live-pulse-dot" />
              <span>100% Practical Project-Driven Classes</span>
            </div>
            <img
              src="/images/hero-student-coding.jpg"
              alt="Student coding practically at The Coding Zone"
              className="hero-visual-img"
              loading="eager"
            />
            <div className="hero-visual-caption">
              <span>Vadagaon Lab · Grade 9–12 & Diploma Batches</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Logos Row */}
      <div className="hero-tech-row" aria-label="Technologies taught">
        {techLogos.map((item, idx) => (
          <div
            key={item.name}
            className="hero-tech-chip"
            style={{ animationDelay: `${idx * 0.18}s` }}
            title={item.name}
            aria-label={item.name}
          >
            <img
              src={item.src}
              alt={`${item.name} logo`}
              className="hero-tech-img"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Bottom Credential Badge */}
      <div className="hero-badge-bottom">
        <a
          href="#about"
          className="hero-mentor-badge"
          onClick={(e) => handleScroll(e, '#about')}
        >
          <img
            src="/images/priyanka-desurkar-square.jpg"
            alt={SITE.founder.name}
            className="hero-mentor-avatar"
          />
          <span className="hero-mentor-text">
            Mentored by <strong>{SITE.founder.name}</strong> ({SITE.founder.credentials}) · Vadagaon, Belagavi
          </span>
        </a>
      </div>
    </section>
  );
}
