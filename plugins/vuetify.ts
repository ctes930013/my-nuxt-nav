import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { defineNuxtPlugin } from '#app'
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import 'vuetify/styles'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    defaults: {
      global: {
        ripple: false,     // 🚫 關閉所有 ripple 效果
      }
    },
    ssr: true
  })

  nuxtApp.vueApp.use(vuetify)
})
