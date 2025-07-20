<template>
  <div>
    <form class="container py-5" @submit.prevent="submitForm">
      <h2 class="mb-4 text-center">聯絡我們</h2>
      <div class="row g-3">
        <div class="col-md-6">
          <label for="name" class="form-label">姓名</label>
          <input type="text" id="name" class="form-control" v-model="form.name" required />
        </div>
        <div class="col-md-6">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" class="form-control" v-model="form.email" required />
        </div>
        <div class="col-md-6">
          <label for="phone" class="form-label">市話</label>
          <input type="tel" id="phone" class="form-control" v-model="form.telephone" />
        </div>
        <div class="col-md-6">
          <label for="mobile" class="form-label">手機</label>
          <input type="tel" id="mobile" class="form-control" v-model="form.mobile" />
        </div>
        <div class="col-12">
          <label for="message" class="form-label">留言內容</label>
          <textarea id="message" class="form-control" v-model="form.message" rows="4"></textarea>
        </div>
        <div class="col-12 text-center">
          <button type="submit" class="btn btn-primary px-5 mt-3">送出</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  telephone: '',
  mobile: '',
  message: ''
})

const submitForm = () => {
  console.log('送出表單資料：', form.value)
  alert('表單已送出')
}
</script>
