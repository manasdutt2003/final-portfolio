"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface GameContextType {
    isUnlocked: boolean;
    unlock: () => void;
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const STORAGE_KEY = "portfolio_unlocked";

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // The server cannot see localStorage, so the first render is always
    // "locked". Restoring the saved value after mount keeps the server and
    // client HTML identical and avoids a hydration mismatch.
    useEffect(() => {
        try {
            if (localStorage.getItem(STORAGE_KEY) === "true") {
                // eslint-disable-next-line react-hooks/set-state-in-effect -- one-off sync from browser storage
                setIsUnlocked(true);
            }
        } catch {
            // Storage can be blocked (private mode); stay locked.
        }
    }, []);

    const unlock = () => {
        setIsUnlocked(true);
        try {
            localStorage.setItem(STORAGE_KEY, "true");
        } catch {
            // Unlock for this visit only.
        }
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
