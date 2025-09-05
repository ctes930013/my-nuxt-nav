<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout />
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
onMounted(() => {
    userStore.initialize() // 頁面載入時確定有無登入
})
</script>