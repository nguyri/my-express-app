const ExpressDemo = require('./validator');

test("Hello World! Check", () => {
    expect(true).toBe(true);
});

test("isValid Check", () => {
    expect(ExpressDemo.validTile('b1')).toBe(true);
});

test ('isValid false check', () => {
    expect(ExpressDemo.validTile('bb')).toBe(false);
});

test ('validHand check', () => {
    expect(ExpressDemo.validHand('b1b2b3c1c2c3m1m2m3drdrdrdgdg')).toBe(true);
});

test ('validHand false check', () => {
    expect(ExpressDemo.validHand('b1b2b3c1c2c3m1m2m3drdrdrdgde')).toBe(false);
});