<template>
  <div>
    <v-app>
      <!-- 上層頂部公告橫幅 -->
      <Bulletin class="bulletin"/>
      <CommonAppBar v-model:appBarHeight="appBarHeight" />

      <v-main 
        class="main" 
        :style="{ '--v-layout-top': appBarHeight ? `${appBarHeight}px` : '92px' }"
        >
        <NuxtPage />
      </v-main>

      <div style="position: relative;">
        <BackToTop 
          class="back-to-top"
          :class="{ 'above-footer': isFooterVisible }"
        />
        <Footer class="main-bottom"></Footer>
      </div>
    </v-app>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CommonAppBar from '~/components/CommonAppBar.vue'
import BackToTop from '~/components/BackToTop.vue'

const appBarHeight = ref(100)    //紀錄app abr高度
const isFooterVisible = ref(false)   //當前是否可以看到footer

//確認當前是否能看到footer
const checkFooterVisibility = () => {
  const footer = document.querySelector('.main-bottom')
  if (!footer) return

  const footerRect = footer.getBoundingClientRect()
  const windowHeight = window.innerHeight
  // Check if the footer is visible in the viewport
  isFooterVisible.value = footerRect.top < windowHeight && footerRect.bottom > 0
}

onMounted(() => {
  window.addEventListener('scroll', checkFooterVisibility)
  // Initial check
  checkFooterVisibility()
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkFooterVisibility)
})
</script>

<style scoped>
/* 最頂部公告佈局 */
.bulletin {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1500;
}
/* 滾到頂埔按鈕固定右下角 */
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 24px;
  z-index: 7000;
}
/* 滾到頂埔按鈕固定在footer上方 */
.back-to-top.above-footer {
  position: absolute;
  bottom: calc(100% + 20px);
  right: 24px;
}
</style>