import React, { useRef, useState, useEffect } from 'react';

export default function ClientLogoMarquee() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { rootMargin: '100px 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const brandLogos = [
    { name: 'Brightex', src: '/Brightex.png' },
    { name: 'Vortech', src: '/vortech.png' },
    { name: 'Ethereal', src: '/ethereal.png' },
    { name: 'Refurbox', src: '/Refurbox.png' },
    { name: 'Google', src: '/google.png' },
    { name: 'Mile', src: '/Mile.png' },
    { name: 'Deco', src: '/deco.png' },
    { name: 'Kekon', src: '/kekon.png' },
    { name: 'Vinish', src: '/vinish.png' },
    { name: 'Mema', src: '/mema.png' },
    { name: 'Thanu', src: '/thanu.png' },
    { name: 'TMTL', src: '/TMTL.png' },
    { name: 'Radhika', src: '/radhika.png' },
    { name: 'Castle', src: '/castle.png' },
    { name: 'Coffee Day', src: '/Cofee%20day.png' },
    { name: 'Events', src: '/events.png' },
    { name: 'Fresh', src: '/Fresh.png' },
    { name: 'Glamour', src: '/Glamour.png' },
    { name: 'Ice', src: '/ice.png' }
  ];

  return (
    <section ref={sectionRef} className="client-marquee-section" aria-label="Clients & Partners">
      <div className="clay-container marquee-header-container">
        <span className="clay-eyebrow marquee-eyebrow">
          TRUSTED BY GLOBAL INNOVATORS &amp; ENTERPRISES
        </span>
      </div>

      {/* Hairline-framed infinite marquee ticker */}
      <div className="marquee-hairline-boundary">
        <div 
          className="marquee-track" 
          style={{ animationPlayState: inView ? 'running' : 'paused' }}
        >
          {brandLogos.map((logo, idx) => (
            <div key={`logo-1-${idx}`} className="marquee-logo-item">
              <img src={logo.src} alt={logo.name} className="marquee-logo-img" loading="lazy" decoding="async" />
            </div>
          ))}
          {brandLogos.map((logo, idx) => (
            <div key={`logo-2-${idx}`} className="marquee-logo-item">
              <img src={logo.src} alt={logo.name} className="marquee-logo-img" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
