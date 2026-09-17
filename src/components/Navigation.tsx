import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'JOURNEY', href: '#journey' },
  { label: 'AI', href: '#ai' },
  { label: 'HACKATHONS', href: '#hackathons' },
  { label: 'SKETCH', href: '#sketch' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'frosted-nav py-3' : 'py-5 bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <button
            onClick={() => handleClick('#hero')}
            className="font-display text-2xl font-semibold tracking-wider text-bloom-primary-text transition-colors hover:text-bloom-crimson"
          >
            S<span className="text-bloom-crimson">.</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex lg:gap-10">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className="group relative text-xs font-medium tracking-[0.15em] text-bloom-muted-text transition-colors hover:text-bloom-primary-text"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-bloom-crimson transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-bloom-primary-text md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 frosted-nav transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className="font-display text-2xl tracking-wider text-bloom-primary-text transition-colors hover:text-bloom-crimson"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.4s ease ${i * 0.06}s`,
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
