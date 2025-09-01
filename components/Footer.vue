<template>
  <v-footer app color="primary" class="footer-bg text-muted pa-4 mt-auto">
    <v-container>
      <v-row>
        <v-col cols="12" md="4" class="mb-4">
          <p class="mb-0">魔人普鳥</p>
          <p class="mb-0">Copyright © 2025 BlueBird Inc.</p>
        </v-col>
        <v-col cols="12" md="4" class="mb-4">
          <div class="w-100">
            <NuxtLink class="nav-link d-inline-block" to="/" style="padding-top: 0px;">首頁</NuxtLink>
          </div>
          <div class="w-100">
            <NuxtLink class="nav-link d-inline-block" to="/about">關於我們</NuxtLink>
          </div>
          <div class="w-100">
            <NuxtLink class="nav-link d-inline-block" to="/contact">聯絡我們</NuxtLink>
          </div>
          <div class="w-100">
            <NuxtLink class="nav-link d-inline-block" to="/cart">購物車</NuxtLink>
          </div>
        </v-col>
        <v-col cols="12" md="4" class="mb-4">
          <p class="mb-0">聯絡我們</p>
          <p class="mb-0">TEL: 03-3325898</p>
          <p class="mb-0">PHONE: 0935221039</p>
          <ClientOnly>
            <div id="google_translate_element"></div>
          </ClientOnly>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
a:hover {
  color: blue;
}
/* 搜尋輸入框背景 */
.footer-bg {
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}
</style>
