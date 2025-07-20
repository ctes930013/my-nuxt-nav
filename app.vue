<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout />
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Bootstrap 4 的 banner carousel 初始化
function initCarousel() {
  nextTick(() => {
    const el = document.querySelector('#carouselBanner')
    if (el) {
      new bootstrap.Carousel(el, {
        interval: 3000,
        ride: 'carousel'
      });
    }
  })
}

onMounted(() => {
  initCarousel()
})

// 監聽路由變化（每次進到首頁都初始化）
watch(
  () => route.fullPath,
  (newPath) => {
    if (newPath === '/') {
        initCarousel()
    }
  }
)
</script>