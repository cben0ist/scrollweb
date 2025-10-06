'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Install Claude Code',
    description: 'Get the CLI tool installed in seconds',
    command: 'npm install -g @anthropic-ai/claude-code',
  },
  {
    number: '02',
    title: 'Start a Conversation',
    description: 'Simply tell Claude what you want to build',
    command: 'claude "Create a Next.js landing page with animations"',
  },
  {
    number: '03',
    title: 'Launch Your Site',
    description: 'Run and see your site live instantly',
    command: 'npm run dev',
  },
];

export default function QuickStart() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            end: 'top center',
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id="quick-start"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 bg-gradient-to-b from-white to-indigo-50 dark:from-gray-800 dark:to-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
            Quick Start Guide
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Three Steps to Your
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Dream Website
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            No complex setup. No configuration hell. Just pure creation.
          </p>
        </motion.div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="relative"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">{step.number}</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {step.description}
                  </p>
                  <div className="bg-gray-900 dark:bg-black rounded-xl p-4 font-mono text-sm overflow-x-auto">
                    <code className="text-green-400">$ {step.command}</code>
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute left-10 top-full h-8 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-600 -translate-x-1/2" />
              )}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-indigo-200 dark:border-indigo-800">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">Pro Tip:</span> You're looking at a site built this way!
              <br />This entire landing page was created in under 10 minutes.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
