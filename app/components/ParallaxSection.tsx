'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const textX = useTransform(scrollYProgress, [0, 0.3], [-100, 0]);

  // Different parallax speeds for layered effect
  const blob1Y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const blob3Y = useTransform(scrollYProgress, [0, 1], ['0%', '75%']);
  const cardY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        {/* Text Content */}
        <motion.div
          style={{ opacity: textOpacity, x: textX }}
          className="z-10"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Parallax Scrolling
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Create depth and dimension with smooth parallax effects that respond to
            user scroll behavior.
          </p>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-2xl mr-3">🚀</span>
              <span>Multi-layered depth effects</span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">🎭</span>
              <span>Engaging storytelling through motion</span>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">🌊</span>
              <span>Smooth, butter-like animations</span>
            </li>
          </ul>
        </motion.div>

        {/* Parallax Image Container */}
        <div className="relative h-[600px] lg:h-[700px] flex items-center justify-center">
          <div className="relative w-full h-full max-w-md mx-auto">
            {/* Layered circles for parallax effect */}
            <motion.div
              className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-50"
              style={{ y: blob1Y }}
            />
            <motion.div
              className="absolute top-1/3 right-0 w-48 h-48 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-3xl opacity-50"
              style={{ y: blob2Y }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-gradient-to-br from-pink-400 to-red-400 rounded-full blur-3xl opacity-50"
              style={{ y: blob3Y }}
            />

            {/* Center card - positioned relative to container center */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center will-change-transform"
              style={{ y: cardY }}
            >
              <div className="text-8xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Beautiful Design
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-400">
                Crafted with attention to every detail
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
