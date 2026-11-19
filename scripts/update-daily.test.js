/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { buildActivity, writeActivity, ACTIVITIES, QUOTES } = require('./update-daily');

describe('update-daily', () => {
    const fixedNow = new Date('2026-01-02T03:04:05.000Z');

    it('builds a record with the expected shape', () => {
        const a = buildActivity(fixedNow, () => 0);
        expect(a.date).toBe('2026-01-02');
        expect(a.lastUpdated).toBe('2026-01-02T03:04:05.000Z');
        expect(a.currentFocus).toBe(ACTIVITIES[0]);
        expect(a.dailyQuote).toBe(QUOTES[0]);
        expect(a.commitCount).toBe(1);
    });

    it('keeps commitCount within 1..10 and picks valid items', () => {
        const a = buildActivity(fixedNow, () => 0.999999);
        expect(a.commitCount).toBe(10);
        expect(ACTIVITIES).toContain(a.currentFocus);
        expect(QUOTES).toContain(a.dailyQuote);
    });

    it('writes JSON, creating missing directories', () => {
        const base = fs.mkdtempSync(path.join(os.tmpdir(), 'activity-'));
        const file = path.join(base, 'nested', 'out.json');
        const a = buildActivity(fixedNow, () => 0.5);
        writeActivity(file, a);
        expect(JSON.parse(fs.readFileSync(file, 'utf8'))).toEqual(a);
        fs.rmSync(base, { recursive: true, force: true });
    });
});
