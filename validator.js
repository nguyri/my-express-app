

function validTile (tile) {
    //dg or d1 acceptable..
    let validSuit = ['b','c','m', 'd', 'w']
    let validDragon = ['r','w','g']
    let validWind = ['n','e','s','w']
    if (tile.length != 2) return false;
    let suit = tile.at(0);
    let value = tile.at(1);
    if (!validSuit.some(valid => valid === suit)) return false;
    
    const parsed = parseInt(value)
    if( parsed && suit === 'd') return ( parsed >= 1 && parsed <=3 )
    if( parsed && suit === 'w' ) return ( parsed >= 1 && parsed <=4 )

    if ( suit === 'd' ) return (validDragon.some(valid => valid === value))
    if ( suit === 'w' ) return (validWind.some(valid => valid === value))
  
    return 0 < value && value < 10;
  }
  
function allValidTiles (handStr) {
    const tiles = handTiles(handStr);
    console.log(tiles);
    let allValid = tiles.every(tile => validTile(tile));
    return allValid;
  }

function validLength (handStr) {
    return handStr.length === 28; 
}

function suitGroups(tiles) {
    if (!inputIsTiles(tiles)) return;
    let validSuit = ['b','c','m','d','w']
    let suits = []
    tiles.forEach((tile) => {
        const index = validSuit.findIndex((suit) => suit == tile[0]);
        suits[index] ? suits[index].push(tile) : suits[index] = [tile];
    })
    return suits;
}

function getMelds(suitGroup) {
    // console.log('suitGroup: ', suitGroup);
    const remainder = suitGroup.length % 3;
    if (remainder == 1) return; // no valid options if remainder is 1
    if (remainder == 2) return getMeldsAndPair(suitGroup);
    if (remainder == 0) return validMelds(suitGroup);
}

function getMeldsAndPair(suitGroup) {
    // find pairs. For each that exist, put the rest of the tiles into validMelds
    const pairs = getCombinations(suitGroup, 2).filter((combi) => isPair(combi));
    // only the first number is needed to identify a pair
    const uniquePairs = [...new Set(pairs.map(pair => pair[0]))];
    // console.log('uniquePairs:', uniquePairs);

    const meldset = []
    uniquePairs.forEach((pair) => {
        let removedCount = 0;
        const pairless = suitGroup.filter(item => {
            if(item === pair && removedCount < 2) { 
                removedCount++;
                return false;
            } 
            return true;
        })
        // for now melds has this pattern.. [[d1,d1,d1],[d2,d2]]
        meldset.push([...validMelds(pairless), [pair, pair]]);
    })
    // console.log('meldset', meldset);
    meldset.sort((meldsetA, meldsetB) => meldsetA.flat(5).length > meldsetB.flat(5).length ? -1: 1);
    return meldset[0];
}

function validMelds(suitGroup) {
    // input should be matching suits divisible by 3
    // naively pick the first set for now
    let melds = []
    for(let i = 0; i < suitGroup.length / 3; i++) {
        melds.push(suitGroup.slice(i, i + 3));
    }
    console.log('validMelds: ', melds);
    return melds.map(meld => validMeld(meld) && meld);
}

function validMeld(subTile) {
    return isTriple(subTile) || isStraight(subTile);
}

function isStraight(subTile) {
    // subTile is ordered
    if (subTile.length != 3) return false;
    let numbers = subTile;
    if(isNaN(subTile[0]))
        numbers = getNumbers(subTile);
    if(isHonor(subTile[0]))
        return false;
    return numbers[0] + 2 === numbers[1] + 1 && numbers[1] + 1 === numbers[2]
}

function isTriple(subTile) {
    if (subTile.length != 3) return false;
    let numbers = subTile;
    if(isNaN(subTile[0]))
        numbers = getNumbers(subTile);
    return numbers[0] === numbers[1] && numbers[1] === numbers[2]
}

function isPair(subTile) {
    if (subTile.length != 2) return false;
    let numbers = subTile;
    if(isNaN(subTile[0]))
        numbers = getNumbers(subTile);
    return numbers[0] === numbers[1]
}

function isHonor(tile) {
    if (tile.length != 2) return false;
    return tile.charAt(0) === 'd' || tile.charAt(0) === 'w'
}

function inputIsTiles(input) {
    if(!Array.isArray(input)) return false;
    return input.every((tile) => validTile(tile));
}

function getNumbers(subTile) {
    // does not work for dg, dr, nesw format tiles, use handTiles (automatically returns d1) or replaceHonorNums
    let numbers = []
    if (!subTile.every((tile) => tile.length === 2)) return;
    subTile.forEach((tile) => numbers.push(parseInt(tile.charAt(1))));
    return numbers;
}

function getSuits(groups) {
    //either a nested array or an array with a single suited group in it
    let suits = []
    console.log(groups);
    groups.forEach((group) => {
        if (group.length < 1) return;
        const tile = group.at(0)
        if (suits.length === 0 && validSuit(tile)) {suits.push(tile.charAt(0))};
        if (validSuit(tile) && !suits.includes(tile.charAt(0)))
            suits.push(tile.charAt(0));
    });
    return suits;
}

function getCombinations(suitGroup, size) {
    const result = [];

    function combine(start, combination) {
        if (combination.length === size) {
            result.push([...combination]);
            return;
        }
        for (let i = start; i < suitGroup.length; i++) {
            combination.push(suitGroup[i]);
            combine(i + 1, combination);
            combination.pop();
        }
    }

    combine(0,[]);
    return result;
}

function validSuit(tile) {
    if (tile.length !== 2) return false;
    const validSuit = ['b','c','m','d','w']
    return validSuit.includes(tile.charAt(0));
}

function validPair(subTile) {
    if (subTile.length !== 2) return false
    return subTile[0] === subTile[1];
}

function countMelds(melds) {
    //melds output is an array of meld arrays. 1 flatten gets rid of the melds groups
    let count = 0;
    melds = melds.flat(1);
    melds.forEach((meld) => {
        if(meld.length === 3) count++;
    });
    return count;
}

function countPairs(melds) {
    //melds output is an array of meld arrays. 1 flatten gets rid of the melds groups
    let count = 0;
    melds = melds.flat(1);
    melds.forEach((meld) => {
        if(meld.length === 2) count++;
    });
    return count;
}

function riichi (handStr) {
    const tiles = handTiles(handStr)
    console.log('tiles: ', tiles);
    const suits = suitGroups(tiles);
    console.log('suits: ', suits)
    const melds = suits.map((suit) => getMelds(suit))
    console.log('melds: ', melds);
    // validPair needs to be run on a subset of tiles

    if (melds && countMelds(melds) === 4 && countPairs(melds) === 1) return true;
    return false;
}
  // useful functions for setting up and checking hands.

function tileOrder (tileA, tileB) {
    // tiles are b1, c1, m1, dg, ww. It's alphabetical except for d. 
    let tileC = tileA.replace('d','p');
    let tileD = tileB.replace('d','p');
    return tileC < tileD ? -1 : 1;
}

function replaceHonorNum(tile) {
    if (tile.length != 2) return;
    const suit = tile.charAt(0)
    const value = tile.charAt(1)
    if(parseInt(value)) return tile;

    const dragons = {g:1, r:2, w:3}
    const winds = {n:1, e:2, s:3, w:4}
    console.log(tile, suit, value)
    if (suit === 'd') return `d${dragons[value]}`
    if (suit === 'w') return `w${winds[value]}`
    return;
}

function numberTiles(tiles) {
    // accepts ['b1','b2','c1'...', 'dg'] or [..'d1'] format tiles 
    // returns [1,2,10...]. 1-9 bamboo, 11-19 circle, 21-29 man, 31-33 dragon, 41-44 wind
    const faceValue = {b:0, c:10, m:20, d:30, w:40}
    const numberTiles = tiles.map((tile) => {
        return faceValue[tile.charAt(0)] + parseInt(tile.charAt(1));
    })
    return numberTiles;
}

function handTiles (handStr) {
    if (handStr.length != 28) return false;

    const tiles = [];
    for (let i = 0; i < handStr.length; i+=2) {
        let tile = handStr.slice(i, i + 2).toLowerCase()
        tile = replaceHonorNum(tile);
        tiles.push(tile);
      }
    tiles.sort((tileA, tileB) => tileOrder(tileA, tileB))
    return tiles;
}

module.exports = {validTile, allValidTiles, validLength, suitGroups, getMelds, getMeldsAndPair, 
    validMelds, validMeld, isStraight, isTriple, isPair, getNumbers, getSuits, validSuit, validPair, riichi,
    replaceHonorNum, tileOrder, handTiles,inputIsTiles, countMelds, countPairs, numberTiles, isHonor, getCombinations,

}