import { useReveal } from '@/hooks/useScroll';
import PetalCanvas from '../PetalCanvas';

interface JourneyItem {
  year?: string;
  title: string;
  subtitle?: string;
  status?: string;
  isFuture?: boolean;
}

const JOURNEY: JourneyItem[] = [
  { year: '2026', title: 'B.Tech CSE Core', subtitle: 'SRM IST Ramapuram' },
  { title: 'Python', subtitle: 'Learned' },
  { title: 'Python Interfaces', subtitle: 'Learned' },
  { title: 'MySQL', subtitle: 'Learned' },
  { title: 'C', subtitle: 'Currently Learning' },
  { title: 'C++', subtitle: 'Next' },
  { title: 'Java', subtitle: 'Next' },
  { title: 'AI + Hackathons', subtitle: 'Future Exploration', isFuture: true },
];

export default function Journey() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="journey" className="relative min-h-screen overflow-hidden py-24 md:py-32">
      <PetalCanvas section="journey" />

      <div
        ref={ref}
        className={`reveal mx-auto max-w-3xl px-6 text-center ${isVisible ? 'is-visible' : ''}`}
      >
        <div className="mb-4 text-xs font-light tracking-[0.4em] text-bloom-crimson/70">
          03 — THE PATH
        </div>

        <h2 className="font-display text-4xl font-light leading-tight silk-texture md:text-5xl lg:text-6xl">
          THE JOURNEY IS JUST BEGINNING
        </h2>

        {/* Vertical flower-stem timeline */}
        <div className="relative mt-20">
          {/* Stem line */}
          <div
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 stem-line"
            style={{
              transformOrigin: 'top',
              transform: `translateX(-50%) scaleY(${isVisible ? 1 : 0})`,
              transition: 'transform 2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
            }}
          />

          <div className="space-y-12">
            {JOURNEY.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className="relative flex items-center"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.7s ease ${0.5 + i * 0.2}s`,
                  }}
                >
                  {/* Node */}
                  <div className="absolute left-1/2 -translate-x-1/2">
                    <div
                      className={`h-4 w-4 rounded-full border-2 ${
                        item.isFuture
                          ? 'border-bloom-crimson bg-bloom-crimson/20'
                          : item.subtitle === 'Currently Learning'
                          ? 'border-amber-500/50 bg-amber-500/10'
                          : 'border-bloom-crimson/40 bg-bloom-dark-burgundy'
                      }`}
                    >
                      <div className="h-full w-full animate-bloom-pulse rounded-full" />
                    </div>
                  </div>

                  {/* Content - alternating sides */}
                  <div className={`w-1/2 ${isLeft ? 'pr-12 text-right' : 'ml-auto pl-12 text-left'}`}>
                    {item.year && (
                      <div className="mb-1 font-display text-2xl font-light text-bloom-crimson">
                        {item.year}
                      </div>
                    )}
                    <div
                      className={`font-display text-xl font-medium ${
                        item.isFuture ? 'text-bloom-crimson' : 'text-bloom-primary-text'
                      }`}
                    >
                      {item.title}
                    </div>
                    {item.subtitle && (
                      <div
                        className={`mt-1 text-xs tracking-[0.15em] ${
                          item.subtitle === 'Currently Learning'
                            ? 'text-amber-400/70'
                            : item.subtitle === 'Next' || item.isFuture
                            ? 'text-bloom-muted-text/60'
                            : 'text-bloom-muted-text'
                        }`}
                      >
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
