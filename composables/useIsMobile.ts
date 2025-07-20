import { ref, onMounted } from 'vue'

const isMobile = ref(false)

export function useIsMobile() {
  onMounted(() => {
    isMobile.value = window.matchMedia('(max-width: 768px)').matches

    // 如果想要即時偵測視窗變化，可加上 resize 監聽器：
    window.addEventListener('resize', () => {
      isMobile.value = window.matchMedia('(max-width: 768px)').matches
    })
  })

  return { isMobile }
}