import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import QuickStart from './components/QuickStart';
import DetailedSteps from './components/DetailedSteps';
import ParallaxSection from './components/ParallaxSection';
import CTA from './components/CTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeatureGrid />
      <QuickStart />
      <DetailedSteps />
      <ParallaxSection />
      <CTA />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            This site was built with Claude Code CLI in under 10 minutes
          </p>
          <p className="text-gray-500 mt-4">
            Next.js 14 • Tailwind CSS • Framer Motion • GSAP ScrollTrigger
          </p>
          <p className="text-gray-600 mt-4 text-sm">
            &copy; 2024 Built with Claude Code. Ready to build your own?
          </p>
        </div>
      </footer>
    </main>
  );
}
