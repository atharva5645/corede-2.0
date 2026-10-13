import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Zap, Terminal } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TRACKS } from '../../data/siteData';
import './Curriculum.css';

gsap.registerPlugin(ScrollTrigger);

function ModuleItem({ mod, trackColor }) {
  const [open, setOpen] = useState(false);

  return (
    <li className={`module-item ${open ? 'open' : ''}`}>
      <button
        className="module-toggle"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={`module-content-${mod.id}`}
        id={`module-btn-${mod.id}`}
      >
        <div className="module-toggle-left">
          <span className={`module-num mod-${trackColor}`}>{mod.num}</span>
          <span className="module-title">{mod.title}</span>
        </div>
        <ChevronDown
          size={18}
          className={`module-chevron ${open ? 'rotated' : ''}`}
          aria-hidden="true"
        />
      </button>

      <div
        id={`module-content-${mod.id}`}
        className="module-content"
        role="region"
        aria-labelledby={`module-btn-${mod.id}`}
        hidden={!open}
      >
        <div className="module-topics">
          {mod.topics.map((topic, i) => (
            <span key={i} className="topic-pill">{topic}</span>
          ))}
        </div>
        {mod.activities && (
          <div className="module-activity">
            <Zap size={13} className="activity-icon" aria-hidden="true" />
            <span><strong>Activities:</strong> {mod.activities}</span>
          </div>
        )}
      </div>
    </li>
  );
}

function Timeline({ track }) {
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!timelineRef.current) return;
    const items = timelineRef.current.querySelectorAll('.module-item');

    const ctx = gsap.context(() => {
      gsap.from(items, {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
        },
        x: -30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
      });
    }, timelineRef);

    return () => ctx.revert();
  }, [track.id]);

  return (
    <div ref={timelineRef} className={`timeline timeline-${track.color}`} aria-label={`${track.title} curriculum`}>
      <ul className="module-list" role="list">
        {track.modules.map(mod => (
          <ModuleItem key={mod.id} mod={mod} trackColor={track.color} />
        ))}
      </ul>
    </div>
  );
}

export default function Curriculum() {
  const [activeTab, setActiveTab] = useState(TRACKS[0].id);
  const activeTrack = TRACKS.find(t => t.id === activeTab);
  const sectionRef = useRef(null);
  const posterRef = useRef(null);
  const floatBadge1Ref = useRef(null);
  const floatBadge2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.curriculum-header-wrap', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Roadmap poster 3D perspective scroll effect
      if (posterRef.current) {
        gsap.fromTo(
          posterRef.current,
          { rotateX: 12, scale: 0.94, opacity: 0.6 },
          {
            rotateX: 0,
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: posterRef.current,
              start: 'top 85%',
              end: 'center center',
              scrub: 1.2,
            },
          }
        );
      }

      // Parallax scroll on floating tool stickers
      if (floatBadge1Ref.current) {
        gsap.to(floatBadge1Ref.current, {
          y: -40,
          rotate: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: posterRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      if (floatBadge2Ref.current) {
        gsap.to(floatBadge2Ref.current, {
          y: 45,
          rotate: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: posterRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section curriculum-section" id="curriculum" aria-labelledby="curriculum-heading">
      <div className="container">
        <div className="text-center curriculum-header-wrap">
          <span className="section-eyebrow">Full Syllabus</span>
          <h2 className="section-title" id="curriculum-heading">
            15 Modules. Hands-On. Project-Based.
          </h2>
          <p className="section-subtitle">
            Every module includes concepts, live coding, quizzes, and a real project so students always build something they can show off.
          </p>
        </div>

        {/* Learning Journey Roadmap Poster with 3D Tilt and Parallax Stickers */}
        <div className="curriculum-roadmap-wrap">
          <div ref={posterRef} className="curriculum-roadmap-card">
            {/* Desktop Landscape Image */}
            <img
              src="/images/Web Development to Machine Learning Roadmap.png"
              alt="Web Development to Machine Learning Roadmap - The Coding Zone"
              className="curriculum-roadmap-img curriculum-roadmap-desktop"
              loading="lazy"
            />
            {/* Mobile Vertical Roadmap Image */}
            <img
              src="/images/15-Step Tech Roadmap with Student.png"
              alt="15-Step Tech Roadmap with Student - The Coding Zone"
              className="curriculum-roadmap-img curriculum-roadmap-mobile"
              loading="lazy"
            />
          </div>

          {/* Floating PNG Stickers interacting with scroll */}
          <div ref={floatBadge1Ref} className="curriculum-float-badge float-left" aria-hidden="true">
            <img src="/tools/vscode.png" alt="VS Code" className="curriculum-badge-img" />
            <span>Interactive IDE</span>
          </div>

          <div ref={floatBadge2Ref} className="curriculum-float-badge float-right" aria-hidden="true">
            <img src="/tools/python.png" alt="Python" className="curriculum-badge-img" />
            <span>15 Hands-on Projects</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="tab-switcher" role="tablist" aria-label="Learning tracks">
          {TRACKS.map(track => (
            <button
              key={track.id}
              role="tab"
              className={`tab-btn ${activeTab === track.id ? 'active' : ''}`}
              onClick={() => setActiveTab(track.id)}
              aria-selected={activeTab === track.id}
              aria-controls={`timeline-${track.id}`}
              id={`tab-${track.id}`}
            >
              {track.title}
              <span className="tab-count">{track.modules.length} modules</span>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div
          id={`timeline-${activeTrack.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTrack.id}`}
        >
          <Timeline track={activeTrack} />
        </div>
      </div>
    </section>
  );
}
