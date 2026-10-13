import { Fragment } from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
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
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
    }
  };

  return (
    <section aria-labelledby="hero-heading" className="hero-section" id="hero">
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

      {/* Hero Visual Showcase */}
      <div className="hero-visual-container">
        <div className="hero-visual-card">
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

      {/* Tech Logos Row */}
      <div className="hero-tech-row" aria-label="Technologies taught">
        {techLogos.map((item) => (
          <div
            key={item.name}
            className="hero-tech-chip"
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
