import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-white/30">
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
