import React, { useRef } from 'react';
import { motion, useInView, animate } from 'motion/react';

function AnimatedCounter({ value, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  React.useEffect(() => {
    if (inView) {
      animate(0, value, {
        duration: 1.5,
        ease: 'easeOut',
        onUpdate(val) {
          if (ref.current) {
            ref.current.textContent = prefix + val.toFixed(decimals) + suffix;
          }
        },
      });
    }
  }, [inView, value, prefix, suffix, decimals]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

function Typewriter({ text, delay = 0, speed = 0.015, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10px' });

  const chars = text.split('');

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speed,
        delayChildren: delay,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {chars.map((char, i) => (
        <motion.span key={i} variants={charVariants}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function StatsSection() {
  const maskStyle = {
    WebkitMaskImage: `url("data:image/svg+xml,%3Csvg%20width%3D%22592%22%20height%3D%22681%22%20viewBox%3D%220%200%20592%20681%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M590.938%20587.625L520.375%20448.688C519.375%20446.688%20517.5%20445.25%20515.313%20444.75C513.125%20444.25%20510.875%20444.812%20509.125%20446.187C469.625%20477.5%20401.75%20501.125%20351.188%20501.125C253.5%20501.125%20185.25%20435%20185.25%20340.313C185.25%20245.625%20253.5%20179.5%20351.188%20179.5C404.063%20179.5%20458.313%20196.5%20492.688%20223.938C494.375%20225.313%20496.688%20225.812%20498.813%20225.437C500.938%20225%20502.813%20223.625%20503.875%20221.688L582.125%2079.125C583.875%2075.9375%20583.063%2071.9375%20580.188%2069.6875C521%2022.8125%20445.875%200%20350.5%200C147.375%200%200%20143.187%200%20340.375C0%20537.625%20147.375%20680.75%20350.5%20680.75C443.438%20680.75%20523.75%20652.5%20589.125%20596.688C591.75%20594.438%20592.5%20590.688%20590.938%20587.625Z%22%20fill%3D%22black%22%2F%3E%3C%2Fsvg%3E")`,
    WebkitMaskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskImage: `url("data:image/svg+xml,%3Csvg%20width%3D%22592%22%20height%3D%22681%22%20viewBox%3D%220%200%20592%20681%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M590.938%20587.625L520.375%20448.688C519.375%20446.688%20517.5%20445.25%20515.313%20444.75C513.125%20444.25%20510.875%20444.812%20509.125%20446.187C469.625%20477.5%20401.75%20501.125%20351.188%20501.125C253.5%20501.125%20185.25%20435%20185.25%20340.313C185.25%20245.625%20253.5%20179.5%20351.188%20179.5C404.063%20179.5%20458.313%20196.5%20492.688%20223.938C494.375%20225.313%20496.688%20225.812%20498.813%20225.437C500.938%20225%20502.813%20223.625%20503.875%20221.688L582.125%2079.125C583.875%2075.9375%20583.063%2071.9375%20580.188%2069.6875C521%2022.8125%20445.875%200%20350.5%200C147.375%200%200%20143.187%200%20340.375C0%20537.625%20147.375%20680.75%20350.5%20680.75C443.438%20680.75%20523.75%20652.5%20589.125%20596.688C591.75%20594.438%20592.5%20590.688%20590.938%20587.625Z%22%20fill%3D%22black%22%2F%3E%3C%2Fsvg%3E")`,
    maskSize: 'contain',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const statsGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <section id="stats" className="bg-black text-white py-8 md:py-24 px-6 md:px-12 lg:px-[120px] w-full border-t border-white/10 overflow-hidden font-sans">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-[160px] items-stretch">
        
        {/* Left Column */}
        <motion.div
          className="flex-1 flex flex-col justify-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {/* Heading */}
          <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] font-medium tracking-tight mb-6 leading-[1.1] w-[590px] max-w-full">
            <Typewriter text="Building Digital Products" delay={0} speed={0.012} />
            <br />
            <Typewriter text="that " delay={0.25} speed={0.012} />
            <span className="font-dm-serif italic font-normal">
              <Typewriter text="Drive Your Success" delay={0.35} speed={0.012} />
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-white/40 leading-relaxed font-light max-w-lg whitespace-normal mb-16">
            <Typewriter
              text="For over a decade, global enterprises and startups have relied on our modern development practices and skilled team to build their digital products and scale efficiently."
              delay={0.1}
              speed={0.012}
            />
          </p>

          {/* Stats Grid */}
          <motion.div className="grid grid-cols-2 md:grid-cols-[max-content_max-content] gap-8 md:gap-x-16 lg:gap-x-24" variants={statsGridVariants}>
            
            <motion.div className="flex flex-col" variants={statItemVariants}>
              <span className="text-4xl md:text-5xl lg:text-[56px] font-dm-serif tracking-tight mb-3">
                <AnimatedCounter value={3500} suffix="+" />
              </span>
              <span className="text-[10px] md:text-xs font-semibold text-white/40 uppercase tracking-wider">
                Projects Delivered
              </span>
            </motion.div>

            <motion.div className="flex flex-col" variants={statItemVariants}>
              <span className="text-4xl md:text-5xl lg:text-[56px] font-dm-serif tracking-tight mb-3">
                <AnimatedCounter value={99} suffix="%" />
              </span>
              <span className="text-[10px] md:text-xs font-semibold text-white/40 uppercase tracking-wider">
                Client Satisfaction
              </span>
            </motion.div>

            <motion.div className="flex flex-col" variants={statItemVariants}>
              <span className="text-4xl md:text-5xl lg:text-[56px] font-dm-serif tracking-tight mb-3">
                <AnimatedCounter value={50} suffix="+" />
              </span>
              <span className="text-[10px] md:text-xs font-semibold text-white/40 uppercase tracking-wider">
                Skilled Professionals
              </span>
            </motion.div>

            <motion.div className="flex flex-col" variants={statItemVariants}>
              <span className="text-4xl md:text-5xl lg:text-[56px] font-dm-serif tracking-tight mb-3">
                <AnimatedCounter value={25} suffix="+" />
              </span>
              <span className="text-[10px] md:text-xs font-semibold text-white/40 uppercase tracking-wider">
                Countries Served
              </span>
            </motion.div>

            <motion.div className="flex flex-col" variants={statItemVariants}>
              <span className="text-4xl md:text-5xl lg:text-[56px] font-dm-serif tracking-tight mb-3">
                <AnimatedCounter value={10} suffix="+" />
              </span>
              <span className="text-[10px] md:text-xs font-semibold text-white/40 uppercase tracking-wider">
                Years of Experience
              </span>
            </motion.div>

          </motion.div>
        </motion.div>

        {/* Right Column: Logo-Masked Video */}
        <div className="flex justify-center lg:justify-end items-center shrink-0 lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1.0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0, ease: 'easeOut' }}
            className="w-full max-w-[500px] lg:max-w-none lg:w-[120%] aspect-square origin-center"
            style={maskStyle}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              src="https://bunny-wp-pullzone-lsnby8erzc.b-cdn.net/media/2025/02/About-codeandcore.mp4"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
