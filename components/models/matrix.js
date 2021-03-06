class Matrix {
  m
  constructor(matrix) {
    this.m = matrix
  }

  get rowsNum() {
    return this.m.length
  }

  get colsNum() {
    return this.m[0].length
  }

  forEach(cb) {//cb 表示回调函数
    // j表示列
    for (let j = 0; j < this.colsNum; j++) {
      for (let i = 0; i < this.rowsNum; i++) {
        const element = this.m[i][j]
        cb(element, i, j)
      }
    }
  }

  // numpy

  transpose() {
    const desAttr = []
    for (let j = 0; j < this.colsNum; j++) {
      desAttr[j] = []
      for (let i = 0; i < this.rowsNum; i++) {
        desAttr[j][i] = this.m[i][j]
      }
      // return desAttr
    }
    return desAttr
  }
}

export {
  Matrix
}