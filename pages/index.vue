<template>
  <div>
    <Swiper
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 3000 }"
      :pagination="pagination"
    >
      <SwiperSlide v-for="(banner, i) in bannerList" :key="i">
        <div class="img-container">
          <v-img :src="banner.image" class="img-container-fit" alt="桌機圖" @click="handleBannerClick(banner.image, i)" cover />
        </div>
      </SwiperSlide>
    </Swiper>
    <ClientOnly>
      <div class="container my-8">
        <v-row class="g-3">
          <v-col cols="6" sm="4" md="3" v-for="product in productList">
            <ProductCard 
              :product="product"
              :onProductClick="productClick"
              :onAddToCart="addCart"
            />
          </v-col>
        </v-row>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import type { Product } from '~/types/product'
import { productList } from '~/datas/products'
import { useSweetAlert } from '~/composables/useSweetAlert'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import SwiperCore from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import ProductCard from '~/components/ProductCard.vue'

SwiperCore.use([Autoplay, Pagination])
const pagination = {
  clickable: true
}

const bannerList = [
    {
        image: "https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2025/07/17/realtime/32606375.jpg&s=Y&x=0&y=0&sw=3000&sh=2000&h=300&w=400"
    },
    {
        image: "https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2025/07/19/2/32630971.jpg&s=Y&x=0&y=0&sw=3000&sh=2000&h=300&w=400"
    },
    {
        image: "https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2025/07/17/realtime/32606289.jpg&s=Y&x=0&y=0&sw=3535&sh=2357&h=300&w=400"
    }
];

//偵測banner點擊事件
function handleBannerClick(banner: string, index: number) {
  console.log('你點擊了 banner：', banner, '索引:', index)
}

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
/* banner指示器 */
:deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  margin: 0px 5px !important;
  background-color: #FFFFFF;
  opacity: 0.8;
}
:deep(.swiper-pagination-bullet-active) {
  background-color: #CE0000;
}
.img-container {
  position: relative;
  padding-bottom: 75%; /* 4:3 比例 */
  overflow: hidden;
}
.img-container-fit {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
@media (min-width: 768px) {
  .img-container {
    padding-bottom: 25%; /* 4:1 比例 */
  }
}
</style>