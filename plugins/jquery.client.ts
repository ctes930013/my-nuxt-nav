import jQuery from 'jquery'

export default defineNuxtPlugin(() => {
  // 將 jQuery 掛到全域
  window.$ = window.jQuery = jQuery
})