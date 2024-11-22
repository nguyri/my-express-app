

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
  
function allValidString (handStr) {
    const tiles = handTiles(handStr);
    // console.log(tiles);
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
    const remainder = suitGroup.length % 3;
    if (remainder == 1) return; // no valid options if remainder is 1
    if (remainder == 2) return getMeldsAndPair(suitGroup); // remainder has to be a pair
    if (remainder == 0) return validMelds(suitGroup);
}

function getMeldsAndPair(suitGroup) {
    // find pairs. For each that exist, put the rest of the tiles into validMelds
    const pairs = getCombinations(suitGroup, 2).filter((combi) => isPair(combi));
    const uniquePairs = [...new Set(pairs.map(pair => pair[0]))];

    const meldset = []
    uniquePairs.forEach((pair) => {
        let removedCount = 0;
        const pairless = suitGroup.filter(item => {
            if(item === pair && removedCount < 2) { 
                removedCount++;
                return false; // ignore this tile that matches pair
            } 
            return true; // keep this tile
        })
        // for now melds has this pattern.. [[d1,d1,d1],[d2,d2]]
        // console.log('pairless:', pairless)
        meldset.push([...validMelds(pairless), [pair, pair]]);
    })
    meldset.sort((meldsetA, meldsetB) => meldsetA.flat(5).length > meldsetB.flat(5).length ? -1: 1);
    // console.log('meldset', meldset);
    return meldset[0];
}

function confirmMelds(suitGroup, meldSet) {
    meldSet = meldSet.flat();
    suitGroup = suitGroup.flat();
    // console.log('meldset: ', meldSet);
    // console.log('suitgroup: ', suitGroup);
    const result = [...suitGroup] 
    for (const tile of meldSet) {
        const index = result.indexOf(tile);
        if (index !== -1) {
            result.splice(index, 1); // remove 1 instance of tile
        } else return false;
    }
    // console.log(result, "all tiles found");
    return true;
}

function validMelds(suitGroup) {
    // make a list of all possible straights and triples
    // make all combinations of melds up to the max amount possible
    // check each combination and return the first (for now) largest combination
    if(suitGroup.length === 0 ) return [];
    const maxMelds = suitGroup.length / 3; // max melds possible
    const straights = getCombinations(suitGroup, 3).filter((combi) => isStraight(combi));
    const triples = getCombinations(suitGroup, 3).filter((combi) => isTriple(combi));
    let uniqueStraights = straights.filter((value, index, self) => 
        index === self.findIndex((t) => JSON.stringify(t) === JSON.stringify(value)));
    const uniqueTriples = triples.filter((value, index, self) => 
        index === self.findIndex((t) => JSON.stringify(t) === JSON.stringify(value)));
    
    // console.log('straights: ', straights)
    // console.log('triples: ', triples)
    // console.log('unique straights: ', uniqueStraights)
    // console.log('unique triples: ', uniqueTriples)
    
    // straights may be duplicated, but triples cannot (not enough tiles)
    // in this case uniqueStraights will be 1 meld but length is 6. But this is not enough to distinguish 2 identical straights, i.e. straight and triple in the suit
    // confirmMelds already provides functionality to check if melds exist in a hand, so skip a few steps and see if two identical melds exist
    // index starts with checking 2 identical straights
    for(let i = 2; i <= maxMelds; i++) {
        uniqueStraights.forEach((straight, index) => {
            const straightsMeldSet = Array(i).fill(straight);
            // console.log('in uniqueStraights')
            // console.log('straightMeldSet: ', straightsMeldSet)
            if ( confirmMelds(suitGroup, straightsMeldSet)) {
                // if 1+ identical straights are confirmed, add it to the "unique melds". 
                // why this way? so that the identical straight is added to all possible combinations
                for( let j = 0; j < i; j++ )
                    uniqueStraights.push(straight); 
            }
        })
    }
    
    const possibleMelds = [...uniqueStraights, ...uniqueTriples];
    const possibleMeldSets = getAllCombinations(possibleMelds, maxMelds);
    const confirmedMeldSets = possibleMeldSets.filter((meldset) => confirmMelds(suitGroup, meldset))
    const orderedMeldSets = confirmedMeldSets.sort((msA, msB) => msA.length < msB.length ? 1: -1);
    // console.log('uniqueStraights: ', uniqueStraights);
    // console.log('possibleMelds:', possibleMelds)
    // console.log('possibleMeldSets: ', possibleMeldSets);
    // console.log('confirmedMeldSets: ', confirmedMeldSets);
    // console.log('orderedMeldSets', orderedMeldSets)
    return orderedMeldSets[0] ? orderedMeldSets[0] : [];
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
    // console.log(groups);
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

function getAllCombinations(suitGroup, maxSize) {
    const allCombinations = [];
    for(let size = 1; size <= maxSize; size++) {
        allCombinations.push(...getCombinations(suitGroup, size));
    }
    // console.log('allCombinations:', allCombinations);
    return allCombinations;
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

function riichi (handStr, printMelds) {
    const tiles = Array.isArray(handStr) ? handStr : handTiles(handStr);
    
    const suits = suitGroups(tiles);
    const melds = suits.map((suit) => getMelds(suit))

    // console.log('tiles: ', tiles);
    // console.log('suits: ', suits)
    // console.log('melds: ', melds);
    // validPair needs to be run on a subset of tiles

    printMelds && console.log('melds from riichi: ', melds);
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

function numberTile(tile) {
    // accepts ['b1','b2','c1'...', 'dg'] or [..'d1'] format tiles 
    // returns [1,2,10...]. 1-9 bamboo, 11-19 circle, 21-29 man, 31-33 dragon, 41-44 wind
    const faceValue = {b:0, c:10, m:20, d:30, w:40}
    return faceValue[tile.charAt(0)] + parseInt(tile.charAt(1));
}

function numberTiles(tiles) {
    const numberTiles = tiles.map((tile) => numberTile(tile))
    return numberTiles;
}

function tileFromNumber(number) {
    const suitMapping = {0: 'b', 10: 'c', 20: 'm', 30: 'd', 40: 'w'};
    const suitValue = Math.floor(number / 10) * 10; 
    const suit = suitMapping[suitValue];

    const tile = suit + (number % 10);
    if ( !validTile(tile) ) return false;
    return tile;
}

function handTiles (handStr) {
    handStr = handStr.replace(/[\s\p{P}]/gu, '')
    // console.log(handStr);
    if (handStr.length != 28) { console.error("Hand length was not 28"); return false; } 

    const tiles = [];
    for (let i = 0; i < handStr.length; i+=2) {
        let tile = handStr.slice(i, i + 2).toLowerCase()
        tile = replaceHonorNum(tile);
        tiles.push(tile);
      }
    tiles.sort((tileA, tileB) => tileOrder(tileA, tileB))
    return tiles;
}

function makeMeld(tile, type) {
    //type 1: straight, type 2: triple, type 3: pair
    const tileNum = numberTile(tile);
    // console.log('make meld:', tile, type);
    if (type === 1) {
        if ( isHonor(tile) ) return false;
        return [tile, tileFromNumber(tileNum + 1), tileFromNumber(tileNum + 2)]; 
    }
    if (type == 2) return [tile, tile, tile];
    if (type == 3) return [tile, tile];
    return false;
}

function makeRandomHand() {
    //map available melds and pairs to ints
    // triples 1-9 bamboo, 11-19 circle, 21-29 man, 31-33 dragon, 41-44 wind
    // pick  5 tiles for melds
    function fiveInHand(array) {
        const freqMap = new Map();
        for (const item of array) {
            const count = (freqMap.get(item) || 0) + 1;
            // console.log('freqmap: ', freqMap, array)
            if (count >= 5) return true;
            freqMap.set(item, count);
        }
        return false;
    }
    const max = 44, min = 1;
    let randomTiles = []
    let tiles = []
    do {
        randomTiles = [];
        tiles = [];
        while(randomTiles.length < 5) {
            const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            const tile = tileFromNumber(randomNum)
            if ( tile ) randomTiles.push(tile);
        }
        // console.log(randomTiles);
        for(let i = 0; i < 4; i++) {
            if ( isHonor ( randomTiles[i] ) )  tiles.push (...makeMeld(randomTiles[i], 2)); // honor can only be triple
            else {
                let rand = 2;
                if (randomTiles[i].charAt(1) <= 7)
                    rand = Math.floor(( Math.random() * 2 ) + 1);   
                tiles.push(...makeMeld(randomTiles[i] , rand));
            }
        }
    
        tiles.push(...makeMeld(randomTiles[4] , 3));  // add the pair
    } while (fiveInHand(tiles))

    return tiles;
    
}

module.exports = {validTile, allValidString, validLength, suitGroups, getMelds, getMeldsAndPair, 
    validMelds, validMeld, isStraight, isTriple, isPair, getNumbers, getSuits, validSuit, validPair, riichi,
    replaceHonorNum, tileOrder, handTiles,inputIsTiles, countMelds, countPairs, numberTiles, isHonor, getCombinations,
    getAllCombinations, confirmMelds, makeRandomHand, makeMeld

}