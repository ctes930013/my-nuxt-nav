<template>
  <v-footer app color="grey lighten-4" class="text-muted pa-4 mt-auto">
    <v-container>
      <v-row>
        <v-col cols="12" md="4" class="mb-4">
          <p class="mb-0">魔人普鳥</p>
          <p class="mb-0">Copyright © 2025 BlueBird Inc.</p>
        </v-col>
        <v-col cols="12" md="4" class="mb-4">
          <NuxtLink class="nav-link" to="/" style="padding-top: 0px;">首頁</NuxtLink>
          <NuxtLink class="nav-link" to="/about">關於</NuxtLink>
          <NuxtLink class="nav-link" to="/contact">聯絡</NuxtLink>
        </v-col>
        <v-col cols="12" md="4" class="mb-4">
          <p class="mb-0">聯絡我們</p>
          <p class="mb-0">TEL: 03-3325898</p>
          <p class="mb-0">PHONE: 0935221039</p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
a:hover {
  color: blue;
}
</style>
