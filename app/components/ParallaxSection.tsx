'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current || !textRef.current) return;

    // Parallax effect for image
    gsap.to(imageRef.current, {
      y: '-30%',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Fade in text
    gsap.fromTo(
      textRef.current,
      {
        opacity: 0,
        x: -100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top bottom-=100',
          end: 'top center',
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div ref={textRef} className="z-10">
          <motion.h2
            style={{ opacity }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Parallax Scrolling
          </motion.h2>
          <motion.p
            style={{ opacity }}
            className="text-xl text-gray-600 dark:text-gray-400 mb-6"
          >
            Create depth and dimension with smooth parallax effects that respond to
            user scroll behavior.
          </motion.p>
          <motion.ul
            style={{ opacity }}
            className="space-y-4 text-gray-700 dark:text-gray-300"
          >
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
          </motion.ul>
        </div>

        {/* Parallax Image Container */}
        <div className="relative h-[600px] lg:h-[700px]">
          <motion.div
            ref={imageRef}
            style={{ y }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              {/* Layered circles for parallax effect */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-60"
                style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
              />
              <motion.div
                className="absolute top-1/2 right-1/4 w-48 h-48 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-2xl opacity-60"
                style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-50%']) }}
              />
              <motion.div
                className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-gradient-to-br from-pink-400 to-red-400 rounded-full blur-2xl opacity-60"
                style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '75%']) }}
              />

              {/* Center card */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-96 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center"
                style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-20%']) }}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
