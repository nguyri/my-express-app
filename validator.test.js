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

test ('allValidTiles check', () => {
    expect(ExpressDemo.allValidTiles('b1b2b3c1c2c3m1m2m3drdrdrdgdg')).toBe(true);
});

test ('allValidTiles false check', () => {
    expect(ExpressDemo.allValidTiles('b1b2b3c1c2c3m1m2m3drdrdrdgde')).toBe(false);
});

test ('validLength check', () => {
    expect(ExpressDemo.validLength('b1b2b3c1c2c3m1m2m3drdrdrdgdg')).toBe(true);
});

test ('validLength false check', () => {
    expect(ExpressDemo.validLength('b1b2b3c1c2c3m1m2m3drdrdrdgdgdg')).toBe(false);
});