// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/data/daily-activity.json');

const ACTIVITIES = [
    "Refactoring backend services",
    "Optimizing frontend performance",
    "Learning new AI patterns",
    "Updating project documentation",
    "Fixing bugs in legacy code",
    "Designing new UI components"
];

const QUOTES = [
    "Code is like humor. When you have to explain it, it’s bad.",
    "First, solve the problem. Then, write the code.",
    "Make it work, make it right, make it fast.",
    "Simplicity is the soul of efficiency.",
    "Before software can be reusable it first has to be usable."
];

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateActivity() {
    const today = new Date().toISOString().split('T')[0];

    const activity = {
        date: today,
        lastUpdated: new Date().toISOString(),
        currentFocus: getRandomItem(ACTIVITIES),
        dailyQuote: getRandomItem(QUOTES),
        commitCount: Math.floor(Math.random() * 10) + 1
    };

    try {
        // Ensure directory exists
        const dir = path.dirname(DATA_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(DATA_FILE, JSON.stringify(activity, null, 2));
        console.log('Successfully generated daily activity:', activity);
    } catch (error) {
        console.error('Error writing daily activity:', error);
        process.exit(1);
    }
}

generateActivity();
