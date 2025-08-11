<template>
  <div>
    <v-container class="py-8 px-md-15">
      <v-form @submit.prevent="submitForm" ref="formRef" v-model="valid">
        <h2 class="mb-4 text-center">登入</h2>
        <v-row>
          <v-col cols="12">
            <v-text-field
              prepend-icon="mdi-account"
              v-model="form.account"
              label="帳號"
              required
              :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              prepend-icon="mdi-lock"
              v-model="form.password"
              label="密碼"
              :type="showPassword ? 'text' : 'password'"
              required
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
              :rules="[rules.required]"
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
  account: '',
  password: ''
})

const valid = ref(false)
const formRef = ref(null)
const showPassword = ref(false)

const rules = {
  required: v => !!v || '此欄位為必填'
}

const submitForm = async () => {
  const validation = await formRef.value?.validate()
  if (validation.valid) {
    console.log('送出表單資料：', form.value)
    alert('表單已送出')
  }
}
</script>
