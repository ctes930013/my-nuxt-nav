import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min'

export default defineNuxtPlugin(() => {
  // 確保只在 client 載入
  window.bootstrap = bootstrap; 
})