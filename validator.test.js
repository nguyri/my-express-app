const E = require('./validator');

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

describe ('Function Tests', () => {

test("Hello World! Check", () => {
    expect(true).toBe(true);
});

test("validTile Check", () => {
    expect(E.validTile('b1')).toBe(true);
});

test ('validTile false check', () => {
    expect(E.validTile('bb')).toBe(false);
});

test ('allValidString check', () => {
    expect(E.allValidString('b1b2b3c1c2c3m1m2m3drdrdrdgdg')).toBe(true);
});

test ('allValidString false check', () => {
    expect(E.allValidString('b1b2b3c1c2c3m1m2m3drdrdrdgde')).toBe(false);
});

test ('validLength check', () => {
    expect(E.validLength('b1b2b3c1c2c3m1m2m3drdrdrdgdg')).toBe(true);
});

test ('validLength false check', () => {
    expect(E.validLength('b1b2b3c1c2c3m1m2m3drdrdrdgdgdg')).toBe(false);
});

test ('suitGroups check', () => {
    const expected = [['b1','b2','b3'],['c1','c2','c3'],['m1','m2','m3'],['d1','d1','d1','d2','d2']];
    const tiles = E.handTiles('b1b2b3c1c2c3m1m2m3dgdgdgdrdr');
    const result = E.suitGroups(tiles);
    console.log(result);
    expect(areNestedArraysEqual(expected, result)).toBe(true);
});

test ('getMelds check', () => {
    const singleSuitGroup = ['d1','d1','d1','d2','d2'];
    const result = E.getMelds(singleSuitGroup);
    const expected = [ [ 'd1', 'd1', 'd1' ], [ 'd2', 'd2' ] ];
    // console.log(result);
    expect(areNestedArraysEqual(result,expected)).toBe(true);
})

test ('getMelds check 2', () => {
    const singleSuitGroup = ['d2','d2','d2','d1','d1'];
    const expected = [ [ 'd2', 'd2','d2' ], [ 'd1', 'd1' ] ];
    const result = E.getMelds(singleSuitGroup);
    console.log(result);
    expect(areNestedArraysEqual(result,expected)).toBe(true);
})

test ('getMelds single check', () => {
    const singleSuitGroup = ['b1','b2','b3'];
    const result = E.getMelds(singleSuitGroup);
    const singleExpected = [['b1','b2','b3']];
    console.log('In test single:', result);
    expect(areNestedArraysEqual(singleExpected, result)).toBe(true);
})

test ('getMelds hand check', () => {
    const tiles = E.handTiles('b1b2b3c1c2c3m1m2m3dgdgdgdrdr');
    const suitGroups = E.suitGroups(tiles);
    console.log('In test:', suitGroups);
    const meldResults = suitGroups.map((group) => (E.getMelds(group)));
    const expected = [
        [['b1','b2','b3']],
        [['c1','c2','c3']],
        [['m1','m2','m3']], 
        [['d1','d1','d1'],['d2','d2']]
    ];

    console.log('In test:', meldResults);
    expect(areNestedArraysEqual(expected, meldResults)).toBe(true);
})

test ('getMeldsAndPair check', () => {
    const singleSuitGroup = ['d1','d1','d1', 'd2', 'd2'];
    const result = E.getMeldsAndPair(singleSuitGroup);
    const singleExpected = [['d1','d1','d1'],['d2','d2']];
    console.log('In test single:', result);
    expect(areNestedArraysEqual(singleExpected, result)).toBe(true);
})

test ('getMeldsAndPair check 2', () => {
    const singleSuitGroup = ['d2','d2','d2', 'd1', 'd1'];
    const result = E.getMeldsAndPair(singleSuitGroup);
    const singleExpected = [['d2','d2','d2'],['d1','d1']];
    console.log('In test single:', result);
    expect(areNestedArraysEqual(singleExpected, result)).toBe(true);
})

test ('getMeldsAndPair check 3', () => {
    const singleSuitGroup = ['d1','d1','d2', 'd2', 'd2'];
    const result = E.getMeldsAndPair(singleSuitGroup);
    const singleExpected = [['d2','d2','d2'],['d1','d1']];
    console.log('In test single:', result);
    expect(areNestedArraysEqual(singleExpected, result)).toBe(true);
})

test ('validMelds check', () => {
    const singleSuitGroup = ['b1','b2','b3'];
    const result = E.validMelds(singleSuitGroup);
    const singleExpected = [['b1','b2','b3']];
    // console.log(':', result);
    expect(areNestedArraysEqual(singleExpected, result)).toBe(true);
})

test ('validMelds double straight check', () => {
    const singleSuitGroup = ['b1','b2','b3','b2','b3','b4'];
    const result = E.validMelds(singleSuitGroup);
    const singleExpected = [['b1','b2','b3'],['b2','b3','b4']];
    console.log('result:', result);
    expect(areNestedArraysEqual(singleExpected, result)).toBe(true);
})

test ('validMelds identical check', () => {
    const singleSuitGroup = ['b1','b2','b3','b1','b2','b3'];
    const result = E.validMelds(singleSuitGroup);
    const singleExpected = [['b1','b2','b3'],['b1','b2','b3']];
    // console.log(':', result);
    expect(areNestedArraysEqual(singleExpected, result)).toBe(true);
})

test ('validMeld check 2', () => {
    const singleSuitGroup = ['b1','b2','b3'];
    const result = E.validMeld(singleSuitGroup);
    expect(result).toBe(true);
})


test ('validMeld check 3', () => {
    const singleSuitGroup = ['d1','d1','d1'];
    const result = E.validMeld(singleSuitGroup);
    expect(result).toBe(true);
})


test ('isStraight check', () => {
    const input = ['b1','b2','b3']
    expect(E.isStraight(input)).toBe(true);
})

test ('isStraight check 2', () => {
    const input = [1,2,3]
    expect(E.isStraight(input)).toBe(true);
})

test ('isStraight dragon check', () => {
    const input = ['d1','d2','d3']
    expect(E.isStraight(input)).toBe(false);
})

test ('isTriple check', () => {
    const input = ['b1','b1','b1']
    expect(E.isTriple(input)).toBe(true);
})

test ('isPair check', () => {
    const input = ['b1','b1']
    expect(E.isPair(input)).toBe(true);
})

test ('isHonor check', () => {
    expect(E.isHonor('dg')).toBe(true);
})

test ('isHonor false check', () => {
    expect(E.isHonor('b1')).toBe(false);
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
    const input = ['b','c']
    const subTile = [['b1','b2','b3'],['c1','c2','c3']];
    const result = E.getSuits(subTile);
    console.log(result);
    expect(areNestedArraysEqual(result,input)).toBe(true);
})

test ('getCombinations check', () => {
    const input = ['b1','b2','b3','b4'];
    const expected = [ [ 'b1', 'b2', 'b3' ], [ 'b1', 'b2', 'b4' ], [ 'b1', 'b3', 'b4' ], [ 'b2', 'b3', 'b4' ] ]
    const result = E.getCombinations(input, 3);
    expect(areNestedArraysEqual(result, expected)).toBe(true);
})


test ('getAllCombinations check 1', () => {
    const input = ['b1','b2','b3'];
    const expected = [ ['b1'], ['b2'], ['b3'], ['b1', 'b2'], ['b1', 'b3'], 
        ['b2', 'b3'], ['b1', 'b2', 'b3'] ];
    const result = E.getAllCombinations(input, 3);
    expect(areNestedArraysEqual(result, expected)).toBe(true);
})

test ('getAllCombinations check 2', () => {
    const input = [['b1','b2','b3'],['b1','b2','b3']];
    const expected = [ [['b1','b2','b3']],[['b1','b2','b3']], [['b1','b2','b3'],['b1','b2','b3']] ];
    //somewhat confusing but the entire meld ['b1','b2','b3'] is the element, and should be combined.
    const result = E.getAllCombinations(input, 2);
    console.log(result);
    expect(areNestedArraysEqual(result, expected)).toBe(true);
})

test ('getAllCombinations check 3', () => {
    const input = ['b1','b2','b3'];
    const expected = [ ['b1'], ['b2'], ['b3'], ['b1', 'b2'], ['b1', 'b3'], 
        ['b2', 'b3'], ['b1', 'b2', 'b3'] ];
    const result = E.getAllCombinations(input, 3);
    expect(areNestedArraysEqual(result, expected)).toBe(true);
})

test ('validSuit check', () => {
    expect(E.validSuit('b1')).toBe(true);
})

test ('validPair check', () => {
    const input = ['b1','b1']
    expect(E.validPair(input)).toBe(true);
})

test ('countMelds check', () => {
    const melds =  [[['b1','b2','b3']],[['c1','c2','c3']]];
    const result = E.countMelds(melds);
    expect(result === 2).toBe(true);
})

test ('countMelds hand check', () => {
    const melds =  [[['b1','b2','b3']],[['c1','c2','c3']], [['m1','m2','m3']], 
    [['d1','d1','d1'],['d2','d2']]];
    const result = E.countMelds(melds);
    console.log(result);
    expect(result === 4).toBe(true);
})

test ('countMelds hand check 2', () => {
    const melds =  [[['b1','b2','b3']],[['c1','c2','c3']], [['m1','m2','m3']], 
    [['d2','d2','d2'],['d1','d1']]];
    const result = E.countMelds(melds);
    console.log(result);
    expect(result === 4).toBe(true);
})

test ('countPairs hand check', () => {
    const melds =  [[['b1','b2','b3']],[['c1','c2','c3']], [['m1','m2','m3']], 
    [['d1','d1','d1'],['d2','d2']]];
    const result = E.countPairs(melds);
    console.log(result);
    expect(result === 1).toBe(true);
})

test ('riichi check', () => {
    const str = 'b1b2b3c1c2c3m1m2m3drdrdrdgdg';
    expect(E.riichi(str)).toBe(true);
})

test ('riichi check 2', () => {
    const str = 'b1b2b3c1c2c3m1m2m3dgdgdgdrdr';
    expect(E.riichi(str)).toBe(true);
})

test ('riichi check 3', () => {
    const str = 'b1b2b3m1m2m3c1c2c3dgdgdgb1b1';
    expect(E.riichi(str)).toBe(true);
})

test ('riichi straight pair overlap', () => {
    const str = 'b1b2b3m1m2m3c1c2c3dgdgdgb1b1';
    expect(E.riichi(str)).toBe(true);
})

test ('riichi check 2 straights overlap', () => {
    const str = 'b1b2b3b2b3b4m1m2m3c1c2c3dgdg';
    expect(E.riichi(str)).toBe(true);
})

test ('riichi check 2 straights 2 suits', () => {
    const str = 'b1b2b3b2b3b4m1m2m3m4m5m6dgdg';
    expect(E.riichi(str)).toBe(true);
})

test ('confirmMelds check', () => {
    const suitGroup = [ 'b1', 'b2', 'b2', 'b3', 'b3', 'b4' ];
    const melds = [ [ 'b1', 'b2', 'b3' ], [ 'b2', 'b3', 'b4' ] ];
    const result = E.confirmMelds(suitGroup, melds);
    const expected = true;
    expect(result === expected).toBe(true);
})

test ('confirmMelds false check', () => {
    const suitGroup = [ 'b1', 'b2', 'b2', 'b3', 'b3', 'b4' ];
    const melds = [ [ 'b2', 'b3', 'b4' ], [ 'b2', 'b3', 'b4' ] ];
    const result = E.confirmMelds(suitGroup, melds);
    const expected = false;
    expect(result).toBe(false);
})

test ('tileOrder check', () => {
    expect(E.tileOrder('b1','b2') === -1).toBe(true);
})

test ('replaceHonorNum check', () => {
    const result = E.replaceHonorNum('dg');
    console.log(result);
    expect(result === 'd1').toBe(true);
})

test ('replaceHonorNum check 2', () => {
    const result = E.replaceHonorNum('we');
    // console.log(result);
    expect( result === 'w2').toBe(true);
})

test ('numberTiles check', () => {
    const itm = E.handTiles('b1b2b3c1c2c3m1m2m3dgdgdgdrdr');
    const result = E.numberTiles(itm);
    const expected = [1,2,3,11,12,13,21,22,23,31,31,31,32,32]
    expect( areNestedArraysEqual(result, expected)).toBe(true);
})

test ('handTiles check', () =>  {
    const str = 'b1b2b3c1c2c3m1m2m3dgdgdgdrdr';
    const expected = ['b1','b2','b3','c1','c2','c3','m1','m2','m3','d1','d1','d1','d2','d2'];
    expect(areNestedArraysEqual(E.handTiles(str),expected)).toBe(true);
})
    
})

describe('Generated Hands Tests', () => {

test ('makeMeld check 1', () =>  {
    const tile = 'b1';
    const type = 1;
    const result = E.makeMeld(tile, type);
    const expected = ['b1','b2','b3'];
    expect(areNestedArraysEqual(result, expected)).toBe(true);
})

test ('makeMeld check 2', () =>  {
    const tile = 'b1';
    const type = 2;
    const result = E.makeMeld(tile, type);
    const expected = ['b1','b1','b1'];
    expect(areNestedArraysEqual(result, expected)).toBe(true);
})

test ('makeMeld check 3', () =>  {
    const tile = 'b1';
    const type = 3;
    const result = E.makeMeld(tile, type);
    const expected = ['b1','b1'];
    expect(areNestedArraysEqual(result, expected)).toBe(true);
})

test ('makeMeld check 4', () =>  {
    const tile = 'dg';
    const type = 1;
    const result = E.makeMeld(tile, type);
    expect(result).toBe(false);
})

test ('makeRandomHand check', () => {
    const tiles = E.makeRandomHand();
    console.log('tiles', tiles);
    const result = tiles.every((tile) => E.validTile(tile));
    expect(result).toBe(true);
})

test.each(new Array(100).fill(null))('makeRandomHand x100 and riichi check', () => {
    const tiles = E.makeRandomHand();
    const result = tiles.every((tile) => E.validTile(tile));
    tiles.sort((tileA, tileB) => E.tileOrder(tileA, tileB))
    
    const riichi = E.riichi(tiles);
    expect(riichi, 'riichi failed with tiles: ' + tiles).toBe(true);
})

test ('handTiles generated check 1', () => {
    const str = 'm7,m8,m9,b7,b8,b9,w4,w4,w4,c4,c5,c6,b8,b8';
    expect(E.riichi(str)).toBe(true);
})
 
test ('handTiles generated check 2', () => {
    const str = 'b6,b7,b8,c5,c5,c5,b6,b7,b8,c4,c5,c6,d2,d2';
    expect(E.riichi(str, true)).toBe(true);
})

test ('handTiles generated check 3', () => {
    const str = 'c3,c4,c5,c4,c5,c6,b2,b2,b2,c1,c2,c3,b8,b8';
    expect(E.riichi(str, true)).toBe(true);
})

test ('handTiles generated check 4', () => {
    const str = 'c5,c6,c7,c3,c3,c3,c7,c7,c7,b8,b8,b8,c6,c6';
    expect(E.riichi(str, true)).toBe(true);
})

test ('handTiles generated check 5', () => {
    const str = 'd2,d2,d2,m1,m2,m3,c9,c9,c9,w3,w3,w3,m1,m1';
    expect(E.riichi(str, true)).toBe(true);
})

test.only ('handTiles generated check 6', () => {
    const str = 'b4,b4,b4,b8,b8,c4,c5,c6,m2,m2,m3,m3,m4,m4';
    expect(E.riichi(str, true)).toBe(true);
})

})