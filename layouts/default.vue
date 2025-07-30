<template>
  <div>
    <v-app>
      <v-app-bar app color="primary" dark>
        <v-toolbar-title>
          <NuxtLink class="navbar-brand" to="/">MyApp</NuxtLink>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- 電腦板的選單 -->
        <div class="d-none d-sm-flex">
          <v-btn text to="/">首頁</v-btn>
          <v-btn text to="/about">關於我們</v-btn>
          <v-btn text to="/contact">聯絡我們</v-btn>
          <v-btn text to="/cart">購物車</v-btn>
        </div>

        <!-- 手機板的漢堡選單 -->
        <v-app-bar-nav-icon @click="drawer = !drawer" class="nav-bar-icon d-sm-none">
          <i class="bi bi-list"></i>
        </v-app-bar-nav-icon>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        temporary
        location="right"
        class="d-sm-none"
      >
        <v-list>
          <v-list-item to="/">首頁</v-list-item>
          <v-list-item to="/about">關於我們</v-list-item>
          <v-list-item to="/contact">聯絡我們</v-list-item>
          <v-list-item to="/cart">購物車</v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="main">
        <NuxtPage />
      </v-main>

      <Footer class="main-bottom"></Footer>
    </v-app>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
</script>

<style scoped>
.nav-bar-icon {
  --v-btn-size: 24px !important;
  border-radius: 0%;
}
</style>