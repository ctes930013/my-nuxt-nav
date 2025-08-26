<template>
  <div>
    <v-container class="my-5 px-md-15">
      <v-row class="custom-margin-b-8">
        <v-col cols="12" md="6">
          <!-- banner輪播圖區域 -->
          <div class="swiper-container">
            <Swiper
              style="height: 80%;"
              :slides-per-view="1"
              :loop="true"
              :autoplay="{ delay: 3000 }"
              @swiper="onSwiper"
              @slide-change="onSlideChange"
              >
              <SwiperSlide v-for="(banner, i) in productData?.banner" :key="i">
                <v-img :src="banner" contain />
              </SwiperSlide>
              <div class="swiper-pagination-text">{{ currentSlide + 1 }} / {{ productData?.banner.length }}</div>
            </Swiper>
            <!-- 圖片選擇區域（支援水平滾動） -->
            <div class="thumbnail-container mt-4">
              <div
                v-for="(image, index) in productData?.banner"
                :key="index"
                class="thumbnail"
                :class="{ 'selected': currentSlide === index }"
                @click="selectThumbnail(index)"
              >
                <img :src="image" alt="Thumbnail" class="thumbnail-image" />
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="d-flex custom-justify-center custom-align-center mt-4 mt-md-0">
          <div class="d-flex flex-column">
            <h2 class="mb-4 fw-bold text-center">{{ productData?.name }}</h2>
            <p class="mb-2 text-center">{{ productData?.description }}</p>
            <p class="mb-10 text-center">營養又可口</p>
            <v-btn
              color="primary"
              class="custom-mx-auto"
              @click.stop="addCart(productData!!)"
            >
              加入購物車
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <div class="container my-4">
        <h2 class="fw-bold mb-4">相關產品:</h2>
        <v-row class="g-3">
          <v-col cols="6" sm="4" md="4" v-for="product in relativeProductList">
            <ProductCard 
              :product="product"
              :onProductClick="productClick"
              :onAddToCart="addCart"
            />
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import type { Product } from '~/types/product'
import { productList } from '~/datas/products'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import SwiperCore from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper/types'

SwiperCore.use([Autoplay, Pagination])

var productData = ref<Product>()
var relativeProductList = ref([] as Product[])

const currentSlide = ref(0)    //紀錄當前banner輪播位置
const swiperInstance = ref<SwiperType | null>(null)

//實例化swiper
const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper
};

//監聽banner輪播改變時候
const onSlideChange = (swiper: { realIndex: number }) => {
  currentSlide.value = swiper.realIndex
};

//點選圖片選擇區域某張圖片
const selectThumbnail = (index: number) => {
  currentSlide.value = index;
  if (swiperInstance.value) {
    swiperInstance.value.slideToLoop(index)
  }
};

const route = useRoute()

//取得產品資料
function getProductData(id: number = 0) {
  //取得上頁傳進來的id
  var productId: number = id
  if (id == 0 && typeof route.query.id === 'string') {
    productId = parseInt(route.query.id)
  }

  productData.value = productList.find((item) => item.id === productId)

  //取得相關產品
  relativeProductList.value = []
  productList.forEach((item) => {
    if(item.id != productId) {
      relativeProductList.value.push(item)
    }
  })
}

getProductData()

//監聽產品路由跳轉(因為同一個頁面vue預設不會自動刷新)
watch(() => route.query.id, (newId) => {
  if (typeof newId === 'string') {
    getProductData(parseInt(newId))
  }
}, { immediate: true })

//偵測商品點擊事件
function productClick(productId: number) {
  navigateTo({
    path: '/product',
    query: { id: productId }
  })
}

//偵測購物車點擊事件
function addCart(product: Product) {
  const cartStore = useCartStore()
  const { showAlert } = useSweetAlert()

  cartStore.addToCart(product)
  showAlert({
    title: '成功加入購物車',
    icon: 'success',
    onConfirm: () => {
      console.log('用戶點擊了確定按鈕')
    },
  })
}
</script>

<style scoped>
.swiper-container {
  width: 80%;
  margin: 0 auto;
  position: relative;
}
.swiper-pagination-text {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 5px;
  z-index: 10;    /* 確保文字顯示在圖片上層 */
}
/* 水平滾動的圖片選擇區域 */
.thumbnail-container {
  overflow-x: auto;     /* 啟用水平滾動 */
  white-space: nowrap;     /* 防止換行 */
  padding: 10px 0;      /* 增加上下 padding */
  -webkit-overflow-scrolling: touch;     /* 提升 iOS 滾動體驗 */
}

.thumbnail {
  display: inline-block; /* 確保水平排列 */
  width: 80px;
  height: 80px;
  cursor: pointer;
  border: 2px solid transparent;
  vertical-align: top; /* 對齊頂部 */
  margin-right: 10px; /* 縮略圖之間的間距 */
}

.thumbnail.selected {
  border-color: #1976d2;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>