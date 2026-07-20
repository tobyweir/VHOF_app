class Tile {
    constructor(value, x, y, isAccumulator = false) {
        console.log(value , x , y);
        this._value = value;
        this._x = x;
        this._y = y;
        let inner = Tile.createTileEl(x , y);
        inner.classList.add("appear");
        inner.addEventListener("animationend", () => {
            inner.classList.remove("appear");
        }, { once: true });
        inner.classList.add("inner");
        Tile.addTileEvents(inner);
        let outer = document.createElement("div");
        inner.classList.add("tile");
        outer.setAttribute("xpos", x.toString());
        outer.setAttribute("ypos", y.toString());
        outer.appendChild(inner);
        outer.classList.add("outer");
        this._tileEl = outer;
        this._isAccumulator = isAccumulator;
        let grid = document.querySelector(".tile-container");
        grid.append(this._tileEl);
    }

    set value(value) {
        if (value) {
            this._value = value;
            this._tileEl.querySelector("input").value = this._value;
        }
    }

    set x(x) {
        this._x = x;
        this._tileEl.setAttribute("xpos", x.toString());
    }

    set y(y) {
        this._y = y;
        this._tileEl.setAttribute("ypos", y.toString());
    }

    set isAccumulator(isAccumulator) {
        this._isAccumulator = isAccumulator;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get value() {
        return parseInt(this._value);
    }

    remove() {
        let inner = this._tileEl.querySelector(".inner");
        inner.classList.remove("appear");
        inner.classList.add("disappear");
        //this._tileEl.remove();
        inner.addEventListener("animationend", () => {
            this._tileEl.remove();
        }, { once: true });
    }
    
    static createValue() {
        let value = document.createElement("input");
        value.classList.add("value");
        value.setAttribute("value", "0");
        value.setAttribute("type", "number")

        value.addEventListener("input", () => {
            if (value.value.length > 5) {
                value.value = value.value.slice(0, 5);
            }
            console.log("change to input");
            updateTileValue(value.value , value.parentNode.parentNode.getAttribute("xpos") , value.parentNode.parentNode.getAttribute("ypos"));
        });

        value.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        value.addEventListener("dblclick", (e) => {
         e.stopPropagation();
        });

        value.addEventListener("focus", () => {
            value.select();
        });
        return value;
    }

    static addTileEvents(tile) {
        addEvent("mouseover", (x) => (event) => {
            let button = x.querySelector(".removeTileButton");
            if (button) button.style.display = "block";
        })(tile);
        addEvent("mouseout", (x) => (event) => {
            let button = x.querySelector(".removeTileButton");
            if (button) button.style.display = "none";
        })(tile);

        addEvent("mouseover", (x) => (event) => {
            let xpos = x.parentNode.getAttribute("xpos");
            let ypos = x.parentNode.getAttribute("ypos");
            let tiles = getTiles(xpos, ypos);
            tiles.forEach((x) => {
                x.style.borderColor = "green"
                let arrow = x.querySelector(".arrow");
                if (arrow) {
                 arrow.innerText = getArrowText();
                 arrow.style.display = "block"
                }
            })
        })(tile);
        addEvent("mouseout", (x) => (event) => {
            let xpos = x.parentNode.getAttribute("xpos");
            let ypos = x.parentNode.getAttribute("ypos");
            let tiles = getTiles(xpos, ypos);
            tiles.forEach((x) => {
                x.style.borderColor = "grey"
                let arrow = x.querySelector(".arrow");
                if (arrow) {
                 arrow.style.display = "none"
             }
            })
        })(tile);
        addEvent("dblclick", (x) => (event) => {
            let xpos = x.parentNode.getAttribute("xpos");
            let ypos = x.parentNode.getAttribute("ypos");
            console.log("clicked");
            //moveTileToEnd(grid[ypos][xpos] , currRotation);
            fold( xpos , ypos);
        })(tile);
    }

    static createTileEl(x, y) {
        let grid = document.querySelector(".tile-container");
        let value = Tile.createValue();
        let arrow = document.createElement("p");
        let tile = document.createElement("div");

        insertButtonFn("x", "removeTileButton", (button, event) => {
            let xpos = button.parentNode.parentNode.getAttribute("xpos");
            let ypos = button.parentNode.parentNode.getAttribute("ypos");
            removeTileFromGrid(xpos, ypos);
        })(tile);
        tile.appendChild(value);
        arrow.classList.add("arrow");
        arrow.innerText = getArrowText();
        tile.appendChild(arrow);
        return tile;
    }
}
