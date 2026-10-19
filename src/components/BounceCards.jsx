import React, { useEffect, useRef } from 'react';
import './BounceCards.css';

const PATTERN = [1, 0.5, -0.3, -1, 0.2, 0.75, -0.6, 0.35, -0.85, 0.1];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const parseTransform = value => {
  if (typeof value !== 'string') return null;
  const rotate = value.match(/rotate\(\s*(-?[\d.]+)deg\s*\)/);
  const translate = value.match(/translate\(\s*(-?[\d.]+)px(?:\s*,\s*(-?[\d.]+)px)?\s*\)/);
  return {
    x: translate ? Number(translate[1]) : 0,
    y: translate && translate[2] ? Number(translate[2]) : 0,
    rotate: rotate ? Number(rotate[1]) : 0
  };
};

export default function BounceCards({
  children,
  items,
  images = [],
  className = '',
  style,
  containerWidth,
  containerHeight = 320,
  cardWidth = 260,
  cardHeight = 250,
  spread = 284,
  rotation = 0,
  arc = 0,
  animationDelay = 0.12,
  animationStagger = 0.09,
  bounciness = 0.58,
  popStiffness = 180,
  moveStiffness = 210,
  enableHover = true,
  pushDistance = 22,
  hoverScale = 1.05,
  hoverLift = 8,
  hoverRotate = 0,
  borderWidth = 1,
  borderColor = '#E5E7EB',
  radius = 20,
  transformStyles,
  onCardClick
}) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const wakeRef = useRef(null);
  const bodiesRef = useRef([]);
  const hoverTargetRef = useRef(-1);
  const stageScaleRef = useRef(1);

  // Support children, items, or images
  const childList = children ? React.Children.toArray(children) : items || images || [];
  const count = childList.length;
  const middle = (count - 1) / 2;
  const reach = Math.max(1, middle);

  const slots = childList.map((_, i) => {
    if (transformStyles && transformStyles[i]) {
      const custom = parseTransform(transformStyles[i]);
      if (custom) return custom;
    }
    const offset = i - middle;
    return {
      x: offset * spread,
      y: arc * (offset / reach) ** 2,
      rotate: rotation * (PATTERN[i % PATTERN.length] || 0)
    };
  });

  const settings = {
    slots,
    cardWidth: Math.max(10, cardWidth),
    cardHeight: Math.max(10, cardHeight),
    delay: Math.max(0, animationDelay),
    stagger: Math.max(0, animationStagger),
    bounciness: clamp(bounciness, 0, 1),
    popStiffness,
    moveStiffness,
    enableHover,
    pushDistance,
    hoverScale: clamp(hoverScale, 0.5, 2),
    hoverLift,
    hoverRotate,
    clickable: typeof onCardClick === 'function' || true
  };

  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  const clickRef = useRef(onCardClick);
  clickRef.current = onCardClick;

  const setHover = index => {
    if (hoverTargetRef.current !== index) {
      hoverTargetRef.current = index;
      wakeRef.current?.();
    }
  };

  const handleCardClick = index => {
    const bodies = bodiesRef.current;
    if (bodies[index]) {
      bodies[index].vs -= 2.2;
      wakeRef.current?.();
    }
    clickRef.current?.(index);
  };

  // Responsive scaling observer
  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const totalSpan = (count - 1) * spread + cardWidth + 48;

    const handleResize = () => {
      const available = root.clientWidth;
      if (available > 0 && available < totalSpan) {
        const s = Math.min(1, Math.max(0.32, (available - 16) / totalSpan));
        stageScaleRef.current = s;
        stage.style.transform = `scale(${s})`;
      } else {
        stageScaleRef.current = 1;
        stage.style.transform = 'scale(1)';
      }
    };

    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(root);
    return () => ro.disconnect();
  }, [count, spread, cardWidth]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const bodies = [];
    bodiesRef.current = bodies;
    const state = { hovered: -1, time: 0, layer: -1, inView: false, entryTime: 0 };
    let raf = 0;
    let last = performance.now();
    let alive = true;

    const body = i => {
      if (!bodies[i]) {
        const slot = settingsRef.current.slots[i] ?? { x: 0, y: 0, rotate: 0 };
        bodies[i] = {
          x: slot.x,
          y: slot.y,
          rotate: slot.rotate,
          scale: reduce ? 1 : 0,
          vx: 0,
          vy: 0,
          vr: 0,
          vs: 0,
          born: state.inView ? state.entryTime : Infinity
        };
      }
      return bodies[i];
    };

    // Numerical spring physics integrator
    const step = (value, velocity, target, stiffness, damping, dt) => {
      const next = velocity + ((target - value) * stiffness - velocity * damping) * dt;
      return [value + next * dt, next];
    };

    const frame = now => {
      raf = 0;
      if (!alive || !state.inView) return;
      const s = settingsRef.current;
      const dt = Math.min(1 / 30, Math.max(1 / 240, (now - last) / 1000));
      last = now;
      state.time += dt;

      const hovered = s.enableHover ? hoverTargetRef.current : -1;
      const popStiffness = s.popStiffness || 180;
      const popDamping = 2 * (1 - 0.85 * s.bounciness) * Math.sqrt(popStiffness);
      const moveStiffness = s.moveStiffness || 210;
      const moveDamping = 2 * (reduce ? 1 : 0.72) * Math.sqrt(moveStiffness);
      const substeps = Math.ceil(dt / (1 / 240));
      const h = dt / substeps;
      let moving = 0;

      for (let i = 0; i < s.slots.length; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const card = body(i);
        const slot = s.slots[i];
        const appeared = reduce || (state.inView && state.time - card.born >= s.delay + i * s.stagger);
        let targetX = slot.x;
        let targetY = slot.y;
        let targetRotate = slot.rotate;
        let targetScale = appeared ? 1 : 0;

        if (hovered >= 0 && appeared) {
          if (i === hovered) {
            targetY = slot.y - s.hoverLift;
            targetRotate = s.hoverRotate;
            targetScale = s.hoverScale;
          } else {
            targetX = slot.x + Math.sign(i - hovered) * s.pushDistance;
          }
        }

        for (let k = 0; k < substeps; k++) {
          [card.x, card.vx] = step(card.x, card.vx, targetX, moveStiffness, moveDamping, h);
          [card.y, card.vy] = step(card.y, card.vy, targetY, moveStiffness, moveDamping, h);
          [card.rotate, card.vr] = step(card.rotate, card.vr, targetRotate, moveStiffness, moveDamping, h);
          if (reduce) {
            card.scale = targetScale;
            card.vs = 0;
          } else {
            [card.scale, card.vs] = step(card.scale, card.vs, targetScale, popStiffness, popDamping, h);
          }
        }

        moving +=
          Math.abs(card.vx) +
          Math.abs(card.vy) +
          Math.abs(card.vr) +
          Math.abs(card.vs) * 100 +
          Math.abs(targetX - card.x) +
          Math.abs(targetY - card.y) +
          Math.abs(targetRotate - card.rotate) +
          Math.abs(targetScale - card.scale) * 100 +
          (appeared ? 0 : 1);

        el.style.transform = `translate(-50%, -50%) translate3d(${card.x.toFixed(2)}px, ${card.y.toFixed(2)}px, 0) rotate(${card.rotate.toFixed(3)}deg) scale(${Math.max(0, card.scale).toFixed(4)})`;
      }

      if (state.layer !== hovered) {
        state.layer = hovered;
        cardRefs.current.forEach((el, i) => {
          if (!el) return;
          el.style.zIndex = i === hovered ? String(s.slots.length + 10) : String(i + 1);
          el.toggleAttribute('data-active', i === hovered);
        });
      }

      if (moving > 0.02) raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (raf || !alive || !state.inView) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    wakeRef.current = wake;

    // Trigger popup on scroll into view and re-trigger when scrolling back
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!state.inView) {
              state.inView = true;
              state.entryTime = state.time;
              const s = settingsRef.current;
              for (let i = 0; i < s.slots.length; i++) {
                const b = body(i);
                b.born = state.time;
                if (!reduce) {
                  b.scale = 0;
                  b.vs = 0;
                }
              }
              wake();
            }
          } else if (entry.intersectionRatio <= 0) {
            state.inView = false;
            if (raf) {
              cancelAnimationFrame(raf);
              raf = 0;
            }
            const s = settingsRef.current;
            for (let i = 0; i < s.slots.length; i++) {
              if (bodies[i] && !reduce) {
                bodies[i].scale = 0;
                bodies[i].vs = 0;
              }
            }
          }
        });
      },
      {
        threshold: [0, 0.15]
      }
    );

    observer.observe(root);

    const onFocus = event => {
      const index = cardRefs.current.indexOf(event.target);
      if (index >= 0) {
        setHover(index);
      }
    };

    const onBlur = () => {
      setHover(-1);
    };

    const onKey = event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const index = cardRefs.current.indexOf(event.target);
      if (index < 0) return;
      event.preventDefault();
      handleCardClick(index);
    };

    root.addEventListener('focusin', onFocus);
    root.addEventListener('focusout', onBlur);
    root.addEventListener('keydown', onKey);
    wake();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      wakeRef.current = null;
      bodiesRef.current = [];
      observer.disconnect();
      root.removeEventListener('focusin', onFocus);
      root.removeEventListener('focusout', onBlur);
      root.removeEventListener('keydown', onKey);
    };
  }, [count, spread]);

  useEffect(() => {
    wakeRef.current?.();
  });

  const totalWidth = (count - 1) * spread + cardWidth + 48;

  return (
    <div
      ref={rootRef}
      className={`bounce-cards${className ? ` ${className}` : ''}`}
      onMouseLeave={() => setHover(-1)}
      onPointerLeave={() => setHover(-1)}
      style={{
        width: containerWidth || '100%',
        maxWidth: totalWidth,
        height: containerHeight,
        '--bounce-cards-width': `${settings.cardWidth}px`,
        '--bounce-cards-height': `${settings.cardHeight}px`,
        '--bounce-cards-border': `${Math.max(0, borderWidth)}px`,
        '--bounce-cards-border-color': borderColor,
        '--bounce-cards-radius': `${Math.max(0, radius)}px`,
        ...style
      }}
    >
      <div ref={stageRef} className="bounce-cards__stage">
        {childList.map((child, i) => (
          <div
            key={i}
            ref={el => {
              cardRefs.current[i] = el;
            }}
            className="bounce-cards__card bounce-cards__card--clickable"
            style={{ zIndex: i + 1 }}
            role="button"
            tabIndex={0}
            aria-label={`Process Step ${i + 1}`}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(-1)}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(-1)}
            onMouseOver={() => setHover(i)}
            onPointerOver={() => setHover(i)}
            onClick={() => handleCardClick(i)}
          >
            {React.isValidElement(child) ? (
              child
            ) : typeof child === 'object' && child?.src ? (
              <img src={child.src} alt={child.alt || ''} draggable={false} />
            ) : (
              child
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
