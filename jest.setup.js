import "@testing-library/jest-dom";

// jsdom provides a working localStorage. Start every test from an empty one.
beforeEach(() => {
    window.localStorage.clear();
});
