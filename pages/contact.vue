<template>
  <div>
    <v-container class="py-8 px-md-15">
      <v-form @submit.prevent="submitForm" ref="formRef" v-model="valid">
        <h2 class="mb-4 text-center">聯絡我們</h2>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.name"
              label="姓名"
              required
              :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.email"
              label="Email"
              type="email"
              required
              :rules="[rules.required, rules.email]"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.telephone"
              label="市話"
              type="tel"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.mobile"
              label="手機"
              type="tel"
            />
          </v-col>
          <v-col cols="12">
             <v-textarea
              v-model="form.message"
              label="留言內容"
              rows="4"
            />
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn color="primary" type="submit" class="mt-3">
              送出
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
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

const valid = ref(false)
const formRef = ref(null)

const rules = {
  required: v => !!v || '此欄位為必填',
  email: v =>
    !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Email 格式錯誤'
}

const submitForm = async () => {
  const validation = await formRef.value?.validate()
  if (validation.valid) {
    console.log('送出表單資料：', form.value)
    alert('表單已送出')
  }
}
</script>
