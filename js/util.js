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
    addTileToGrid(x , y);
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

const Hofs = {
    fold : 0,
    map : 1,
    filter : 2,
}

function getHof(val) {
    switch (val) {
        case "fold":
            return Hofs.fold;
        case "map":
            return Hofs.map;
        case "filter":
            return Hofs.filter;
    }
}

const FoldFunctions = {
    add : (x , y) => x + y,
    mult : (x , y) =>x * y,
    div : (x , y) => x / y,
    sub : (x , y) => x - y,
}

const MapFunctions = {
    plus1 : (x) => x + 1,
    minus1 : (x) =>x - 1,
    double : (x) => x * 2,
    triple : (x) => x * 3,
}

const FilterFunctions = {
    odd : (x) => x % 2 !== 0,
    even : (x) => x % 2 === 0,
    greaterThan100 : (x) => x > 100,
    lessThan100 : (x) => x < 100,
}

function getFoldFunction(val) {
    switch (val) {
        case "add":
            return FoldFunctions.add;
        case "sub":
            return FoldFunctions.sub;
        case "mult":
            return FoldFunctions.mult;
        case "div":
            return FoldFunctions.div;
    }
}

function getMapFunction(val) {
    switch (val) {
        case "plus1":
            return MapFunctions.plus1;
        case "minus1":
            return MapFunctions.minus1;
        case "double":
            return MapFunctions.double;
        case "triple":
            return MapFunctions.triple;
    }
}

function getFilterFunction(val) {
    switch (val) {
        case "odds":
            return FilterFunctions.odd;
        case "evens":
            return FilterFunctions.even;
        case "greaterThan100":
            return FilterFunctions.greaterThan100;
        case "lessThan100":
            return FilterFunctions.lessThan100;
    }
}

//contains animation speed for css and the delay time for the javascript
const AnimationSpeeds = {
    fast : ["0.1s" , 250],
    stan : ["0.3s" , 500],
    slow : ["0.6s" , 1250],
}

function getAnimSpeeds(val) {
    switch (val) {
        case "fast":
            return AnimationSpeeds.fast;
        case "standard":
            return AnimationSpeeds.stan;   
        case "slow":
            return AnimationSpeeds.slow;  
    }
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
    if (foldCount !== 0) return;
    if (currRotation === Rotations.left) {
        currRotation = Rotations.up;
    } else {
        currRotation += 1;
    }
}


//https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
function setInputFilter(textbox, inputFilter, errMsg) {
  [ "input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout" ].forEach(function(event) {
    textbox.addEventListener(event, function(e) {
      if (inputFilter(this.value)) {
        // Accepted value.
        if ([ "keydown", "mousedown", "focusout" ].indexOf(e.type) >= 0){
          this.classList.remove("input-error");
          this.setCustomValidity("");
        }

        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      }
      else if (this.hasOwnProperty("oldValue")) {
        // Rejected value: restore the previous one.
        this.classList.add("input-error");
        this.setCustomValidity(errMsg);
        this.reportValidity();
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
      else {
        // Rejected value: nothing to restore.
        this.value = "";
      }
    });
  });
}