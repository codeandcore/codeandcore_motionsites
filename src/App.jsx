import LiquidEther from './components/LiquidEther/LiquidEther';
import ScrollExpand from './components/ScrollExpand/ScrollExpand';
import AnimatedEcosystem from './components/AnimatedEcosystem/AnimatedEcosystem';
import CursorImageTrail from './components/CursorImageTrail/CursorImageTrail';
import CyberpunkHero from './components/CyberpunkHero/CyberpunkHero';
import StatsSection from './components/StatsSection/StatsSection';

import motionBg from './assets/motion_bg.mp4';

import './App.css';

export default function App() {
  return (
    <>
      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="hero">
        {/* Full-viewport LiquidEther background */}
        <div className="hero__canvas" aria-hidden="true">
          <LiquidEther
            colors={['#5227FF', '#FF9FFC', '#B497CF']}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>

        {/* Overlay content */}
        <div className="hero__content">
          <span className="hero__eyebrow">Web Design &amp; Digital Engineering</span>
          <h1 className="hero__title">
            Code&nbsp;<em>and&nbsp;</em>Core
          </h1>
          <p className="hero__sub">
            We transform your ideas into top-performing digital products that your customers truly value.
          </p>
          <div className="hero__actions">
            <a href="#technologies" id="cta-primary" className="btn btn--primary">Explore work</a>
            <a href="https://codeandcore.com/contact-us/" target="_blank" rel="noopener noreferrer" id="cta-secondary" className="btn btn--ghost">Let's talk</a>
          </div>
        </div>

        {/* Subtle bottom vignette */}
        <div className="hero__vignette" aria-hidden="true" />
      </section>

      {/* ── ScrollExpand Section ─────────────────────────────── */}
      <section className="scroll-expand-section">
        <div className="scroll-expand-section__wrap">
          <ScrollExpand
            src={motionBg}
            mediaType="video"
            scrollHint="Scroll"
            useWindowScroll
            mediaZoom={1.35}
            scrollDistance={1.2}
            holdDistance={0.35}
            overlayScrim={0.45}
          >
            <h2 className="text-4xl md:text-5xl lg:text-[76px] font-bold text-white tracking-tighter drop-shadow-2xl text-center px-4">
              Turn Your Ideas Into Industry-Leading Technologies
            </h2>
          </ScrollExpand>
        </div>
      </section>

      {/* ── Cursor-Driven Image Trail Portfolio Section ────────────── */}
      <CursorImageTrail />

      {/* ── Animated Ecosystem Hero ─────────────────────────── */}
      <AnimatedEcosystem />

      {/* ── Cyberpunk Augmented Self Hero Section ──────────── */}
      <CyberpunkHero />

      {/* ── Stats Section ───────────────────────────────────── */}
      <StatsSection />
    </>
  );
}

