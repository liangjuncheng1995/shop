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
      const existed = this.cells.some(c => { //数组去重
        return c.id === s.value_id
      })
      if (existed) {
        return
      }
      const cell = new Cell(s)
      this.cells.push(cell)
      // this.pushValueTitle(s.value)
    })
  }

  setFenceSketch(skuList) {
    this.cells.forEach(c => {
      this._setCellSkuImg(c,skuList)
    })
  }

  _setCellSkuImg(cell, skuList) {
    const specCode = cell.getCellcode()
    const matchedSku = skuList.find(s=> s.code.includes(specCode))
    if (matchedSku) {
      cell.skuImg = matchedSku.img
    }
  }


  // pushValueTitle(title) {
  //   this.valueTitles.push(title)
  // }
}

export {
  Fence
}