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
            <SwiperSlide v-for="(banner, i) in bannerList" :key="i">
              <v-img :src="banner" cover />
            </SwiperSlide>
          </Swiper>
        </v-col>
        <v-col cols="12" md="6" class="d-flex custom-justify-center custom-align-center mt-4 mt-md-0">
          <div class="d-flex flex-column">
            <h2 class="mb-4 fw-bold text-center">{{ title }}</h2>
            <p class="mb-2 text-center">富有果肉，多嫩多汁</p>
            <p class="mb-2 text-center">營養又可口</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import SwiperCore from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'

SwiperCore.use([Autoplay, Pagination])
const pagination = {
    clickable: true
}

var title = ref("")
var bannerList = ref([]);

const route = useRoute()
//取得上頁傳進來的id
const productId = parseInt(route.query.id)
switch (productId) {
    case 1:
        title = "袋套葡萄"
        bannerList = [
            "https://youli-fruits.com/wp-content/uploads/2021/08/%E5%A5%97%E8%A2%8B%E8%91%A1%E8%90%84.jpg",
            "https://youli-fruits.com/wp-content/uploads/2021/08/%E5%B7%A8%E5%B3%B0%E8%91%A1%E8%90%84.jpg"
        ]
        break
    case 2:
        title = "嘉義荔枝"
        bannerList = [
            "https://youli-fruits.com/wp-content/uploads/2021/08/%E7%8E%89%E8%8D%B7%E5%8C%85%E8%8D%94%E6%9E%9D.jpg",
            "https://youli-fruits.com/wp-content/uploads/2021/08/%E9%BB%91%E8%91%89%E8%8D%94%E6%9E%9D.jpg"
        ]
        break
    case 3:
        title = "黃色西瓜"
        bannerList = [
            "https://youli-fruits.com/wp-content/uploads/2021/08/%E5%B0%8F%E7%8E%89%E8%A5%BF%E7%93%9C.jpg"
        ]
        break
    default:
        title = "二號芒果"
        bannerList = [
            "https://youli-fruits.com/wp-content/uploads/2021/07/%E5%8F%B0%E8%BE%B21%E8%99%9F.jpg",
            "https://youli-fruits.com/wp-content/uploads/2021/08/%E5%A4%8F%E9%9B%AA%E8%8A%92%E6%9E%9C.jpg",
            "https://youli-fruits.com/wp-content/uploads/2021/08/%E8%A5%BF%E6%96%BD%E8%8A%92%E6%9E%9C%E6%8B%B7%E8%B2%9D.jpg"
        ]
        break
}
</script>