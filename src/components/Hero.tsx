"use client";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse -z-10" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000 -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-4xl space-y-6 z-10"
            >
                <span className="text-emerald-500 font-mono text-sm tracking-widest uppercase mb-4 block group relative cursor-help w-max mx-auto">
                    Portfolio 2026
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-zinc-600 tracking-[0.2em]">Code: GEN</span>
                </span>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                    Manas Dutt
                </h1>
                <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto">
                    Building <span className="text-white font-medium">intelligent systems</span> and <span className="text-white font-medium">premium web experiences</span>.
                    Passionate about Machine Learning, Next.js, and Solving hard problems.
                </p>

                <div className="flex items-center justify-center gap-6 pt-8">
                    <Link href="https://github.com/manasdutt2003" target="_blank" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:scale-110 transition-all">
                        <Github className="text-white" size={24} />
                    </Link>
                    <Link href="https://www.linkedin.com/in/manas-dutt-1bb42228b" target="_blank" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:scale-110 transition-all">
                        <Linkedin className="text-white" size={24} />
                    </Link>
                    <Link href="mailto:manasdutt2003@gmail.com" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:scale-110 transition-all">
                        <Mail className="text-white" size={24} />
                    </Link>
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 text-zinc-500"
            >
                <ArrowDown size={24} />
            </motion.div>
        </section>
    );
}
