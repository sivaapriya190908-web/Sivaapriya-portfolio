import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import BloomFlower from '../BloomFlower';
import PetalCanvas from '../PetalCanvas';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bloom-dark-burgundy/40 via-bloom-bg to-bloom-bg" />

      {/* Radial glow */}
      <div
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 17, 41, 0.12) 0%, transparent 70%)',
        }}
      />

      {/* Flower - positioned behind text on desktop, above on mobile */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate(-50%, -50%) scale(${1 - scrollY * 0.0003})`,
          opacity: Math.max(0, 1 - scrollY * 0.0015),
        }}
      >
        <BloomFlower size={600} bloomAmount={1} glowIntensity={0.8} className="opacity-30 md:opacity-25" />
      </div>

      {/* Petals - very few in hero */}
      <PetalCanvas section="hero" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div
          className="mb-4 text-xs font-light tracking-[0.4em] text-bloom-muted-text"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 1.5s ease 0.3s',
          }}
        >
          CODE IN BLOOM
        </div>

        <h1
          className="font-display text-6xl font-light leading-none tracking-tight silk-texture sm:text-7xl md:text-8xl lg:text-9xl"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.5s',
          }}
        >
          SIVAAPRIYA
        </h1>

        <div
          className="mt-6 text-sm font-light tracking-[0.25em] text-bloom-muted-text md:text-base"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 1.2s ease 0.9s',
          }}
        >
          B.Tech CSE &nbsp;•&nbsp; SRM IST Ramapuram
        </div>

        <p
          className="mt-8 font-display text-xl italic text-bloom-primary-text md:text-2xl"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s ease 1.2s',
          }}
        >
          "Still learning. Still building. Still becoming."
        </p>

        <p
          className="mx-auto mt-4 max-w-md text-sm font-light text-bloom-muted-text md:text-base"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 1s ease 1.5s',
          }}
        >
          Exploring technology, creativity and the possibilities of AI.
        </p>

        <button
          onClick={scrollToAbout}
          className="bloom-btn group mt-12 inline-flex items-center gap-3 rounded-full border border-bloom-crimson/30 px-8 py-3.5 text-xs font-medium tracking-[0.2em] text-bloom-primary-text"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s ease 1.8s',
          }}
        >
          EXPLORE MY JOURNEY
          <ArrowDown size={14} className="transition-transform duration-300 group-hover:translate-y-1" />
        </button>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity: mounted && scrollY < 100 ? 0.4 : 0, transition: 'opacity 0.5s ease' }}
      >
        <div className="h-12 w-px bg-gradient-to-b from-bloom-crimson to-transparent" />
      </div>
    </section>
  );
}
