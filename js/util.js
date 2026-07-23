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

//contains animation speed for css and the delay time for the javascript
const AnimationSpeeds = {
    fast : ("0.15s" , 1000),
    stan : ("0.3s" , 1000),
    slow : ("0.45s" , 1000),
}

function getAnimSpeeds(value) {

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
    console.log(currRotation)
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