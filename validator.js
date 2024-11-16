

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
    if (remainder == 2) return hasMeldAndPair(suitGroup);
    if (remainder == 0) return validMelds(suitGroup);
}

function hasMeldAndPair(suitGroup) {
    //todo
    validMelds(suitGroup);
    return true;
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
    console.log(numbers);
    console.log(numbers[0] + 2);
    console.log(numbers[1] + 1);
    console.log(numbers[2]);
    return numbers[0] + 2 === numbers[1] + 1 && numbers[1] + 1 === numbers[2]
}

function isTriple(subTile) {
    if (subTile.length != 3) return false;
    const numbers = getNumbers(subTile);
    return numbers
}

function inputIsTiles(input) {
    if(!Array.isArray(input)) return false;
    return input.every((tile) => validTile(tile));
}

function getNumbers(subTile) {
    let numbers = []
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

function handTiles (handStr) {
    if (handStr.length != 28) return false;
    const tiles = [];
    for (let i = 0; i < handStr.length; i+=2) {
        tiles.push(handStr.slice(i, i + 2).toLowerCase());
      }
    tiles.sort((tileA, tileB) => tileOrder(tileA, tileB))
    return tiles;
}

module.exports = {validTile, allValidTiles, validLength, suitGroups, hasMeld, hasMeldAndPair, 
    validMelds, validMeld, isStraight, isTriple, getNumbers, getSuits, validSuit, validPair, riichi, tileOrder, handTiles,
    inputIsTiles,
}