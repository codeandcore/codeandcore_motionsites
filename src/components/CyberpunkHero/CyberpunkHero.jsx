import React, { useEffect, useRef, useState } from 'react';
import BG_IMAGE_1 from '../../assets/ve_bg1.png';
import BG_IMAGE_2 from '../../assets/ve_bg2.png';

// Math helper for arc calculations
const degToRad = (deg) => (deg * Math.PI) / 180;

const ARC_CENTER = { x: -110, y: 300 };

const ARC_CONFIGS = [
  {
    r: 330,
    startDeg: -92,
    endDeg: 16,
    dotDeg: -46,
    num: '10',
    suffix: '+',
    label: 'YEARS TRUSTED',
    lineDelay: 0.4,
  },
  {
    r: 395,
    startDeg: -56,
    endDeg: 60,
    dotDeg: 2,
    num: '20',
    suffix: '+',
    label: 'INDUSTRIES SERVED',
    lineDelay: 0.62,
  },
  {
    r: 460,
    startDeg: -14,
    endDeg: 72,
    dotDeg: 44,
    num: 'ISO',
    suffix: '',
    label: 'CERTIFIED AGENCY',
    lineDelay: 0.84,
  },
];

export default function CyberpunkHero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const revealLayerRef = useRef(null);
  const gridPatternRef = useRef(null);

  const realMouse = useRef({ x: -999, y: -999 });
  const smoothMouse = useRef({ x: -999, y: -999 });
  const gridOffset = useRef({ x: 0, y: 0 });
  const targetGridOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        realMouse.current = { x, y };

        const normX = x / rect.width;
        const normY = y / rect.height;
        targetGridOffset.current = {
          x: (normX - 0.5) * 16,
          y: (normY - 0.5) * 16,
        };
      } else {
        realMouse.current = { x: -999, y: -999 };
      }
    };

    const handlePointerLeave = () => {
      realMouse.current = { x: -999, y: -999 };
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    let animationFrameId;

    const updateCanvasAndParallax = () => {
      // 1. Mouse Lerp
      smoothMouse.current.x += (realMouse.current.x - smoothMouse.current.x) * 0.1;
      smoothMouse.current.y += (realMouse.current.y - smoothMouse.current.y) * 0.1;

      // 2. Grid Parallax Lerp
      gridOffset.current.x += (targetGridOffset.current.x - gridOffset.current.x) * 0.06;
      gridOffset.current.y += (targetGridOffset.current.y - gridOffset.current.y) * 0.06;

      if (gridPatternRef.current) {
        gridPatternRef.current.setAttribute('x', gridOffset.current.x.toFixed(2));
        gridPatternRef.current.setAttribute('y', gridOffset.current.y.toFixed(2));
      }

      // 3. Spotlight Mask Rendering
      const canvas = canvasRef.current;
      const revealLayer = revealLayerRef.current;

      if (canvas && revealLayer) {
        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || window.innerHeight;

        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, width, height);

          const { x, y } = smoothMouse.current;
          if (x > -300 && y > -300 && x < width + 300 && y < height + 300) {
            const rad = 260;
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, rad);
            gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
            gradient.addColorStop(0.4, 'rgba(0, 0, 0, 1)');
            gradient.addColorStop(0.6, 'rgba(0, 0, 0, 0.75)');
            gradient.addColorStop(0.75, 'rgba(0, 0, 0, 0.4)');
            gradient.addColorStop(0.88, 'rgba(0, 0, 0, 0.12)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, rad, 0, Math.PI * 2);
            ctx.fill();

            // Set dynamic mask
            const maskCss = `radial-gradient(circle 260px at ${x.toFixed(1)}px ${y.toFixed(1)}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.12) 88%, rgba(0,0,0,0) 100%)`;
            revealLayer.style.maskImage = maskCss;
            revealLayer.style.webkitMaskImage = maskCss;
            revealLayer.style.maskSize = '100% 100%';
            revealLayer.style.webkitMaskSize = '100% 100%';
          } else {
            revealLayer.style.maskImage = 'none';
            revealLayer.style.webkitMaskImage = 'none';
            revealLayer.style.opacity = '0';
          }
          if (x > -300) {
            revealLayer.style.opacity = '1';
          }
        }
      }

      animationFrameId = requestAnimationFrame(updateCanvasAndParallax);
    };

    animationFrameId = requestAnimationFrame(updateCanvasAndParallax);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-white tracking-[-0.02em] relative selection:bg-red-500 selection:text-white font-helvetica-neue"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {/* ── Hero Section (100dvh) ──────────────────────────── */}
      <section
        ref={containerRef}
        className="relative w-full h-[100dvh] overflow-hidden select-none bg-black"
      >
        {/* Hidden Canvas for gradient generation */}
        <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

        {/* 1. Grid Background (z-0) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-10"
          aria-hidden="true"
        >
          <defs>
            <pattern
              ref={gridPatternRef}
              id="cyber-grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="#64748b"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cyber-grid)" />
        </svg>

        {/* 2. Base Image (z-10) with Ken Burns intro */}
        <div
          className="absolute inset-0 bg-center bg-cover animate-ken-burns z-10 pointer-events-none"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
          aria-hidden="true"
        />

        {/* 3. Cursor Spotlight Reveal Layer (z-30) */}
        <div
          ref={revealLayerRef}
          className="absolute inset-0 bg-center bg-cover z-30 pointer-events-none transition-opacity duration-300"
          style={{
            backgroundImage: `url(${BG_IMAGE_2})`,
            opacity: 0,
          }}
          aria-hidden="true"
        />

        {/* 4. Stats on a fading circular arc (z-50, hidden below sm) */}
        <div
          className="absolute inset-y-0 right-0 pointer-events-none hidden sm:block z-50 overflow-visible"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 380 700"
            preserveAspectRatio="xMaxYMid meet"
            className="h-full w-auto overflow-visible"
          >
            <defs>
              {ARC_CONFIGS.map((arc, index) => {
                const x1 = ARC_CENTER.x + arc.r * Math.cos(degToRad(arc.startDeg));
                const y1 = ARC_CENTER.y + arc.r * Math.sin(degToRad(arc.startDeg));
                const x2 = ARC_CENTER.x + arc.r * Math.cos(degToRad(arc.endDeg));
                const y2 = ARC_CENTER.y + arc.r * Math.sin(degToRad(arc.endDeg));

                return (
                  <linearGradient
                    key={`arc-grad-${index}`}
                    id={`arc-grad-${index}`}
                    gradientUnits="userSpaceOnUse"
                    x1={x1.toFixed(2)}
                    y1={y1.toFixed(2)}
                    x2={x2.toFixed(2)}
                    y2={y2.toFixed(2)}
                  >
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                    <stop offset="22%" stopColor="#ffffff" stopOpacity="0.5" />
                    <stop offset="55%" stopColor="#ffffff" stopOpacity="0.5" />
                    <stop offset="85%" stopColor="#ffffff" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                );
              })}
            </defs>

            {ARC_CONFIGS.map((arc, index) => {
              const deltaDeg = arc.endDeg - arc.startDeg;
              const arcLen = arc.r * degToRad(deltaDeg);

              const x1 = ARC_CENTER.x + arc.r * Math.cos(degToRad(arc.startDeg));
              const y1 = ARC_CENTER.y + arc.r * Math.sin(degToRad(arc.startDeg));
              const x2 = ARC_CENTER.x + arc.r * Math.cos(degToRad(arc.endDeg));
              const y2 = ARC_CENTER.y + arc.r * Math.sin(degToRad(arc.endDeg));

              const dotX = ARC_CENTER.x + arc.r * Math.cos(degToRad(arc.dotDeg));
              const dotY = ARC_CENTER.y + arc.r * Math.sin(degToRad(arc.dotDeg));

              const dotDelay = arc.lineDelay + 0.9;
              const ringDelay = dotDelay + 0.3;
              const numDelay = dotDelay + 0.15;
              const labelDelay = dotDelay + 0.3;

              const pathD = `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${arc.r} ${arc.r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;

              return (
                <g key={arc.label}>
                  {/* Arc Line */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={`url(#arc-grad-${index})`}
                    strokeWidth="1.1"
                    className="arc-line"
                    style={{
                      strokeDasharray: arcLen,
                      '--len': `${arcLen}px`,
                      animationDelay: `${arc.lineDelay}s`,
                    }}
                  />

                  {/* Pulsing Outer Ring */}
                  <circle
                    cx={dotX}
                    cy={dotY}
                    r="7"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.1"
                    className="arc-ring"
                    style={{
                      animationDelay: `${ringDelay}s`,
                    }}
                  />

                  {/* Center Dot */}
                  <circle
                    cx={dotX}
                    cy={dotY}
                    r="3.4"
                    fill="#ffffff"
                    className="arc-dot"
                    style={{
                      animationDelay: `${dotDelay}s`,
                    }}
                  />

                  {/* Number Stat */}
                  <g
                    className="arc-text"
                    style={{ animationDelay: `${numDelay}s` }}
                  >
                    <text
                      x={dotX + 16}
                      y={dotY + 4}
                      fill="#ffffff"
                      fontSize="32"
                      fontWeight="700"
                      letterSpacing="-1px"
                      className="font-helvetica-neue select-none"
                    >
                      {arc.num}
                      <tspan dy="-10" fontSize="19" fontWeight="600">
                        {arc.suffix}
                      </tspan>
                    </text>
                  </g>

                  {/* Uppercase Label */}
                  <g
                    className="arc-text"
                    style={{ animationDelay: `${labelDelay}s` }}
                  >
                    <text
                      x={dotX + 18}
                      y={dotY + 22}
                      fill="#ffffff"
                      fillOpacity="0.8"
                      fontSize="8.5"
                      fontWeight="600"
                      letterSpacing="2px"
                      className="font-helvetica-neue select-none uppercase"
                    >
                      {arc.label}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* 5. Hero Text Block (z-50) */}
        <div className="absolute bottom-12 sm:bottom-16 md:bottom-24 left-5 sm:left-8 md:left-12 max-w-[320px] sm:max-w-md md:max-w-lg z-50 pointer-events-auto">
          {/* Eyebrow */}
          <div
            className="hero-rise text-[11px] sm:text-xs font-semibold tracking-[0.12em] text-white/90 uppercase mb-3 flex items-center gap-1.5"
            style={{ animationDelay: '0.15s' }}
          >
            Why <span className="italic font-normal">Choose Us?</span>
          </div>

          {/* H1 */}
          <h1
            className="hero-rise text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-0.08em] font-bold text-white mb-4"
            style={{ animationDelay: '0.3s' }}
          >
            A Trusted<br />
            Tech Partner<br />
            Since 2015
          </h1>

          {/* Paragraph */}
          <p
            className="hero-rise text-sm sm:text-base text-white/90 leading-relaxed mb-7 font-normal drop-shadow-md max-w-sm sm:max-w-md"
            style={{ animationDelay: '0.5s' }}
          >
            We consistently craft meaningful experiences for our clients and customers every time they interact with our brands.
          </p>

          {/* CTA Button */}
          <div className="hero-rise" style={{ animationDelay: '0.7s' }}>
            <button
              type="button"
              className="group relative overflow-hidden px-7 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-lg shadow-black/30 bg-white text-gray-900 font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-[1.04] active:scale-95 cursor-pointer inline-flex items-center justify-center"
            >
              <span className="relative z-10 font-bold tracking-tight">Let's talk</span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
