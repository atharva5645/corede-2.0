import React, { useRef, useState, useEffect } from 'react';
import './IsometricMobileVisual.css';

export default function IsometricMobileVisual() {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { rootMargin: '100px 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`isometric-showcase-container ${inView ? 'is-in-view' : ''}`} 
      aria-label="Standing Enterprise Mobile Dashboard Animation"
    >
      <svg
        className="isometric-svg standing-phone-svg"
        viewBox="0 0 620 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Ambient Ground Shadow Under Standing Phone */}
          <radialGradient id="standing-ground-shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#000000" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Phone Chassis Metallic Edge (Royal Blue & Deep Slate) */}
          <linearGradient id="phone-chassis-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#080d14" />
          </linearGradient>

          {/* Left Vertical Rim Light (Royal Blue Accent) */}
          <linearGradient id="left-rim-accent" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a6cff" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#1a6cff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.1" />
          </linearGradient>

          {/* Screen Glass Surface */}
          <linearGradient id="standing-screen-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0b121e" />
            <stop offset="100%" stopColor="#070a10" />
          </linearGradient>

          {/* Enterprise Glass Card Surface */}
          <linearGradient id="standing-card-glass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.06)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.02)" />
          </linearGradient>

          {/* Chart Area Fill Gradient (Royal Blue) */}
          <linearGradient id="standing-chart-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a6cff" stopOpacity="0.30" />
            <stop offset="65%" stopColor="#1a6cff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1a6cff" stopOpacity="0" />
          </linearGradient>

          {/* Chart Line Gradient */}
          <linearGradient id="standing-chart-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#1a6cff" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>

          {/* Floating Left Badge Gradient */}
          <linearGradient id="left-badge-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Drop Shadow Filters */}
          <filter id="standing-shadow-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" />
          </filter>

          <filter id="left-badge-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="-4" dy="12" stdDeviation="12" floodColor="#000000" floodOpacity="0.55" />
          </filter>
        </defs>

        {/* 1. Ground Drop Shadow (Anchored at the base) */}
        <ellipse
          cx="370"
          cy="565"
          rx="180"
          ry="24"
          fill="url(#standing-ground-shadow)"
          className="standing-ground-shadow"
          filter="url(#standing-shadow-blur)"
        />

        {/* 2. Main Animated Floating Rig (Standing Upright / Straight, Smooth 4.5s Hover) */}
        <g className="standing-phone-rig">

          {/* 3D Phone Chassis Body (Upright Vertical with Realistic Bevels & Depth) */}
          {/* Back Chassis Extrusion / Volume Depth */}
          <rect
            x="226"
            y="32"
            width="288"
            height="528"
            rx="44"
            fill="#05080e"
          />
          <rect
            x="228"
            y="30"
            width="286"
            height="526"
            rx="43"
            fill="#0b111c"
            stroke="url(#left-rim-accent)"
            strokeWidth="2"
          />

          {/* Side Hardware Buttons */}
          {/* Left: Volume Up / Down */}
          <rect x="224" y="140" width="3" height="34" rx="1.5" fill="#334155" />
          <rect x="224" y="186" width="3" height="34" rx="1.5" fill="#334155" />
          {/* Right: Power / Lock Button */}
          <rect x="514" y="160" width="3" height="46" rx="1.5" fill="#334155" />

          {/* Front Chassis Face / Bezel */}
          <rect
            x="230"
            y="28"
            width="284"
            height="524"
            rx="42"
            fill="url(#phone-chassis-grad)"
            stroke="#1e293b"
            strokeWidth="1.5"
          />

          {/* Screen Inner Display Area */}
          <rect
            x="242"
            y="40"
            width="260"
            height="500"
            rx="32"
            fill="url(#standing-screen-bg)"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1.2"
          />

          {/* Dynamic Island / Front Camera & Speaker Capsule */}
          <rect
            x="332"
            y="48"
            width="80"
            height="18"
            rx="9"
            fill="#05070b"
          />
          <circle cx="396" cy="57" r="4.5" fill="#0d1522" />
          <circle cx="396" cy="57" r="2" fill="#1e293b" />

          {/* --- STATUS BAR --- */}
          <text x="264" y="61" fill="#94a3b8" fontSize="10.5" fontWeight="700" fontFamily="Inter, sans-serif">
            09:41
          </text>

          {/* Live System Operational Pill */}
          <g transform="translate(422, 51)">
            <rect x="0" y="0" width="68" height="18" rx="9" fill="rgba(22, 163, 74, 0.12)" stroke="rgba(22, 163, 74, 0.3)" strokeWidth="0.8" />
            <circle cx="9" cy="9" r="3" fill="#10b981" className="live-dot-pulse" />
            <text x="17" y="12" fill="#22c55e" fontSize="7" fontWeight="800" letterSpacing="0.06em" fontFamily="Inter, sans-serif">
              LIVE P99
            </text>
          </g>

          {/* --- DASHBOARD HEADER --- */}
          <g transform="translate(258, 86)">
            <text x="0" y="12" fill="#ffffff" fontSize="14" fontWeight="800" fontFamily="Inter, sans-serif" letterSpacing="-0.02em">
              CoreDe Analytics
            </text>
            <text x="0" y="27" fill="#64748b" fontSize="8.5" fontWeight="500" fontFamily="Inter, sans-serif">
              Enterprise Mobile Runtime Node
            </text>
          </g>

          {/* --- DUAL KPI SUMMARY TILES --- */}
          {/* Tile 1: Latency */}
          <g transform="translate(254, 126)">
            <rect x="0" y="0" width="112" height="60" rx="10" fill="url(#standing-card-glass)" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
            <text x="12" y="18" fill="#94a3b8" fontSize="7.5" fontWeight="700" letterSpacing="0.06em" fontFamily="Inter, sans-serif">
              AVG P99 SPEED
            </text>
            <text x="12" y="39" fill="#ffffff" fontSize="17" fontWeight="800" fontFamily="Inter, sans-serif">
              1.42s
            </text>
            <rect x="12" y="45" width="48" height="10" rx="5" fill="#16a34a" />
            <text x="17" y="53" fill="#ffffff" fontSize="6.5" fontWeight="700" fontFamily="Inter, sans-serif">
              ⚡ SUB-2s
            </text>
          </g>

          {/* Tile 2: Conversion */}
          <g transform="translate(378, 126)">
            <rect x="0" y="0" width="112" height="60" rx="10" fill="url(#standing-card-glass)" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
            <text x="12" y="18" fill="#94a3b8" fontSize="7.5" fontWeight="700" letterSpacing="0.06em" fontFamily="Inter, sans-serif">
              CONVERSION
            </text>
            <text x="12" y="39" fill="#ffffff" fontSize="17" fontWeight="800" fontFamily="Inter, sans-serif">
              99.8%
            </text>
            <rect x="12" y="45" width="46" height="10" rx="5" fill="rgba(26, 108, 255, 0.25)" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.5" />
            <text x="17" y="53" fill="#38bdf8" fontSize="6.5" fontWeight="700" fontFamily="Inter, sans-serif">
              +14.2%
            </text>
          </g>

          {/* --- PIPELINE VELOCITY CHART CARD --- */}
          <g transform="translate(254, 200)">
            <rect x="0" y="0" width="236" height="130" rx="12" fill="rgba(11, 19, 32, 0.85)" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />

            <text x="14" y="22" fill="#cbd5e1" fontSize="9" fontWeight="700" letterSpacing="0.04em" fontFamily="Inter, sans-serif">
              PIPELINE VELOCITY
            </text>
            <text x="186" y="22" fill="#64748b" fontSize="7.5" fontWeight="600" fontFamily="Inter, sans-serif">
              REALTIME
            </text>

            {/* Grid Lines */}
            <line x1="14" y1="46" x2="222" y2="46" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3 3" />
            <line x1="14" y1="74" x2="222" y2="74" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3 3" />
            <line x1="14" y1="102" x2="222" y2="102" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3 3" />

            {/* Area Fill Gradient under Chart */}
            <path
              d="M 14 112 L 14 90 C 45 82, 75 62, 110 70 C 145 78, 165 46, 190 52 C 205 56, 215 40, 222 42 L 222 112 Z"
              fill="url(#standing-chart-fill)"
            />

            {/* Secondary Green Reference Line */}
            <path
              d="M 14 102 C 55 98, 95 88, 125 84 C 160 80, 190 64, 222 60"
              stroke="#10b981"
              strokeOpacity="0.45"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              fill="none"
            />

            {/* Primary Blue Spline Curve */}
            <path
              id="standingChartPath"
              d="M 14 90 C 45 82, 75 62, 110 70 C 145 78, 165 46, 190 52 C 205 56, 215 40, 222 42"
              stroke="url(#standing-chart-stroke)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Dynamic Tracking Beacon Gliding Along Path */}
            <g className="chart-tracker-node">
              <circle cx="0" cy="0" r="9" fill="#1a6cff" fillOpacity="0.25" className="tracker-ping" />
              <circle cx="0" cy="0" r="4" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
              <animateMotion
                path="M 14 90 C 45 82, 75 62, 110 70 C 145 78, 165 46, 190 52 C 205 56, 215 40, 222 42"
                dur="4.5s"
                repeatCount="indefinite"
                keyPoints="0;0.5;1;0.5;0"
                keyTimes="0;0.5;0.51;0.99;1"
                calcMode="linear"
              />
            </g>
          </g>

          {/* --- TRANSACTION & SERVICE HEALTH ROWS --- */}
          {/* Row 1 */}
          <g transform="translate(254, 344)">
            <rect x="0" y="0" width="236" height="38" rx="8" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.8" />
            <circle cx="18" cy="19" r="3.5" fill="#10b981" />
            <text x="32" y="19" fill="#f1f5f9" fontSize="8.5" fontWeight="600" fontFamily="Inter, sans-serif" dominantBaseline="middle">
              Edge API Gateway
            </text>
            <text x="160" y="19" fill="#94a3b8" fontSize="8" fontWeight="500" fontFamily="Inter, sans-serif" dominantBaseline="middle">
              18ms
            </text>
            <rect x="190" y="11" width="34" height="16" rx="4" fill="rgba(16, 185, 129, 0.15)" />
            <text x="207" y="19" fill="#34d399" fontSize="6.5" fontWeight="700" fontFamily="Inter, sans-serif" textAnchor="middle" dominantBaseline="middle">
              PASS
            </text>
          </g>

          {/* Row 2 */}
          <g transform="translate(254, 390)">
            <rect x="0" y="0" width="236" height="38" rx="8" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.8" />
            <circle cx="18" cy="19" r="3.5" fill="#38bdf8" />
            <text x="32" y="19" fill="#f1f5f9" fontSize="8.5" fontWeight="600" fontFamily="Inter, sans-serif" dominantBaseline="middle">
              B2B Purchase Pipeline
            </text>
            <text x="160" y="19" fill="#94a3b8" fontSize="8" fontWeight="500" fontFamily="Inter, sans-serif" dominantBaseline="middle">
              32ms
            </text>
            <rect x="190" y="11" width="34" height="16" rx="4" fill="rgba(56, 189, 248, 0.15)" />
            <text x="207" y="19" fill="#38bdf8" fontSize="6.5" fontWeight="700" fontFamily="Inter, sans-serif" textAnchor="middle" dominantBaseline="middle">
              SYNC
            </text>
          </g>

          {/* Row 3 */}
          <g transform="translate(254, 436)">
            <rect x="0" y="0" width="236" height="38" rx="8" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.8" />
            <circle cx="18" cy="19" r="3.5" fill="#818cf8" />
            <text x="32" y="19" fill="#f1f5f9" fontSize="8.5" fontWeight="600" fontFamily="Inter, sans-serif" dominantBaseline="middle">
              Global Edge Cache
            </text>
            <text x="160" y="19" fill="#94a3b8" fontSize="8" fontWeight="500" fontFamily="Inter, sans-serif" dominantBaseline="middle">
              8ms
            </text>
            <rect x="190" y="11" width="34" height="16" rx="4" fill="rgba(129, 140, 248, 0.15)" />
            <text x="207" y="19" fill="#a5b4fc" fontSize="6.5" fontWeight="700" fontFamily="Inter, sans-serif" textAnchor="middle" dominantBaseline="middle">
              HIT
            </text>
          </g>

          {/* Home Indicator Bar */}
          <rect x="337" y="524" width="70" height="4" rx="2" fill="#475569" />

        </g>

        {/* 3. FLOATING 2.5D BADGE POSITIONED ON THE LEFT SIDE */}
        <g className="floating-left-badge-group">
          {/* Subtle Parallax Shadow behind Left Badge */}
          <rect
            x="36"
            y="142"
            width="200"
            height="62"
            rx="16"
            fill="#000000"
            opacity="0.45"
            filter="url(#standing-shadow-blur)"
          />

          {/* Elevated Floating 2.5D Badge (Left Position) */}
          <g className="left-badge-chassis" filter="url(#left-badge-shadow)">
            {/* 2.5D Thickness Base */}
            <rect x="40" y="132" width="196" height="60" rx="16" fill="#090d16" />
            <rect x="40" y="130" width="196" height="60" rx="16" fill="#0f172a" />
            {/* Front Surface */}
            <rect
              x="40"
              y="128"
              width="196"
              height="60"
              rx="16"
              fill="url(#left-badge-bg)"
              stroke="#1a6cff"
              strokeWidth="1.2"
            />

            {/* Checkmark Circle Icon */}
            <circle cx="68" cy="158" r="14" fill="rgba(26, 108, 255, 0.2)" stroke="#1a6cff" strokeWidth="1" />
            <path
              d="M 62 158 L 66 162 L 74 154"
              stroke="#38bdf8"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Badge Typography */}
            <text x="92" y="153" fill="#f8fafc" fontSize="10" fontWeight="800" fontFamily="Inter, sans-serif">
              99.99% UPTIME
            </text>
            <text x="92" y="167" fill="#94a3b8" fontSize="8" fontWeight="600" fontFamily="Inter, sans-serif">
              Verified Production SLA
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
