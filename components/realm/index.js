// components/realm/index.js
import {
  FenceGroup
} from '../models/fence-group.js'
import {
  Judger
} from '../models/judger.js'
import {
  Spu
} from '../../models/spu.js'
import {
  Cell
} from '../models/cell.js'
import {
  Cart
} from '../../models/cart.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object,
    orderWay: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    fences: Array,
    judger: Object,
    previewImg: String,
    title: String,
    price: String,
    discountPrice: String,
    stock: Number,
    noSpec: Boolean,
    skuIntact: Boolean,
    currentSkuCount: Cart.SKU_MIN_COUNT
  },
  lifetimes: {
    attached() {

    }
  },
  observers: {
    'spu': function(spu) {
      if (!spu) {
        return
      }
      if (Spu.isNoSpec(spu)) {
        this.processNoSpec(spu)
      } else {
        this.processHasSpec(spu)
      }
      this.triggerSpecEvent()
      // this.bindInitData(fencesGroup)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    processNoSpec(spu) {
      this.setData({
        noSpec: true,
        // skuIntact:
      })
      this.bindSkuData(spu.sku_list[0])
      this.setStockStatus(spu.sku_list[0].stock, this.data.currentSkuCount)
    },
    processHasSpec(spu) {
      const fencesGroup = new FenceGroup(spu)
      fencesGroup.initFences()
      const judger = new Judger(fencesGroup)
      this.data.judger = judger

      const defalutSku = fencesGroup.getDefaultSku() //判断有没有默认的sku
      if (defalutSku) { //如果有默认的sku则直接渲染在页面上
        this.bindSkuData(defalutSku)
        this.setStockStatus(defalutSku.stock, this.data.currentSkuCount)
      } else {
        this.bindSpuData()
      }
      this.bindTipData()
      this.bindFenceGroupData(fencesGroup)
    },

    triggerSpecEvent() {
      const noSpec = Spu.isNoSpec(this.properties.spu)
      if(noSpec) {
        this.triggerEvent('specchange', {
          noSpec: Spu.isNoSpec(this.properties.spu)
        })
      } else {
        this.triggerEvent('specchange', {
          noSpec: Spu.isNoSpec(this.properties.spu),
          skuIntact: this.data.judger.isSkuIntact(),
          currentValues: this.data.judger.getCurrentValues(),
          missingKeys: this.data.judger.getMissingKeys()
        })
      }
    },

    bindSpuData() {
      const spu = this.properties.spu
      this.setData({
        previewImg: spu.img,
        title: spu.title,
        price: spu.price,
        discountPrice: spu.discount_price,
      })
    },
    bindSkuData(sku) {
      this.setData({
        previewImg: sku.img,
        title: sku.title,
        price: sku.price,
        discountPrice: sku.discount_price,
        stock: sku.stock,
      })
    },

    bindTipData() {
      this.setData({
        skuIntact: this.data.judger.isSkuIntact(),
        currentValues: this.data.judger.getCurrentValues(),
        missingKeys: this.data.judger.getMissingKeys()
      })
    },
    // bindInitData(fenceGroup) {
    //   this.setData({
    //     fences: fenceGroup.fences,
    //     skuIntact: this.data.judger.isSkuIntact()
    //   })
    // },

    bindFenceGroupData(fenceGroup) {
      this.setData({
        fences: fenceGroup.fences
      })
    },

    setStockStatus(stock, currentCount) {
      this.setData({
        outStock: this.isOutOfStock(stock, currentCount)
      })
    },

    isOutOfStock(stock, currentCount) {
      return stock < currentCount
    },

    onSelectCount(event) {
      const currentCount = event.detail.count
      this.data.currentSkuCount = currentCount

      if (this.data.judger.isSkuIntact()) {//判断是否是完整的sku
        const sku = this.data.judger.getDeterminateSku()
        this.setStockStatus(sku.stock, currentCount)
      }
    },

    onCellTap(event) {
      let data = event.detail.cell
      const x = event.detail.x
      const y = event.detail.y

      const cell = new Cell(data.spec)
      cell.status = data.status

      const judger = this.data.judger
      judger.judge(cell, x, y)
      const skuIntact = judger.isSkuIntact()
      if (skuIntact) {
        const currentSku = judger.getDeterminateSku()
        this.bindSkuData(currentSku)
        this.setStockStatus(currentSku.stock, this.data.currentSkuCount)
      }
      this.bindTipData()
      console.log(this.data.skuIntact)
      this.bindFenceGroupData(judger.fenceGroup)
      this.triggerSpecEvent()
    }
  }
})