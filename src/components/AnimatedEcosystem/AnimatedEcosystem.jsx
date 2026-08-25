import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './AnimatedEcosystem.css';

// Rich Code and Core Tech Stack with dedicated vector SVG marks and brand colors
const TECH_STACK_CONFIG = [
  {
    name: 'React.js',
    category: 'Frontend',
    top: '14%',
    left: '10%',
    size: 78,
    color: '#00D8FF',
    depth: 0.85,
    svg: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" width="100%" height="100%">
        <circle cx="0" cy="0" r="2.05" fill="#00D8FF" />
        <g stroke="#00D8FF" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Next.js',
    category: 'Full-Stack',
    top: '18%',
    left: '82%',
    size: 86,
    color: '#000000',
    depth: 1.25,
    svg: (
      <svg viewBox="0 0 180 180" width="100%" height="100%" fill="none">
        <mask id="next-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180" style={{ maskType: 'alpha' }}>
          <circle cx="90" cy="90" r="90" fill="black" />
        </mask>
        <g mask="url(#next-mask)">
          <circle cx="90" cy="90" r="90" fill="#000000" />
          <path d="M149.508 157.438L69.1478 54H54V125.979H66.9772V69.3874L139.112 162.296C142.753 160.852 146.229 159.223 149.508 157.438Z" fill="url(#paint0_linear)" />
          <rect x="115" y="54" width="12.98" height="71.98" fill="url(#paint1_linear)" />
        </g>
        <defs>
          <linearGradient id="paint0_linear" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="paint1_linear" x1="121.49" y1="54" x2="120.97" y2="104.97" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Node.js',
    category: 'Backend',
    top: '68%',
    left: '11%',
    size: 94,
    color: '#339933',
    depth: 1.45,
    svg: (
      <svg viewBox="0 0 32 32" width="100%" height="100%">
        <path d="M16 2.5l11.7 6.75v13.5L16 29.5 4.3 22.75V9.25L16 2.5z" fill="#339933" />
        <path d="M16 4.8L6.3 10.4v11.2L16 27.2l9.7-5.6V10.4L16 4.8z" fill="#43853D" />
        <path d="M16 11.2a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6z" fill="#ffffff" />
      </svg>
    ),
  },
  {
    name: 'Python',
    category: 'AI & Data',
    top: '74%',
    left: '78%',
    size: 82,
    color: '#3776AB',
    depth: 0.95,
    svg: (
      <svg viewBox="0 0 128 128" width="100%" height="100%">
        <path fill="#3776AB" d="M63.02 0c-15.7 0-29.43 3.65-29.43 17.58v13.14h29.43v4.44H20.08C5.69 35.16 0 44.15 0 63.8c0 19.34 7.6 28.52 20.08 28.52h11.96v-16.8c0-14.8 12.39-27.18 27.19-27.18h28.1V35.16c0-13.62-12.87-17.58-24.31-17.58zM47.7 8.78a5.2 5.2 0 1 1 0 10.4 5.2 5.2 0 0 1 0-10.4z"/>
        <path fill="#FFD43B" d="M64.98 128c15.7 0 29.43-3.65 29.43-17.58V97.28H64.98v-4.44h42.94c14.39 0 20.08-8.99 20.08-28.64 0-19.34-7.6-28.52-20.08-28.52h-11.96v16.8c0 14.8-12.39 27.18-27.19 27.18h-28.1v13.18c0 13.62 12.87 17.58 24.31 17.58zM80.3 119.22a5.2 5.2 0 1 1 0-10.4 5.2 5.2 0 0 1 0 10.4z"/>
      </svg>
    ),
  },
  {
    name: 'Figma',
    category: 'UI/UX Design',
    top: '11%',
    left: '60%',
    size: 64,
    color: '#F24E1E',
    depth: 0.6,
    svg: (
      <svg viewBox="0 0 38 57" width="100%" height="100%">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
        <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
      </svg>
    ),
  },
  {
    name: 'WordPress',
    category: 'CMS & Store',
    top: '80%',
    left: '42%',
    size: 66,
    color: '#21759B',
    depth: 0.75,
    svg: (
      <svg viewBox="0 0 96 96" width="100%" height="100%" fill="#21759B">
        <path d="M48 0C21.5 0 0 21.5 0 48s21.5 48 48 48 48-21.5 48-48S74.5 0 48 0zm0 91.4C24 91.4 4.6 72 4.6 48c0-6.3 1.3-12.2 3.7-17.6l20.6 56.5C14.8 80 4.6 65.2 4.6 48zm43.3-43.3c0 7.5-1.9 14.6-5.3 20.8L72.8 30.6c2.5-6.2 3.3-11.1 3.3-15.5 0-1.6-.1-3.1-.3-4.4 7.6 7.1 12.1 17.2 12.1 27.4z" />
      </svg>
    ),
  },
  {
    name: 'Laravel',
    category: 'PHP Framework',
    top: '42%',
    left: '5%',
    size: 58,
    color: '#FF2D20',
    depth: 1.1,
    svg: (
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path d="M88.5 28.2L53.7 8.1c-2.3-1.3-5.1-1.3-7.4 0L11.5 28.2c-2.3 1.3-3.7 3.8-3.7 6.5v40.6c0 2.7 1.4 5.2 3.7 6.5l34.8 20.1c1.2.7 2.4 1 3.7 1s2.5-.3 3.7-1l34.8-20.1c2.3-1.3 3.7-3.8 3.7-6.5V34.7c0-2.7-1.4-5.2-3.7-6.5z" fill="#FF2D20" />
        <path d="M50 48.5L23.8 33.4 50 18.2l26.2 15.2L50 48.5z" fill="#ffffff" opacity="0.9" />
      </svg>
    ),
  },
  {
    name: 'AI & LLMs',
    category: 'Agentic AI',
    top: '46%',
    left: '89%',
    size: 64,
    color: '#8B5CF6',
    depth: 0.85,
    svg: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="4" fill="#8B5CF6" fillOpacity="0.2" />
      </svg>
    ),
  },
  {
    name: 'Three.js / 3D',
    category: 'Creative Motion',
    top: '16%',
    left: '32%',
    size: 52,
    color: '#000000',
    depth: 0.45,
    svg: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="#111111" strokeWidth="1.8">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    name: 'AWS & Cloud',
    category: 'Cloud Solutions',
    top: '60%',
    left: '64%',
    size: 56,
    color: '#FF9900',
    depth: 0.65,
    svg: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
  },
];

function FloatingCard({ item, index, smoothMouseX, smoothMouseY }) {
  const [isHovered, setIsHovered] = useState(false);

  // Parallax translation based on mouse movement and card depth
  const x = useTransform(smoothMouseX, (val) => val * -95 * item.depth);
  const y = useTransform(smoothMouseY, (val) => val * -95 * item.depth);

  const iconInnerSize = Math.round(item.size * 0.48);

  return (
    <motion.div
      className="ecosystem-hero__icon-wrapper"
      style={{
        top: item.top,
        left: item.left,
        width: item.size,
        height: item.size,
        borderRadius: Math.round(item.size * 0.32),
        x,
        y,
      }}
      initial={{ scale: 0.6, opacity: 0, y: 30 }}
      whileInView={{ scale: 1, opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ scale: 1.15, zIndex: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="ecosystem-hero__icon-inner"
        style={{ width: iconInnerSize, height: iconInnerSize }}
      >
        {item.svg}
      </div>

      {/* Floating Tooltip Label on Hover */}
      {isHovered && (
        <motion.div
          className="ecosystem-hero__tooltip"
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="ecosystem-hero__tooltip-name">{item.name}</span>
          <span className="ecosystem-hero__tooltip-cat">{item.category}</span>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function AnimatedEcosystem() {
  // Track mouse coordinates normalized from -0.5 to 0.5 relative to screen center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth physics motion
  const smoothMouseX = useSpring(mouseX, { damping: 45, stiffness: 350 });
  const smoothMouseY = useSpring(mouseY, { damping: 45, stiffness: 350 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const normalizedX = clientX / innerWidth - 0.5;
      const normalizedY = clientY / innerHeight - 0.5;

      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="ecosystem-hero" id="technologies">
      {/* Floating Interactive Tech Icons Layer */}
      <div className="ecosystem-hero__icons">
        {TECH_STACK_CONFIG.map((item, index) => (
          <FloatingCard
            key={item.name}
            item={item}
            index={index}
            smoothMouseX={smoothMouseX}
            smoothMouseY={smoothMouseY}
          />
        ))}
      </div>

      {/* Central Content */}
      <div className="ecosystem-hero__content">
        <motion.div
          className="ecosystem-hero__badge"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="ecosystem-hero__badge-dot" />
          <span>FULL-STACK EXPERTISE</span>
        </motion.div>

        <motion.h2
          className="ecosystem-hero__title"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05, ease: 'easeOut' }}
        >
          Stack of Technologies
        </motion.h2>

        <motion.p
          className="ecosystem-hero__subtitle"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
        >
          We bring experience and expertise in scalable technologies to build custom solutions for your business. From beautiful UI/UX designs to robust back-end systems, we’ve got you covered.
        </motion.p>

        <motion.div
          className="ecosystem-hero__actions"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
        >
          <a
            href="https://codeandcore.com/technologies/"
            target="_blank"
            rel="noopener noreferrer"
            className="ecosystem-hero__btn"
          >
            Explore Technologies
          </a>
          <a
            href="https://codeandcore.com/contact-us/"
            target="_blank"
            rel="noopener noreferrer"
            className="ecosystem-hero__btn-secondary"
          >
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
