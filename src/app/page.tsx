"use client";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import TechStack from "@/components/TechStack";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import UnlockModal from "@/components/UnlockModal";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-black selection:bg-emerald-500/30">
      <Navbar />
      <UnlockModal />
      <div id="hero">
        <Hero />
      </div>

      <div id="tech">
        <TechStack />
      </div>

      <section className="py-32 px-6 max-w-7xl mx-auto" id="work">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Selected Work</h2>
            <p className="text-zinc-500 max-w-md">A collection of projects showcasing my expertise in Machine Learning, Full Stack Development, and UI Design.</p>
          </div>
          <a href="https://github.com/manasdutt2003" target="_blank" className="text-emerald-500 hover:text-emerald-400 font-medium flex items-center gap-2">
            View GitHub -&gt;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx} />
          ))}
        </div>
      </section>

      <Contact />

      <footer className="py-12 border-t border-zinc-900 text-center text-zinc-600">
        <p>&copy; 2026 Manas Dutt. All rights reserved.</p>
        <p className="text-xs mt-2 text-zinc-800">v2.1 (Final)</p>
      </footer>
    </main>
  );
}
