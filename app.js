let drawing = false;
let erasing = false;
let rainbow = false;
let gridSize = 80;
let color = "#000000";

function randomInt(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
}


function restartGrid(divs) {
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
    
    const divs = document.querySelectorAll("#whiteboard div");
    
    whiteboardContainer.style.setProperty("--whiteboard-gridSize", gridSize);
    
    for (const div of divs) {
        div.addEventListener("mousedown", (e) => {
            if (!erasing) {
                draw(e,true);
            } else {
                eraser(e,true);
            }
        })
        
        div.addEventListener("mouseover", (e) => {
            if (!erasing) {
                draw(e,drawing);
            } else {
                eraser(e,drawing);
            }
        });
    }
   
    
    //buttons
    const colorPicker = document.querySelector(".selected-color");
    const colorPickerCircle = document.querySelector(".options ul li button div");
    const pencilButton = document.querySelector("#pencil"); 
    const erasingButton = document.querySelector("#eraser");
    const rainbowButton = document.querySelector("#rainbow");
    const restartButton = document.querySelector("#restart");
    
    colorPicker.addEventListener("change", () => {
        color = colorPicker.value;
        colorPickerCircle.style.backgroundColor = `${colorPicker.value}`;
    })
    
    
    pencilButton.classList.add("selected");
    
    pencilButton.addEventListener("click", () => {
        pencilButton.classList.add("selected");
        erasing = false;
        erasingButton.classList.remove("selected");
    })
    
    
    restartButton.addEventListener("click", () => {
        restartGrid(divs);
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

}

main();
