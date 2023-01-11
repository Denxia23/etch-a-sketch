function eraseGrid(whiteboard) {
    whiteboard.replaceChildren();
}

function draw(e,drawing) {
    if (!drawing) return;
    e.target.style.backgroundColor = "black";
}

function createGrid(whiteboard,squares) {
    for (let i = 0; i < squares; i++) {
        for (let i2 = 0; i2 < squares; i2++) {
            const gridSquare = document.createElement("div");
            whiteboard.appendChild(gridSquare);
        }
    }
}

function main() {
    let drawing = false;
    const whiteboard = document.querySelector("#whiteboard");
    
    whiteboard.addEventListener("mousedown", (e) => {
        drawing = true;
    })
  
    window.addEventListener("mouseup",() => {
        drawing = false;
    })
    
    createGrid(whiteboard,32);
    
    const divs = document.querySelectorAll("#whiteboard div");
    for (const div of divs) {
        div.addEventListener("mousedown", (e) => {
            draw(e,true);
        })
        
        div.addEventListener("mouseover", (e) => {
            draw(e,drawing);
        });
    }

}

main();
