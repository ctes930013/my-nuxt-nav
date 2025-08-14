<template>
  <div
    class="drop-area"
    :class="{ 'is-over': isOver }"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
  >
    <p v-if="!preview" class="d-none d-md-block">將圖片拖曳到這裡，或點擊選擇</p>
    <input type="file" accept="image/*" hidden ref="fileInput" @change="onFileChange" />
    <v-btn color="primary" @click="fileInput.click()">選擇檔案</v-btn>

    <div v-if="preview" class="preview mt-3">
      <img :src="preview" alt="預覽圖片" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fileValue = defineModel('file')

const isOver = ref(false)
const preview = ref(null)
const fileInput = ref(null)

const onDragOver = () => {
  isOver.value = true
}

const onDragLeave = () => {
  isOver.value = false
}

//拖曳上傳
const onDrop = (e) => {
  isOver.value = false
  const file = e.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    preview.value = URL.createObjectURL(file)
    uploadFile(file)
  }
}

//點擊按鈕上傳
const onFileChange = (e) => {
  const file = e.target.files[0]
  if (file && file.type.startsWith('image/')) {
    preview.value = URL.createObjectURL(file)
    uploadFile(file)
  }
  // 清空 input value，避免同檔案不觸發 change
   e.target.value = ''
}

const uploadFile = async (file) => {
  fileValue.value = file
}
</script>

<style scoped>
.drop-area {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
}
.drop-area.is-over {
  background: #f0f8ff;
}
.preview img {
  max-width: 100%;
  height: auto;
}
</style>