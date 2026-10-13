import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { STATS, BENEFITS, INCLUSIONS, SITE } from '../../data/siteData';
import { Lightbulb, Brain, Shield, Zap, CheckCircle } from 'lucide-react';
import './About.css';

const ICON_MAP = { Lightbulb, Brain, Shield, Zap };

function AnimatedCounter({ target, suffix }) {
  const spanRef = useRef(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView || !spanRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { spanRef.current.textContent = target + suffix; return; }
    const duration = 1800;
    const start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      spanRef.current.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, suffix]);

  return (
    <div ref={ref} className="stat-card">
      <span ref={spanRef} className="stat-number">0{suffix}</span>
    </div>
  );
}

export default function About() {
  return (
    <>
      {/* ── Why Learn Coding ── */}
      <section className="section section-alt about-section" id="about" aria-labelledby="about-heading">
        <div className="container">
          <div className="about-grid">
            {/* Left: Why coding */}
            <div>
              <span className="section-eyebrow">Why It Matters</span>
              <h2 className="section-title" id="about-heading">
                Coding is the New Literacy
              </h2>
              <p className="about-lead">
                Just as reading and writing opened the world to previous generations, coding is the essential skill of the 21st century. Kids who learn to code move from being <strong>passive consumers</strong> to active <strong>innovators and creators</strong>.
              </p>

              <div className="benefits-grid">
                {BENEFITS.map(b => {
                  const Icon = ICON_MAP[b.icon];
                  return (
                    <div key={b.title} className={`benefit-card bc-${b.color}`}>
                      <div className={`benefit-icon bi-${b.color}`} aria-hidden="true">
                        {Icon && <Icon size={18} />}
                      </div>
                      <h3 className="benefit-title">{b.title}</h3>
                      <p className="benefit-desc">{b.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Inclusions */}
              <div style={{ marginTop: '2rem' }}>
                <p className="inclusions-label">Every class includes:</p>
                <ul className="inclusions-list" role="list">
                  {INCLUSIONS.map(item => (
                    <li key={item} className="inclusion-item">
                      <CheckCircle size={15} className="inclusion-check" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Founder card */}
            <div>
              <div className="founder-card">
                <div className="founder-header">
                  <div className="founder-avatar-wrap">
                    {SITE.founder.image ? (
                      <img
                        src={SITE.founder.image}
                        alt={`${SITE.founder.name} — ${SITE.founder.role}`}
                        className="founder-photo"
                      />
                    ) : (
                      <div className="founder-avatar" aria-label={`${SITE.founder.name} initials`}>
                        {SITE.founder.initials}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="founder-name">{SITE.founder.name}</p>
                    <p className="founder-role">{SITE.founder.role}</p>
                    <span className="founder-creds">{SITE.founder.credentials}</span>
                  </div>
                </div>
                <div className="founder-body">
                  <span className="founder-quote-mark" aria-hidden="true">"</span>
                  <blockquote className="founder-quote">
                    {SITE.founder.quote}
                  </blockquote>
                  <p className="founder-attribution">— {SITE.founder.name}</p>
                </div>
              </div>

              {/* Classroom Lab in Action */}
              <div className="classroom-showcase-card">
                <div className="classroom-img-wrap">
                  <img
                    src="/images/classroom-mentorship-session.jpg"
                    alt="Priyanka Ma'am mentoring a student at The Coding Zone"
                    className="classroom-showcase-img"
                    loading="lazy"
                  />
                  <div className="classroom-img-badge">
                    <span>1-on-1 Personalized Mentorship</span>
                  </div>
                </div>
                <div className="classroom-caption">
                  <p className="classroom-caption-title">Practical Lab Environment</p>
                  <p className="classroom-caption-text">
                    Hands-on learning where concepts are immediately converted into functional programs with guided instructor feedback.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="vision-card" style={{ marginTop: '1.5rem' }}>
                <p className="vision-label">Our Vision</p>
                <p className="vision-text">{SITE.vision}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats-section" aria-label="Institute statistics">
        <div className="container">
          <div className="stats-header text-center">
            <h2 className="stats-title">By the Numbers</h2>
            <p className="stats-sub">Structured learning designed for measurable outcomes.</p>
          </div>
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <div key={i} className="stat-card-wrap">
                <AnimatedCounter target={s.target} suffix={s.suffix} />
                <p className="stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
