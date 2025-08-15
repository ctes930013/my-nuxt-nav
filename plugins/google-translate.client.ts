export default defineNuxtPlugin(() => {
  // 建立全域 callback，Google script 載入後會呼叫
  (window as any).googleTranslateElementInit = () => {
    new (window as any).google.translate.TranslateElement(
      {
        pageLanguage: 'zh-TW', // 預設語言
        includedLanguages: 'en,ja,ko,fr,zh-CN,zh-TW', // 可選語言
        layout: (window as any).google.translate.TranslateElement.InlineLayout.HORIZONTAL
      },
      'google_translate_element' // 要掛載的 DOM ID
    )
  }

  // 動態載入 Google Translate JS
  const script = document.createElement('script')
  script.src =
    '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  script.async = true
  document.head.appendChild(script)
})
