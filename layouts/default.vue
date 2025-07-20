<template>
  <div class="main">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <NuxtLink class="navbar-brand" to="/">MyApp</NuxtLink>
        <button
          id="btnNavToggle"
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/" :class="{ active: $route.path === '/' }" @click="collapseNavbar">首頁</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/about" :class="{ active: $route.path === '/about' }" @click="collapseNavbar">關於我們</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/contact" :class="{ active: $route.path === '/contact' }" @click="collapseNavbar">聯絡我們</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main>
      <NuxtPage />
    </main>

    <Footer class="main-bottom"></Footer>
  </div>
</template>

<script setup>
const { isMobile } = useIsMobile()

//收闔nav選單
const collapseNavbar = () => {
    if (isMobile.value) {
        const collapseElement = document.getElementById('btnNavToggle')
        collapseElement.click()
    }
}
</script>