<template>
  <div>
    <v-container class="py-8 px-md-15">
      <h2 class="mb-4 text-center">編輯個人資料</h2>
      <v-form @submit.prevent="submitForm" ref="formRef" v-model="valid">
        <v-row class="mt-8">
          <v-col cols="12" align="center">
            <h4>大頭貼</h4>
            <DragUpload v-model:file="fileImg" />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="form.account"
              label="帳號"
              :disabled="true"
            />
          </v-col>
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
              v-model="form.signature"
              label="簽名檔"
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
import DragUpload from '~/components/DragUpload.vue'

const form = ref({
  account: 'asd011011',
  name: '小王',
  email: 'm33892@gmail.com',
  telephone: '03-3374154',
  mobile: '',
  signature: '操你媽'
})

const valid = ref(false)
const formRef = ref(null)
var formData = new FormData()
var fileImg = ref(File)

const userStore = useUserStore()
onMounted(() => {
  if (!userStore.isLoggedIn) {
    navigateTo({
      path: '/signin',
    })
  }
})

const rules = {
  required: v => !!v || '此欄位為必填',
  email: v =>
    !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Email 格式錯誤'
}

const submitForm = async () => {
  formData = new FormData()
  const validation = await formRef.value?.validate()
  if (validation.valid) {
    Object.entries(form.value).forEach(([key, value]) => {
      formData.append(key, value)
    });
    formData.append('image', fileImg.value)
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    // fetch('/api/upload', {
    //     method: 'POST',
    //     body: formData
    // })
    alert('表單已送出')
  }
}
</script>
