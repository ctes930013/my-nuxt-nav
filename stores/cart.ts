import { defineStore } from 'pinia'
import type { Product } from '@/types/product';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as Product[]
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  },

  actions: {
    // 初始化時從 localStorage 載入資料
    initializeCart() {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        this.items = JSON.parse(savedCart)
      }
    },

    // 將購物車資料儲存到 localStorage
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    },

    addToCart(product: Product) {
      const existing = this.items.find((item) => item.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      this.saveCart()
    },

    minusToCart(product: Product) {
      const existing = this.items.find((item) => item.id === product.id)
      if (existing) {
        if (existing.quantity > 1) {
            existing.quantity--
            this.saveCart()
        } else {
            this.removeFromCart(product.id)
        }
      }
    },

    removeFromCart(id: number) {
      this.items = this.items.filter((item) => item.id !== id)
      this.saveCart()
    },

    clearCart() {
      this.items = []
      this.saveCart()
    }
  }
})