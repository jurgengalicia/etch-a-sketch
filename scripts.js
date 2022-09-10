

let gridContainer = document.querySelector('.grid-container');
let colorWheel = document.querySelector('.palette-button');
let rootVars = document.querySelector(':root');
let slider = document.querySelector('.slider');
let rainbowButton = document.querySelector('.rainbow-button');
let slideNum = document.querySelector('.slide-count');
let allButtons = document.querySelectorAll('.button');
let cells = "";

let gridVisible = true;
let gridLock = false;
let rainbowSwitch = false;
let gradientSwitch = false;
let eraserToggle = false;

let chosenColor = "black"

let rainbowList = ["red","orange","yellow","green","blue","indigo","violet"];
let currRainbow = 0;
let gradientList = ["#FFFFFF","#E6E6E6","#CCCCCC","#B3B3B3","#999999","#808080","#666666","#4D4D4D","#333333","#1a1a1a","#000000"];
let currGradient = 0;


function toggleGrid(){
    console.log(`${gridVisible} gridvisible`)
    console.log(`${gridLock} gridlock`)
    if(gridVisible && !gridLock){
        gridVisible = false;
        rootVars.style.setProperty("--cell-border",`0px`);
    }else if(!gridLock){
        gridVisible = true;
        rootVars.style.setProperty("--cell-border",`1px solid black`);
    }
}

function createGrid(side=16){
    for(let x = 0; x <= side*side-1; x++){
        let cell = document.createElement('div');
        cell.classList.add("cell");
        cell.textContent = "";
        cell.addEventListener('mouseover',changeCellColor);
        gridContainer.appendChild(cell);
    }
    cells = document.querySelectorAll('.cell');
}

function updateGrid(updateCallback){
    cells.forEach(cell =>{
        updateCallback(cell)
    })
}

function clearGrid(){
    updateGrid(clearCellColor)
}

function recreateGrid(e){
    while(gridContainer.firstChild) gridContainer.removeChild(gridContainer.lastChild)

    let newSize = e.target.value;
    slideNum.textContent = `${newSize} x ${newSize}`;

    if(newSize > 60 && gridVisible) toggleGrid();
    gridLock = newSize > 60 ? true : false;

    rootVars.style.setProperty("--cell-size",`${100/newSize}%`);
    createGrid(newSize);
    
}

function changeCellColor(e){
    //removed button hold down functionality for unresponsiveness
    // if(e.buttons == 1 || e.buttons == 3)
        if(rainbowSwitch){
            this.style.setProperty("background-color",rainbowList[currRainbow++]);
            currRainbow = currRainbow >= 6 ? 0 : currRainbow;
        }else if(gradientSwitch){
            this.style.setProperty("background-color",gradientList[currGradient++]);
            currGradient = currGradient >= 10 ? 0 : currGradient;
        }else if(eraserToggle)
            clearCellColor(this);
        else
            this.style.setProperty("background-color",chosenColor);
    
        
}

function clearCellColor(cell){
    cell.style.removeProperty("background-color");
}

function toggleRainbow(){
    gradientSwitch = false;
    eraserToggle = false
    if(!rainbowSwitch)
        rainbowSwitch = true;
    else
        rainbowSwitch = false;
}

function toggleGradient(){
    rainbowSwitch = false;
    eraserToggle = false
    if(!gradientSwitch)
        gradientSwitch = true;
    else
        gradientSwitch = false;
}

function eraserMode(){
    gradientSwitch = false;
    rainbowSwitch = false;
    if(!eraserToggle){
        eraserToggle = true;
    }
    else
        eraserToggle = false;
}

function changeInk(e){
    rainbowSwitch = false;
    gradientSwitch = false;
    eraserToggle = false;
    clearActiveButtons();
    chosenColor = e.target.value
}

function clearActiveButtons(){
    allButtons.forEach((btn) => {
        //remove other active buttons when clicked, except for grid toggle.
        if(!btn.classList.contains("toggle-grid"))
            btn.classList.remove("active-button");
    })
}

function clickButton(){
    //remove active button if it is clicked
    if(this.classList.contains("active-button"))
        this.classList.remove("active-button");

    //toggle grid does not affect other buttons
    else if(this.classList.contains("toggle-grid"))
        this.classList.add("active-button");

    //all buttons except clear button can be active
    else if(!this.classList.contains("clear-button")){

        clearActiveButtons();

        //apply active button to this
        this.classList.add("active-button");
    }
    
}

allButtons.forEach((btn) => {
    btn.addEventListener('click', clickButton);
})


createGrid();

colorWheel.addEventListener('change',changeInk)
slider.addEventListener('change',recreateGrid)
