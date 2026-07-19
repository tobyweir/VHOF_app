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

    cells.map(insertButtonFn("Add tile" , 'addTileButton' , addTileOnClickFn));
    cells.map(addEvent("mouseover" , setButtonVisible));
    cells.map(addEvent("mouseout" , setButtonInvisible));
}

function getTilesInColumn (x) {
    return Array.from(document.querySelectorAll(`.outer[xpos="${x}"]`)).map(outer => outer.firstElementChild);
}

function getTilesInRow (y) {
    return Array.from(document.querySelectorAll(`.outer[ypos="${y}"]`)).map(outer => outer.firstElementChild);
}

function getTiles (x , y) {
    if (currRotation === Rotations.left || currRotation === Rotations.right)  {
        return getTilesInRow(y);
    } else {
        return getTilesInColumn(x);
    }
}

cellSetup()
const rotateButton = document.querySelector('.rotateButton');
rotateButton.addEventListener('click' , () => updateRotation() , false);