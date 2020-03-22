import {
  CellStatus
} from '../../core/enum.js'

class Cell {
  title //规格值的名字
  id //规格值的唯一标识
  status = CellStatus.SELECTED
  constructor(spec) {
    this.title = spec.value
    this.id = spec.value_id
  }
}
 
export {
  Cell
}