let grid = Array.from({ length: 5 }, () => new Array(5).fill(undefined));
console.log(grid);

function addTileToGrid(x , y ) {
    let tile = new Tile(0 , x , y);
    grid[y][x] = tile;
}

function removeTileFromGrid(x , y) {
    grid[y][x].remove();
    grid[y][x] = undefined;
}

function updateTilePos(x , y, tile) {
    tile.x = x;
    tile.y = y;
}

function updateTileValue(value , x , y) {
    let tile = grid[y][x]
    tile.value = value;
    console.log(tile);
}

function mergeTiles(a , b) { //a will get the new value and position, b will be removed
    return;
}

function removeEmptyCells (list) {
    return list.filter((x) => x !== undefined);
}