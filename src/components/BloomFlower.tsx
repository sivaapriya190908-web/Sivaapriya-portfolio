import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useScroll';

interface BloomFlowerProps {
  className?: string;
  size?: number;
  scrollProgress?: number;
  bloomAmount?: number; // 0 to 1, controls how open the flower is
  glowIntensity?: number;
}

export default function BloomFlower({
  className = '',
  size = 400,
  bloomAmount = 1,
  glowIntensity = 0.6,
}: BloomFlowerProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const svg = svgRef.current;
    if (!svg) return;

    let frame = 0;
    const animate = () => {
      frame += 0.003;
      const sway = Math.sin(frame) * 2;
      const innerRotate = frame * 8;
      const outerRotate = -frame * 3;

      const outerGroup = svg.querySelector('[data-outer]');
      const innerGroup = svg.querySelector('[data-inner]');
      const centerGroup = svg.querySelector('[data-center]');

      if (outerGroup) outerGroup.setAttribute('transform', `rotate(${outerRotate} ${size / 2} ${size / 2})`);
      if (innerGroup) innerGroup.setAttribute('transform', `rotate(${innerRotate} ${size / 2} ${size / 2})`);
      if (centerGroup) centerGroup.setAttribute('transform', `rotate(${sway} ${size / 2} ${size / 2})`);

      requestAnimationFrame(animate);
    };
    animate();
  }, [reduced, size]);

  const cx = size / 2;
  const cy = size / 2;

  // Petal path generator
  const petalPath = (angle: number, length: number, width: number, layer: number) => {
    const rad = (angle * Math.PI) / 180;
    const tipX = cx + Math.cos(rad - Math.PI / 2) * length;
    const tipY = cy + Math.sin(rad - Math.PI / 2) * length;
    const w1X = cx + Math.cos(rad - Math.PI / 2 + 0.35) * width;
    const w1Y = cy + Math.sin(rad - Math.PI / 2 + 0.35) * width;
    const w2X = cx + Math.cos(rad - Math.PI / 2 - 0.35) * width;
    const w2Y = cy + Math.sin(rad - Math.PI / 2 - 0.35) * width;

    const baseX = cx + Math.cos(rad - Math.PI / 2) * 8;
    const baseY = cy + Math.sin(rad - Math.PI / 2) * 8;

    return `M ${baseX} ${baseY} Q ${w1X} ${w1Y} ${tipX} ${tipY} Q ${w2X} ${w2Y} ${baseX} ${baseY} Z`;
  };

  const outerPetals = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 360) / 8;
    const length = (size * 0.42) * bloomAmount;
    const width = size * 0.15;
    return (
      <path
        key={`outer-${i}`}
        d={petalPath(angle, length, width, 0)}
        fill="url(#petalGradOuter)"
        opacity={0.85}
        stroke="rgba(139, 17, 41, 0.3)"
        strokeWidth="0.5"
      />
    );
  });

  const midPetals = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 360) / 6 + 22.5;
    const length = (size * 0.32) * bloomAmount;
    const width = size * 0.12;
    return (
      <path
        key={`mid-${i}`}
        d={petalPath(angle, length, width, 1)}
        fill="url(#petalGradMid)"
        opacity={0.9}
      />
    );
  });

  const innerPetals = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 360) / 5;
    const length = (size * 0.22) * bloomAmount;
    const width = size * 0.1;
    return (
      <path
        key={`inner-${i}`}
        d={petalPath(angle, length, width, 2)}
        fill="url(#petalGradInner)"
        opacity={0.95}
      />
    );
  });

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{
        filter: `drop-shadow(0 0 ${30 * glowIntensity}px rgba(139, 17, 41, ${glowIntensity * 0.4}))`,
      }}
    >
      <defs>
        <radialGradient id="petalGradOuter" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stopColor="#16070C" />
          <stop offset="40%" stopColor="#5A0F20" />
          <stop offset="80%" stopColor="#8B1129" />
          <stop offset="100%" stopColor="#A8203A" />
        </radialGradient>
        <radialGradient id="petalGradMid" cx="50%" cy="75%" r="55%">
          <stop offset="0%" stopColor="#5A0F20" />
          <stop offset="50%" stopColor="#8B1129" />
          <stop offset="100%" stopColor="#A8203A" />
        </radialGradient>
        <radialGradient id="petalGradInner" cx="50%" cy="70%" r="50%">
          <stop offset="0%" stopColor="#8B1129" />
          <stop offset="60%" stopColor="#A8203A" />
          <stop offset="100%" stopColor="#C83048" />
        </radialGradient>
        <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8D8C3" stopOpacity="0.9" />
          <stop offset="30%" stopColor="#A8203A" />
          <stop offset="70%" stopColor="#5A0F20" />
          <stop offset="100%" stopColor="#16070C" />
        </radialGradient>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer petals */}
      <g data-outer>{outerPetals}</g>

      {/* Mid petals */}
      <g data-mid>{midPetals}</g>

      {/* Inner petals */}
      <g data-inner>{innerPetals}</g>

      {/* Center */}
      <g data-center>
        <circle cx={cx} cy={cy} r={size * 0.08} fill="url(#centerGrad)" filter="url(#softGlow)" />
        <circle cx={cx} cy={cy} r={size * 0.04} fill="#E8D8C3" opacity="0.3" />
        {/* Stamens */}
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          const r = size * 0.06;
          return (
            <circle
              key={`stamen-${i}`}
              cx={cx + Math.cos(a) * r}
              cy={cy + Math.sin(a) * r}
              r="1.5"
              fill="#E8D8C3"
              opacity="0.5"
            />
          );
        })}
      </g>
    </svg>
  );
}
