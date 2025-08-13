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

        <!-- 會員中心 -->
        <!-- 已登入就用懸浮選單 -->
        <div v-if="userStore.isLoggedIn">
          <v-menu v-model="menu" :close-on-content-click="false" open-on-hover open-on-click>
            <!-- 激活選單的按鈕 -->
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" :style="isMobile ? 'min-width: auto; padding: 0.25rem;' : ''">
                <i class="bi bi-person-circle"></i>
              </v-btn>
            </template>
            <v-list>
              <v-list-item to="/userinfo" @click="menu = false">
                <v-list-item-title>會員資料</v-list-item-title>
              </v-list-item>
              <v-list-item @click="logout">
                <v-list-item-title>登出</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <!-- 未登入就用一般按鈕 -->
        <div v-else>
          <v-btn :style="isMobile ? 'min-width: auto; padding: 0.25rem;' : ''" @click="checkUserPage">
            <i class="bi bi-person-circle"></i>
          </v-btn>
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
import { useUserStore } from '@/stores/user'
import { useSweetAlert } from '~/composables/useSweetAlert'

const drawer = ref(false)  //漢堡包狀態
const menu = ref(false); // 選單狀態

const userStore = useUserStore();

const { isMobile } = useIsMobile()

// 頁面載入時檢查登入狀態
onMounted(() => {
  userStore.checkAuth();
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', userStore.checkAuth);
  }
});

// 清理事件監聽器
onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('storage', userStore.checkAuth);
  }
});

//檢查要將用戶導去哪個頁面
function checkUserPage() {
  navigateTo({
    path: '/signin',
  })
}

//登出
function logout() {
  menu.value = false
  const { showAlert } = useSweetAlert()

  showAlert({
    title: '確定要登出嗎?',
    isCanCancel: true,
    icon: 'warning',
    onConfirm: () => {
      const userStore = useUserStore()
      userStore.logout()
      navigateTo({
        path: '/',
      })
    },
  })
}
</script>

<style scoped>
.nav-bar-icon {
  --v-btn-size: 24px !important;
  border-radius: 0%;
}
</style>