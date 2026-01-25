"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";

interface Props {
    onComplete: () => void;
}

export default function StatsChallenge({ onComplete }: Props) {
    const [selected, setSelected] = useState<number | null>(null);
    const [error, setError] = useState(false);

    // Generate deterministic-looking "random" data
    // Index 2 will be the Uniform (Target)
    const datasets = [
        // Normal 1
        [10, 25, 40, 60, 85, 95, 80, 55, 30, 15],
        // Normal 2
        [5, 20, 45, 70, 90, 85, 65, 40, 20, 10],
        // Uniform (The Answer)
        [65, 60, 70, 65, 75, 70, 65, 60, 70, 65],
        // Normal 3
        [15, 30, 50, 75, 95, 80, 60, 35, 25, 10],
    ];

    const handleSelect = (idx: number) => {
        setSelected(idx);
        if (idx === 2) {
            setTimeout(onComplete, 500);
        } else {
            setError(true);
            setTimeout(() => setError(false), 800);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-emerald-400">Security Check: Stage 1/2</h3>
                <p className="text-zinc-400 text-sm">Select the <span className="text-white font-bold">Uniform Distribution</span> (Artificial Data).</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {datasets.map((data, idx) => (
                    <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSelect(idx)}
                        className={clsx(
                            "p-4 bg-zinc-950 border rounded-xl transition-colors relative overflow-hidden h-32 flex items-end justify-between gap-1",
                            selected === idx && error ? "border-red-500 bg-red-500/10" : "border-zinc-800 hover:border-emerald-500/50"
                        )}
                    >
                        {data.map((h, i) => (
                            <div
                                key={i}
                                style={{ height: `${h}%` }}
                                className={clsx(
                                    "w-full rounded-sm",
                                    selected === idx && error ? "bg-red-500/50" : "bg-emerald-500/30"
                                )}
                            />
                        ))}
                    </motion.button>
                ))}
            </div>

            {error && <p className="text-red-500 text-center text-xs font-mono animate-pulse">ERROR: PATTERN MATCH FAILURE. TRY AGAIN.</p>}
        </div>
    );
}
