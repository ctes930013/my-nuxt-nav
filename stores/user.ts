import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: null as number | null,
  }),

  getters: {
    getUserId: (state) => state.userId,
    isLoggedIn: (state): boolean => !!state.userId,
  },

  actions: {
    login(id: number) {
      this.userId = id
    },

    logout() {
      this.userId = null
    },
  },

  persist: {
    storage: process.client ? sessionStorage : undefined, // Safe for SSR
  },
})