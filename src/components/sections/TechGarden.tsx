import { useReveal } from '@/hooks/useScroll';
import PetalCanvas from '../PetalCanvas';

interface Skill {
  name: string;
  status: 'LEARNED' | 'CURRENTLY LEARNING' | 'NEXT';
}

const SKILLS: Skill[] = [
  { name: 'PYTHON', status: 'LEARNED' },
  { name: 'PYTHON INTERFACES', status: 'LEARNED' },
  { name: 'MYSQL', status: 'LEARNED' },
  { name: 'C', status: 'CURRENTLY LEARNING' },
  { name: 'C++', status: 'NEXT' },
  { name: 'JAVA', status: 'NEXT' },
];

const STATUS_STYLES: Record<Skill['status'], { color: string; dot: string; label: string }> = {
  LEARNED: { color: 'text-bloom-primary-text', dot: 'bg-bloom-crimson', label: 'text-bloom-crimson' },
  'CURRENTLY LEARNING': { color: 'text-bloom-primary-text', dot: 'bg-amber-500/70', label: 'text-amber-400/80' },
  NEXT: { color: 'text-bloom-muted-text', dot: 'bg-bloom-muted-text/40', label: 'text-bloom-muted-text/60' },
};

function SkillPetal({ skill, index, isVisible }: { skill: Skill; index: number; isVisible: boolean }) {
  const style = STATUS_STYLES[skill.status];
  // Alternate sizes for organic flower-like layout
  const sizeClass = index % 2 === 0 ? 'sm:col-span-1' : 'sm:col-span-1';

  return (
    <div
      className={`petal-card glass-card group relative flex flex-col items-center justify-center rounded-full p-8 text-center ${sizeClass}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
        transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.12}s`,
        aspectRatio: '1',
      }}
    >
      {/* Petal bloom effect on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(circle at center, rgba(139, 17, 41, 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Petal ring */}
      <div className="absolute inset-2 rounded-full border border-bloom-crimson/10 transition-all duration-700 group-hover:border-bloom-crimson/30 group-hover:scale-105" />

      <div className={`mb-2 h-2 w-2 rounded-full ${style.dot} transition-transform duration-500 group-hover:scale-150`} />

      <div className={`font-display text-lg font-medium ${style.color} md:text-xl`}>
        {skill.name}
      </div>

      <div className={`mt-2 text-[10px] font-medium tracking-[0.2em] ${style.label}`}>
        {skill.status}
      </div>
    </div>
  );
}

export default function TechGarden() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="skills" className="relative min-h-screen overflow-hidden py-24 md:py-32">
      <PetalCanvas section="skills" />

      <div
        ref={ref}
        className={`reveal mx-auto max-w-5xl px-6 text-center ${isVisible ? 'is-visible' : ''}`}
      >
        <div className="mb-4 text-xs font-light tracking-[0.4em] text-bloom-crimson/70">
          02 — WHAT I KNOW
        </div>

        <h2 className="font-display text-4xl font-light leading-tight silk-texture md:text-5xl lg:text-6xl">
          MY TECH GARDEN
        </h2>

        <p className="mx-auto mt-6 max-w-md text-sm font-light text-bloom-muted-text">
          Each technology is a petal — some have bloomed, some are opening, some are yet to grow.
        </p>

        {/* Flower-inspired skill grid */}
        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 md:gap-8">
          {SKILLS.map((skill, i) => (
            <SkillPetal key={skill.name} skill={skill} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
