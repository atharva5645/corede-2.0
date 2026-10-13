import { useEffect, useRef } from 'react';
import { Code2, GraduationCap, Cpu, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HIGHLIGHTS } from '../../data/siteData';
import './HighlightStrip.css';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = { Code2, GraduationCap, Cpu, Award };

const highlightBadges = [
  { name: 'Python', src: '/tools/python.png' },
  { name: 'JavaScript', src: '/tools/javascript.png' },
  { name: 'VS Code', src: '/tools/vscode.png' },
  { name: 'TensorFlow', src: '/tools/tensorflow.png' },
];

export default function HighlightStrip() {
  const stripRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger in the items when scrolling into view
      gsap.from('.highlight-item', {
        scrollTrigger: {
          trigger: stripRef.current,
          start: 'top 85%',
        },
        y: 35,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Floating parallax behavior for the badge pngs
      gsap.to('.highlight-badge-png', {
        scrollTrigger: {
          trigger: stripRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
        y: (i) => (i % 2 === 0 ? -16 : 16),
        rotate: (i) => (i % 2 === 0 ? 12 : -12),
        ease: 'none',
      });
    }, stripRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={stripRef} className="highlight-strip" aria-label="Key features">
      <div className="container">
        <ul className="highlight-grid" role="list">
          {HIGHLIGHTS.map((item, i) => {
            const Icon = ICON_MAP[item.icon];
            const badge = highlightBadges[i];
            return (
              <li key={i} className="highlight-item">
                <div className={`highlight-icon hi-${item.color}`} aria-hidden="true">
                  {Icon && <Icon size={22} />}
                </div>
                <div className="highlight-text-wrap">
                  <p className="highlight-label">{item.title}</p>
                  <p className="highlight-desc">{item.desc}</p>
                </div>
                {badge && (
                  <div className="highlight-png-wrap" title={badge.name}>
                    <img
                      src={badge.src}
                      alt={badge.name}
                      className="highlight-badge-png"
                      loading="lazy"
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
