

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
    return document.querySelectorAll(`.tile[xpos="${x}"]`);
}

function getTilesInRow (y) {
    return document.querySelectorAll(`.tile[ypos="${y}"]`);
}

function getTiles (x , y) {
    if (currRotation === Rotations.left || currRotation === Rotations.right)  {
        return getTilesInRow(y);
    } else {
        return getTilesInColumn(x);
    }
}

function createTileEl(x , y) {
    let grid = document.querySelector(".tile-container");
    let value = document.createElement("input");
    let arrow = document.createElement("p");
    let tile = document.createElement("div");
   
    tile.classList.add("tile");
    tile.setAttribute("xpos" , x.toString());
    tile.setAttribute("ypos" , y.toString());
    insertButtonFn("x" , "removeTileButton" , (button , event) => {
        button.parentNode.remove();
    }) (tile);
    
    addEvent("mouseover" , (x) => (event) => {
        let button = x.querySelector(".removeTileButton");
        if (button) button.style.display = "block";
    }) (tile);
    addEvent("mouseout" , (x) => (event) => {
        let button = x.querySelector(".removeTileButton");
        if (button) button.style.display = "none";
    }) (tile);

    addEvent("mouseover" , (x) => (event) => {
        let xpos = x.getAttribute("xpos");
        let ypos = x.getAttribute("ypos");
        let tiles = getTiles(xpos , ypos);
        tiles.forEach((x) => {
            x.style.borderColor = "green"
            let arrow = x.querySelector(".arrow");
            if (arrow) {
                arrow.innerText = getArrowText();
                arrow.style.display = "block"
            }
        })
    }) (tile);
    addEvent("mouseout" , (x) => (event) => {
        let xpos = x.getAttribute("xpos");
        let ypos = x.getAttribute("ypos");
        let tiles = getTiles(xpos , ypos);
        tiles.forEach((x) => {
            x.style.borderColor = "grey"
            let arrow = x.querySelector(".arrow");
            if (arrow) {
                arrow.style.display = "none"
            }
        })
    }) (tile);
    value.classList.add("value");
    value.setAttribute("value" , "0");
    value.setAttribute("type" , "number")

    value.addEventListener("input", () => {
    if (value.value.length > 5) {
        value.value = value.value.slice(0, 5);
    }
    });

    value.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    value.addEventListener("dblclick", (e) => {
        e.stopPropagation();
    });

    addEvent("dblclick" , (x) => (event) => {
        let xpos = x.getAttribute("xpos");
        let ypos = x.getAttribute("ypos");
        console.log("clicked");
        console.log(xpos , ypos);
    })(tile);
    
    tile.appendChild(value);
    arrow.classList.add("arrow");
    arrow.innerText = getArrowText();
    tile.appendChild(arrow);
    grid.appendChild(tile);
    //add tile to the data grid?
    //give that object a reference to this dom element?

}

cellSetup()
const rotateButton = document.querySelector('.rotateButton');
rotateButton.addEventListener('click' , () => updateRotation() , false);