"use client";
import { skills } from "@/data/projects";
import { motion } from "framer-motion";

export default function TechStack() {
    return (
        <section className="py-20 border-t border-zinc-900 bg-zinc-950/50">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-12 text-center">Technologies I Use</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {skills.map((category, idx) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            className="space-y-4"
                        >
                            <h3 className="text-xl font-bold text-white border-l-2 border-emerald-500 pl-4">{category.name}</h3>
                            <div className="flex flex-wrap gap-2">
                                {category.items.map(item => (
                                    <span key={item} className="px-3 py-1 bg-zinc-900 text-zinc-300 rounded-md text-sm border border-zinc-800 hover:border-emerald-500/50 transition-colors">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
