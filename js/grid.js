function addTileMakerButtons () {
    const cells = Array.from(document.querySelectorAll('.cell'));
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
        console.log(x , y);
        return;
    }

    cells.map(insertButtonFn("Add tile" , 'addTileButton' , addTileOnClickFn));
    //buttons = document.querySelectorAll('.addTileButton');
    //let x = buttons[2].parentNode.getAttribute('cellX');
    //let y = buttons[2].parentNode.parentNode.getAttribute('rowY');
}


function createTile(button) {

}

addTileMakerButtons();