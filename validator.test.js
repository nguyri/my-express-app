const E = require('./validator');


test("Hello World! Check", () => {
    expect(true).toBe(true);
});

test("validTile Check", () => {
    expect(E.validTile('b1')).toBe(true);
});

test ('validTile false check', () => {
    expect(E.validTile('bb')).toBe(false);
});

test ('allValidTiles check', () => {
    expect(E.allValidTiles('b1b2b3c1c2c3m1m2m3drdrdrdgdg')).toBe(true);
});

test ('allValidTiles false check', () => {
    expect(E.allValidTiles('b1b2b3c1c2c3m1m2m3drdrdrdgde')).toBe(false);
});

test ('validLength check', () => {
    expect(E.validLength('b1b2b3c1c2c3m1m2m3drdrdrdgdg')).toBe(true);
});

test ('validLength false check', () => {
    expect(E.validLength('b1b2b3c1c2c3m1m2m3drdrdrdgdgdg')).toBe(false);
});

function areNestedArraysEqual(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
  
    if (arr1.length !== arr2.length) return false;
  
    for (let i = 0; i < arr1.length; i++) {
      const val1 = arr1[i];
      const val2 = arr2[i];
  
      if (Array.isArray(val1) && Array.isArray(val2)) {
        if (!areNestedArraysEqual(val1, val2)) return false;
      } else if (val1 !== val2) {
        return false;
      }
    }
  
    return true;
  }

test ('suitGroups check', () => {
    const expected = [['b1','b2','b3'],['c1','c2','c3'],['m1','m2','m3'],['dg','dg','dg','dr','dr']];
    const tiles = E.handTiles('b1b2b3c1c2c3m1m2m3dgdgdgdrdr');
    const result = E.suitGroups(tiles);
    console.log(result);
    expect(areNestedArraysEqual(expected, result)).toBe(true);
});