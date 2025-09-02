<template>
  <div class="d-flex align-items-center">
    <p class="down-counter-time">{{ day }}</p>
    <p class="down-counter-time-desc">天</p>
    <p class="down-counter-time">{{ hour }}</p>
    <p class="down-counter-time-desc">時</p>
    <p class="down-counter-time">{{ minute }}</p>
    <p class="down-counter-time-desc">分</p>
    <p class="down-counter-time">{{ second }}</p>
    <p class="down-counter-time-desc">秒</p>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";

const timeLeft = ref(0)   // 預設倒數時間(秒)
const isRunning = ref(false)
const day = ref(0)
const hour = ref(0)
const minute = ref(0)
const second = ref(0)
let timer = null

const props = defineProps({
  //由外部傳入的截止時間
  deadline: {
    type: Number,
    required: true
  },
});

//取得當前時間戳與指定時間戳的誤差並換算為秒
function calcTimeDiff() {
  const targetTimestamp = props.deadline
  const now = Date.now() / 1000                  // 當前時間戳 (秒)，如果是毫秒級則不用除以1000
//   const diff = Math.floor((targetTimestamp - now) / 1000) // 轉成秒
  if (now <= targetTimestamp) {
    const diff = Math.floor((targetTimestamp - now))
    timeLeft.value = diff 
  } else {
    timeLeft.value = 0 
  }
}

const startCountdown = () => {
  if (isRunning.value) return

  isRunning.value = true
  timer = setInterval(() => {
    calcTimeDiff()
    if (timeLeft.value <= 0) {
      clearInterval(timer)
      timer = null
      isRunning.value = false
    }
    day.value = Math.floor(timeLeft.value / (24 * 60 * 60))
    hour.value = Math.floor((timeLeft.value % (24 * 60 * 60)) / 3600)
    minute.value = Math.floor((timeLeft.value % 3600) / 60)
    second.value = timeLeft.value % 60
  }, 1000);
};

const clearTimer = () => {
    if (timer != null) {
        clearInterval(timer)
        timer = null
    }
}

onMounted(() => {
    clearTimer()
    startCountdown()
});

// 避免組件卸載後 interval 還在跑
onUnmounted(() => {
    clearTimer()
});
</script>

<style scoped>
.down-counter-time {
  width: 40px;
  text-align:center;
  font-size: 20px;
  color: white;
  background-color: black;
  border-radius: 10%;
  padding-top: 8px;
  padding-bottom: 8px;
}
.down-counter-time-desc {
  margin-left: 6px;
  margin-right: 6px;
  text-align: center;
}
</style>