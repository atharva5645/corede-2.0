import React from 'react';

export default function ClientLogoMarquee() {
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
    <section className="logo-marquee-section">
      <div className="section-container">
        <p className="marquee-eyebrow">TRUSTED BY GLOBAL INNOVATORS &amp; ENTERPRISES</p>
      </div>
      <div className="marquee-track-wrapper">
        <div className="marquee-track">
          {brandLogos.map((logo, idx) => (
            <div key={`logo-1-${idx}`} className="marquee-logo-card">
              <img src={logo.src} alt={logo.name} className="marquee-logo-img" />
            </div>
          ))}
          {brandLogos.map((logo, idx) => (
            <div key={`logo-2-${idx}`} className="marquee-logo-card">
              <img src={logo.src} alt={logo.name} className="marquee-logo-img" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
