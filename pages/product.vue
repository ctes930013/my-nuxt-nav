<template>
  <div>
    <v-container class="my-5 v-container-padding">
      <v-row class="custom-margin-b-8">
        <v-col cols="12" md="6">
          <Swiper
            :slides-per-view="1"
            :loop="true"
            :autoplay="{ delay: 3000 }"
            :pagination="pagination"
            >
            <SwiperSlide v-for="(banner, i) in productData?.banner" :key="i">
              <v-img :src="banner" cover />
            </SwiperSlide>
          </Swiper>
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

SwiperCore.use([Autoplay, Pagination])
const pagination = {
    clickable: true
}

var productData = ref<Product>()
var relativeProductList = ref([] as Product[])

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