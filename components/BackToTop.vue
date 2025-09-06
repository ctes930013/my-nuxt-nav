<template>
  <v-btn
    v-show="showButton"
    color="primary"
    fab
    elevation="8"
    @click="scrollToTop"
  >
    <v-icon>mdi-arrow-up</v-icon>
  </v-btn>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showButton = ref(false)

// 監聽滾動事件
const handleScroll = () => {
  showButton.value = window.scrollY > 200 // 超過 200px 才顯示
}

// 回到頂部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // 平滑滾動
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>