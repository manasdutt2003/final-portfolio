"use client";
import { useGame } from "@/context/GameContext";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, Unlock, X, ShieldCheck } from "lucide-react";
import { useState } from "react";
import StatsChallenge from "./puzzles/StatsChallenge";
import MarkovChallenge from "./puzzles/MarkovChallenge";

export default function UnlockModal() {
    const { isOpen, closeModal, unlock } = useGame();
    const [stage, setStage] = useState(0); // 0: Intro, 1: Stats, 2: Markov, 3: Success

    const handleUnlock = () => {
        setStage(3);
        setTimeout(() => {
            unlock();
            closeModal();
            alert("SECURITY CLEARANCE GRANTED. Resume Unlocked.");
            setStage(0); // Reset for next time if they lock it again
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-zinc-900 border border-zinc-700 w-full max-w-lg p-8 rounded-2xl shadow-2xl relative overflow-hidden"
                    >
                        {/* Decoration */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-purple-500 to-emerald-500 animate-gradient" />

                        <button onClick={closeModal} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
                            <X size={20} />
                        </button>

                        <div className="flex flex-col items-center mb-6">
                            <div className="p-4 bg-zinc-800 rounded-full text-emerald-500 mb-4 ring-1 ring-emerald-500/20">
                                {stage === 3 ? <Unlock size={32} /> : <Lock size={32} />}
                            </div>

                            {stage === 0 && (
                                <>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Security Clearance Required</h2>
                                    <p className="text-zinc-400 text-center mt-2 text-sm max-w-xs">
                                        To access this classified document, you must verify your analytical capabilities.
                                    </p>
                                    <button
                                        onClick={() => setStage(1)}
                                        className="mt-8 px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all flex items-center gap-2"
                                    >
                                        <ShieldCheck size={18} />
                                        Begin Verification
                                    </button>
                                </>
                            )}

                            {stage === 1 && <StatsChallenge onComplete={() => setStage(2)} />}

                            {stage === 2 && <MarkovChallenge onComplete={handleUnlock} />}

                            {stage === 3 && (
                                <div className="text-center space-y-4 animate-pulse">
                                    <h2 className="text-2xl font-bold text-emerald-400">ACCESS GRANTED</h2>
                                    <p className="text-zinc-400">Decrypting Resume...</p>
                                </div>
                            )}

                        </div>

                        {stage > 0 && stage < 3 && (
                            <div className="mt-6 flex justify-center gap-2">
                                <div className={`h-1 w-8 rounded-full ${stage >= 1 ? "bg-emerald-500" : "bg-zinc-800"}`} />
                                <div className={`h-1 w-8 rounded-full ${stage >= 2 ? "bg-emerald-500" : "bg-zinc-800"}`} />
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
