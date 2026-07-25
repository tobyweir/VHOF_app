let grid = Array.from({ length: 5 }, () => new Array(5).fill(undefined));

function clearGrid() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j ++) {
            if (grid[i][j] !== undefined) {
            grid[i][j].remove();
            grid[i][j] = undefined;
            }
        }
    }
}

function addTileToGrid(x , y , val=0) {
    let tile = new Tile(val , x , y);
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
}

function mergeTileIntoTile(a , b , fn , reverse=false) { //a will get the new value and position, b will be removed
    let newvalue = fn(a.value , b.value);
    if (reverse === true) newvalue = fn(b.value , a.value);
    console.log(a.value , b.value , fn , newvalue);
    grid[a.y][a.x] = undefined;
    a.x = b.x;
    a.y = b.y;
    grid[b.y][b.x] = a;
    a.value = newvalue;
    console.log(a.value);
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



function activateHof(x , y) {
    switch (currHof) {
        case Hofs.fold:
            fold(x , y);
            return;
        case Hofs.map:
            map(x , y);
            return;
        case Hofs.filter:
            filter(x , y);
            return;
    }
}

function fold(x , y) {
    //disable rotation now?
    let fn = currFoldFn;
    foldCount += 1;
    switch (currRotation) {
        case 0:
            //up
            foldUp(x , fn);
            return;
        case 1:
            //right
            foldRight(y , fn);
            return;
        case 2:
            //down
            foldDown(x , fn);
            return;
        case 3:
            //left
            foldLeft(y , fn);
            return;
    }
    //figure out which direction to do the fold
    //retreive that list of tiles from grid
    //begin merging the tiles step by step
}

function map(x , y) {
    let fn = currMapFn;
    
    let updateTile = (x) => {
        x.value = fn(x.value);
        x.spin();
    }

    if (currRotation === Rotations.left || currRotation === Rotations.right) {
        mapRow(y , fn , updateTile);
    } else {
        mapColumn(x , fn , updateTile);
    }
}

function mapColumn(x , fn , updateTile) {
    let tileList = removeEmptyCells(grid.map(a => a[x]));
    tileList.map(updateTile)
}

function mapRow(y , fn , updateTile) {
    let tileList = removeEmptyCells(grid[y]);
    tileList.map(updateTile)
}

function filter(x , y) {
    let fn = currFilterFn;
    let updateTile = (x) => {
        if (fn(x.value) === true) {
            removeTileFromGrid(x.x , x.y);
        } else {
            x.shake();
        }
    }
    if (currRotation === Rotations.left || currRotation === Rotations.right) {
        mapRow(y , fn , updateTile);
    } else {
        mapColumn(x , fn , updateTile);
    }
}



function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//named as in folding to the right(foldl), foldr begins at the right
async function foldRight(y, fn) {
    let tileList = removeEmptyCells(grid[y]);
    while (tileList.length > 1) {
        await delay(mergeTime); 
        mergeTileIntoTile(tileList[0] , tileList[1], fn);
        tileList = removeEmptyCells(grid[y]);
    }
    //console.log(JSON.parse(JSON.stringify(grid)));
    await delay(mergeTime); 
    moveTileToEnd(tileList[tileList.length - 1] , Rotations.right);
    //console.log(JSON.parse(JSON.stringify(grid)));
    foldCount -= 1;

    //enable rotation?
}


async function foldLeft(y, fn){
    let tileList = removeEmptyCells(grid[y]);
    while (tileList.length > 1) {
        await delay(mergeTime); 
        mergeTileIntoTile(tileList[tileList.length - 1] , tileList[tileList.length - 2] , fn, true);
        tileList = removeEmptyCells(grid[y]);
    }
    await delay(mergeTime); 
    moveTileToEnd(tileList[tileList.length - 1] , Rotations.left);
    foldCount -= 1;
}

async function foldUp(x, fn){
    let tileList = removeEmptyCells(grid.map(a => a[x]));
    while (tileList.length > 1) {
        await delay(mergeTime); 
        mergeTileIntoTile(tileList[tileList.length - 1] , tileList[tileList.length - 2], fn, true);
        tileList = removeEmptyCells(grid.map(a => a[x]));
    }
    await delay(mergeTime); 
    moveTileToEnd(tileList[tileList.length - 1] , Rotations.up);
    foldCount -= 1;
}

async function foldDown(x, fn){
    let tileList = removeEmptyCells(grid.map(a => a[x]));
    while (tileList.length > 1) {
        await delay(mergeTime); 
        mergeTileIntoTile(tileList[0] , tileList[1], fn);
        tileList = removeEmptyCells(grid.map(a => a[x]));
    }
    await delay(mergeTime); 
    moveTileToEnd(tileList[tileList.length - 1] , Rotations.down);
    foldCount -= 1;

}

function initSandbox() {
    clearGrid();
}

function initLeftVsRight(){
    clearGrid();
    for (let i = 0; i < grid[0].length; i ++) {
        addTileToGrid(i , 0 , i + 1);
        addTileToGrid(i , 1 , i + 1);
    }
}

function initRandom(){
    clearGrid();
    for (let i = 0; i < grid.length; i ++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (Math.random() < 0.5 ? false : true) {
                let ranVal = Math.floor(Math.random() * 99) + 1;
                ranVal *= Math.random() < 0.5 ? -1 : 1;
                addTileToGrid(j , i , ranVal);
            }
        }
    }
}