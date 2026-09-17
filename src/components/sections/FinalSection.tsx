import { useReveal } from '@/hooks/useScroll';
import { Mail } from 'lucide-react';
import BloomFlower from '../BloomFlower';
import PetalCanvas from '../PetalCanvas';

export default function FinalSection() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="contact" className="relative flex min-h-screen items-center justify-center overflow-hidden py-24">
      <PetalCanvas section="final" />

      {/* Faded flower in background */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          opacity: isVisible ? 0.08 : 0,
          transition: 'opacity 2s ease 0.5s',
        }}
      >
        <BloomFlower size={500} bloomAmount={1} glowIntensity={0.3} />
      </div>

      {/* Radial glow */}
      <div
        className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 17, 41, 0.1) 0%, transparent 70%)',
        }}
      />

      <div
        ref={ref}
        className={`reveal relative z-10 mx-auto max-w-3xl px-6 text-center ${isVisible ? 'is-visible' : ''}`}
      >
        <div className="mb-6 text-xs font-light tracking-[0.4em] text-bloom-crimson/70">
          THE JOURNEY BEGINS
        </div>

        <h2
          className="font-display text-5xl font-light leading-tight silk-texture md:text-6xl lg:text-7xl"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1.2s ease 0.3s',
          }}
        >
          LET'S BUILD SOMETHING.
        </h2>

        <p
          className="mt-6 font-display text-xl italic text-bloom-muted-text md:text-2xl"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 1s ease 0.7s',
          }}
        >
          The journey has just begun.
        </p>

        {/* Buttons */}
        <div
          className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s ease 1s',
          }}
        >
          <a
            href="mailto:sivaapriya190908@gmail.com"
            className="bloom-btn group inline-flex items-center gap-3 rounded-full border border-bloom-crimson/40 bg-bloom-crimson/10 px-10 py-4 text-sm font-medium tracking-[0.15em] text-bloom-primary-text"
          >
            <Mail size={16} className="text-bloom-crimson" />
            CONTACT ME
          </a>
        </div>

        {/* Footer */}
        <div
          className="mt-24 flex items-center justify-center gap-3"
          style={{
            opacity: isVisible ? 0.5 : 0,
            transition: 'opacity 1.5s ease 1.5s',
          }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-bloom-crimson/30" />
          <span className="font-display text-sm italic text-bloom-muted-text">
            Code in Bloom
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-bloom-crimson/30" />
        </div>

        <p
          className="mt-4 text-xs font-light tracking-[0.2em] text-bloom-muted-text/40"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 1.5s ease 1.8s',
          }}
        >
          SIVAAPRIYA &nbsp;•&nbsp; B.TECH CSE &nbsp;•&nbsp; SRM IST RAMAPURAM
        </p>
      </div>
    </section>
  );
}
