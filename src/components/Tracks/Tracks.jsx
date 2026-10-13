import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { TRACKS } from '../../data/siteData';
import './Tracks.css';

function TrackCard({ track }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleView = e => {
    e.preventDefault();
    const el = document.querySelector('#curriculum');
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
  };

  return (
    <article
      ref={ref}
      className={`track-card track-${track.color} ${inView ? 'visible' : ''}`}
      aria-label={track.title}
    >
      {/* Header */}
      <div className="track-header">
        <span className="track-number">{track.number}</span>
        <h3 className="track-title">{track.title}</h3>
        <p className="track-tagline">{track.tagline}</p>
        <div className="track-meta">
          <span className="badge badge-sm">{track.moduleRange}</span>
          <span className="badge badge-sm">{track.modules.length} Modules</span>
        </div>
      </div>

      {/* Body */}
      <div className="track-body">
        <p className="track-section-label">⭐ Featured Projects</p>
        <ul className="track-projects" role="list">
          {track.projects.map((p, i) => (
            <li key={i} className="track-project-item">
              <CheckCircle2 size={14} className="check-icon" aria-hidden="true" />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <p className="track-section-label" style={{ marginTop: '1.25rem' }}>🛠 Tools & Technologies</p>
        <div className="tech-tags">
          {track.tools.map(t => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="track-footer">
        <a
          href="#curriculum"
          className={`btn ${track.color === 'teal' ? 'btn-teal' : 'btn-primary'} btn-sm`}
          onClick={handleView}
        >
          View Full Syllabus <ArrowRight size={14} />
        </a>
      </div>
    </article>
  );
}

export default function Tracks() {
  return (
    <section className="section section-alt tracks-section" id="tracks" aria-labelledby="tracks-heading">
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow">Learning Pathways</span>
          <h2 className="section-title" id="tracks-heading">
            Choose Your Coding Track
          </h2>
          <p className="section-subtitle">
            Two comprehensive, project-based tracks designed for teen learners — from building websites to training AI models.
          </p>
        </div>

        <div className="tracks-grid">
          {TRACKS.map(track => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    </section>
  );
}
