import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () : { userId: number | null } => ({
    userId: parseInt(sessionStorage.getItem('userId') ?? "0")
  }),

  getters: {
    getUserId: (state) => state.userId,
    isLoggedIn: (state): boolean => !!state.userId
  },

  actions: {
    // 將user id儲存到 sessionStorage
    login(id: number) {
        this.userId = id
        sessionStorage.setItem('userId', this.userId.toString())
    },

    logout() {
        this.userId = null
        sessionStorage.removeItem('userId')   // 移除 Session Storage
    }
  }
})