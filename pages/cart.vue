<template>
  <div>
    <v-container class="my-5 v-container-padding">
      <div v-if="cartStore.items.length > 0">
        <v-row>
          <v-col cols="12" v-for="(product, index) in cartStore.items">
            <v-row class="g-3">
              <v-col cols="8" class="pa-0">
                <div class="d-flex custom-align-center">
                  <img :src="product.image" height="100px" alt="桌機圖">
                  <h3 class="fw-bold mx-4 mb-0">{{ product.name }}</h3>
                </div>
              </v-col>
              <v-col cols="4" class="d-flex custom-align-center pa-0" style="justify-content: right">
                <div class="d-flex flex-column mr-2">
                  <i class="d-flex bi bi-x-lg" style="justify-content: right" @click="cartStore.removeFromCart(product.id)"></i>
                  <div class="d-flex custom-align-center mt-1" style="justify-content: right">
                    <i class="bi bi-dash-square" @click="minus(product)"></i>
                    <h4 class="mx-3 text-center mb-0">{{ product.quantity }}</h4>
                    <i class="bi bi-plus-square" @click="add(product)"></i>
                  </div>
                  <div class="d-flex custom-align-center mt-1" style="justify-content: right">
                    <p class="mb-0">單價:</p>
                    <p class="mb-0 mx-1">{{ thousandth(product.price) }}</p>
                    <p class="mb-0">元</p>
                  </div>
                </div>
              </v-col>
              <v-divider v-if="index < cartStore.items.length - 1" class="my-2" />
            </v-row>
          </v-col>
        </v-row>
        <div class="d-flex custom-align-center mt-8" style="justify-content: right">
          <p class="mb-0">總價:</p>
          <h2 class="mb-0 mx-2" style="color: red">{{ thousandth(cartStore.totalPrice) }}</h2>
          <p class="mb-0">元</p>
        </div>
      </div>
      <div v-else class="d-flex flex-column custom-align-center">
        <img src="@/assets/images/cart.png" width="20%" height="auto" alt="">
        <h2 class="text-center mt-4">目前購物車沒有商品喔~~</h2>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { thousandth } from '~/composables/digit'

const cartStore = useCartStore()
onMounted(() => {
    cartStore.initializeCart() // 頁面載入時初始化購物車
})

function add(product) {
    cartStore.addToCart(product)
}

function minus(product) {
    cartStore.minusToCart(product)
}
</script>