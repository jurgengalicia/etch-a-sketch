let gridContainer = document.querySelector('.grid-container');


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



createGrid();

let cells = document.querySelectorAll('.cell');

cells.forEach(cell =>{
    cell.addEventListener('mouseover',changeCellColor)
})