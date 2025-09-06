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
    // 初始化時從 localStorage 載入資料
    initialize() {
      const userId = localStorage.getItem('user_id')
      if (userId) {
        this.userId = Number(userId)
      }
    },

    login(id: number) {
      this.userId = id
      localStorage.setItem('user_id', id.toString())
    },

    logout() {
      this.userId = null
      localStorage.removeItem('user_id')
    },
  },
})