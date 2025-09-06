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

      <BackToTop />
      <Footer class="main-bottom"></Footer>
    </v-app>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CommonAppBar from '~/components/CommonAppBar.vue'
import BackToTop from '~/components/BackToTop.vue'

const appBarHeight = ref(100)    //紀錄app abr高度
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
</style>