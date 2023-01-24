let drawing = false;
let erasing = false;
let rainbow = false;
let gridSize = 32;
let color = "#000000";

function randomInt(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
}


function restartGrid() {
    const divs = document.querySelectorAll("#whiteboard div");
    for (const div of divs) {
        div.style.backgroundColor = "white";
    }
}

function draw(e,drawing) {
    if (!drawing) return;
    if (rainbow) {
        e.target.style.backgroundColor = `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;
        return;
    }
    e.target.style.backgroundColor = color;
}

function createGrid(whiteboard,squares) {
    for (let i = 0; i < squares; i++) {
        for (let i2 = 0; i2 < squares; i2++) {
            const gridSquare = document.createElement("div");
            
            
            gridSquare.addEventListener("mousedown", (e) => {
                if (!erasing) {
                    draw(e,true);
                } else {
                    eraser(e,true);
                }
            })
            
            gridSquare.addEventListener("mouseover", (e) => {
                if (!erasing) {
                    draw(e,drawing);
                } else {
                    eraser(e,drawing);
                }
            });

            whiteboard.appendChild(gridSquare);
        }
    }
}

function eraser(e,drawing) {
    if (!drawing) return;
    e.target.style.backgroundColor = "white";
}

function main() {
    //whiteboard
    const whiteboardContainer = document.querySelector(".whiteboard-container");
    const whiteboard = document.querySelector("#whiteboard");
    
    whiteboard.addEventListener("mousedown", (e) => {
        drawing = true;
    })
  
    window.addEventListener("mouseup",() => {
        drawing = false;
    })
    
    createGrid(whiteboard,gridSize);
    
    whiteboardContainer.style.setProperty("--whiteboard-gridSize", gridSize);
    
    //buttons
    const colorPicker = document.querySelector(".selected-color");
    const colorPickerCircle = document.querySelector(".options ul li button div");
    const pencilButton = document.querySelector("#pencil"); 
    const erasingButton = document.querySelector("#eraser");
    const rainbowButton = document.querySelector("#rainbow");
    const restartButton = document.querySelector("#restart");
    const settingsButton = document.querySelector("#settings");
    const settingsMenu = document.querySelector(".settings-container");
    const gridSizeInput = document.querySelector(".range-input input");
    const selectedGridSize = document.querySelector(".range .selected-size h3");
    const closeButton = document.querySelector("#close");
    
    colorPicker.addEventListener("change", () => {
        color = colorPicker.value;
        colorPickerCircle.style.backgroundColor = colorPicker.value;
    })
    
    pencilButton.classList.add("selected");
    
    pencilButton.addEventListener("click", () => {
        pencilButton.classList.add("selected");
        erasing = false;
        erasingButton.classList.remove("selected");
    })
    
    restartButton.addEventListener("click", () => {
        restartGrid();
    })

    erasingButton.addEventListener("click", () => {
        if (!erasing) {
            erasing = true;
        } else {
            erasing = false;
        }
        erasingButton.classList.add("selected");
        pencilButton.classList.remove("selected");
        rainbowButton.classList.remove("selected");
        rainbow = false;
    })

    rainbowButton.addEventListener("click", () => {
        if (!rainbow) {
            rainbow = true;
        } else {
            rainbow = false;
        }
        rainbowButton.classList.toggle("selected");
        pencilButton.classList.add("selected");
        erasingButton.classList.remove("selected");
        erasing = false;

    })

    settingsButton.addEventListener("click", () => {
        settingsMenu.classList.add("open");
    })
    
    closeButton.addEventListener("click", () => {
        settingsMenu.classList.remove("open");
    })


    gridSizeInput.addEventListener("input", () => {
        selectedGridSize.textContent = gridSizeInput.value;
        
    })

    gridSizeInput.addEventListener("change", () => {
        gridSize = gridSizeInput.value;
        whiteboardContainer.style.setProperty("--whiteboard-gridSize", gridSize);
        whiteboard.replaceChildren();
        createGrid(whiteboard,gridSize);
    })

    
}

main();
