import { useReveal } from '@/hooks/useScroll';
import PetalCanvas from '../PetalCanvas';
import { Compass, FlaskConical, Sparkles } from 'lucide-react';

const AI_CARDS = [
  {
    title: 'EXPLORE',
    description: 'Emerging AI technologies',
    icon: Compass,
  },
  {
    title: 'EXPERIMENT',
    description: 'Learn by building',
    icon: FlaskConical,
  },
  {
    title: 'CREATE',
    description: 'Turn ideas into useful projects',
    icon: Sparkles,
  },
];

export default function AISection() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="ai" className="relative min-h-screen overflow-hidden py-24 md:py-32">
      <PetalCanvas section="ai" />

      <div
        ref={ref}
        className={`reveal mx-auto max-w-5xl px-6 text-center ${isVisible ? 'is-visible' : ''}`}
      >
        <div className="mb-4 text-xs font-light tracking-[0.4em] text-bloom-crimson/70">
          04 — CURIOSITY
        </div>

        <h2 className="font-display text-4xl font-light leading-tight silk-texture md:text-5xl lg:text-6xl">
          CURIOUS ABOUT WHAT'S NEXT
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-base font-light leading-relaxed text-bloom-muted-text md:text-lg">
          I'm fascinated by how rapidly AI is evolving and want to understand,
          experiment with and eventually build using emerging AI technologies.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {AI_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="petal-card glass-card group relative flex flex-col items-center rounded-2xl p-10"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + i * 0.15}s`,
                }}
              >
                {/* Glow ring on hover */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background: 'radial-gradient(circle at top, rgba(139, 17, 41, 0.12) 0%, transparent 60%)',
                  }}
                />

                <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-bloom-crimson/20 bg-bloom-dark-burgundy/40 transition-all duration-500 group-hover:border-bloom-crimson/50 group-hover:shadow-[0_0_30px_rgba(139,17,41,0.2)]">
                  <Icon size={24} className="text-bloom-crimson" strokeWidth={1.5} />
                </div>

                <h3 className="font-display text-2xl font-light text-bloom-primary-text">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm font-light text-bloom-muted-text">
                  {card.description}
                </p>

                {/* Connecting petal dots */}
                <div className="mt-6 flex gap-1.5">
                  {Array.from({ length: 3 }, (_, j) => (
                    <div
                      key={j}
                      className="h-1 w-1 rounded-full bg-bloom-crimson/30 transition-all duration-500 group-hover:bg-bloom-crimson/60"
                      style={{ transitionDelay: `${j * 100}ms` }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
