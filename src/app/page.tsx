'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '700'] });

const StarsBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#0d1b2a]">
      {[...Array(100)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-white text-xs opacity-0"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            pointerEvents: 'none',
          }}
          animate={{
            y: ["0%", "100vh"],
            opacity: [0, 0.6, 0],
            rotate: [0, 360],
          }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: Math.random() * 7 + 4,
            delay: Math.random() * 3,
          }}
        >
          &#9733;
        </motion.span>
      ))}
    </div>
  );
};

export default function HomePage() {
  const containerVariants:Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants:Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={`${dmSans.className} relative flex min-h-screen items-center justify-center px-4 py-12 text-white`}>
      <StarsBackground />

      <motion.div
        className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-8 py-10 sm:px-12 sm:py-14 shadow-xl text-center max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight text-white"
          variants={itemVariants}
        >
          Link Saver<span className="text-cyan-400"> + Auto Summary</span>
        </motion.h1>

        <motion.p className="text-base md:text-lg text-white/70 mb-8 max-w-md mx-auto leading-relaxed" variants={itemVariants}>
          Save your favorite URLs and instantly get smart summaries. Organize, remember, and revisit your links effortlessly.
        </motion.p>

        <motion.div className="mt-6 flex gap-4 justify-center" variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/login"
              className="px-7 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Login
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/signup"
              className="px-7 py-3 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Sign Up
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
