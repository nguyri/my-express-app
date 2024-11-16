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

test ('hasMeld single check', () => {
    const singleSuitGroup = ['b1','b2','b3'];
    const result = E.hasMeld(singleSuitGroup);
    const singleExpected = [['b1','b2','b3']];
    console.log('In test single:', result);
    expect(areNestedArraysEqual(singleExpected, result)).toBe(true);
})

test ('hasMeld hand check', () => {
    const expected = [true, true, true, true];
    const tiles = E.handTiles('b1b2b3c1c2c3m1m2m3dgdgdgdrdr');
    const suitGroups = E.suitGroups(tiles);
    console.log('In test:', suitGroups);
    const meldResults = suitGroups.map((group) => (E.hasMeld(group)));

    console.log('In test:', meldResults);
    // expect(areNestedArraysEqual(expected, meldResults)).toBe(true);

    const singleSuitGroup = ['b1','b2','b3'];
    const result = E.hasMeld(singleSuitGroup);
    const singleExpected = [['b1','b2','b3']];
    console.log('In test single:', result);
    expect(areNestedArraysEqual(singleExpected, result)).toBe(true);
})

test ('hasMeldAndPair check', () => {
    expect(false).toBe(true);
    //todo
})

test ('validMelds check', () => {
    const singleSuitGroup = ['b1','b2','b3'];
    const result = E.validMelds(singleSuitGroup);
    const singleExpected = [['b1','b2','b3']];
    // console.log(':', result);
    expect(areNestedArraysEqual(singleExpected, result)).toBe(true);
})

test ('validMeld check', () => {
    const singleSuitGroup = ['b1','b2','b3'];
    const result = E.validMeld(singleSuitGroup);
    expect(result).toBe(true);
})

test ('isStraight check', () => {
    const input = ['b1','b2','b3']
    expect(E.isStraight(input)).toBe(true);
})

test ('isTriple check', () => {
    const input = ['b1','b1','b1']
    expect(E.isTriple(input)).toBe(true);
})

test ('inputIsTiles check', () => {
    const input = ['b1','b2','b3'];
    expect(E.inputIsTiles(input)).toBe(true);
})

test ('getNumbers check', () => {
    const input = [1,2,3]
    const subTile = ['b1','b2','b3'];
    expect(areNestedArraysEqual(E.getNumbers(subTile),input)).toBe(true);
})

test ('getSuits check', () => {
    const input = [b,c]
    const subTile = [['b1','b2','b3'],['c1','c2','c3']];
    expect(areNestedArraysEqual(E.getSuits(subTile),input)).toBe(true);
})

test ('validSuit check', () => {
    expect(E.validSuit('b1')).toBe(true);
})

test ('validPair check', () => {
    const input = ['b1','b1']
    expect(E.validPair(input)).toBe(true);
})

test ('riichi check', () => {
    const str = 'b1b2b3c1c2c3m1m2m3dgdgdgdrdr';
    expect(E.riichi(str)).toBe(true);
})

test ('tileOrder check', () => {
    expect(E.tileOrder('b1','b2') === -1).toBe(true);
})

test ('handTiles check', () =>  {
    const str = 'b1b2b3c1c2c3m1m2m3dgdgdgdrdr';
    const expected = ['b1','b2','b3','c1','c2','c3','m1','m2','m3','dg','dg','dg','dr','dr'];
    expect(areNestedArraysEqual(E.handTiles(str),expected)).toBe(true);
})