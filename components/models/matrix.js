class Matrix {
  m
  constructor(matrix) {
    this.m = matrix
  }

  get rowsNum() {//行
    return this.m.length
  }

  get colsNum() {//列
    return this.m[0].length
  }

  each(cb) {
    for (let j = 0; j < this.colsNum; j++) {
      for (let i = 0; i < this.rowsNum; i++) {
        const element = this.m[i][j]
        cb(element, i, j)
      }
    }
  }

  // numpy

  transpose() {//矩阵的倒置
    const desAttr = []
    for (let j = 0; j < this.colsNum; j++) {
      desAttr[j] = []
      for (let i = 0; i < this.rowsNum; i++) {
        desAttr[j][i] = this.m[i][j]
      }
    }
    return desAttr
  }
}

export {
  Matrix
}