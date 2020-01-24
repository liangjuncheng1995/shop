import {
  Cell
} from './cell.js'
class SkuPending {
  pending = [] //判断当前行是否有选中的状态
  size

  constructor(size) {
    this.size = size
  }


  init(sku) { //初始化默认的sku
    this.size = sku.specs.length //sku的类型个数
    for (let i = 0; i < sku.specs.length; i++) {
      const cell = new Cell(sku.specs[i])
      this.insertCell(cell, i)
    }
  }

  isIntact() {
    if (this.size !== this.pending.length) {
      return false
    }
    for (let i = 0; i < this.size; i++) {
      if(this._isEmptyPart(i)) {
        return false
      }
    }
    return true
  }

  _isEmptyPart(index) {
    return this.pending[index] ? false : true
  }

  insertCell(cell, x) { // 选中的cell 的时候
    this.pending[x] = cell
  }

  removeCell(x) { //待选状态cell 的时候
    this.pending[x] = null
  }

  findSelectedCellByX(x) {

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