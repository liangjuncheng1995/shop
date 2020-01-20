import {
  CellStatus
} from '../../core/enum.js'

class Cell {
  title
  id
  status = CellStatus.SELECTED
  constructor(spec) {
    this.title = spec.value
    this.id = spec.value_id
  }
}
 
export {
  Cell
}