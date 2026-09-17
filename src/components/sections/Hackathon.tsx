import { useReveal } from '@/hooks/useScroll';
import { Lightbulb, Users, Code2, Rocket } from 'lucide-react';

const STEPS = [
  { title: 'IDEA', icon: Lightbulb },
  { title: 'TEAM', icon: Users },
  { title: 'CODE', icon: Code2 },
  { title: 'PROTOTYPE', icon: Rocket },
];

export default function Hackathon() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="hackathons" className="relative min-h-screen overflow-hidden py-24 md:py-32">
      {/* Subtle petals */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-1 w-1 rounded-full bg-bloom-crimson/20 blur-sm" />
        <div className="absolute right-1/4 top-1/2 h-1.5 w-1.5 rounded-full bg-bloom-crimson/15 blur-sm" />
        <div className="absolute left-1/3 bottom-1/4 h-1 w-1 rounded-full bg-bloom-crimson/20 blur-sm" />
      </div>

      <div
        ref={ref}
        className={`reveal mx-auto max-w-5xl px-6 text-center ${isVisible ? 'is-visible' : ''}`}
      >
        <div className="mb-4 text-xs font-light tracking-[0.4em] text-bloom-crimson/70">
          05 — AMBITION
        </div>

        <h2 className="font-display text-4xl font-light leading-tight silk-texture md:text-5xl lg:text-6xl">
          FROM IDEAS TO PROTOTYPES
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-base font-light leading-relaxed text-bloom-muted-text md:text-lg">
          I want to participate in hackathons to challenge myself, collaborate with
          others and turn ideas into working prototypes.
        </p>

        {/* Visual sequence */}
        <div className="relative mt-20">
          {/* Animated connecting line (desktop) */}
          <svg
            className="absolute left-0 top-1/2 hidden w-full -translate-y-1/2 md:block"
            height="2"
            viewBox="0 0 1000 2"
            preserveAspectRatio="none"
          >
            <line
              x1="125"
              y1="1"
              x2="875"
              y2="1"
              stroke="url(#hackLine)"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset={isVisible ? '0' : '1000'}
              style={{ transition: 'stroke-dashoffset 2s ease 0.5s' }}
            />
            <defs>
              <linearGradient id="hackLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5A0F20" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#8B1129" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#5A0F20" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          {/* Steps */}
          <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-0">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="flex flex-col items-center"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.7s ease ${0.4 + i * 0.25}s`,
                  }}
                >
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-bloom-crimson/20 bg-bloom-dark-burgundy/60 backdrop-blur-sm transition-all duration-500 hover:border-bloom-crimson/50 hover:shadow-[0_0_30px_rgba(139,17,41,0.15)] md:h-24 md:w-24">
                    <Icon size={28} className="text-bloom-crimson" strokeWidth={1.5} />
                    {/* Pulse ring */}
                    <div className="absolute inset-0 rounded-full border border-bloom-crimson/10 animate-bloom-pulse" />
                  </div>

                  <div className="mt-5 font-display text-lg font-light tracking-[0.15em] text-bloom-primary-text">
                    {step.title}
                  </div>

                  {/* Arrow between steps (mobile) */}
                  {i < STEPS.length - 1 && (
                    <div className="mt-4 text-bloom-crimson/40 md:hidden">↓</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
