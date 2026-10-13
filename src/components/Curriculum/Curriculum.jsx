import { useState } from 'react';
import { ChevronDown, Zap } from 'lucide-react';
import { TRACKS } from '../../data/siteData';
import './Curriculum.css';

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
  return (
    <div className={`timeline timeline-${track.color}`} aria-label={`${track.title} curriculum`}>
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

  return (
    <section className="section curriculum-section" id="curriculum" aria-labelledby="curriculum-heading">
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow">Full Syllabus</span>
          <h2 className="section-title" id="curriculum-heading">
            15 Modules. Hands-On. Project-Based.
          </h2>
          <p className="section-subtitle">
            Every module includes concepts, live coding, quizzes, and a real project so students always build something they can show off.
          </p>
        </div>

        {/* Learning Journey Roadmap Poster */}
        <div className="curriculum-roadmap-wrap">
          <div className="curriculum-roadmap-card">
            <img
              src="/images/curriculum-roadmap-poster.jpg"
              alt="15-Module Learning Journey Roadmap at The Coding Zone"
              className="curriculum-roadmap-img"
              loading="lazy"
            />
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
