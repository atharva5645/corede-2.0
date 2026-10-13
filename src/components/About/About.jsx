import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STATS, INCLUSIONS, SITE } from '../../data/siteData';
import { CheckCircle } from 'lucide-react';
import CoreBenefits from '../CoreBenefits/CoreBenefits';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

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
  const aboutRef = useRef(null);
  const classroomImgRef = useRef(null);
  const founderCardRef = useRef(null);
  const floatPill1Ref = useRef(null);
  const floatPill2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {


      // Founder card entrance with smooth scale
      if (founderCardRef.current) {
        gsap.from(founderCardRef.current, {
          scrollTrigger: {
            trigger: founderCardRef.current,
            start: 'top 85%',
          },
          x: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
        });
      }

      // Parallax scroll on classroom mentorship photo (like nickho driver parallax)
      if (classroomImgRef.current) {
        gsap.to(classroomImgRef.current, {
          yPercent: 12,
          scale: 1.06,
          ease: 'none',
          scrollTrigger: {
            trigger: '.classroom-showcase-card',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
        });
      }

      // Floating PNG badges on the classroom card
      if (floatPill1Ref.current) {
        gsap.to(floatPill1Ref.current, {
          y: -25,
          rotate: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: '.classroom-showcase-card',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      if (floatPill2Ref.current) {
        gsap.to(floatPill2Ref.current, {
          y: 25,
          rotate: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.classroom-showcase-card',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Stats numbers card entrance
      gsap.from('.stat-card-wrap', {
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.2)',
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={aboutRef}>
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
              <div ref={founderCardRef} className="founder-card">
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

              {/* Classroom Lab in Action with Parallax Image & Floating PNG Badges */}
              <div className="classroom-showcase-card">
                <div className="classroom-img-wrap">
                  <img
                    ref={classroomImgRef}
                    src="/images/classroom-mentorship-session.jpg"
                    alt="Priyanka Ma'am mentoring a student at The Coding Zone"
                    className="classroom-showcase-img"
                    loading="lazy"
                  />
                  <div className="classroom-img-badge">
                    <span>1-on-1 Personalized Mentorship</span>
                  </div>

                  {/* Floating Tool Stickers */}
                  <div ref={floatPill1Ref} className="about-floating-pill pill-top" aria-hidden="true">
                    <img src="/tools/python.png" alt="Python" className="about-pill-icon" />
                    <span>Real Logic</span>
                  </div>

                  <div ref={floatPill2Ref} className="about-floating-pill pill-bottom" aria-hidden="true">
                    <img src="/tools/github.png" alt="GitHub" className="about-pill-icon" />
                    <span>Live Code Reviews</span>
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

      {/* ── Core Learning Pillars 3D Carousel (Placed below Coding is the New Literacy) ── */}
      <CoreBenefits />

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
    </div>
  );
}
