"use client";
import { motion } from "framer-motion";
import { useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ArrowRight, CircleDot } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import clsx from "clsx";

interface Props {
    onComplete: () => void;
}

export default function MarkovChallenge({ onComplete }: Props) {
    const [error, setError] = useState(false);

    // Scenario: Current State A.
    // Transition Probs: A->B (0.2), A->C (0.8)
    // Correct Answer: C

    const handleSelect = (node: string) => {
        if (node === "C") {
            onComplete();
        } else {
            setError(true);
            setTimeout(() => setError(false), 800);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-emerald-400">Security Check: Stage 2/2</h3>
                <p className="text-zinc-400 text-sm">System is in <span className="text-white font-bold">State A</span>. Predict the most likely next state.</p>
            </div>

            <div className="relative h-64 bg-zinc-950/50 rounded-xl border border-zinc-800 flex items-center justify-center overflow-hidden">
                {/* Visualization of the graph */}

                {/* Current State A */}
                <div className="absolute left-10 p-4 bg-emerald-500/20 border-2 border-emerald-500 rounded-full text-emerald-500 font-bold z-10 animate-pulse">
                    A
                </div>

                {/* Paths */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Path to B */}
                    <path d="M 80 128 L 220 60" fill="none" stroke="#27272a" strokeWidth="2" markerEnd="url(#arrow)" />
                    <text x="140" y="80" fill="#71717a" fontSize="12">20%</text>

                    {/* Path to C */}
                    <path d="M 80 128 L 220 200" fill="none" stroke="#27272a" strokeWidth="4" markerEnd="url(#arrow)" />
                    <text x="140" y="180" fill="#10b981" fontSize="12" fontWeight="bold">80%</text>

                    <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#52525b" />
                        </marker>
                    </defs>
                </svg>

                {/* Choice B */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSelect("B")}
                    className="absolute right-10 top-10 p-4 bg-zinc-900 border border-zinc-700 hover:border-white rounded-full text-white font-bold z-10 w-12 h-12 flex items-center justify-center transition-colors"
                >
                    B
                </motion.button>

                {/* Choice C */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSelect("C")}
                    className="absolute right-10 bottom-10 p-4 bg-zinc-900 border border-zinc-700 hover:border-emerald-500/50 rounded-full text-white font-bold z-10 w-12 h-12 flex items-center justify-center transition-colors"
                >
                    C
                </motion.button>
            </div>

            {error && <p className="text-red-500 text-center text-xs font-mono animate-pulse">INCORRECT PREDICTION. PROBABILITY TOO LOW.</p>}
        </div>
    );
}
