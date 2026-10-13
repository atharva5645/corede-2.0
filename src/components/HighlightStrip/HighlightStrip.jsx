import { Code2, GraduationCap, Cpu, Award } from 'lucide-react';
import { HIGHLIGHTS } from '../../data/siteData';
import './HighlightStrip.css';

const ICON_MAP = { Code2, GraduationCap, Cpu, Award };

export default function HighlightStrip() {
  return (
    <div className="highlight-strip" aria-label="Key features">
      <div className="container">
        <ul className="highlight-grid" role="list">
          {HIGHLIGHTS.map((item, i) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <li key={i} className="highlight-item">
                <div className={`highlight-icon hi-${item.color}`} aria-hidden="true">
                  {Icon && <Icon size={22} />}
                </div>
                <div>
                  <p className="highlight-label">{item.title}</p>
                  <p className="highlight-desc">{item.desc}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
