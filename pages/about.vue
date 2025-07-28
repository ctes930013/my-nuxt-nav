<template>
  <div>
    <v-container class="my-5 v-container-padding">
      <v-row class="custom-margin-b-8">
        <v-col cols="12" md="6">
          <img src="https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2025/07/23/realtime/32677631.jpg&s=Y&x=0&y=0&sw=5616&sh=3744&h=300&w=400" class="w-100" alt="桌機圖">
        </v-col>
        <v-col cols="12" md="6" class="d-flex custom-justify-center custom-align-center mt-4 mt-md-0">
          <div class="d-flex flex-column">
            <h2 class="mb-4 fw-bold text-center">極高的品質</h2>
            <p class="mb-2 text-center">我們致力於種植品質最高的水果</p>
            <p class="mb-2 text-center">給予客戶最崇高的敬意</p>
          </div>
        </v-col>
      </v-row>
      <h2 class="mb-1 text-center">客戶評論</h2>
      <Swiper
        :slides-per-view="1"
        :loop="true"
        :autoplay="{ delay: 5000 }"
        navigation
        class="swiper"
      >
        <SwiperSlide v-for="(review, index) in reviewsList.length / reviewsSplitCount">
          <v-row>
            <v-col cols="12" md="4" class="pa-0"
              v-for="item in reviewsList.slice(index * reviewsSplitCount, index * reviewsSplitCount + reviewsSplitCount)" :key="index">
              <div class="d-flex flex-column custom-align-center p-4">
                <i class="bi bi-person" style="font-size: 6em;"></i>
                <p class="text-muted text-center mb-3" style="max-width: 200px;">"{{ item.comment }}"</p>
                <div class="mb-2">
                  <span v-for="n in 5" :key="n">
                    <i :class="n <= item.rating ? 'text-warning bi bi-star-fill mx-1' : 'text-secondary bi bi-star mx-1'"></i>
                  </span>
                </div>
                <h6 class="fw-bold">{{ item.name }}</h6>
              </div>
            </v-col>
          </v-row>
        </SwiperSlide>
      </Swiper>
    </v-container>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation';
import SwiperCore from 'swiper'
import { Autoplay, Navigation } from 'swiper/modules'

SwiperCore.use([Autoplay, Navigation])

//評論要切幾等分
const reviewsSplitCount = ref(1)
const { isMobile } = useIsMobile()
watchEffect(() => {
  reviewsSplitCount.value = isMobile.value ? 1 : 3
});
const reviewsList = [
  { name: "陳先生", comment: "這間水果店超棒，水果新鮮又好吃！", rating: 5 },
  { name: "林小姐", comment: "服務親切，送貨快速，推薦！", rating: 4 },
  { name: "王大哥", comment: "價格合理，品質保證，下次還會再購買。", rating: 5 },
  { name: "郭先生", comment: "水果很甜，美味可口！", rating: 5 },
  { name: "鄭先生", comment: "服務佳，老闆娘很正！", rating: 5 },
  { name: "許小姐", comment: "價格便宜又實惠。", rating: 4 }
]
</script>

<style scoped>
.swiper {
  --swiper-navigation-color: #272727;
  --swiper-navigation-size: 22px;
}
</style>