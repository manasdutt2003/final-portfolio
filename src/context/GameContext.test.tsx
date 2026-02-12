import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { GameProvider, useGame } from "./GameContext";
import "@testing-library/jest-dom";

// Test component to access context
function TestComponent() {
    const { isUnlocked, unlock, openModal, closeModal, isOpen } = useGame();
    return (
        <div>
            <div data-testid="unlock-status">{isUnlocked ? "unlocked" : "locked"}</div>
            <div data-testid="modal-status">{isOpen ? "open" : "closed"}</div>
            <button onClick={unlock}>Unlock</button>
            <button onClick={openModal}>Open Modal</button>
            <button onClick={closeModal}>Close Modal</button>
        </div>
    );
}

describe("GameContext", () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
    });

    test("renders with initial locked state", () => {
        render(
            <GameProvider>
                <TestComponent />
            </GameProvider>
        );
        expect(screen.getByTestId("unlock-status")).toHaveTextContent("locked");
    });

    test("unlock() transitions to unlocked state", async () => {
        render(
            <GameProvider>
                <TestComponent />
            </GameProvider>
        );
        const unlockButton = screen.getByRole("button", { name: "Unlock" });
        fireEvent.click(unlockButton);
        
        await waitFor(() => {
            expect(screen.getByTestId("unlock-status")).toHaveTextContent("unlocked");
        });
    });

    test("openModal() and closeModal() control modal state", async () => {
        render(
            <GameProvider>
                <TestComponent />
            </GameProvider>
        );
        
        const openButton = screen.getByRole("button", { name: "Open Modal" });
        fireEvent.click(openButton);
        await waitFor(() => {
            expect(screen.getByTestId("modal-status")).toHaveTextContent("open");
        });

        const closeButton = screen.getByRole("button", { name: "Close Modal" });
        fireEvent.click(closeButton);
        await waitFor(() => {
            expect(screen.getByTestId("modal-status")).toHaveTextContent("closed");
        });
    });

    test("persists unlock state to localStorage", async () => {
        render(
            <GameProvider>
                <TestComponent />
            </GameProvider>
        );
        
        const unlockButton = screen.getByRole("button", { name: "Unlock" });
        fireEvent.click(unlockButton);
        
        await waitFor(() => {
            expect(localStorage.getItem("portfolio_unlocked")).toBe("true");
        });
    });

    test("throws error when useGame() called outside provider", () => {
        // Suppress console.error for this test
        const spy = jest.spyOn(console, "error").mockImplementation(() => {});
        
        expect(() => {
            render(<TestComponent />);
        }).toThrow("useGame must be used within GameProvider");
        
        spy.mockRestore();
    });
});
