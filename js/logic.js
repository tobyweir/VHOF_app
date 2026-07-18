let grid = Array.from({ length: 5 }, () => new Array(5).fill(undefined));
console.log(grid);

function addTileToGrid(x , y ) {
    let tile = new Tile(0 , x , y);
    grid[y][x] = tile;
    console.log(tile);
}

function removeTileFromGrid(x , y) {
    grid[y][x].remove();
    grid[y][x] = undefined;
    console.log("removed from grid" , x , y)
}

function mergeTiles(a , b) { //a will get the new value and position, b will be removed
    return;
}