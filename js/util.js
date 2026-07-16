const insertButtonFn = (text , className , onclickFn) => (x) => {
        let button = document.createElement("BUTTON");
        button.classList.add(className);
        button.innerText = text.toString();
        button.onclick = (event) => onclickFn(button, event);
        x.appendChild(button);
        return x;
    };

const addTileOnClickFn = (button , event) => {
    let x = button.parentNode.getAttribute('cellX');
    let y = button.parentNode.parentNode.getAttribute('rowY');
    createTileEl(x , y);
    return;
}

const addEvent = (event , fn) => (x) => {
        x.addEventListener(event , fn(x))
        return;
    }


const Rotations = {
    up : 0,
    right : 1,
    down : 2,
    left : 3,
}

//arrow icon to display on tiles
const  Arrows  = {
    up:    '\u2191',
    right: '\u2192',
    down:  '\u2193',
    left:  '\u2190'
};
function getArrowText () {
    switch (currRotation) {
        case 0:
            return Arrows.up;
        case 1:
            return Arrows.right;
        case 2:
            return Arrows.down;
        case 3:
            return Arrows.left;
    }
}

let currRotation = Rotations.right;
function updateRotation () {
    if (currRotation === Rotations.left) {
        currRotation = Rotations.up;
    } else {
        currRotation += 1;
    }
    console.log(currRotation)
}