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

function getRandomItem(array, random = Math.random) {
    return array[Math.floor(random() * array.length)];
}

/**
 * Build one day's activity record. Values are randomly chosen, not measured.
 * `now` and `random` are injectable so the function can be tested.
 */
function buildActivity(now = new Date(), random = Math.random) {
    return {
        date: now.toISOString().split('T')[0],
        lastUpdated: now.toISOString(),
        currentFocus: getRandomItem(ACTIVITIES, random),
        dailyQuote: getRandomItem(QUOTES, random),
        commitCount: Math.floor(random() * 10) + 1
    };
}

/** Write the activity as JSON, creating the parent directory if needed. */
function writeActivity(file, activity) {
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(file, JSON.stringify(activity, null, 2));
}

function main() {
    const activity = buildActivity();
    try {
        writeActivity(DATA_FILE, activity);
        console.log('Successfully generated daily activity:', activity);
    } catch (error) {
        console.error('Error writing daily activity:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { buildActivity, writeActivity, ACTIVITIES, QUOTES };
