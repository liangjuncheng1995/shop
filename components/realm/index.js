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

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object
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
    skuIntact: Boolean
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
      if(Spu.isNoSpec(spu)) {
        this.setData({
          noSpec: true,
          // skuIntact:
        })
        this.bindSkuData(spu.sku_list[0])
        return
      }

      const fencesGroup = new FenceGroup(spu)
      // fencesGroup.initFences()
      fencesGroup.initFences()

      // console.log(fencesGroup.fences)
      // console.log(fencesGroup)

      const judger = new Judger(fencesGroup)
      this.data.judger = judger

      const defalutSku = fencesGroup.getDefaultSku()//判断有没有默认的sku
      if(defalutSku) {//如果有默认的sku则直接渲染在页面上
        this.bindSkuData(defalutSku)
      } else {
        this.bindSpuData() 
      }
      
      this.bindInitData(fencesGroup)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
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
        stock: sku.stock
      })
    },
    bindInitData(fenceGroup) {
      this.setData({
        fences: fenceGroup.fences,
        skuIntact: this.data.judger.isSkuIntact()
      })
    },
    onCellTap(event) {
      const cell = event.detail.cell
      const x = event.detail.x
      const y = event.detail.y
      const judger = this.data.judger
      judger.judge(cell, x, y)
      this.setData({
        fences: judger.fenceGroup.fences
      })
    }
  }
})