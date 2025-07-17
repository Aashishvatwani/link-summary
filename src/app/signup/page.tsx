'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'; // Import motion for animations

// Re-using the Falling Stars Background Component
const StarsBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-gradient-to-br from-blue-900 via-gray-900 to-black">
      {[...Array(100)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-white text-lg opacity-0"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            pointerEvents: 'none',
          }}
          animate={{
            y: ["0%", "100vh"],
            opacity: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: Math.random() * 7 + 4,
            delay: Math.random() * 3,
          }}
        >
          &#9733; {/* Unicode star character */}
        </motion.span>
      ))}
    </div>
  );
};

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify content type
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push('/login'); // Redirect to login after successful signup
    } else {
      alert('Signup failed. Please try again.'); // More informative alert
    }
  };

  // Framer Motion variants for animations
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 15,
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <StarsBackground /> {/* Render the animated background */}

      <motion.div
        className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 className="text-4xl font-extrabold text-white text-center mb-8" variants={itemVariants}>
          Join Us! 🎉
        </motion.h2>

        <motion.input
          className="w-full bg-white/10 border border-white/20 rounded-lg px-5 py-3 mb-5 text-white placeholder-gray-300 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition-all duration-300"
          type="email"
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
          variants={itemVariants}
          whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
        />

        <motion.input
          className="w-full bg-white/10 border border-white/20 rounded-lg px-5 py-3 mb-8 text-white placeholder-gray-300 focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none transition-all duration-300"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          variants={itemVariants}
          whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
        />

        <motion.button
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-300 text-lg tracking-wide"
          onClick={handleSignup}
          variants={itemVariants}
          whileHover={{ scale: 1.03, boxShadow: "0px 6px 15px rgba(59, 130, 246, 0.4)" }}
          whileTap={{ scale: 0.97 }}
        >
          Sign Up
        </motion.button>

        {/* Optional: Add a link to login if they already have an account */}
        <motion.p
          className="text-center text-white/70 mt-6"
          variants={itemVariants}
        >
          Already have an account?{' '}
          <a href="/login" className="text-blue-400 hover:underline">
            Sign Up
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}