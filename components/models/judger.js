import {
  SkuCode
} from './sku-code.js'
import {
  CellStatus
} from '../../core/enum.js'
import {
  SkuPending
} from './sku-pending.js'
import {
  Cell
} from './cell.js'
import {
  Joiner
} from '../../utils/joiner.js'

class Judger {

  fenceGroup
  pathDict = []
  skuPending

  constructor(fenceGroup) {
    this.fenceGroup = fenceGroup
    this._initSkuPending()
    this._initPathDict()
  }

  _initSkuPending() {
    this.skuPending = new SkuPending()
  }

  _initPathDict() {
    this.fenceGroup.spu.sku_list.forEach(s => {
      const skuCode = new SkuCode(s.code)
      this.pathDict = this.pathDict.concat(skuCode.totalSeqments)
    })
    // 字典里面的sku的code码
    // console.log(this.pathDict)
  }

  judge(cell, x, y) {
    this._changeCurrentCellStatus(cell, x, y)//点击cell之后，状态的改变
    // this.fenceGroup.eachCell(this._changeOtherCellStatus)
    this.fenceGroup.eachCell((cell, x, y) => {
      // console.log(cell) //这个cell 和上面的 cell 不一样，上面的点击的cell,这行cell 是遍历服务器返回的所有cell
      // 可以说是每点击一个cell之后，都要遍历所有的sku code 码是否都在字典里面
      // console.log(x)
      // console.log(y)

      const path = this._findpotentialPath(cell, x, y)
      console.log(path)
      if(!path) {
        return 
      }
      const isIn = this._inInDict(path)//在字典寻找是否有sku的数据
      if(isIn) {
        this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
      } else {
        this.fenceGroup.fences[x].cells[y].status = CellStatus.FORBIDDEN
      }
    })
  }

  _inInDict(path) {//寻找sku码的字典
    return this.pathDict.includes(path)
  }

  //已选中的当前的Cell 不需要判断潜在的路径
  // 对于某个cell 它的潜在路径应该是，它自己加上其他的已选元素（普适）
  // 对于某个cell ,不需要考虑当前行其他元素是否已选的
  _changeOtherCellStatus(cell, x, y) {
    const path = this._findpotentialPath(cell, x, y)
    console.log(path)
  }

  _findpotentialPath(cell, x, y) {
    console.log(cell)
    console.log(x)//当前行
    console.log(this.fenceGroup.fences)//所有的行
    const joiner = new Joiner('#')
    for (let i = 0; i < this.fenceGroup.fences.length; i++) {

      const selected = this.skuPending.findSelectedCellByX(i)//获取已经是选中状态的cell
      if (x === i) {
        //当前行
        if (this.skuPending.isSelected(cell,x)) {//判断当前行有没有选中的
          return //如果当前行有选中的cell的情况下，直接退出循环
        }
        const cellCode = this._getCellCode(cell.spec)
        joiner.join(cellCode) //使用 #号连接
      } else {
        //其他行
        if (selected) {//如果
          debugger
          const selectedCelCode = this._getCellCode(selected.spec)
          joiner.join(selectedCelCode)
        }
      }
    }
    return joiner.getStr()
  }
  
  _getCellCode(spec) {
    return spec.key_id + '-' + spec.value_id
  }

  _changeCurrentCellStatus(cell, x, y) {
    if (cell.status === CellStatus.WAITING) {
      this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED
      this.skuPending.insertCell(cell, x)
    }
    if (cell.status === CellStatus.SELECTED) {
      this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
      this.skuPending.removeCell(x)
    }
  }
}

export {
  Judger
}