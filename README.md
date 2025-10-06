# Scroll Web - Next.js 14 Landing Page

A modern landing page built with Next.js 14 (App Router), featuring smooth scroll animations powered by Framer Motion and GSAP ScrollTrigger.

## Features

- ⚡ **Next.js 14** with App Router
- 🎨 **Tailwind CSS** for styling
- ✨ **Framer Motion** for smooth animations
- 🎯 **GSAP ScrollTrigger** for scroll-based animations
- 📱 Fully responsive design
- 🌙 Dark mode support
- 🎭 Pinned Hero section
- 📊 Animated feature grid
- 🌊 Parallax scrolling effects

## Getting Started

### Install dependencies:

```bash
npm install
```

### Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
scrollweb/
├── app/
│   ├── components/
│   │   ├── Hero.tsx           # Pinned hero section with GSAP
│   │   ├── FeatureGrid.tsx    # Animated feature cards
│   │   └── ParallaxSection.tsx # Parallax scrolling section
│   ├── globals.css            # Global styles and Tailwind imports
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── public/                    # Static assets
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **GSAP** - Professional-grade animation library
- **ScrollTrigger** - GSAP plugin for scroll-based animations

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

ISC
