import {
  Cell
} from './cell.js'

class Fence {

  // valueTitles = []
  cells = []
  specs
  title //规格名的名字
  id //规格名的唯一标识 

  constructor(specs) {
    this.specs = specs
    this.title = specs[0].key
    this.id = specs[0].key_id
  }

  init() {
    this._initCells()
  }

  _initCells() {
    this.specs.forEach(s => {
      const existed = this.cells.some(c => {//数组去重
        return c.id === s.value_id
      })
      if(existed) {
        return 
      }
      const cell = new Cell(s)
      this.cells.push(cell)
      // this.pushValueTitle(s.value)
    })
  }

  // pushValueTitle(title) {
  //   this.valueTitles.push(title)
  // }
}

export {
  Fence
}