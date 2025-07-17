'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion'; // Import Variants type

// Falling Stars Background Component
const StarsBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-gradient-to-br from-blue-900 via-gray-900 to-black">
      {[...Array(100)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-white text-lg opacity-0" // Increased text size for star visibility
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            pointerEvents: 'none', // Ensures stars don't interfere with mouse events
          }}
          animate={{
            y: ["0%", "100vh"],
            opacity: [0, 1, 0],
            rotate: [0, 360], // Add rotation for a subtle twinkling/falling effect
          }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: Math.random() * 7 + 4, // Slightly longer duration for a gentler fall
            delay: Math.random() * 3, // Increased delay range for more varied appearance
          }}
        >
          &#9733; {/* Unicode star character */}
        </motion.span>
      ))}
    </div>
  );
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message
  const router = useRouter();

  const handleLogin = async () => {
    setErrorMessage(null); // Clear previous errors
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push('/dashboard');
      } else {
        const errorData = await res.json();
        setErrorMessage(errorData.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An unexpected error occurred during login.');
    }
  };

  // Define variants with explicit typing
  const containerVariants: Variants = {
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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <StarsBackground />

      <motion.div
        className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 className="text-4xl font-extrabold text-white text-center mb-8" variants={itemVariants}>
          Sign In ✨
        </motion.h2>

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-400 text-red-200 px-4 py-3 rounded-lg mb-6 text-center"
          >
            {errorMessage}
          </motion.div>
        )}

        <motion.input
          className="w-full bg-white/10 border border-white/20 rounded-lg px-5 py-3 mb-5 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-300"
          type="email"
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
          variants={itemVariants}
          whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
          value={email} // Controlled component
        />

        <motion.input
          className="w-full bg-white/10 border border-white/20 rounded-lg px-5 py-3 mb-8 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-300"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          variants={itemVariants}
          whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
          value={password} // Controlled component
        />

        <motion.button
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-300 text-lg tracking-wide"
          onClick={handleLogin}
          variants={itemVariants}
          whileHover={{ scale: 1.03, boxShadow: "0px 6px 15px rgba(124, 58, 237, 0.4)" }}
          whileTap={{ scale: 0.97 }}
        >
          Log In
        </motion.button>

        <motion.div
          className="text-lg text-white/80 text-center mt-6 cursor-pointer"
          variants={itemVariants}
          onClick={() => router.push('/signup')}
          whileHover={{ scale: 1.05, color: '#60A5FA' }}
          whileTap={{ scale: 0.95 }}
        >
          Do not have an account? <span className="font-semibold text-blue-400 hover:underline">Sign Up</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
