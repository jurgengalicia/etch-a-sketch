

let gridContainer = document.querySelector('.grid-container');
let colorWheel = document.querySelector('.palette-button');
let rootVars = document.querySelector(':root');
let slider = document.querySelector('.slider');
let rainbowButton = document.querySelector('.rainbow-button');
let slideNum = document.querySelector('.slide-count');
let cells = "";

let gridVisible = true;
let gridLock = false;
let rainbowSwitch = false;
let gradientSwitch = false;

let rainbowList = ["red","orange","yellow","green","blue","indigo","violet"];
let currRainbow = 0;
let gradientList = ["#F8F8FF","#CAC9CD","#9B9A9C","#6D6A6A","#3E3B39","#100C07"];
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
        gridContainer.appendChild(cell);
        cell.addEventListener('mouseover',changeCellColor)
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
    slideNum.textContent = newSize;

    if(newSize > 60 && gridVisible) toggleGrid();
    gridLock = newSize > 60 ? true : false;

    rootVars.style.setProperty("--cell-size",`${100/newSize}%`);
    createGrid(newSize);
    
}

function changeCellColor(){
    if(rainbowSwitch){
        this.style.setProperty("background-color",rainbowList[currRainbow++]);
        currRainbow = currRainbow >= 6 ? 0 : currRainbow;
    }
    else if(gradientSwitch){
        this.style.setProperty("background-color",gradientList[currGradient++]);
        currGradient = currGradient >= 5 ? 0 : currGradient;
    } 
    else
    this.classList.add("colored-cell");
}

function clearCellColor(cell){
    cell.style.removeProperty("background-color");
    cell.classList.remove("colored-cell");
}

function toggleRainbow(){
    gradientSwitch = false;
    clearGrid();
    if(!rainbowSwitch)
        rainbowSwitch = true;
    else
        rainbowSwitch = false;
}

function toggleGradient(){
    rainbowSwitch = false;
    clearGrid();
    if(!gradientSwitch)
        gradientSwitch = true;
    else
        gradientSwitch = false;
}

function changeInk(e){
    clearGrid();
    rainbowSwitch = false;
    rootVars.style.setProperty("--cell-color",e.target.value);
}

createGrid();

colorWheel.addEventListener('change',changeInk)
slider.addEventListener('change',recreateGrid)
