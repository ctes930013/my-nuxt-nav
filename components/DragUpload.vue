<template>
  <div
    class="drop-area"
    :class="{ 'is-over': isOver }"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
  >
    <p v-if="!preview">將圖片拖曳到這裡，或點擊選擇</p>
    <input type="file" accept="image/*" hidden ref="fileInput" @change="onFileChange" />
    <v-btn color="primary" class="mt-2" @click="fileInput.click()">選擇檔案</v-btn>

    <div v-if="preview" class="preview mt-3">
      <img :src="preview" alt="預覽圖片" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOver = ref(false)
const preview = ref(null)
const fileInput = ref(null)

const onDragOver = () => {
  isOver.value = true
}

const onDragLeave = () => {
  isOver.value = false
}

const onDrop = (e) => {
  isOver.value = false
  const file = e.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    preview.value = URL.createObjectURL(file)
    // 這裡可直接呼叫 API 上傳
    uploadFile(file)
  }
}

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (file && file.type.startsWith('image/')) {
    preview.value = URL.createObjectURL(file)
    uploadFile(file)
  }
}

const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  // 呼叫 API
  console.log(formData.get('file'))
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