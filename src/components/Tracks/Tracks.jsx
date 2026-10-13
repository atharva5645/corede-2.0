import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { TRACKS } from '../../data/siteData';
import './Tracks.css';

const trackPngs = {
  1: [
    { name: 'HTML5', src: '/tools/html5.png' },
    { name: 'CSS3', src: '/tools/css3.png' },
    { name: 'JavaScript', src: '/tools/javascript.png' },
    { name: 'VS Code', src: '/tools/vscode.png' },
  ],
  2: [
    { name: 'Python', src: '/tools/python.png' },
    { name: 'TensorFlow', src: '/tools/tensorflow.png' },
    { name: 'Google Colab', src: '/tools/google-colab.png' },
    { name: 'GitHub', src: '/tools/github.png' },
  ],
};

export default function Tracks() {
  const [activeTrack, setActiveTrack] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const handleView = (e) => {
    e.preventDefault();
    const el = document.querySelector('#curriculum');
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
  };

  const nextTrack = () => {
    setActiveTrack((prev) => (prev === 0 ? 1 : 0));
  };

  const prevTrack = () => {
    setActiveTrack((prev) => (prev === 0 ? 1 : 0));
  };

  // Automatic back-and-forth carousel switcher every 3 seconds
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setActiveTrack((prev) => (prev === 0 ? 1 : 0));
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  return (
    <section className="tracks-carousel-section" id="tracks" aria-labelledby="tracks-heading">
      <div className="container tracks-carousel-inner">
        
        {/* Section Header with Controls */}
        <div className="tracks-carousel-header">
          <div className="tracks-header-left">
            <span className="section-eyebrow">Interactive Learning Tracks</span>
            <h2 className="section-title" id="tracks-heading">
              Choose Your Coding Pathway
            </h2>
          </div>

          {/* Carousel Stepper Controls */}
          <div className="tracks-stepper-wrap">
            <div className="tracks-stepper-controls">
              <button
                type="button"
                className={`stepper-nav-btn ${activeTrack === 0 ? 'active' : ''}`}
                onClick={prevTrack}
                aria-label="Previous Track"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Progress bar indicating active slide */}
              <div className="stepper-progress-bar">
                <div
                  className="stepper-progress-fill"
                  style={{
                    width: activeTrack === 0 ? '50%' : '100%',
                    transform: activeTrack === 0 ? 'translateX(0)' : 'translateX(0)',
                  }}
                />
              </div>

              <button
                type="button"
                className={`stepper-nav-btn ${activeTrack === 1 ? 'active' : ''}`}
                onClick={nextTrack}
                aria-label="Next Track"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            
            <div className="tracks-step-label">
              <span>Track <strong>0{activeTrack + 1}</strong> of 02</span>
            </div>
          </div>
        </div>

        {/* Carousel Viewport Container */}
        <div
          className="tracks-carousel-viewport"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div
            className="tracks-carousel-slider"
            style={{
              transform: `translateX(-${activeTrack * 100}%)`,
            }}
          >
            {TRACKS.map((track, trackIdx) => {
              const isTeal = trackIdx === 0;
              const pngList = trackPngs[trackIdx + 1] || [];

              return (
                <div key={track.id} className="tracks-carousel-slide">
                  <article className={`carousel-track-card ${isTeal ? 'track-teal' : 'track-orange'}`}>
                    <div className="carousel-card-grid">
                      
                      {/* Visual Banner side */}
                      <div className="carousel-card-visual">
                        <img
                          src={track.banner}
                          alt={track.title}
                          className="carousel-visual-img"
                          loading="lazy"
                        />
                        <div className={`carousel-visual-badge ${!isTeal ? 'badge-orange' : ''}`}>
                          <span>{track.number}</span>
                        </div>

                        {/* Floating Tool PNGs */}
                        <div className="carousel-floating-tools" aria-hidden="true">
                          {pngList.map((p, idx) => (
                            <div key={p.name} className={`carousel-tool-chip chip-${idx}`}>
                              <img src={p.src} alt={p.name} />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Content side */}
                      <div className="carousel-card-content">
                        <div className="carousel-header-meta">
                          <span className={`badge ${isTeal ? 'badge-teal' : 'badge-primary'}`}>
                            {track.moduleRange}
                          </span>
                          <span className={`badge ${isTeal ? 'badge-teal' : 'badge-primary'}`}>
                            {track.modules.length} Modules
                          </span>
                        </div>

                        <h3 className="carousel-card-title">{track.title}</h3>
                        <p className="carousel-card-tagline">{track.tagline}</p>

                        <div className="carousel-projects-block">
                          <p className="carousel-block-title">⭐ Featured Projects Built by Students:</p>
                          <ul className="carousel-projects-list">
                            {track.projects.map((p, i) => (
                              <li key={i} className="carousel-project-item">
                                <CheckCircle2 size={16} className={isTeal ? 'text-teal' : 'text-orange'} />
                                <span>{typeof p === 'string' ? p : p.name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="carousel-tools-row">
                          {track.tools.map((t) => (
                            <span key={t} className="tech-tag">{t}</span>
                          ))}
                        </div>

                        <div className="carousel-card-footer">
                          <a
                            href="#curriculum"
                            className={`btn ${isTeal ? 'btn-teal' : 'btn-primary'}`}
                            onClick={handleView}
                          >
                            View Syllabus <ArrowRight size={16} />
                          </a>
                          <span className={`carousel-highlight-text ${!isTeal ? 'text-orange' : ''}`}>
                            <Sparkles size={14} /> {isTeal ? '100% Practical' : 'AI & Machine Learning'}
                          </span>
                        </div>
                      </div>

                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          {/* Dot navigation indicators */}
          <div className="tracks-carousel-dots" aria-label="Track selector">
            {TRACKS.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                className={`carousel-dot ${activeTrack === dotIdx ? 'active' : ''}`}
                onClick={() => setActiveTrack(dotIdx)}
                aria-label={`Switch to Track ${dotIdx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
