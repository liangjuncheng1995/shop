import {
  Cell
} from './cell.js'
class SkuPending {
  pending = [] //判断当前行是否有选中的状态

  constructor() {

  }


  init(sku) {//初始化默认的sku
    for (let i = 0; i < sku.specs.length; i++) {
      const cell = new Cell(sku.specs[i])
      this.insertCell(cell, i)
    }
  }

  insertCell(cell, x) { // 选中的cell 的时候，正选
    this.pending[x] = cell
  }

  removeCell(x) { //待选状态cell 的时候，反选
    this.pending[x] = null
  }

  findSelectedCellByX(x) { //查找已经选中的cell

    return this.pending[x]
  }

  isSelected(cell, x) {
    const pendingCell = this.pending[x]
    if (!pendingCell) { //判断当前行是否有选中的状态,如果没有选中的状态的话 就返回false
      return false
    }
    return cell.id === pendingCell.id
  }


}

export {
  SkuPending
}