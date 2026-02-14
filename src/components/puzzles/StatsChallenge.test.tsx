import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import StatsChallenge from "./StatsChallenge";
import "@testing-library/jest-dom";

describe("StatsChallenge", () => {
    const mockOnComplete = jest.fn();

    beforeEach(() => {
        mockOnComplete.mockClear();
    });

    test("renders challenge with instructions and options", () => {
        render(<StatsChallenge onComplete={mockOnComplete} />);
        
        expect(screen.getByText(/identify the uniform distribution/i)).toBeInTheDocument();
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBe(4); // 4 histogram options
    });

    test("displays all 4 histogram options", () => {
        render(<StatsChallenge onComplete={mockOnComplete} />);
        
        const options = screen.getAllByRole("button");
        expect(options).toHaveLength(4);
    });

    test("calls onComplete when correct answer (index 2) is clicked", async () => {
        render(<StatsChallenge onComplete={mockOnComplete} />);
        
        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[2]); // Correct answer at index 2
        
        await waitFor(() => {
            expect(mockOnComplete).toHaveBeenCalled();
        });
    });

    test("displays error message on wrong answer", async () => {
        jest.useFakeTimers();
        render(<StatsChallenge onComplete={mockOnComplete} />);
        
        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[0]); // Wrong answer
        
        await waitFor(() => {
            expect(screen.getByText(/incorrect/i)).toBeInTheDocument();
        });
        
        jest.useRealTimers();
    });

    test("does not call onComplete on wrong answer", () => {
        render(<StatsChallenge onComplete={mockOnComplete} />);
        
        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[1]); // Wrong answer
        
        expect(mockOnComplete).not.toHaveBeenCalled();
    });
});
