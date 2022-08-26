let gridContainer = document.querySelector('.grid-container');
let colorWheel = document.querySelector('.palette-button');
let rootVars = document.querySelector(':root');``

let rainbowSwitch = false;
let gradientSwitch = false;

let rainbowList = ["red","orange","yellow","green","blue","indigo","violet"]



function createGrid(){
    for(let x = 0; x <= 16*16-1; x++){
        let cell = document.createElement('div');
        cell.classList.add("cell");
        cell.textContent = ".";
        gridContainer.appendChild(cell);
    }
}

function changeCellColor(){
    this.classList.add("colored-cell")
}

function clearCellColor(cell){
    cell.classList.remove("colored-cell")
}

function clearGrid(){
    cells.forEach(cell =>{
        clearCellColor(cell)
    })
}

function toggleRainbow(){
    cells.forEach(cell =>{
        clearCellColor(cell)
    })
}

function changeInk(e){
    clearGrid();
    rootVars.style.setProperty("--cell-color",e.target.value);
}

createGrid();

let cells = document.querySelectorAll('.cell');

colorWheel.addEventListener('change',changeInk)

cells.forEach(cell =>{
    cell.addEventListener('mouseover',changeCellColor)
})