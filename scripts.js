

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

let rainbowList = ["red","orange","yellow","green","blue","indigo","violet"]


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
    this.classList.add("colored-cell")
}

function clearCellColor(cell){
    cell.classList.remove("colored-cell");
}

function toggleRainbow(){
    clearGrid();
    if(!rainbowSwitch)
        rainbowSwitch = true;
    else
        rainbowSwitch = false;
    
}

function changeInk(e){
    clearGrid();
    rootVars.style.setProperty("--cell-color",e.target.value);
}

createGrid();



colorWheel.addEventListener('change',changeInk)
slider.addEventListener('change',recreateGrid)
