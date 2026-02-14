const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/data/daily-activity.json');

function updateActivity() {
    // Ensure data directory exists
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    let activity = {
        lastActive: new Date().toISOString(),
        codingStreak: 0,
        totalCommits: 0,
        projectViews: {}
    };

    if (fs.existsSync(DATA_FILE)) {
        try {
            activity = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        } catch (e) {
            // Keep default
        }
    }

    // Update timestamp
    activity.lastActive = new Date().toISOString();

    // Simulate streak increment
    activity.codingStreak += 1;

    // Simulate commit count increment
    activity.totalCommits += Math.floor(Math.random() * 5) + 1;

    // Simulate project views
    const projects = ['msme-connect', 'learning-style', 'fleet-manager', 'defi-dashboard'];
    const randomProject = projects[Math.floor(Math.random() * projects.length)];

    if (!activity.projectViews[randomProject]) {
        activity.projectViews[randomProject] = 0;
    }
    activity.projectViews[randomProject] += Math.floor(Math.random() * 10) + 1;

    fs.writeFileSync(DATA_FILE, JSON.stringify(activity, null, 2));
    console.log(`Updated profile activity: Streak ${activity.codingStreak}, Commits ${activity.totalCommits}`);
}

updateActivity();
