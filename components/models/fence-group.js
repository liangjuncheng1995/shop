import {
  Matrix
} from './matrix'
import {
  Fence
} from './fence.js'

class FenceGroup {
  spu
  skuList = []
  fences = []



  constructor(spu) {
    this.spu = spu
    this.skuList = spu.sku_list

  }

  initFences1() {
    const matrix = this._createMatrix(this.skuList)
    const fences = []
    let currentJ = -1
    matrix.each((element, i, j) => {
      if (currentJ != j) {
        //开启新列，需要创建一个新的Fence
        currentJ = j
        fences[currentJ] = this._createFence(element)
      }
      fences[currentJ].pushValueTitle(element.value)
    })
    console.log(fences)
  }

  initFences() {
    const matrix = this._createMatrix(this.skuList)
    const fences = []
    const AT = matrix.transpose() //数组的倒置
    AT.forEach(r => { //数组的去重和数组的包装
      const fence = new Fence(r)
      fence.init()
      fences.push(fence)
    })
    this.fences = fences
  }

  _createFence(element) {
    const fence = new Fence()
    // fence.pushValueTitle(element.value)
    return fence
  }

  eachCell(cb) {
    console.log(cb)
    for (let i = 0; i < this.fences.length; i++) {
      for (let j = 0; j < this.fences[i].cells.length; j++) {
        const cell = this.fences[i].cells[j]
        cb(cell, i, j)
      }
    }
  }

  _createMatrix(skuList) {
    const m = []
    skuList.forEach(sku => {
      m.push(sku.specs)
    })
    return new Matrix(m)
  }


}

export {
  FenceGroup
}