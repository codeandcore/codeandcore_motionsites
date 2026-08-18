import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { portfolioImages } from '../../data/portfolioData';
import './CursorImageTrail.css';

/**
 * High-end Cursor-Driven Random Image Collage Trail
 * Editorial Awwwards-level interactive portfolio showcase
 */
export default function CursorImageTrail({
  images = portfolioImages,
  heading = ['SEE', 'WHAT WE', 'BUILD.'],
  subheading = 'Move your cursor across the canvas to uncover our portfolio archive.',
  badge = 'FEATURED PORTFOLIO / AWWWARDS & HIGH IMPACT',
  maxImages = 14,
  distanceThreshold = 75,
  timeThrottle = 80,
  className = '',
}) {
  const containerRef = useRef(null);
  const cardsLayerRef = useRef(null);
  const activeCardsRef = useRef([]);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(0);
  const zIndexCounterRef = useRef(100);
  const imageIndexRef = useRef(0);
  const isPointerInsideRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile / touch capability
  useEffect(() => {
    const checkIsMobile = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      const isSmall = window.innerWidth <= 768;
      setIsMobile(isTouch || isSmall);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Safe removal of a card node and its GSAP timeline
  const removeCardElement = useCallback((cardObj) => {
    if (!cardObj) return;
    if (cardObj.timeline) {
      cardObj.timeline.kill();
    }
    if (cardObj.element && cardObj.element.parentNode) {
      cardObj.element.parentNode.removeChild(cardObj.element);
    }
    activeCardsRef.current = activeCardsRef.current.filter((c) => c !== cardObj);
  }, []);

  // Function to spawn a dynamic DOM image card near cursor
  const spawnImageCard = useCallback(
    (clientX, clientY, velocity = 1) => {
      const container = containerRef.current;
      const cardsLayer = cardsLayerRef.current;
      if (!container || !cardsLayer || images.length === 0) return;

      const rect = container.getBoundingClientRect();
      const cursorX = clientX - rect.left;
      const cursorY = clientY - rect.top;

      // Select next portfolio image in cycle with organic randomness
      const imgData = images[imageIndexRef.current % images.length];
      imageIndexRef.current = (imageIndexRef.current + 1 + Math.floor(Math.random() * 2)) % images.length;

      // Size calculation with random aspect ratio awareness
      const baseWidth = window.innerWidth < 1024 ? 130 + Math.random() * 50 : 160 + Math.random() * 70;
      let ratio = 1.33; // default 4/3
      if (imgData.aspectRatio === '16/9') ratio = 16 / 9;
      else if (imgData.aspectRatio === '16/10') ratio = 16 / 10;
      else if (imgData.aspectRatio === '3/2') ratio = 3 / 2;
      else if (imgData.aspectRatio === '4/3') ratio = 4 / 3;

      const cardWidth = Math.round(baseWidth);
      const cardHeight = Math.round(baseWidth / ratio);

      // Organic randomized offset from cursor origin, modulated by velocity
      const velocityClamped = Math.min(Math.max(velocity, 0.6), 2.2);
      const spreadX = 90 * velocityClamped;
      const spreadY = 75 * velocityClamped;
      const offsetX = (Math.random() * 2 - 1) * spreadX;
      const offsetY = (Math.random() * 2 - 1) * spreadY;

      let targetCenterX = cursorX + offsetX;
      let targetCenterY = cursorY + offsetY;

      // Strict boundary clamping within container
      const padding = 16;
      const minX = cardWidth / 2 + padding;
      const maxX = rect.width - cardWidth / 2 - padding;
      const minY = cardHeight / 2 + padding;
      const maxY = rect.height - cardHeight / 2 - padding;

      targetCenterX = Math.max(minX, Math.min(targetCenterX, maxX));
      targetCenterY = Math.max(minY, Math.min(targetCenterY, maxY));

      const posX = targetCenterX - cardWidth / 2;
      const posY = targetCenterY - cardHeight / 2;

      // Incrementing z-index for stacked depth
      zIndexCounterRef.current += 1;
      const currentZ = zIndexCounterRef.current;

      // Create DOM Card element
      const card = document.createElement('div');
      card.className = 'cit-card';
      card.style.width = `${cardWidth}px`;
      card.style.height = `${cardHeight}px`;
      card.style.zIndex = currentZ;
      card.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;

      card.innerHTML = `
        <div class="cit-card__inner">
          <img 
            src="${imgData.image}" 
            alt="${imgData.title}" 
            class="cit-card__img" 
            loading="eager"
            onerror="this.onerror=null; this.src='${imgData.fallbackImage || ''}';"
          />
          <div class="cit-card__glass-reflection" aria-hidden="true"></div>
          <div class="cit-card__meta">
            <span class="cit-card__title">${imgData.title}</span>
            <span class="cit-card__category">${imgData.category || ''}</span>
          </div>
        </div>
      `;

      cardsLayer.appendChild(card);

      // FIFO Active Card Limit
      if (activeCardsRef.current.length >= maxImages) {
        const oldest = activeCardsRef.current.shift();
        if (oldest) {
          gsap.killTweensOf(oldest.element);
          gsap.to(oldest.element, {
            opacity: 0,
            scale: 0.75,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => {
              if (oldest.element && oldest.element.parentNode) {
                oldest.element.parentNode.removeChild(oldest.element);
              }
            },
          });
        }
      }

      // GSAP Animation parameters
      const maxRot = 8 * Math.min(velocityClamped, 1.4);
      const randomRot = (Math.random() * 2 - 1) * maxRot;
      const randomScale = 0.92 + Math.random() * 0.18;
      const driftX = (Math.random() * 2 - 1) * 16;
      const driftY = (Math.random() * 2 - 1) * 14;
      const driftRot = (Math.random() * 2 - 1) * 2;
      const holdTime = 0.85 + Math.random() * 0.55;

      const cardObj = {
        element: card,
        timeline: null,
      };

      // Create smooth GSAP timeline for the card lifecycle
      const tl = gsap.timeline({
        onComplete: () => {
          removeCardElement(cardObj);
        },
      });

      // 1. Entrance: Scale & Opacity in from cursor with slight randomized rotation
      tl.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.55,
          rotate: randomRot * 0.6,
        },
        {
          opacity: 1,
          scale: randomScale,
          rotate: randomRot,
          duration: 0.32,
          ease: 'power3.out',
        }
      );

      // 2. Subtle organic floating drift while visible
      tl.to(
        card,
        {
          x: `+=${driftX}`,
          y: `+=${driftY}`,
          rotate: `+=${driftRot}`,
          duration: holdTime,
          ease: 'sine.inOut',
        },
        '+=0.05'
      );

      // 3. Graceful Exit: Fade and scale down smoothly
      tl.to(
        card,
        {
          opacity: 0,
          scale: randomScale * 0.82,
          y: `+=${driftY * 0.5}`,
          duration: 0.42,
          ease: 'power2.in',
        },
        `-=${0.15}`
      );

      cardObj.timeline = tl;
      activeCardsRef.current.push(cardObj);
    },
    [images, maxImages, removeCardElement]
  );

  // Mouse / Pointer movement tracking listener
  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    const handlePointerEnter = (e) => {
      isPointerInsideRef.current = true;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      lastTimeRef.current = performance.now();
    };

    const handlePointerLeave = () => {
      isPointerInsideRef.current = false;
    };

    const handlePointerMove = (e) => {
      const now = performance.now();
      if (!isPointerInsideRef.current || !lastTimeRef.current) {
        isPointerInsideRef.current = true;
        lastMousePosRef.current = { x: e.clientX, y: e.clientY };
        lastTimeRef.current = now;
        spawnImageCard(e.clientX, e.clientY, 1.0);
        return;
      }

      const prevX = lastMousePosRef.current.x;
      const prevY = lastMousePosRef.current.y;
      const prevTime = lastTimeRef.current;

      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      const distance = Math.hypot(dx, dy);
      const dt = Math.max(now - prevTime, 1);

      // Only spawn if both distance threshold AND time throttle are met
      if (distance >= distanceThreshold && dt >= timeThrottle) {
        const velocity = (distance / dt) * 1.5; // normalized velocity
        spawnImageCard(e.clientX, e.clientY, velocity);

        lastMousePosRef.current = { x: e.clientX, y: e.clientY };
        lastTimeRef.current = now;
      }
    };

    container.addEventListener('pointerenter', handlePointerEnter);
    container.addEventListener('pointerleave', handlePointerLeave);
    container.addEventListener('pointermove', handlePointerMove);

    return () => {
      container.removeEventListener('pointerenter', handlePointerEnter);
      container.removeEventListener('pointerleave', handlePointerLeave);
      container.removeEventListener('pointermove', handlePointerMove);

      // Clean up all active cards and GSAP tweens
      activeCardsRef.current.forEach((c) => {
        if (c.timeline) c.timeline.kill();
        if (c.element && c.element.parentNode) {
          c.element.parentNode.removeChild(c.element);
        }
      });
      activeCardsRef.current = [];
    };
  }, [distanceThreshold, timeThrottle, isMobile, spawnImageCard]);

  // Mobile Ambient Floating Animation
  useEffect(() => {
    if (!isMobile) return;

    const cards = containerRef.current?.querySelectorAll('.cit-mobile-card');
    if (!cards || cards.length === 0) return;

    const tweens = [];
    cards.forEach((card, i) => {
      const delay = i * 0.35;
      const tween = gsap.to(card, {
        y: i % 2 === 0 ? '-=14' : '+=14',
        x: i % 3 === 0 ? '+=8' : '-=8',
        rotation: (i % 2 === 0 ? 1 : -1) * (3 + (i % 3)),
        duration: 3 + (i % 3) * 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay,
      });
      tweens.push(tween);
    });

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, [isMobile]);

  // Handle click on canvas to spawn on click as well
  const handleCanvasClick = (e) => {
    if (isMobile) return;
    spawnImageCard(e.clientX, e.clientY, 1.5);
  };

  return (
    <section
      ref={containerRef}
      className={`cit-section ${className}`}
      onClick={handleCanvasClick}
      aria-label="Interactive Portfolio Image Gallery"
    >
      {/* Background Ambience Grid & Glow */}
      <div className="cit-bg-glow" aria-hidden="true" />
      <div className="cit-grid-overlay" aria-hidden="true" />

      {/* Spawning Image Cards DOM Container */}
      <div ref={cardsLayerRef} className="cit-cards-layer" aria-hidden="true" />

      {/* Mobile Ambient Floating Showcase Fallback */}
      {isMobile && (
        <div className="cit-mobile-showcase" aria-hidden="true">
          {images.slice(0, 6).map((item, idx) => (
            <div
              key={item.id}
              className={`cit-mobile-card cit-mobile-card--${idx + 1}`}
              style={{
                borderRadius: '12px',
                aspectRatio: item.aspectRatio || '16/10',
              }}
            >
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="cit-mobile-card__badge">{item.title}</div>
            </div>
          ))}
        </div>
      )}

      {/* Editorial Central Typography Content */}
      <div className="cit-content">
        <div className="cit-badge">
          <span className="cit-badge__dot" />
          <span className="cit-badge__text">{badge}</span>
        </div>

        <h2 className="cit-heading">
          {heading.map((line, idx) => (
            <span key={idx} className="cit-heading__line">
              {line}
            </span>
          ))}
        </h2>

        <p className="cit-subheading">{subheading}</p>

        {/* Interactive Indicator Pill */}
        <div className="cit-hint-pill">
          <svg
            className="cit-hint-pill__icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polygon points="12 8 8 12 12 16 12 8" />
            <line x1="16" y1="12" x2="12" y2="12" />
          </svg>
          <span>{isMobile ? 'Tap or swipe to explore projects' : 'Move cursor across section to reveal collage'}</span>
        </div>
      </div>

      {/* Corner Editorial Accents */}
      <div className="cit-corner cit-corner--tl" aria-hidden="true">
        <span>01 / REEL</span>
      </div>
      <div className="cit-corner cit-corner--tr" aria-hidden="true">
        <span>CNC &copy; 2026</span>
      </div>
      <div className="cit-corner cit-corner--bl" aria-hidden="true">
        <span>ALL RIGHTS RESERVED</span>
      </div>
      <div className="cit-corner cit-corner--br" aria-hidden="true">
        <span>EST. 2014 &bull; AWARDS & WORKS</span>
      </div>
    </section>
  );
}
