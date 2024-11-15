

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

function suitGroups(tiles) {
    let validSuit = ['b','c','m','d','w']
    let suits = []
    tiles.forEach((tile) => {
        const index = validSuit.findIndex((suit) => suit == tile[0]);
        suits[index] ? suits[index].push(tile) : suits[index] = [tile];
    })
    return suits;
}

function validMeld(subTile) {
    console.log('subTile: ', subTile);
    if (subTile.length % 3 != 0) return; // doesn't work for drdrdrdgdg
    return subTile;
}

function validPair(subTile) {
    return true;
}

function riichi (handStr) {
    const tiles = handTiles(handStr)
    const suits = suitGroups(tiles);
    console.log('suits: ', suits)
    // only interprets first available set of melds
    const melds = suits.map((suit) => validMeld(suit))
    console.log('melds: ', melds);
    // validPair needs to be run on a subset of tiles
    if (melds && melds.length === 4 && validPair(tiles)) return true;
    return false;
}

function validLength (handStr) {
    return handStr.length === 28; 
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
module.exports = {allValidTiles, validLength, riichi};