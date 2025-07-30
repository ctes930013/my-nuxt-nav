<template>
  <div>
    <v-container class="my-5 v-container-padding">
      <v-row>
        <v-col cols="12" v-for="(product, index) in productList">
          <v-row class="g-3">
            <v-col cols="8" class="pa-0">
              <div class="d-flex custom-align-center">
                <img :src="product.image" height="100px" alt="桌機圖">
                <h3 class="fw-bold mx-4 mb-0">{{ product.name }}</h3>
              </div>
            </v-col>
            <v-col cols="4" class="d-flex custom-align-center pa-0" style="justify-content: right">
              <div class="d-flex custom-align-center mr-2">
                <i class="bi bi-dash-square" @click="minus(product.id)"></i>
                <h4 class="mx-3 text-center mb-0">{{ product.quantity }}</h4>
                <i class="bi bi-plus-square" @click="add(product.id)"></i>
              </div>
            </v-col>
            <v-divider v-if="index < productList.length - 1" class="my-2" />
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
const productList = ref([
    {
        id: 1,
        image: "https://youli-fruits.com/wp-content/uploads/2021/08/%E5%A5%97%E8%A2%8B%E8%91%A1%E8%90%84.jpg",
        name: "葡萄",
        quantity: 4
    },
    {
        id: 2,
        image: "https://youli-fruits.com/wp-content/uploads/2021/08/%E7%8E%89%E8%8D%B7%E5%8C%85%E8%8D%94%E6%9E%9D.jpg",
        name: "荔枝",
        quantity: 2
    },
    {
        id: 3,
        image: "https://youli-fruits.com/wp-content/uploads/2021/08/%E5%B0%8F%E7%8E%89%E8%A5%BF%E7%93%9C.jpg",
        name: "西瓜",
        quantity: 1
    },
    {
        id: 4,
        image: "https://youli-fruits.com/wp-content/uploads/2021/08/%E7%8E%89%E6%96%87%E8%8A%92%E6%9E%9C.jpg",
        name: "芒果",
        quantity: 4
    }
]);

function add(productId) {
    for (const element of productList.value) {
        if (productId == element.id) {
            element.quantity++
            break
        }
    }
}

function minus(productId) {
    for (const element of productList.value) {
        if (productId == element.id && element.quantity > 1) {
            element.quantity--
            break
        }
    }
}
</script>