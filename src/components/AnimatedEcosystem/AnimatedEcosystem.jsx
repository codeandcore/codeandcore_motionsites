import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { LayoutDashboard, Layers, Box, Fingerprint, Network, Puzzle, Compass, Target, Sparkles } from 'lucide-react';
import './AnimatedEcosystem.css';

// Define the positions, sizes, colors, and depth multiplier for each floating card
const ICONS_CONFIG = [
  { icon: LayoutDashboard, top: '15%', left: '10%', size: 68, color: '#3b82f6', depth: 0.8 }, // top-left
  { icon: Layers, top: '22%', left: '80%', size: 84, color: '#ec4899', depth: 1.2 }, // top-right
  { icon: Box, top: '65%', left: '14%', size: 96, color: '#8b5cf6', depth: 1.5 }, // bottom-left
  { icon: Puzzle, top: '72%', left: '76%', size: 76, color: '#10b981', depth: 0.9 }, // bottom-right
  { icon: Network, top: '12%', left: '60%', size: 58, color: '#f59e0b', depth: 0.5 }, // top-mid-right
  { icon: Compass, top: '80%', left: '42%', size: 62, color: '#6366f1', depth: 0.7 }, // bottom-mid-left
  { icon: Fingerprint, top: '42%', left: '6%', size: 52, color: '#14b8a6', depth: 1.1 }, // mid-left edge
  { icon: Target, top: '48%', left: '88%', size: 56, color: '#ef4444', depth: 0.8 }, // mid-right edge
  { icon: Sparkles, top: '18%', left: '32%', size: 44, color: '#f43f5e', depth: 0.4 }, // top-mid-left
];

function FloatingCard({ item, index, smoothMouseX, smoothMouseY }) {
  // Move the entire white shadow box + icon together via parallax
  const x = useTransform(smoothMouseX, val => val * -90 * item.depth);
  const y = useTransform(smoothMouseY, val => val * -90 * item.depth);
  const IconComponent = item.icon;

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
      initial={{ scale: 0.7, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ scale: 1.08 }}
    >
      <IconComponent 
        size={Math.round(item.size * 0.45)} 
        color={item.color} 
        strokeWidth={2.2}
      />
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
      const normalizedX = (clientX / innerWidth) - 0.5;
      const normalizedY = (clientY / innerHeight) - 0.5;

      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="ecosystem-hero">
      {/* Floating Icons Layer */}
      <div className="ecosystem-hero__icons">
        {ICONS_CONFIG.map((item, index) => (
          <FloatingCard
            key={index}
            item={item}
            index={index}
            smoothMouseX={smoothMouseX}
            smoothMouseY={smoothMouseY}
          />
        ))}
      </div>

      {/* Central Content */}
      <div className="ecosystem-hero__content">
        <motion.h1 
          className="ecosystem-hero__title"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          An ecosystem of tools built for speed
        </motion.h1>
        
        <motion.p 
          className="ecosystem-hero__subtitle"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          Every piece of the stack is designed to work together seamlessly. 
          Connect your apps, orchestrate workflows, and scale infinitely without the friction.
        </motion.p>
        
        <motion.div 
          className="ecosystem-hero__actions"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <a href="#explore" className="ecosystem-hero__btn">
            Explore the ecosystem
          </a>
        </motion.div>
      </div>
    </section>
  );
}
