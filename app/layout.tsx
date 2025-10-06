import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Build Modern Websites with Claude Code | AI-Powered Development",
  description: "Learn how to create stunning Next.js landing pages with Tailwind, Framer Motion, and GSAP in minutes using Claude Code CLI. No complex setup, just results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
