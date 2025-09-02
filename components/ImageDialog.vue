<template>
  <v-dialog v-model="dialog" max-width="800px" @click:outside="closeDialog">
    <v-col class="image-card">
      <v-icon @click="closeDialog" class="close">mdi-window-close</v-icon>
      <v-card style="margin-top: 30px;">
        <v-img :src="props?.imageList[props?.index]" alt="Full Image" max-height="80vh" contain />
        <div class="swiper-pagination-text">{{ props?.index + 1 }} / {{ props?.imageList.length }}</div>
      </v-card>
    </v-col>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  imageList: {
    type: Object as () => string[],
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  show: {
    type: Boolean,
    required: true
  },
})
const emit = defineEmits(['show'])
const dialog = ref(props.show)

const closeDialog = () => {
  dialog.value = false
  emit('show', false)
}

watch(() => props.show, (newVal) => {
  dialog.value = newVal
})
</script>

<style scoped>
.image-card {
  position: relative;
  padding: 0;
}
.close {
  color: white;
  position: absolute;
  right: 0px;
  top: 0px;
}
</style>