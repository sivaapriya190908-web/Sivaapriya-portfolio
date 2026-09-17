import { useReveal } from '@/hooks/useScroll';
import PetalCanvas from '../PetalCanvas';

const INFO_CARDS = [
  { label: 'B.TECH CSE CORE', value: 'SRM IST • RAMAPURAM' },
  { label: 'CURRENTLY LEARNING', value: 'C PROGRAMMING' },
  { label: 'CURIOUS ABOUT', value: 'AI • HACKATHONS • TECHNOLOGY' },
];

export default function About() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative min-h-screen overflow-hidden py-24 md:py-32">
      <PetalCanvas section="about" />

      <div
        ref={ref}
        className={`reveal mx-auto max-w-5xl px-6 text-center ${isVisible ? 'is-visible' : ''}`}
      >
        <div className="mb-4 text-xs font-light tracking-[0.4em] text-bloom-crimson/70">
          01 — WHO I AM
        </div>

        <h2 className="font-display text-4xl font-light leading-tight silk-texture md:text-5xl lg:text-6xl">
          THE PERSON BEHIND THE CODE
        </h2>

        <div className="mx-auto mt-12 max-w-2xl space-y-6">
          <p className="text-base font-light leading-relaxed text-bloom-muted-text md:text-lg">
            I'm a B.Tech Computer Science Engineering student at SRM IST, Ramapuram,
            building my foundation in programming while exploring where technology can take me next.
          </p>
          <p className="text-base font-light leading-relaxed text-bloom-muted-text md:text-lg">
            I'm interested in emerging technologies, especially AI, and I want to gain
            practical experience by building, collaborating and participating in hackathons.
          </p>
        </div>

        {/* Floating info cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {INFO_CARDS.map((card, i) => (
            <div
              key={card.label}
              className="glass-card petal-card group rounded-2xl p-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + i * 0.15}s`,
              }}
            >
              <div className="mb-3 flex items-center justify-center">
                <div className="h-8 w-px bg-gradient-to-b from-bloom-crimson to-transparent" />
              </div>
              <div className="text-xs font-medium tracking-[0.2em] text-bloom-crimson">
                {card.label}
              </div>
              <div className="mt-3 font-display text-lg font-light text-bloom-primary-text">
                {card.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
