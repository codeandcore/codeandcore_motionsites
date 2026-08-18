import LiquidEther from './components/LiquidEther/LiquidEther';
import ScrollExpand from './components/ScrollExpand/ScrollExpand';
import AnimatedEcosystem from './components/AnimatedEcosystem/AnimatedEcosystem';
import CursorImageTrail from './components/CursorImageTrail/CursorImageTrail';

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
          <span className="hero__eyebrow">Web Development</span>
          <h1 className="hero__title">
            Code&nbsp;<em>and&nbsp;Core</em>
          </h1>
          <p className="hero__sub">
            Move your cursor — or just watch the flow.
          </p>
          <div className="hero__actions">
            <button id="cta-primary" className="btn btn--primary">Explore work</button>
            <button id="cta-secondary" className="btn btn--ghost">Learn more</button>
          </div>
        </div>

        {/* Subtle bottom vignette */}
        <div className="hero__vignette" aria-hidden="true" />
      </section>

      {/* ── ScrollExpand Section ─────────────────────────────── */}
      <section className="scroll-expand-section">
        <div className="scroll-expand-section__wrap">
          <ScrollExpand
            src="https://bunny-wp-pullzone-lsnby8erzc.b-cdn.net/media/2026/03/Happy-10th-Anniversary-Code-and-Core-1.mp4"
            mediaType="video"
            scrollHint="Scroll"
            useWindowScroll
            mediaZoom={1.35}
            scrollDistance={1.2}
            holdDistance={0.35}
            overlayScrim={0.45}
          >
            {/* <h2 className="scroll-expand-section__overlay-title">Every pixel, everywhere</h2>
            <p className="scroll-expand-section__overlay-sub">
              The frame opens up as you scroll and hands the whole stage to your media.
            </p> */}
          </ScrollExpand>
        </div>
      </section>

      {/* ── Cursor-Driven Image Trail Portfolio Section ────────────── */}
      <CursorImageTrail />

      {/* ── Animated Ecosystem Hero ─────────────────────────── */}
      <AnimatedEcosystem />
    </>
  );
}
