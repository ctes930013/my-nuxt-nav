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
      <v-row class="mt-3">
        <v-col cols="6" class="text-center">
          <v-btn color="primary" @click="handleGoogleSignIn">
            Google登入
          </v-btn>
        </v-col>
        <v-col cols="6" class="text-center">
          <v-btn color="primary" @click="handleGoogleSignOut">
            Google登出
          </v-btn>
        </v-col>
      </v-row>
      <p class="mb-4 text-center">{{ googleUserInfo }}</p>
    </v-container>
  </div>
</template>

<script setup>
import { useSweetAlert } from '~/composables/useSweetAlert'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const { $firebaseAuth } = useNuxtApp()
//google登入用戶的資訊
const googleUserInfo = ref(null)

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
    const userStore = useUserStore()
    userStore.login(1)
    
    const { showAlert } = useSweetAlert()

    showAlert({
        title: '登入成功',
        icon: 'success',
        onClose: () => {
            navigateTo({
                path: '/',
            })
        }
    })
  }
}

//google登入
const handleGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider()
  const { showAlert } = useSweetAlert()
  try {
    await signInWithPopup($firebaseAuth, provider)
    // 登入成功，onAuthStateChanged 會自動更新 user 的值
    showAlert({
        title: '登入成功',
        icon: 'success',
    })
  } catch (err) {
    showAlert({
        title: '登入失敗',
        text: err,
        icon: 'error',
    })
  }
};

//google登出
const handleGoogleSignOut = async () => {
  const { showAlert } = useSweetAlert()
  try {
    await signOut($firebaseAuth)
    googleUserInfo.value = null
    // 登出成功，onAuthStateChanged 會自動更新 user 的值
    showAlert({
        title: '登出成功',
        icon: 'success',
    })
  } catch (err) {
    showAlert({
        title: '登出失敗',
        text: err,
        icon: 'error',
    })
  }
};

// 監聽google登入狀態的變化
onMounted(() => {
  if (process.client) {
    onAuthStateChanged($firebaseAuth, (currentUser) => {
      googleUserInfo.value = currentUser
    })
  }
})
</script>
