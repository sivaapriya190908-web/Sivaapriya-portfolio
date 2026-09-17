import Navigation from './components/Navigation';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import TechGarden from './components/sections/TechGarden';
import Journey from './components/sections/Journey';
import AISection from './components/sections/AISection';
import Hackathon from './components/sections/Hackathon';
import WhySketch from './components/sections/WhySketch';
import FinalSection from './components/sections/FinalSection';

export default function App() {
  return (
    <div className="relative min-h-screen bg-bloom-bg text-bloom-primary-text">
      <Navigation />
      <main>
        <Hero />
        <About />
        <TechGarden />
        <Journey />
        <AISection />
        <Hackathon />
        <WhySketch />
        <FinalSection />
      </main>
    </div>
  );
}
