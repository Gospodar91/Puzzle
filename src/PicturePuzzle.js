import Cell from './Cell';
export default class PicturePuzzle {
  constructor(el, imgSrc, width) {
    this.parentEl = el;
    this.dimension = 3;
    this.imgSrc = imgSrc;
    this.width = width;
    this.cells = [];
    this.init();

    const img = new Image();

    img.onload = () => {
      this.height = (img.height * this.width) / img.width;
      this.el.style.width = `${this.width}px`;
      this.el.style.height = `${this.height}px`;
      this.setup();
    };
    img.src = this.imgSrc;
  }
  createWrapper() {
    const div = document.createElement('div');
    div.style.position = 'relative';
    div.style.margin = '0 auto';

    return div;
  }
  init() {
    this.el = this.createWrapper();
    this.parentEl.appendChild(this.el);
  }
  setup() {
    for (let i = 0; i < this.dimension * this.dimension; i++) {
      this.cells.push(new Cell(this, i));
    }
    // setTimeout(this.shuffle,1000)
    this.shuffle();
    setTimeout(console.log('hi', ),5000)
  }
  
  shuffle() {

    for (let i = this.cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      this.swapCells(i, j);
    }

    console.log('i', this.cells);
  }
  swapCells(i, j) {
    [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];
    this.cells[i].setPosition(i);
    this.cells[j].setPosition(j);
    if (this.isAssemble()) {
      console.log('win');
    }
  }
  findPosition(index) {
    return this.cells.findIndex(cell => cell.index === index);
  }
  findEmpty() {
    return this.cells.findIndex(cell => cell.isEmpty);
  }
  isAssemble() {
    for (let i = 0; i < 4; i++) {
      if (i !== this.cells[i].index) {
        return false;
      }
    }
    return true;
  }
}
