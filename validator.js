

function validTile (tile) {
    let validSuit = ['b','c','m', 'd', 'w']
    let validDragon = ['r','w','g']
    let validWind = ['n','e','s','w']
    if (tile.length != 2) return false;
    let suit = tile.at(0);
    let value = tile.at(1);
    if (!validSuit.some(valid => valid === suit)) return false;
  
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

function hasMeld(suitGroup) {
    // console.log('suitGroup: ', suitGroup);
    const remainder = suitGroup.length % 3;
    if (remainder == 1) return; // no valid options if remainder is 1
    if (remainder == 2) return hasMeldsAndPair(suitGroup);
    if (remainder == 0) return validMelds(suitGroup);
}

function hasMeldsAndPair(suitGroup) {
    // same problem with validMelds.. just put the first and see if validMelds works
    // input has n*3 with 2 remainder, shove the first n*3 into validMelds
    console.log(suitGroup);
    const meldableLength = suitGroup.length - 2;
    const melds = validMelds(suitGroup.slice(0, meldableLength));
    console.log(suitGroup.slice(0, meldableLength));
    console.log(melds);
    const pair = suitGroup.slice(meldableLength, suitGroup.length);
    console.log(pair);
    console.log(melds);
    melds.push(isPair(pair) && pair);
    console.log(melds);
    return melds;
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
    const numbers = getNumbers(subTile);
    return numbers[0] + 2 === numbers[1] + 1 && numbers[1] + 1 === numbers[2]
}

function isTriple(subTile) {
    if (subTile.length != 3) return false;
    const numbers = getNumbers(subTile);
    return numbers[0] === numbers[1] && numbers[1] === numbers[2]
}

function isPair(subTile) {
    if (subTile.length != 2) return false;
    const numbers = getNumbers(subTile);
    return numbers[0] === numbers[1]
}

function inputIsTiles(input) {
    if(!Array.isArray(input)) return false;
    return input.every((tile) => validTile(tile));
}

function getNumbers(subTile) {
    let numbers = []
    // honor numbers could be dgr, nesw 
    if (!subTile.every((tile) => tile.length === 2)) return;
    subTile.forEach((tile) => numbers.push(parseInt(tile.charAt(1))));
    return numbers;
}

function getSuits(subTile) {
    let suits = []
    subTile.forEach((tile) => {
        if (validSuit(tile) && !suits.includes(tile.charAt(0)))
            suits.push(tile.charAt(0));
    });
    return suits;
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

function riichi (handStr) {
    const tiles = handTiles(handStr)
    const suits = suitGroups(tiles);
    console.log('suits: ', suits)
    const melds = suits.map((suit) => hasMeld(suit))
    console.log('melds: ', melds);
    // validPair needs to be run on a subset of tiles
    if (melds && melds.length === 4 && validPair(tiles)) return true;
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
    const dragons = {g:1, r:2, w:3}
    const winds = {n:1, e:2, s:3, w:4}
    const suit = tile.charAt(0)
    const honorNum = tile.charAt(1)
    console.log(tile, suit, honorNum)
    if (suit === 'd') return `d${dragons[honorNum]}`
    if (suit === 'w') return `w${winds[honorNum]}`
    return;
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

module.exports = {validTile, allValidTiles, validLength, suitGroups, hasMeld, hasMeldAndPair: hasMeldsAndPair, 
    validMelds, validMeld, isStraight, isTriple, isPair, getNumbers, getSuits, validSuit, validPair, riichi,
    replaceHonorNum, tileOrder, handTiles,inputIsTiles,
}