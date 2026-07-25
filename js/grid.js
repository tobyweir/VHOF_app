function cellSetup() {
    const cells = Array.from(document.querySelectorAll('.cell'));
    const setButtonVisible = (x) => (event) => {
        let button = x.querySelector(".addTileButton");
        if (button) button.style.display = "block"
    }
    const setButtonInvisible = (x) => (event) => {
        let button = x.querySelector(".addTileButton");
        if (button) button.style.display = "none"
    }

    cells.map(insertButtonFn("Add tile", 'addTileButton', addTileOnClickFn));
    cells.map(addEvent("mouseover", setButtonVisible));
    cells.map(addEvent("mouseout", setButtonInvisible));
}

function getTilesInColumn(x) {
    return Array.from(document.querySelectorAll(`.outer[xpos="${x}"]`)).map(outer => outer.firstElementChild);
}

function getTilesInRow(y) {
    return Array.from(document.querySelectorAll(`.outer[ypos="${y}"]`)).map(outer => outer.firstElementChild);
}

function getTiles(x, y) {
    if (currRotation === Rotations.left || currRotation === Rotations.right) {
        return getTilesInRow(y);
    } else {
        return getTilesInColumn(x);
    }
}

function updateSelectors() {
    switch (currHof) {
        case Hofs.fold:
            foldFnSelector.style.display = "inline";
            mapFnSelector.style.display = "none";
            filterFnSelector.style.display = "none";
            return;
        case Hofs.map:
            foldFnSelector.style.display = "none";
            mapFnSelector.style.display = "inline";
            filterFnSelector.style.display = "none";
            return;
        case Hofs.filter:
            foldFnSelector.style.display = "none";
            mapFnSelector.style.display = "none";
            filterFnSelector.style.display = "inline";
            return;
    }
}


const foldFnSelector = document.querySelector('.foldSelector');
let currFoldFn = getFoldFunction(foldFnSelector.value);

foldFnSelector.addEventListener('change', () => {
    currFoldFn = getFoldFunction(foldFnSelector.value);
});

const mapFnSelector = document.querySelector('.mapSelector');
let currMapFn = getMapFunction(mapFnSelector.value);

mapFnSelector.addEventListener('change', () => {
    currMapFn = getMapFunction(mapFnSelector.value);
    console.log(currMapFn);
});

const filterFnSelector = document.querySelector('.filterSelector');
let currFilterFn = getFilterFunction(filterFnSelector.value);

filterFnSelector.addEventListener('change', () => {
    currFilterFn = getFilterFunction(filterFnSelector.value);
    console.log(currFilterFn);
});

const hofSelector = document.querySelector('.hofSelector');
let currHof = getHof(hofSelector.value);
updateSelectors();

hofSelector.addEventListener('change', () => {
    currHof = getHof(hofSelector.value);
    //change which selectors are displayed
    updateSelectors();
    console.log(currHof);
});


const animSpeedSelector = document.querySelector('.animationSpeedSelector');
let currAnimSpeeds = getAnimSpeeds(animSpeedSelector.value);
document.documentElement.style.setProperty('--tile-merge-time', currAnimSpeeds[0]);
let mergeTime = currAnimSpeeds[1];

animSpeedSelector.addEventListener('change', () => {
    currAnimSpeeds = getAnimSpeeds(animSpeedSelector.value);
    document.documentElement.style.setProperty('--tile-merge-time', currAnimSpeeds[0]);
    mergeTime = currAnimSpeeds[1];
});

cellSetup()
const rotateButton = document.querySelector('.rotateButton');
rotateButton.addEventListener('click', () => updateRotation(), false);


const clearAllButton = document.querySelector('.clearAllButton');
clearAllButton.addEventListener('click', () => clearGrid(), false);

const sandboxButton = document.querySelector('.sandboxButton');
sandboxButton.addEventListener('click', () => { initSandbox() }, false);
const rightVLeftButton = document.querySelector('.rightVLeftButton');
rightVLeftButton.addEventListener('click', () => { initLeftVsRight() }, false);
const randomButton = document.querySelector('.randomButton');
randomButton.addEventListener('click', () => { initRandom() }, false);

let links = ["HOF" , "Fold" , "MapFilter" , "Website"];
function setupInfoBoxes(list) {
    for (let i = 0; i < list.length; i++) {
        let container = document.querySelector(`.${list[i]}-Info`);
        let info = container.querySelector('.info-box');
        insertButtonFn('x', 'closeInfoBoxButton', (button, event) => {
            container.style.display = "none";
        })(info);
        let link = document.querySelector(`.open-${list[i]}-Info`);
        link.addEventListener('click', (x) => {
            x.preventDefault();
            container.style.display = "flex";
        })
    }
}

setupInfoBoxes(links);

// const hofInfoBox = document.querySelector('.HOF-info');
// const hofInfoInner = hofInfoBox.querySelector('.info-box');
// insertButtonFn('x', 'closeInfoBoxButton', (button, event) => {
//     hofInfoBox.style.display = "none";
// })(hofInfoInner);

// const hofInfoLink = document.querySelector('.open-HOF-Info');
// hofInfoLink.addEventListener('click', (x) => {
//     x.preventDefault();
//     hofInfoBox.style.display = "flex";
// })