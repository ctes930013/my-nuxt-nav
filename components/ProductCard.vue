<template>
  <v-card class="carding" @click="onProductClick(props.product.id)">
    <img :src="props.product.image" class="zoom-image" alt="商品圖片">
    <h5 class="fw-bold mb-1 mt-4">{{ props.product.name }}</h5>
    <p class="subtitle">{{ props.product.description }}</p>
    <v-btn
      color="primary"
      block
      class="custom-mx-auto align-left-md"
      @click.stop="onAddToCart(product)"
    >
      加入購物車
    </v-btn>
  </v-card>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

const props = defineProps({
  onProductClick: {
    type: Function,
    required: true
  },
  onAddToCart: {
    type: Function,
    required: true
  },
  product: {
    type: Object as () => Product,
    required: true
  },
});
</script>

<style scoped>
.subtitle {
  display: -webkit-box;             /* 建立彈性盒模型 */
  -webkit-box-orient: vertical;     /* 垂直方向排列 */
  -webkit-line-clamp: 2;            /* 最多顯示兩行 */
  line-clamp: 2;
  overflow: hidden;                 /* 隱藏超出的內容 */
  text-overflow: ellipsis;         /* 超出用省略號顯示 */
  word-break: break-word;          /* 單字換行 */
  min-height: 3em;                 /* 根據行高大致估算兩行文字高度 */
  line-height: 1.5em;
}
.carding {
  border-radius: 12px !important; /* 自訂圓角大小 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2) !important; /* 自訂陰影 */
  padding: 15px 20px;
}
.zoom-image {
  width: 100%;
  height: 100%;
  object-fit: cover;    /* 確保圖片填滿容器 */
  transition: transform 0.3s ease;     /* 平滑過渡，0.3秒 */
}

.zoom-image:hover {
  transform: scale(1.1);    /* 放大 1.1 倍，可調整放大比例 */
}
@media (min-width: 960px) {
  .align-left-md {
    margin-left: 0 !important;
    margin-right: auto !important;
    display: inline-block !important;
    min-width: auto !important;    /* 讓按鈕不要滿版 */
  }
}
</style>