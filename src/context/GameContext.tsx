"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface GameContextType {
    isUnlocked: boolean;
    unlock: () => void;
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("portfolio_unlocked");
        if (saved === "true") {
            setIsUnlocked(true);
        }
    }, []);

    const unlock = () => {
        setIsUnlocked(true);
        localStorage.setItem("portfolio_unlocked", "true");
    };

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <GameContext.Provider value={{ isUnlocked, unlock, isOpen, openModal, closeModal }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return context;
}
