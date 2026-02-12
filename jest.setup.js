import "@testing-library/jest-dom";

// Mock localStorage for tests
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};

global.localStorage = localStorageMock as any; // eslint-disable-line @typescript-eslint/no-explicit-any
