<template>
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
      <SwiperSlide v-for="(banner, i) in props?.banner" :key="i">
        <v-img :src="banner" @click="clickBanner(i)" contain />
      </SwiperSlide>
      <div class="swiper-pagination-text">{{ currentSlide + 1 }} / {{ props?.banner.length }}</div>
    </Swiper>
    <!-- 圖片選擇區域（支援水平滾動） -->
    <div class="thumbnail-wrapper mt-4">
      <v-icon
        class="scroll-arrow left-arrow"
        @click="scrollThumbnail('left')"
        >mdi-chevron-left</v-icon>
      <v-list 
        class="thumbnail-container"
        ref="thumbnailContainer"
        dense
      >
        <v-list-item
          v-for="(image, index) in props?.banner"
          :key="index"
          class="px-0"
          :class="{ 'selected': currentSlide === index }"
          @click="selectThumbnail(index)"
        >
          <img :src="image" alt="Thumbnail" class="thumbnail-image" />
        </v-list-item>
      </v-list>
      <v-icon
        class="scroll-arrow right-arrow"
        @click="scrollThumbnail('right')"
      >mdi-chevron-right</v-icon>
    </div>
    <div v-if="showDialog">
      <ImageDialog 
        :image-list="props?.banner ?? []"
        :index="selectedImageIndex"
        :show="showDialog" 
        @show="showDialog = $event" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import SwiperCore from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper/types'
import { VList } from 'vuetify/components'

SwiperCore.use([Autoplay, Pagination])

const currentSlide = ref(0)    //紀錄當前banner輪播位置
const swiperInstance = ref<SwiperType | null>(null)
const thumbnailContainer = ref<InstanceType<typeof VList> | null>(null)
const showDialog = ref(false)    //是否顯示圖片浮窗
const selectedImageIndex = ref(0)    //目前點選的圖片index

//開啟圖片浮窗
const openImageDialog = (index: number) => {
  selectedImageIndex.value = index
  showDialog.value = true
}

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

//水平滾動點選圖片選擇區域
const scrollThumbnail = (direction: 'left' | 'right') => {
  if (!thumbnailContainer.value) return;
  const container = thumbnailContainer.value.$el;
  const scrollAmount = 200;
  const maxScroll = container.scrollWidth - container.clientWidth;
  if (direction === 'left' && container.scrollLeft > 0) {
    container.scrollTo({
      left: Math.max(0, container.scrollLeft - scrollAmount),
      behavior: 'smooth',
    });
  } else if (direction === 'right' && container.scrollLeft < maxScroll) {
    container.scrollTo({
      left: Math.min(maxScroll, container.scrollLeft + scrollAmount),
      behavior: 'smooth',
    });
  }
};

//監聽當前banner輪播位置自動滾動到對應縮略圖
// watch(currentSlide, async (newIndex) => {
//   if (!thumbnailContainer.value) return;
//   await nextTick();
//   const container = thumbnailContainer.value;
//   const items = container.$el.getElementsByClassName('v-list-item');
//   if (items[newIndex]) {
//     items[newIndex].scrollIntoView({
//       behavior: 'smooth',
//       block: 'nearest',     // 對齊到最近邊緣
//       inline: 'end',     // 水平對齊到結束位置
//     });
//   }
// });

//banner點擊事件
function clickBanner(index: number) {
  openImageDialog(index)
  emit('bannerClick', index)
}

const props = defineProps({
  banner: {
    type: Object as () => string[],
    required: true
  },
});

const emit = defineEmits(['bannerClick']);
</script>

<style scoped>
.swiper-container {
  width: 80%;
  margin: 0 auto;
  position: relative;
}
@media (min-width: 768px) {
  .swiper-container {
    width: 60%; /* 桌面板寬度 */
  }
}

.thumbnail-wrapper {
  position: relative;    /* 為箭頭提供定位參考 */
  width: 100%;     /* 確保包裹整個容器 */
  overflow: hidden;    /* 防止內容溢出影響布局 */
}

/* 水平滾動的圖片選擇區域 */
.thumbnail-container {
  overflow-x: auto;     /* 啟用水平滾動 */
  white-space: nowrap;     /* 防止換行 */
  padding: 10px 0;      /* 增加上下 padding */
  position: relative;
  -webkit-overflow-scrolling: touch;     /* 提升 iOS 滾動體驗 */
}

.v-list-item {
  display: inline-block !important; /* 確保水平排列 */
  width: 80px;
  height: 80px;
  padding: 0;
  margin-right: 10px;
}

.selected .thumbnail-image {
  border: 2px solid #1976d2;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 圖片選擇區域的箭頭 */
.scroll-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  padding: 4px;
}
.left-arrow {
  left: 0;
}
.right-arrow {
  right: 0;
}

/* 隱藏滾動條 */
.thumbnail-container::-webkit-scrollbar {
  display: none;     /* 隱藏 Chrome/Safari 滾動條 */
}
.thumbnail-container {
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none;    /* Firefox */
}
</style>