<template>
  <div>
    <v-app>
      <v-app-bar 
        app 
        color="primary" 
        dark
        ref="appBar"
        :style="{ transform: isAppBarVisible ? 'translateY(0)' : 'translateY(-100%)' }"
        style="transition: transform 0.3s ease-in-out;"
      >
        <div class="d-flex flex-column">
          <!-- 上層頂部橫幅 -->
          <div class="text-center py-2">
            <p class="text-white" style="margin: 0;">歡迎來到線上水果行~~~</p>
          </div>

          <!-- 下層選單列 -->
          <div class="d-flex align-center px-4 py-2">
            <v-toolbar-title class="shrink">
              <NuxtLink class="navbar-brand" to="/">MyApp</NuxtLink>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- 電腦板的選單 -->
            <div class="d-none d-md-flex text-center">
              <v-btn text to="/">首頁</v-btn>
              <!-- 商品的一級選單 -->
              <v-menu v-model="productMenu" :close-on-content-click="false" open-on-hover open-on-click>
                <template v-slot:activator="{ props }">
                  <v-btn text v-bind="props">商品</v-btn>
                </template>
                <v-list>
                  <!-- 商品的二級選單 -->
                  <v-menu location="end" open-on-hover open-on-click>
                    <template v-slot:activator="{ props }">
                      <v-list-item v-bind="props">
                        <v-list-item-title>類別</v-list-item-title>
                      </v-list-item>
                    </template>
                    <v-list style="max-width: 400px;">
                      <v-list-item>
                        <v-list-item-title>夏天系列</v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>多水</v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>無子</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  <v-list-item>
                    <v-list-item-title>熱門產品</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-btn text to="/about">關於我們</v-btn>
              <v-btn text to="/contact">聯絡我們</v-btn>
              <v-btn text to="/cart">購物車</v-btn>
            </div>

            <v-spacer></v-spacer>

            <!-- 會員中心 -->
            <!-- 已登入就用懸浮選單 -->
            <ClientOnly>
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
            </ClientOnly>

            <!-- 手機板的漢堡選單 -->
            <v-app-bar-nav-icon @click="drawer = !drawer" class="nav-bar-icon d-block d-md-none">
              <i class="bi bi-list"></i>
            </v-app-bar-nav-icon>
          </div>
        </div>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        temporary
        location="right"
        class="d-block d-md-none"
        :style="{ 'top': appBarHeight ? `${appBarHeight}px` : '92px' }"
      >
        <v-list>
          <v-list-item to="/">首頁</v-list-item>
          <!-- 商品的一級選單 -->
          <v-expansion-panels>
            <v-expansion-panel elevation="0">
              <v-expansion-panel-title class="pl-4 pr-4">
                商品
              </v-expansion-panel-title>
              <!-- 商品的二級選單 -->
              <v-expansion-panel-text>
                <v-list-item>
                  <v-expansion-panels>
                    <v-expansion-panel elevation="0">
                      <v-expansion-panel-title class="pl-0 pr-0">
                        <v-list-item-title>類別</v-list-item-title>
                      </v-expansion-panel-title>
                      <!-- 商品的二級選單 -->
                      <v-expansion-panel-text>
                        <v-list-item>
                          <v-list-item-title>夏天系列</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>多水</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>無子</v-list-item-title>
                        </v-list-item>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-list-item>
                <v-list-item>
                  熱門產品
                </v-list-item>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-list-item to="/about">關於我們</v-list-item>
          <v-list-item to="/contact">聯絡我們</v-list-item>
          <v-list-item to="/cart">購物車</v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main 
        class="main" 
        :style="{ '--v-layout-top': appBarHeight ? `${appBarHeight}px` : '92px' }"
        >
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
const menu = ref(false)   // 選單狀態
const productMenu = ref(false)    // 商品選單狀態
const isAppBarVisible = ref(true)    //app bar是否顯示
const appBar = ref(null)    // Ref for v-app-bar
const appBarHeight = ref(64)    //紀錄app abr高度
var lastScrollPosition = 0

const userStore = useUserStore()

const { isMobile } = useIsMobile()

//取得app bar高度
const updateAppBarHeight = () => {
  if (appBar.value) {
    appBarHeight.value = appBar.value.$el.offsetHeight || 64;
  }
};

onMounted(() => {
  updateAppBarHeight()
  const orientationMedia = window.matchMedia('(orientation: portrait)')
  orientationMedia.addEventListener('change', updateAppBarHeight)
  // Add scroll event listener when component is mounted
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  const orientationMedia = window.matchMedia('(orientation: portrait)')
  orientationMedia.removeEventListener('change', updateAppBarHeight)
  // Remove scroll event listener to prevent memory leaks
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
  // Get current scroll position
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop

  // Ignore if scrolling to the top of the page
  if (currentScrollPosition < 0) {
    return
  }

  // Determine scroll direction
  if (currentScrollPosition > lastScrollPosition && currentScrollPosition > appBarHeight.value) {
    // Scrolling down - hide app bar
    isAppBarVisible.value = false
  } else {
    // Scrolling up - show app bar
    isAppBarVisible.value = true
  }

  // Update last scroll position
  lastScrollPosition = currentScrollPosition
}

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
/* 讓頂部導航的logo不要佔滿 */
.shrink {
  flex: 0 0 auto !important;   
}
/* 支援選單文字換行 */
.v-list-item-title {
  white-space: normal !important;
  word-break: break-word;
}
/* 確保app bar下層內容滿寬 */
.d-flex {
  width: 100%;
}
</style>