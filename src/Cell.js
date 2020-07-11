export default class Cell {
  constructor(puzzle, ind) {
    this.index = ind;
    this.puzzle = puzzle;
    this.isEmpty = false;
    this.width = this.puzzle.width / this.puzzle.dimension;
    this.height = this.puzzle.height / this.puzzle.dimension;
    this.el = this.createDiv();

    puzzle.el.appendChild(this.el);
    if (this.index === this.puzzle.dimension * this.puzzle.dimension - 1) {
      this.isEmpty = true;
      return;
    }
    this.setImg();
    this.setPosition(this.index)
  }
  createDiv() {
    const div = document.createElement('div');

    div.style.position = 'absolute';
    div.style.backgroundRepeat = 'no repeat';
    div.style.backgroundSize = `${this.puzzle.width}px ${this.puzzle.height}px`;
    div.style.width = `${this.width}px`;
    div.style.height = `${this.height}px`;
    div.style.border = `1px solid black`;

    div.onclick = e => {
    
      console.log(
        'this.puzzle.findPosition',
        this.index,
        this.puzzle.findPosition(this.index),
      );
    ;
    const currentCellIndex = this.puzzle.findPosition(this.index);
    const emptyCellIndex = this.puzzle.findEmpty();
 
    const { x, y } = this.getXY(currentCellIndex);
    const { x:emptyX, y:emptyY } = this.getXY(emptyCellIndex);
    // console.log('x,y', x, y), console.log('exmptyX', emptyX);
    // console.log('exmptyY', emptyY);
    if(x===emptyX||y===emptyY
    &&(Math.abs(x-emptyX)===1||Math.abs(y-emptyY)===1)){
      this.puzzle.swapCells(currentCellIndex,emptyCellIndex)
      
    }
      }
    return div;
  }

  setImg() {
    const { x, y } = this.getXY(this.index);
    const left = this.width * x;
    const top = this.height * y;

    this.el.style.backgroundImage = `url(${this.puzzle.imgSrc})`;
    this.el.style.backgroundPosition = `-${left}px -${top}px`;
  }
  setPosition(index) {
    const { left, top } = this.getPositionFromIndex(index);
    this.el.style.left = `${left}px`;
    this.el.style.top = `${top}px`;
  }
  getPositionFromIndex(index) {
    const { x, y } = this.getXY(index);
    return {
      left: this.width * x,
      top: this.height * y,
    };
  }

  getXY(index) {
    return {
      x: index % this.puzzle.dimension,
      y: Math.floor(index / this.puzzle.dimension),
    };
  }
}
