import {
  SkuCode
} from './sku-code.js'

class Judger {

  fenceGroup
  pathDict = []


  constructor(fenceGroup) {
    this.fenceGroup = fenceGroup
    this.initPathDict()
  }

  initPathDict() {
    this.fenceGroup.spu.sku_list.forEach(s => {
      const skuCode = new SkuCode(s.code)
      this.pathDict = this.pathDict.concat(skuCode.totalSeqments)
    })
    console.log(this.pathDict)
  }
}

export {
  Judger
}