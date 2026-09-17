import { useReveal } from '@/hooks/useScroll';
import BloomFlower from '../BloomFlower';
import PetalCanvas from '../PetalCanvas';

export default function WhySketch() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="sketch" className="relative min-h-screen overflow-hidden py-24 md:py-32">
      <PetalCanvas section="sketch" />

      {/* Large blooming flower behind text */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0.5})`,
          opacity: isVisible ? 0.15 : 0,
          transition: 'all 2.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
        }}
      >
        <BloomFlower size={700} bloomAmount={isVisible ? 1 : 0.3} glowIntensity={0.5} />
      </div>

      {/* Radial glow */}
      <div
        className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 17, 41, 0.08) 0%, transparent 70%)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 2s ease 0.5s',
        }}
      />

      <div
        ref={ref}
        className={`reveal relative z-10 mx-auto max-w-4xl px-6 text-center ${isVisible ? 'is-visible' : ''}`}
      >
        <div className="mb-4 text-xs font-light tracking-[0.4em] text-bloom-crimson/70">
          06 — THE WHY
        </div>

        <h2 className="font-display text-4xl font-light leading-tight silk-texture md:text-5xl lg:text-6xl">
          WHY SKETCH?
        </h2>

        {/* Main statement - visually powerful */}
        <div
          className="mx-auto mt-16 max-w-3xl"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s ease 0.5s',
          }}
        >
          <p className="font-display text-2xl font-light italic leading-relaxed text-bloom-primary-text md:text-3xl lg:text-4xl">
            "I don't want to just learn technology.
            <br />
            I want to <span className="gradient-crimson font-medium not-italic">build</span> with it."
          </p>
        </div>

        {/* Supporting text */}
        <p
          className="mx-auto mt-10 max-w-xl text-base font-light leading-relaxed text-bloom-muted-text md:text-lg"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s ease 0.8s',
          }}
        >
          I'm looking for an environment where I can learn from others, work on real
          ideas, explore new technologies and push myself beyond the classroom.
        </p>

        {/* Final statement */}
        <div
          className="mx-auto mt-12 max-w-2xl"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'all 1.2s ease 1.1s',
          }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-bloom-crimson/40" />
            <div className="h-1.5 w-1.5 rounded-full bg-bloom-crimson" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-bloom-crimson/40" />
          </div>

          <p className="font-display text-xl font-light italic leading-relaxed text-bloom-primary-text md:text-2xl">
            "SKETCH feels like a place where curiosity can turn into creation."
          </p>
        </div>
      </div>
    </section>
  );
}
