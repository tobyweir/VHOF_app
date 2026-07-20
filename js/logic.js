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

function mergeTileIntoTile(a , b , fn=(x , y) => x + y) { //a will get the new value and position, b will be removed
    let newvalue = fn(a.value , b.value);
    grid[a.y][a.x] = undefined;
    a.x = b.x;
    a.y = b.y;
    grid[b.y][b.x] = a;
    a.value = newvalue;
    b.remove();

}

function moveTileToEnd(tile , rotation) {
    x = tile.x;
    y = tile.y;
    grid[y][x] = undefined;
    if (rotation === Rotations.right) {
        grid[y][4] = tile;
        tile.x = 4;
    } else if (rotation === Rotations.left) {
        grid[y][0] = tile;
        tile.x = 0;
    } else if (rotation === Rotations.up) {
        grid[0][x] = tile;
        tile.y = 0;
    } else {
        grid[4][x] = tile;
        tile.y = 4;
    }
}

function removeEmptyCells (list) {
    return list.filter((x) => x !== undefined);
}
let foldCount = 0;
let mergeTime = 750;

function fold(x , y) {
    //disable rotation now?
    foldCount += 1;
    switch (currRotation) {
        case 0:
            //up
            foldUp(x);
            return;
        case 1:
            //right
            foldRight(y);
            return;
        case 2:
            //down
            foldDown(x);
            return;
        case 3:
            //left
            foldLeft(y);
            return;
    }
    //figure out which direction to do the fold
    //retreive that list of tiles from grid
    //begin merging the tiles step by step
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//named as in folding to the right(foldl), foldr begins at the right
async function foldRight(y) {
    let tileList = removeEmptyCells(grid[y]);
    while (tileList.length > 1) {
        await delay(mergeTime); 
        mergeTileIntoTile(tileList[0] , tileList[1]);
        tileList = removeEmptyCells(grid[y]);
    }
    //console.log(JSON.parse(JSON.stringify(grid)));
    await delay(mergeTime); 
    moveTileToEnd(tileList[tileList.length - 1] , Rotations.right);
    //console.log(JSON.parse(JSON.stringify(grid)));
    foldCount -= 1;

    //enable rotation?
}


async function foldLeft(y){
    let tileList = removeEmptyCells(grid[y]);
    while (tileList.length > 1) {
        await delay(mergeTime); 
        mergeTileIntoTile(tileList[tileList.length - 1] , tileList[tileList.length - 2]);
        tileList = removeEmptyCells(grid[y]);
    }
    await delay(mergeTime); 
    moveTileToEnd(tileList[tileList.length - 1] , Rotations.left);
    foldCount -= 1;
}

async function foldUp(x){
    let tileList = removeEmptyCells(grid.map(a => a[x]));
    while (tileList.length > 1) {
        await delay(mergeTime); 
        mergeTileIntoTile(tileList[tileList.length - 1] , tileList[tileList.length - 2]);
        tileList = removeEmptyCells(grid.map(a => a[x]));
    }
    await delay(mergeTime); 
    moveTileToEnd(tileList[tileList.length - 1] , Rotations.up);
    foldCount -= 1;
}

async function foldDown(x){
    let tileList = removeEmptyCells(grid.map(a => a[x]));
    while (tileList.length > 1) {
        await delay(mergeTime); 
        mergeTileIntoTile(tileList[0] , tileList[1]);
        tileList = removeEmptyCells(grid.map(a => a[x]));
    }
    await delay(mergeTime); 
    moveTileToEnd(tileList[tileList.length - 1] , Rotations.down);
    foldCount -= 1;

}