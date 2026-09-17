import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useScroll';

interface PetalConfig {
  count: number;
  speed: number;
  drift: number;
  sizeRange: [number, number];
}

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  hue: number;
  swayPhase: number;
  swayAmplitude: number;
}

const SECTION_CONFIGS: Record<string, PetalConfig> = {
  hero: { count: 6, speed: 0.3, drift: 0.3, sizeRange: [8, 14] },
  about: { count: 10, speed: 0.4, drift: 0.4, sizeRange: [6, 12] },
  skills: { count: 12, speed: 0.35, drift: 0.5, sizeRange: [7, 13] },
  journey: { count: 10, speed: 0.5, drift: 0.3, sizeRange: [6, 11] },
  ai: { count: 14, speed: 0.45, drift: 0.5, sizeRange: [7, 14] },
  sketch: { count: 8, speed: 0.3, drift: 0.3, sizeRange: [9, 16] },
  final: { count: 16, speed: 0.4, drift: 0.4, sizeRange: [8, 15] },
};

export default function PetalCanvas({
  section = 'about',
  className = '',
}: {
  section?: keyof typeof SECTION_CONFIGS;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const config = SECTION_CONFIGS[section];
    const petalCount = reduced ? 0 : isMobile ? Math.floor(config.count * 0.4) : config.count;

    let petals: Petal[] = [];
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const createPetal = (): Petal => ({
      x: Math.random() * width,
      y: -20 - Math.random() * height,
      vx: (Math.random() - 0.5) * config.drift,
      vy: config.speed + Math.random() * config.speed * 0.5,
      size: config.sizeRange[0] + Math.random() * (config.sizeRange[1] - config.sizeRange[0]),
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: 0.15 + Math.random() * 0.35,
      hue: Math.random() * 0.4,
      swayPhase: Math.random() * Math.PI * 2,
      swayAmplitude: 0.5 + Math.random() * 1.5,
    });

    const initPetals = () => {
      petals = [];
      for (let i = 0; i < petalCount; i++) {
        const p = createPetal();
        p.y = Math.random() * height;
        petals.push(p);
      }
    };

    resize();
    initPetals();

    let time = 0;

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      // Petal shape - teardrop
      const s = p.size;
      const grad = ctx.createRadialGradient(0, -s * 0.3, 0, 0, 0, s);
      const colorChoice = p.hue;

      if (colorChoice < 0.2) {
        grad.addColorStop(0, 'rgba(168, 32, 58, 0.9)');
        grad.addColorStop(0.5, 'rgba(139, 17, 41, 0.7)');
        grad.addColorStop(1, 'rgba(90, 15, 32, 0.3)');
      } else {
        grad.addColorStop(0, 'rgba(139, 17, 41, 0.85)');
        grad.addColorStop(0.5, 'rgba(90, 15, 32, 0.6)');
        grad.addColorStop(1, 'rgba(22, 7, 12, 0.2)');
      }

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.5, -s * 0.5, s * 0.5, s * 0.3, 0, s);
      ctx.bezierCurveTo(-s * 0.5, s * 0.3, -s * 0.5, -s * 0.5, 0, -s);
      ctx.fill();

      // Subtle highlight
      ctx.globalAlpha = p.opacity * 0.3;
      ctx.fillStyle = 'rgba(232, 216, 195, 0.5)';
      ctx.beginPath();
      ctx.ellipse(0, -s * 0.3, s * 0.15, s * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      for (const p of petals) {
        p.swayPhase += 0.01;
        p.x += p.vx + Math.sin(p.swayPhase) * p.swayAmplitude * 0.3;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        drawPetal(p);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    if (!reduced && petalCount > 0) {
      animate();
    }

    const handleResize = () => {
      resize();
      initPetals();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [section, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
