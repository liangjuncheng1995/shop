class Fence {

  valueTitles = []
  specs

  constructor(specs) {//传进来的必须是相同的规格名，比如颜色类型，不能是颜色，尺码
    this.specs = specs
  }

  init() {
    this.specs.forEach(s => {
      this.pushValueTitle(s.value)
    })
  }

  pushValueTitle(title) {
    this.valueTitles.push(title)
  }
}

export {
  Fence
}