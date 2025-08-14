<template>
  <div>
    <v-container class="py-8 px-md-15">
      <v-form @submit.prevent="submitForm" ref="formRef" v-model="valid">
        <h2 class="mb-4 text-center">信用卡付款</h2>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.name"
              label="持卡人姓名"
              required
              :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              id="cardNumber"
              v-model="form.number"
              label="信用卡號"
              required
              maxlength="19"
              @input="formatCardNumber"
              :rules="[rules.required, rules.cardNumber]"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.cvv"
              label="信用卡背面三碼"
              required
              maxLength="3"
              @input="formatCardCvv"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-row align="center">
              <v-col cols="12" sm="auto">
                <span class="text-body-1 font-weight-medium">信用卡有效期限</span>
              </v-col>
              <v-col cols="4" sm="3">
                <v-text-field
                    v-model="expireMonth"
                    label="MM"
                    required
                    @input="formatCardMonth"
                    :rules="[rules.required, rules.validMonth]"
                />
              </v-col>
               <v-col cols="auto" sm="auto">
                <span class="text-h6">/</span>
              </v-col>
               <v-col cols="4" sm="3">
                <v-text-field
                    v-model="expireYear"
                    label="YY"
                    required
                    @input="formatCardYear"
                    :rules="[rules.required, rules.validYear]"
                />
              </v-col>
            </v-row>
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

const form = reactive({
  name: '',
  number: '',
  cvv: '',
  expire: ''
})

const valid = ref(false)
const formRef = ref(null)
var expireMonth = ref()
var expireYear = ref()
var cardNumberLength = 0   //紀錄用戶當前輸入的卡號長度(含空格)

//信用卡號的輸入規則
function formatCardNumber() {
    // 1. 移除所有非數字字符
    let digits = form.number.replace(/\D/g, '');

    // 2. 限制最大長度為 16 位
    if (digits.length > 16) {
        digits = digits.slice(0, 16);
    }

    // 3. 每 4 位插入空格
    let formatted = ''
    if (cardNumberLength <= form.number.length) {
        //用戶正在輸入卡號才需要判斷是否加入空格
        for (let i = 0; i < digits.length; i += 4) {
            if (i > 0) formatted += ' ';
            formatted += digits.slice(i, i + 4);
        }
        if (digits.length === 4 || digits.length === 8 || digits.length === 12) {
            formatted += ' ';
        }
    } else {
        //用戶正在刪除輸入的卡號
        formatted = form.number
    }
    const input = document.querySelector('#cardNumber');
    var cursorPosition = input.selectionStart

    // 4. 更新 v-model
    form.number = formatted;
    cardNumberLength = form.number.length

    // 5. 確保光標位置正確
    nextTick(() => {
        if (input) {
            if (formatted.endsWith(' ')) {
                cursorPosition += 1
            }
            input.setSelectionRange(cursorPosition, cursorPosition);
        }
    })
}

//信用卡期限的輸入規則
function formatCardMonth() {
    // 移除非數字字符
    let value = expireMonth.value.replace(/\D/g, '');
    // 限制最大長度為 2
    if (value.length > 2) {
        value = value.slice(0, 2);
    }
    expireMonth.value = value;
}
function formatCardYear() {
  let val = expireYear.value.replace(/\D/g, '') // 只保留數字
  if (val.length > 2) {
    val = val.slice(0, 2) + '/' + val.slice(2)
  }
  expireYear.value = val
}

//信用卡背面3碼的輸入規則
function formatCardCvv() {
  let val = form.cvv.replace(/\D/g, '') // 只保留數字
  if (val.length > 3) {
    val = val.slice(0, 3)
  }
  form.cvv = val
}

const rules = {
  required: v => !!v || '此欄位為必填',
  cardNumber: (value) =>
          /^\d{16}$/.test(value.replace(/\s+/g, '')) || '請輸入 16 位有效信用卡號',
  validMonth: (value) =>
          /^(0[1-9]|1[0-2])$/.test(value) || '請輸入有效月份 (01-12)',
  validYear: (value) => {
          const currentYear = new Date().getFullYear() % 100; // 例如 2025 -> 25
          const inputYear = parseInt(value, 10);
          return (
            /^\d{2}$/.test(value) &&
            inputYear >= currentYear &&
            inputYear <= currentYear + 10
          ) || `請輸入有效年份 (${currentYear}-${currentYear + 10})`;
        },
}

const submitForm = async () => {
  const validation = await formRef.value?.validate()
  if (validation.valid) {
    form.expire = expireMonth.value + '/' + expireYear.value
    console.log('送出表單資料：', form)
    alert('表單已送出')
  }
}
</script>
