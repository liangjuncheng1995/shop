class SkuPending {
  pending = [] //判断当前行是否有选中的状态

  constructor() {

  }

  insertCell(cell, x) {// 选中的cell 的时候
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
    if (!pendingCell) {//判断当前行是否有选中的状态,如果没有选中的状态的话 就返回false
      return false
    }
    return cell.id === pendingCell.id
  }


}

export {
  SkuPending
}