<template>
  <div>
    <ClientOnly>
      <div id="carouselBanner" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <ol class="carousel-indicators">
          <button
            v-for="(banner, index) in bannerList"
            :key="index"
            type="button"
            :data-bs-target="'#carouselBanner'"
            :data-bs-slide-to="index"
            :class="{ active: index === 0 }"
            :aria-current="index === 0 ? 'true' : undefined"
            :aria-label="`Slide ${index + 1}`"
          ></button>
        </ol>
        <div class="carousel-inner">
          <div v-for="(banner, index) in bannerList" :class="index === 0 ? 'carousel-item active' : 'carousel-item'">
            <div class="img-container">
              <v-img :src="banner.image" class="img-container-fit" alt="桌機圖" cover />
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselBanner" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselBanner" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
        </button>
      </div>
    </ClientOnly>
    <div class="container my-8">
      <v-row class="g-3">
        <v-col cols="6" sm="4" md="3" v-for="product in productList">
          <v-card class="carding">
            <img :src="product.image" class="card-img-top" alt="商品圖片">
            <h5 class="fw-bold mb-1">{{ product.name }}</h5>
            <p class="subtitle">{{ product.description }}</p>
            <v-btn
              color="primary"
              block
              class="custom-mx-auto align-left-md"
            >
              加入購物車
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
const productList = [
    {
        image: "https://youli-fruits.com/wp-content/uploads/2021/08/%E5%A5%97%E8%A2%8B%E8%91%A1%E8%90%84.jpg",
        name: "葡萄",
        description: "熟成採收｜濃郁果香"
    },
    {
        image: "https://youli-fruits.com/wp-content/uploads/2021/08/%E7%8E%89%E8%8D%B7%E5%8C%85%E8%8D%94%E6%9E%9D.jpg",
        name: "荔枝",
        description: "一年一次！季節限定"
    },
    {
        image: "https://youli-fruits.com/wp-content/uploads/2021/08/%E5%B0%8F%E7%8E%89%E8%A5%BF%E7%93%9C.jpg",
        name: "西瓜",
        description: "甜蜜蜜的好滋味「小玉西瓜」，夏日清涼必備！"
    },
    {
        image: "https://youli-fruits.com/wp-content/uploads/2021/08/%E7%8E%89%E6%96%87%E8%8A%92%E6%9E%9C.jpg",
        name: "芒果",
        description: "新品種•甜度高"
    }
];

const bannerList = [
    {
        image: "https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2025/07/17/realtime/32606375.jpg&s=Y&x=0&y=0&sw=3000&sh=2000&h=300&w=400"
    },
    {
        image: "https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2025/07/19/2/32630971.jpg&s=Y&x=0&y=0&sw=3000&sh=2000&h=300&w=400"
    },
    {
        image: "https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2025/07/17/realtime/32606289.jpg&s=Y&x=0&y=0&sw=3535&sh=2357&h=300&w=400"
    }
];
</script>

<style lang="css">
/* banner指示器改用圓形 */
.carousel-indicators button {
  width: 10px !important;
  height: 10px !important;
  border-radius: 100%;
  margin: 0px 5px !important;
}
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
.img-container {
  position: relative;
  padding-bottom: 75%; /* 4:3 比例 */
  overflow: hidden;
}
.img-container-fit {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
@media (min-width: 768px) {
  .img-container {
    padding-bottom: 25%; /* 4:1 比例 */
  }
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