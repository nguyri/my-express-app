

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
    // valid format is b1b2b3c1c2c3m1m2m3drdrdrdgdg, 4 melds one pair. Start with making sure tiles are valid
    
    const tiles = hand(handStr);
    console.log(tiles);
    let allValid = tiles.every(tile => validTile(tile));
    return allValid;
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

function hand (handStr) {
    if (handStr.length != 28) return false;
    const tiles = [];
    for (let i = 0; i < handStr.length; i+=2) {
        tiles.push(handStr.slice(i, i + 2).toLowerCase());
      }
    tiles.sort((tileA, tileB) => tileOrder(tileA, tileB))
    return tiles;
}
module.exports = {validTile, allValidTiles, validLength};