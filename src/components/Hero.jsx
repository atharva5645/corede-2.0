import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, X } from 'lucide-react';
import IsometricArchitecture from './IsometricArchitecture';

// ─── Typewriter component ──────────────────────────────────────────────────────
function Typewriter({ text, speed = 45, delay = 0 }) {
  const [display, setDisplay] = useState('');
  const [started, setStarted] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(delayTimer);
    }
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    setDisplay('');
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return <>{display}</>;
}

// ─── Blinking cursor ──────────────────────────────────────────────────────────
function Cursor() {
  return <span className="tw-cursor">|</span>;
}

// ─── CountUp — animates a number from 0 → end when scrolled into view ────────
function CountUp({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            // easeOutQuart for a satisfying deceleration
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Animation variant ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// ─── Headline lengths (ms offsets for staggered typing) ───────────────────────
// Line 1: "Global IT Partner for"   — starts at 0
// Line 2: "Sustainable Growth"      — starts after line 1 finishes (~22 chars × 45ms = ~990ms)
// Line 3: "& Innovation."           — starts after line 2 (~18 chars × 45ms later)
const L1 = 'Global IT Partner for';
const L2 = 'Sustainable Growth';
const L3 = '& Innovation.';
const SPEED = 45;
const L1_DONE = L1.length * SPEED + 200;
const L2_DONE = L1_DONE + L2.length * SPEED + 200;

export default function Hero({ onOpenQuote }) {
  const [showCallPopup, setShowCallPopup] = useState(false);

  return (
    <section className="hero-section" id="hero">
      <div className="clay-container">
        <div className="hero-grid-layout">
          {/* Left Column: Copy & Actions */}
          <div className="hero-content-clean">
            {/* Typewriter Headline */}
            <motion.h1
              className="hero-headline"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <Typewriter text={L1} speed={SPEED} delay={0} />
              <br className="hero-desktop-br" />
              <span className="hero-headline-accent">
                <Typewriter text={L2} speed={SPEED} delay={L1_DONE} />
              </span>{' '}
              <Typewriter text={L3} speed={SPEED} delay={L2_DONE} />
              <Cursor />
            </motion.h1>

            {/* Lead Summary */}
            <p className="hero-summary">
              CoreDe Technologies is a premier{' '}
              <strong>Software Development Company in India</strong>,{' '}
              specializing in{' '}
              <strong>Custom Software Solutions</strong>{' '}
              and high-performance digital strategies for global enterprises.
            </p>

            {/* Actions Row */}
            <div className="hero-actions-row">
              <button
                type="button"
                className="btn-primary hero-btn-quote"
                onClick={onOpenQuote}
                id="hero-quote-trigger"
              >
                <span>Request a Quote</span>
                <ArrowRight size={16} />
              </button>

              <div className="hero-call-wrapper">
                <button
                  type="button"
                  className="btn-secondary hero-btn-phone"
                  onClick={() => setShowCallPopup(!showCallPopup)}
                  aria-label="Direct Phone Contact"
                  aria-expanded={showCallPopup}
                >
                  <Phone size={14} />
                  <span>91 8951029849</span>
                </button>

                {showCallPopup && (
                  <div className="call-popup-card glass-surface">
                    <div className="call-popup-header">
                      <h4>Choose how to contact</h4>
                      <button
                        type="button"
                        className="call-popup-close"
                        onClick={() => setShowCallPopup(false)}
                        aria-label="Close options"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <div className="call-popup-options">
                      <a
                        href="https://wa.me/919008110807"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="call-option-item whatsapp-opt"
                      >
                        <span className="opt-icon">💬</span>
                        <span>WhatsApp (+91 9008110807)</span>
                      </a>
                      <a
                        href="skype:+919008110807?call"
                        className="call-option-item skype-opt"
                      >
                        <span className="opt-icon">📞</span>
                        <span>Skype Call</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Proof Row */}
            <div className="hero-proof-row">
              <div className="hero-proof-item">
                <span className="proof-number"><CountUp end={350} suffix="+" /></span>
                <span className="proof-label">Enterprise Deployments</span>
              </div>
              <div className="hero-proof-divider" />
              <div className="hero-proof-item">
                <span className="proof-number"><CountUp end={25} suffix="+" /></span>
                <span className="proof-label">Global Partners</span>
              </div>
              <div className="hero-proof-divider" />
              <div className="hero-proof-item">
                <span className="proof-number"><CountUp end={12} suffix="+" /></span>
                <span className="proof-label">Industry Sectors</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="hero-visual-column">
            <IsometricArchitecture />
          </div>
        </div>
      </div>
    </section>
  );
}
