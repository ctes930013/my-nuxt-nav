import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () : { userId: number | null } => ({
    userId: null,
  }),

  getters: {
    getUserId: (state) => state.userId,
    isLoggedIn: (state): boolean => !!state.userId
  },

  actions: {
    // 檢查 sessionStorage 的登入狀態
    checkAuth() {
        if (typeof window !== 'undefined') {
            const storedUserId = sessionStorage.getItem('userId');
            this.userId = storedUserId ? parseInt(storedUserId) : null;
        }
    },

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