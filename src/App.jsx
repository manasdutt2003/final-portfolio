import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-accent selection:text-black scroll-smooth">
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Achievements />
      <Contact />
    </div>
  );
}

export default App;
