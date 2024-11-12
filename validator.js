

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
  
function validHand (handStr) {
    // valid format is b1b2b3c1c2c3m1m2m3drdrdrdgdg, 4 melds one pair. Start with making sure tiles are valid
    if (handStr.length != 28) return false;
    const tiles = [];
    for (let i = 0; i < handStr.length; i+=2) {
      tiles.push(handStr.slice(i, i + 2));
    }
    let allValid = tiles.every(tile => validTile(tile));
    return allValid;
  }

module.exports = {validTile, validHand};