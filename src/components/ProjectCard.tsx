"use client";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

interface ProjectProps {
    project: {
        title: string;
        description: string;
        tags: string[];
        link: string;
        icon: any;
        featured: boolean;
        clue?: string;
    };
    index: number;
}

export default function ProjectCard({ project, index }: ProjectProps) {
    const Icon = project.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-emerald-500/50 transition-colors overflow-hidden"
        >
            {/* Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] group-hover:bg-emerald-500/10 transition-colors" />

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-zinc-800 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300">
                            <Icon size={28} />
                        </div>
                        <Link href={project.link} target="_blank" className="p-2 text-zinc-500 hover:text-white transition-colors">
                            <Github size={20} />
                        </Link>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                    <p className="text-zinc-400 mb-6 leading-relaxed">
                        {project.description}
                    </p>
                </div>

                <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-black/50 text-xs font-medium text-zinc-300 rounded-full border border-zinc-800">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Hidden Clue */}
                {project.clue && (
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="font-mono text-[10px] text-zinc-700 tracking-[0.3em] uppercase select-none">
                            Code: {project.clue}
                        </span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
