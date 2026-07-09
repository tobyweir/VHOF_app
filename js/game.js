const Rotations = {
    up : 0,
    right : 1,
    down : 2,
    left : 3,
}
let currRotation = Rotations.left

let Columns = {
    column0 : document.querySelectorAll('.x0'),
    column1 : document.querySelectorAll('.x1'),
    column2 : document.querySelectorAll('.x2'),
    column3 : document.querySelectorAll('.x3'),
    column4 : document.querySelectorAll('.x4'),
}

let Rows = {
    row0 : document.querySelectorAll('.y0'),
    row1 : document.querySelectorAll('.y1'),
    row2 : document.querySelectorAll('.y2'),
    row3 : document.querySelectorAll('.y3'),
    row4 : document.querySelectorAll('.y4'),
}

const rotateButton = document.querySelector('.rotateButton');
const currListeners = new Map();

function updateRotation () {
    if (currRotation === Rotations.left) {
        currRotation = Rotations.up;
    } else {
        currRotation += 1;
    }
    if (currRotation === Rotations.left || currRotation === Rotations.right) {
        removeHorizontalHover();
        addVerticalHover();
    } else {
        removeVerticalHover();
        addHorizontalHover();
    }
}

function addVerticalHover () {
    for (let [i, cells] of Object.entries(Columns)) {
        const mouseoverFn = () => editBorderColourOnList(cells , 'yellow');
        const mouseoutFn = () => editBorderColourOnList(cells , '')
        addEventListenerOnList(cells , 'mouseover' , mouseoverFn);
        addEventListenerOnList(cells, 'mouseout', mouseoutFn);
        currListeners.set(cells, { mouseoverFn, mouseoutFn });
    } 
    return ;
}

function removeVerticalHover () {
    for (let [i, cells] of Object.entries(Columns)) {
        const listeners = currListeners.get(cells);
        if (!listeners) {
            continue;
        }
        removeEventListenerOnList(cells , 'mouseover' , listeners.mouseoverFn);
        removeEventListenerOnList(cells, 'mouseout', listeners.mouseoutFn);
        currListeners.delete(cells);
    } 
    return;
}

function addHorizontalHover () {
    for (let [i, rows] of Object.entries(Rows)) {
        const mouseoverFn = () => editBorderColourOnList(rows , 'yellow');
        const mouseoutFn = () => editBorderColourOnList(rows , '')
        addEventListenerOnList(rows , 'mouseover' , mouseoverFn);
        addEventListenerOnList(rows, 'mouseout', mouseoutFn);
        currListeners.set(rows, { mouseoverFn, mouseoutFn });
    } 
    return ;
}

function removeHorizontalHover () {
    for (let [i, rows] of Object.entries(Rows)) {
        const listeners = currListeners.get(rows);
        if (!listeners) {
            continue;
        }
        removeEventListenerOnList(rows , 'mouseover' , listeners.mouseoverFn);
        removeEventListenerOnList(rows, 'mouseout', listeners.mouseoutFn);
        currListeners.delete(rows);
    } 
    return;
}

//https://stackoverflow.com/questions/12362256/addeventlistener-on-nodelist
function addEventListenerOnList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}

function removeEventListenerOnList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].removeEventListener(event, fn, false);
    }
}

function editBorderColourOnList(list, colour) {
        for (var i = 0, len = list.length; i < len; i++) {
            list[i].style.borderColor = colour;
        }
}

rotateButton.addEventListener('click' , () => updateRotation() , false);

// Leads to bugs where mouseout event isnt removed
// document.addEventListener('keypress' , (key) => {
//     if (key.code === "KeyR") {
//         updateRotation();
//     }
// })
addVerticalHover();


