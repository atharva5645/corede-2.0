import React, { useId } from 'react';

/**
 * IsometricArchitecture
 * High-end enterprise architectural isometric SVG diagram (CyberNest / Stripe inspired)
 * Seamless, transparent background sitting directly on the hero canvas.
 */
export default function IsometricArchitecture() {
  const uid = useId().replace(/:/g, '');

  // Generate crisp isometric floor grid lines (viewBox: 0 0 800 600)
  // Slope +tan(30°) = 0.57735 and -tan(30°) = -0.57735
  const gridLines = [];
  const spacing = 36;
  const halfSpan = 480;
  
  // Diagonal lines direction 1 (+30 deg)
  for (let offset = -440; offset <= 440; offset += spacing) {
    const x1 = 400 - halfSpan;
    const y1 = 330 + offset - halfSpan * 0.57735;
    const x2 = 400 + halfSpan;
    const y2 = 330 + offset + halfSpan * 0.57735;
    gridLines.push({ x1, y1, x2, y2, key: `g1-${offset}` });
  }

  // Diagonal lines direction 2 (-30 deg)
  for (let offset = -440; offset <= 440; offset += spacing) {
    const x1 = 400 - halfSpan;
    const y1 = 330 + offset + halfSpan * 0.57735;
    const x2 = 400 + halfSpan;
    const y2 = 330 + offset - halfSpan * 0.57735;
    gridLines.push({ x1, y1, x2, y2, key: `g2-${offset}` });
  }

  return (
    <div className="hero-iso-container" aria-label="CoreDe Isometric Enterprise Architecture Diagram">
      <svg
        viewBox="85 55 655 455"
        className="hero-iso-svg"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          {/* Soft radial mask to fade out grid lines naturally at outer edges */}
          <radialGradient id={`grid-fade-${uid}`} cx="50%" cy="54%" r="48%">
            <stop offset="35%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <mask id={`grid-mask-${uid}`}>
            <rect x="50" y="30" width="720" height="500" fill={`url(#grid-fade-${uid})`} />
          </mask>

          {/* Precision drop shadows for elevated isometric modules */}
          <filter id={`base-shadow-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="24" stdDeviation="20" floodColor="#0F172A" floodOpacity="0.15" />
          </filter>
          
          <filter id={`mobile-shadow-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="-10" dy="18" stdDeviation="14" floodColor="#0F172A" floodOpacity="0.18" />
          </filter>

          <filter id={`gold-glow-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#D4AF37" floodOpacity="0.75" />
          </filter>

          {/* Motion Paths for Continuous Smooth Data Packet Gliding */}
          {/* Path 1: Top-Left Server to Center Core */}
          <path
            id={`flow-server-core-${uid}`}
            d="M 225 182 L 290 220 L 290 275 L 330 298"
          />

          {/* Path 2: Center Core to Desktop UI */}
          <path
            id={`flow-core-desktop-${uid}`}
            d="M 470 375 L 530 410 L 565 390"
          />

          {/* Path 3: Center Core to Mobile UI */}
          <path
            id={`flow-core-mobile-${uid}`}
            d="M 530 410 L 530 448 L 620 500"
          />
        </defs>

        <style>{`
          /* Exploded Core Mechanical Motion Loop (4.5s ease-in-out infinite) */
          @keyframes coreLidCycle {
            0%, 14% {
              transform: translateY(0px);
            }
            38%, 76% {
              transform: translateY(-50px);
            }
            92%, 100% {
              transform: translateY(0px);
            }
          }

          @keyframes coreMiddleCycle {
            0%, 14% {
              transform: translateY(0px);
            }
            38%, 76% {
              transform: translateY(-24px);
            }
            92%, 100% {
              transform: translateY(0px);
            }
          }

          @keyframes dbFloat {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-6px);
            }
          }

          @keyframes dashGlow {
            to {
              stroke-dashoffset: -32;
            }
          }

          .iso-animated-lid {
            animation: coreLidCycle 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            will-change: transform;
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .iso-animated-middle {
            animation: coreMiddleCycle 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            will-change: transform;
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .iso-animated-db {
            animation: dbFloat 3.8s ease-in-out infinite;
          }

          .iso-route-flow {
            stroke-dasharray: 6 10;
            animation: dashGlow 2s linear infinite;
          }

          /* Interactive Expansion on Hover */
          .hero-iso-svg:hover .iso-animated-lid {
            animation-play-state: paused;
            transform: translateY(-74px) !important;
          }

          .hero-iso-svg:hover .iso-animated-middle {
            animation-play-state: paused;
            transform: translateY(-36px) !important;
          }

          .hero-iso-svg:hover .iso-module-tag {
            fill: #D4AF37 !important;
          }

          .hero-iso-svg:hover .iso-gold-accent {
            filter: drop-shadow(0 0 6px rgba(212, 175, 55, 0.8));
          }
        `}</style>

        {/* ==================================================================
            1. ISOMETRIC FLOOR GRID (1px hairline, masked fade)
            ================================================================== */}
        <g mask={`url(#grid-mask-${uid})`} opacity="0.9">
          {gridLines.map((line) => (
            <line
              key={line.key}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="rgba(15, 23, 42, 0.08)"
              strokeWidth="1"
            />
          ))}

          {/* Micro CAD Alignment Crosshairs */}
          <g stroke="rgba(15, 23, 42, 0.2)" strokeWidth="1">
            <path d="M 225 177 L 225 187 M 220 182 L 230 182" />
            <path d="M 400 330 L 400 340 M 395 335 L 405 335" />
            <path d="M 610 395 L 610 405 M 605 400 L 615 400" />
            <path d="M 290 215 L 290 225 M 285 220 L 295 220" />
            <path d="M 530 405 L 530 415 M 525 410 L 535 410" />
          </g>
        </g>

        {/* Floor Ambient Elevation Shadows */}
        <ellipse cx="170" cy="270" rx="65" ry="28" fill="#0F172A" opacity="0.06" filter={`url(#base-shadow-${uid})`} />
        <ellipse cx="400" cy="440" rx="135" ry="52" fill="#0F172A" opacity="0.14" />
        <ellipse cx="610" cy="480" rx="110" ry="42" fill="#0F172A" opacity="0.08" />

        {/* ==================================================================
            2. ARCHITECTURAL ROUTING LINES & DATA FLOW PACKETS
            ================================================================== */}
        <g className="iso-routing-network">
          {/* Structural Carrier Lines */}
          <path
            d="M 225 182 L 290 220 L 290 275 L 330 298"
            stroke="#0F172A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 470 375 L 530 410 L 565 390"
            stroke="#0F172A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 530 410 L 530 448 L 620 500"
            stroke="#0F172A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Animated Glowing Conduit Flow */}
          <path
            d="M 225 182 L 290 220 L 290 275 L 330 298"
            stroke="#2563EB"
            strokeWidth="1.5"
            strokeOpacity="0.8"
            className="iso-route-flow"
          />
          <path
            d="M 470 375 L 530 410 L 565 390"
            stroke="#D4AF37"
            strokeWidth="1.5"
            strokeOpacity="0.8"
            className="iso-route-flow"
          />
          <path
            d="M 530 410 L 530 448 L 620 500"
            stroke="#2563EB"
            strokeWidth="1.5"
            strokeOpacity="0.8"
            className="iso-route-flow"
          />

          {/* Precision Junction Nodes */}
          <circle cx="290" cy="220" r="3.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="290" cy="275" r="3.5" fill="#2563EB" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="530" cy="410" r="4" fill="#D4AF37" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="530" cy="448" r="3.5" fill="#2563EB" stroke="#0F172A" strokeWidth="1.5" />

          {/* Gliding Data Packets */}
          {/* Packet 1: Server -> Core (Royal Blue) */}
          <g>
            <circle r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.2">
              <animateMotion
                dur="2.8s"
                repeatCount="indefinite"
                rotate="auto"
              >
                <mpath href={`#flow-server-core-${uid}`} />
              </animateMotion>
            </circle>
          </g>

          {/* Packet 2: Core -> Desktop UI (Warm Gold) */}
          <g>
            <circle r="4" fill="#D4AF37" stroke="#FFFFFF" strokeWidth="1.2" filter={`url(#gold-glow-${uid})`}>
              <animateMotion
                dur="3.2s"
                repeatCount="indefinite"
                rotate="auto"
              >
                <mpath href={`#flow-core-desktop-${uid}`} />
              </animateMotion>
            </circle>
          </g>

          {/* Packet 3: Core -> Mobile UI (Royal Blue) */}
          <g>
            <circle r="3.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.2">
              <animateMotion
                dur="2.5s"
                repeatCount="indefinite"
                rotate="auto"
              >
                <mpath href={`#flow-core-mobile-${uid}`} />
              </animateMotion>
            </circle>
          </g>
        </g>

        {/* ==================================================================
            3. TOP-LEFT MODULE: ISOMETRIC SERVER / DATABASE STACK
               Stacked off-white plates (#FFFFFF) with crisp dark borders (#0F172A)
            ================================================================== */}
        <g id="module-server-stack">
          {/* Architectural Module Tag */}
          <text
            x="95"
            y="70"
            fill="rgba(15, 23, 42, 0.5)"
            fontSize="10"
            fontWeight="600"
            letterSpacing="0.14em"
            fontFamily="monospace, system-ui, sans-serif"
            className="iso-module-tag"
            style={{ transition: 'fill 0.3s ease' }}
          >
            01 // DISTRIBUTED_STORAGE
          </text>

          {/* Plate 1: Bottom Server Base */}
          <g transform="translate(0, 0)">
            {/* Left Face */}
            <path
              d="M 115 220 L 170 252 L 170 268 L 115 236 Z"
              fill="#F1F5F9"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Right Face */}
            <path
              d="M 170 252 L 225 220 L 225 236 L 170 268 Z"
              fill="#E2E8F0"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Top Face */}
            <path
              d="M 170 188 L 225 220 L 170 252 L 115 220 Z"
              fill="#FFFFFF"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Server Drive Bays on Left Face */}
            <line x1="126" y1="230" x2="158" y2="249" stroke="#0F172A" strokeWidth="1.5" />
            <circle cx="162" cy="250" r="1.5" fill="#10B981" />
          </g>

          {/* Plate 2: Middle Compute Plate */}
          <g transform="translate(0, -36)">
            {/* Standoff Brass Pillars */}
            <line x1="124" y1="220" x2="124" y2="234" stroke="#94A3B8" strokeWidth="2" />
            <line x1="216" y1="220" x2="216" y2="234" stroke="#94A3B8" strokeWidth="2" />
            <line x1="170" y1="246" x2="170" y2="260" stroke="#D4AF37" strokeWidth="2" />

            {/* Left Face */}
            <path
              d="M 115 220 L 170 252 L 170 268 L 115 236 Z"
              fill="#F8FAFC"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Right Face */}
            <path
              d="M 170 252 L 225 220 L 225 236 L 170 268 Z"
              fill="#E2E8F0"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Top Face */}
            <path
              d="M 170 188 L 225 220 L 170 252 L 115 220 Z"
              fill="#FFFFFF"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <line x1="126" y1="230" x2="158" y2="249" stroke="#0F172A" strokeWidth="1.5" />
            <circle cx="162" cy="250" r="1.5" fill="#2563EB" />
          </g>

          {/* Plate 3: Top Controller Plate */}
          <g transform="translate(0, -72)">
            {/* Standoff Pillars */}
            <line x1="124" y1="220" x2="124" y2="234" stroke="#94A3B8" strokeWidth="2" />
            <line x1="216" y1="220" x2="216" y2="234" stroke="#94A3B8" strokeWidth="2" />
            <line x1="170" y1="246" x2="170" y2="260" stroke="#D4AF37" strokeWidth="2" />

            {/* Left Face */}
            <path
              d="M 115 220 L 170 252 L 170 268 L 115 236 Z"
              fill="#FFFFFF"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Right Face */}
            <path
              d="M 170 252 L 225 220 L 225 236 L 170 268 Z"
              fill="#EDF2F7"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Top Face with Architecture Etchings */}
            <path
              d="M 170 188 L 225 220 L 170 252 L 115 220 Z"
              fill="#FFFFFF"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            
            {/* Architectural Trace Lines */}
            <path
              d="M 148 208 L 170 221 L 192 208 M 170 221 L 170 240"
              stroke="rgba(15, 23, 42, 0.25)"
              strokeWidth="1.2"
            />
            <circle cx="148" cy="208" r="2" fill="#10B981" />
            <circle cx="192" cy="208" r="2" fill="#2563EB" />
            <circle cx="170" cy="240" r="2.5" fill="#D4AF37" className="iso-gold-accent" />
          </g>

          {/* Floating Floating Database Cylinder / Query Disc */}
          <g className="iso-animated-db">
            {/* Cylinder Body */}
            <path
              d="M 148 94 L 170 107 L 192 94 L 192 103 L 170 116 L 148 103 Z"
              fill="#F1F5F9"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Cylinder Top Disc */}
            <path
              d="M 170 81 L 192 94 L 170 107 L 148 94 Z"
              fill="#FFFFFF"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="170" cy="94" r="3" fill="#2563EB" />
          </g>
        </g>

        {/* ==================================================================
            4. CENTER HERO MODULE: LARGE ANIMATED EXPLODED CORE
               Large Obsidian Hardware/Software Core (#0B0F19)
               Exploded View Loop (4.5s): Top Lid (+50px) -> Circuit Grid (+24px) -> Base Plate
            ================================================================== */}
        <g id="module-center-core">
          {/* Architectural Module Tag */}
          <text
            x="330"
            y="145"
            fill="rgba(15, 23, 42, 0.5)"
            fontSize="10"
            fontWeight="600"
            letterSpacing="0.14em"
            fontFamily="monospace, system-ui, sans-serif"
            className="iso-module-tag"
            style={{ transition: 'fill 0.3s ease' }}
          >
            02 // EXPLODED_CORE_KERNEL
          </text>

          {/* 4.1 LAYER 1: SOLID OBSIDIAN BASE PLATE (Stays Grounded) */}
          <g id="core-base-plate">
            {/* Left Face */}
            <path
              d="M 290 335 L 400 398 L 400 420 L 290 357 Z"
              fill="#0B0F19"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Right Face */}
            <path
              d="M 400 398 L 510 335 L 510 357 L 400 420 Z"
              fill="#070A12"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Top Face */}
            <path
              d="M 400 271 L 510 335 L 400 398 L 290 335 Z"
              fill="#0F172A"
              stroke="#1E293B"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Corner Brass Mounting Screws */}
            <circle cx="308" cy="338" r="2.5" fill="#D4AF37" className="iso-gold-accent" />
            <circle cx="492" cy="338" r="2.5" fill="#D4AF37" className="iso-gold-accent" />
            <circle cx="400" cy="386" r="2.5" fill="#D4AF37" className="iso-gold-accent" />
            <circle cx="400" cy="284" r="2.5" fill="#D4AF37" className="iso-gold-accent" />

            {/* Recessed Center Socket Contacts */}
            <path
              d="M 400 310 L 448 335 L 400 360 L 352 335 Z"
              fill="#080C16"
              stroke="#2563EB"
              strokeWidth="1.2"
            />
          </g>

          {/* Vertical Precision Guide Rails (Visible when separated) */}
          <g stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" opacity="0.6">
            <line x1="308" y1="338" x2="308" y2="260" />
            <line x1="492" y1="338" x2="492" y2="260" />
            <line x1="400" y1="386" x2="400" y2="308" />
            <line x1="400" y1="284" x2="400" y2="206" />
          </g>

          {/* 4.2 LAYER 2: STRUCTURAL CIRCUIT / API GRID LAYER (Elevates +24px) */}
          <g className="iso-animated-middle">
            {/* Left Glass/Translucent Face */}
            <path
              d="M 296 316 L 400 376 L 400 388 L 296 328 Z"
              fill="rgba(11, 15, 25, 0.95)"
              stroke="#2563EB"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Right Glass/Translucent Face */}
            <path
              d="M 400 376 L 504 316 L 504 328 L 400 388 Z"
              fill="rgba(7, 10, 18, 0.95)"
              stroke="#2563EB"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Top Circuit Substrate Face */}
            <path
              d="M 400 256 L 504 316 L 400 376 L 296 316 Z"
              fill="#0A1020"
              stroke="#2563EB"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Inner Printed Circuit Architecture */}
            {/* Royal Blue & Warm Gold Radial Bus Traces */}
            <path
              d="M 328 316 L 370 316 L 388 306 M 472 316 L 430 316 L 412 306"
              stroke="#2563EB"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 400 354 L 400 328 M 400 278 L 400 304"
              stroke="#D4AF37"
              strokeWidth="1.8"
              strokeLinecap="round"
              className="iso-gold-accent"
            />

            {/* Central Logic Processor Die */}
            <path
              d="M 400 294 L 438 316 L 400 338 L 362 316 Z"
              fill="#030712"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeLinejoin="round"
              className="iso-gold-accent"
            />
            {/* Processor Core Emblem & Glow */}
            <circle cx="400" cy="316" r="4.5" fill="#2563EB" />
            <circle cx="400" cy="316" r="2" fill="#FFFFFF" />

            {/* Precision SMD Pads */}
            <rect x="345" y="306" width="6" height="3" fill="#D4AF37" rx="0.5" transform="rotate(-30 345 306)" />
            <rect x="450" y="322" width="6" height="3" fill="#D4AF37" rx="0.5" transform="rotate(-30 450 322)" />
            <circle cx="380" cy="338" r="2" fill="#38BDF8" />
            <circle cx="420" cy="294" r="2" fill="#38BDF8" />
          </g>

          {/* 4.3 LAYER 3: TOP DARK OBSIDIAN LID (Elevates +50px) */}
          <g className="iso-animated-lid">
            {/* Left Face */}
            <path
              d="M 290 292 L 400 355 L 400 376 L 290 313 Z"
              fill="#0B0F19"
              stroke="#1E293B"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Right Face */}
            <path
              d="M 400 355 L 510 292 L 510 313 L 400 376 Z"
              fill="#070A12"
              stroke="#1E293B"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Top Obsidian Chamfered Surface */}
            <path
              d="M 400 228 L 510 292 L 400 355 L 290 292 Z"
              fill="#0B0F19"
              stroke="#334155"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Laser-Etched Concentric Emblem in Gold & Slate */}
            <path
              d="M 400 252 L 460 288 L 400 324 L 340 288 Z"
              fill="none"
              stroke="rgba(212, 175, 55, 0.45)"
              strokeWidth="1.2"
              strokeDasharray="4 2"
              className="iso-gold-accent"
            />
            <path
              d="M 400 266 L 436 288 L 400 310 L 364 288 Z"
              fill="rgba(15, 23, 42, 0.65)"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="1"
            />
            <circle cx="400" cy="288" r="3" fill="#D4AF37" className="iso-gold-accent" />

            {/* Corner Alignment Ticks */}
            <line x1="312" y1="298" x2="324" y2="305" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" />
            <line x1="488" y1="298" x2="476" y2="305" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" />
          </g>
        </g>

        {/* ==================================================================
            5. BOTTOM-RIGHT MODULE: TWO OVERLAPPING WIREFRAME UI SCREENS
               Browser Window & Mobile Viewport (#FFFFFF fill, #0F172A 1.5px stroke)
            ================================================================== */}
        <g id="module-ui-experience">
          {/* Architectural Module Tag */}
          <text
            x="590"
            y="265"
            fill="rgba(15, 23, 42, 0.5)"
            fontSize="10"
            fontWeight="600"
            letterSpacing="0.14em"
            fontFamily="monospace, system-ui, sans-serif"
            className="iso-module-tag"
            style={{ transition: 'fill 0.3s ease' }}
          >
            03 // OMNI_CLIENT_EXPERIENCE
          </text>

          {/* 5.1 DESKTOP BROWSER SCREEN (Base UI Window) */}
          <g id="ui-desktop-window">
            {/* Screen Depth / Left Border */}
            <path
              d="M 520 338 L 625 398 L 625 406 L 520 346 Z"
              fill="#E2E8F0"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Screen Depth / Right Border */}
            <path
              d="M 625 398 L 730 338 L 730 346 L 625 406 Z"
              fill="#CBD5E1"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Screen Surface Plane */}
            <path
              d="M 625 278 L 730 338 L 625 398 L 520 338 Z"
              fill="#FFFFFF"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Window Chrome Header Bar Separator */}
            <line x1="538" y1="334" x2="712" y2="334" stroke="rgba(15, 23, 42, 0.12)" strokeWidth="1" />
            
            {/* 3 Window Control Dots */}
            <circle cx="542" cy="331" r="2.5" fill="#EF4444" />
            <circle cx="550" cy="327" r="2.5" fill="#F59E0B" />
            <circle cx="558" cy="323" r="2.5" fill="#10B981" />

            {/* Mini URL Search Bar Capsule */}
            <path
              d="M 574 318 L 642 284"
              stroke="rgba(15, 23, 42, 0.25)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Sidebar Navigation Wireframe Bars */}
            <line x1="538" y1="344" x2="552" y2="352" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="538" y1="355" x2="552" y2="363" stroke="rgba(15, 23, 42, 0.2)" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="538" y1="366" x2="552" y2="374" stroke="rgba(15, 23, 42, 0.2)" strokeWidth="1.8" strokeLinecap="round" />

            {/* KPI Metric Cards */}
            <path
              d="M 565 344 L 602 324"
              stroke="#0F172A"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 565 352 L 590 338"
              stroke="rgba(15, 23, 42, 0.25)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Precision Vector Line Chart */}
            <path
              d="M 575 382 L 602 358 L 625 370 L 655 342 L 678 355 L 678 370 L 575 390 Z"
              fill="rgba(37, 99, 235, 0.08)"
            />
            <path
              d="M 575 382 L 602 358 L 625 370 L 655 342 L 678 355"
              fill="none"
              stroke="#2563EB"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Peak Performance Node in Gold */}
            <circle cx="655" cy="342" r="3.5" fill="#D4AF37" stroke="#FFFFFF" strokeWidth="1" className="iso-gold-accent" />
            
            {/* Minimalist Typography Wireframe Rows */}
            <line x1="630" y1="384" x2="682" y2="354" stroke="rgba(15, 23, 42, 0.2)" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="636" y1="392" x2="676" y2="369" stroke="rgba(15, 23, 42, 0.15)" strokeWidth="1.8" strokeLinecap="round" />
          </g>

          {/* 5.2 OVERLAPPING MOBILE SCREEN (Floating in Foreground) */}
          <g id="ui-mobile-phone" filter={`url(#mobile-shadow-${uid})`}>
            {/* Phone Bevel / Depth */}
            <path
              d="M 602 430 L 660 464 L 660 472 L 602 438 Z"
              fill="#E2E8F0"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M 660 464 L 706 438 L 706 446 L 660 472 Z"
              fill="#CBD5E1"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Phone Front Glass Surface */}
            <path
              d="M 648 404 L 706 438 L 660 464 L 602 430 Z"
              fill="#FFFFFF"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Dynamic Island / Speaker Pill */}
            <path
              d="M 644 412 L 654 418"
              stroke="#0F172A"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Mobile Wireframe Cards */}
            {/* Hero App Card */}
            <path
              d="M 618 430 L 650 412"
              stroke="#2563EB"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 622 438 L 665 414"
              stroke="rgba(15, 23, 42, 0.2)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* List Item Row */}
            <circle cx="628" cy="448" r="2.5" fill="#D4AF37" />
            <path
              d="M 636 448 L 670 429"
              stroke="rgba(15, 23, 42, 0.25)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Bottom Mobile Action Button (Royal Blue) */}
            <path
              d="M 636 460 L 678 436"
              stroke="#2563EB"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
