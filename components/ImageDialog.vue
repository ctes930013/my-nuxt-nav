<template>
  <v-dialog v-model="dialog" max-width="800px" @click:outside="closeDialog">
    <v-col class="image-card">
      <v-icon @click="closeDialog" class="close">mdi-window-close</v-icon>
      <div style="margin-top: 30px;">
        <v-icon
          class="scroll-arrow left-arrow"
          @click="switchImage('left')"
        >mdi-chevron-left</v-icon>
        <v-card class="image">
          <v-img :src="props?.imageList[currentIndex]" alt="Full Image" max-height="80vh" contain />
          <div class="swiper-pagination-text">{{ currentIndex + 1 }} / {{ props?.imageList.length }}</div>
        </v-card>
        <v-icon
          class="scroll-arrow right-arrow"
          @click="switchImage('right')"
        >mdi-chevron-right</v-icon>
      </div>
    </v-col>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  imageList: {
    type: Object as () => string[],
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  show: {
    type: Boolean,
    required: true
  },
})
const emit = defineEmits(['show'])
const dialog = ref(props.show)
const currentIndex = ref(props.index)   //紀錄當前圖片所在位置

const closeDialog = () => {
  dialog.value = false
  emit('show', false)
}

//切換圖片
const switchImage = (direction: 'left' | 'right') => {
  if (direction === 'left' && currentIndex.value > 0) {
    currentIndex.value--
  } else if (direction === 'right' && currentIndex.value < props?.imageList.length - 1) {
    currentIndex.value++
  }
}

watch(() => props.show, (newVal) => {
  dialog.value = newVal
})
</script>

<style scoped lang="scss">
$margin-image: 30px;
.image-card {
  position: relative;
  padding: 0;
}
.close {
  color: white;
  position: absolute;
  right: $margin-image;
  top: 0px;
}
.image {
  margin-left: $margin-image;  
  margin-right: $margin-image;
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
</style>