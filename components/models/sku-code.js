import {
  combination
} from '../../utils/utils.js'
class SkuCode {

  code
  spuId
  totalSeqments = [] //保存一个code码的 squ
  constructor(code) {
    this.code = code
    this._splitToSeqments()
  }

  _splitToSeqments() {//拆解sku码
    const spuAndSpec = this.code.split('$')
    this.spuId = spuAndSpec[0]

    const specCodeArray = spuAndSpec[1].split('#')
    const length = specCodeArray.length

    for (let i = 1; i <= length; i++) {
      const seqments = combination(specCodeArray, i)
      const newSeqments = seqments.map(segs => {
        return segs.join('#')
      })
      this.totalSeqments = this.totalSeqments.concat(newSeqments)
      // console.log(newSeqments)
    }
    //尽量少写显式的for循坏
  }

}

export {
  SkuCode
}