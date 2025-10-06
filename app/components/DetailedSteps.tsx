'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const conversation = [
  {
    role: 'user',
    message: 'Create a Next.js 14 landing page with Tailwind, Framer Motion, and GSAP ScrollTrigger',
  },
  {
    role: 'claude',
    message: 'I\'ll create a modern Next.js 14 project with all those technologies. Setting up...',
  },
  {
    role: 'system',
    message: '✓ Installing Next.js 14\n✓ Configuring Tailwind CSS\n✓ Adding Framer Motion & GSAP\n✓ Creating components',
  },
  {
    role: 'user',
    message: 'Add a pinned hero section and parallax scrolling effects',
  },
  {
    role: 'claude',
    message: 'Adding a pinned hero with GSAP ScrollTrigger and creating parallax sections...',
  },
  {
    role: 'system',
    message: '✓ Hero component with scroll pin\n✓ Parallax section with animations\n✓ Responsive design applied',
  },
];

const techStack = [
  { name: 'Next.js 14', description: 'React framework with App Router', color: 'from-gray-700 to-gray-900' },
  { name: 'TypeScript', description: 'Type-safe development', color: 'from-blue-600 to-blue-800' },
  { name: 'Tailwind CSS', description: 'Utility-first styling', color: 'from-cyan-500 to-blue-600' },
  { name: 'Framer Motion', description: 'React animation library', color: 'from-pink-500 to-purple-600' },
  { name: 'GSAP', description: 'Professional animations', color: 'from-green-500 to-emerald-600' },
];

export default function DetailedSteps() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            See It In Action
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Watch how a simple conversation turns into a production-ready website
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Conversation Panel */}
          <motion.div
            style={{ opacity }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <span className="text-white font-medium ml-4">Claude Code Terminal</span>
            </div>
            <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
              {conversation.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: msg.role === 'user' ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white'
                        : msg.role === 'claude'
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-mono text-sm'
                    }`}
                  >
                    {msg.role === 'system' ? (
                      <pre className="whitespace-pre-wrap">{msg.message}</pre>
                    ) : (
                      <p>{msg.message}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack & What You Get */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Complete Tech Stack
              </h3>
              <div className="space-y-3">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tech.color} flex-shrink-0`}></div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{tech.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{tech.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-indigo-200 dark:border-indigo-800"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                What You Get
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span>Complete project structure with best practices</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span>All dependencies installed and configured</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span>Responsive components ready to customize</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span>Smooth animations and scroll effects</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span>Dark mode support out of the box</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                  <span>Production-ready code you can deploy now</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
