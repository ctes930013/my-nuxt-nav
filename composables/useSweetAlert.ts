import { useNuxtApp } from '#app'

interface SweetAlertOptions {
  title?: string
  text?: string
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question'
  confirmText?: string
  isCanCancel?: boolean
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export function useSweetAlert() {
  const { $swal } = useNuxtApp()

  const showAlert = ({
    title = '提示', // 預設標題
    text = '', // 預設文字
    icon = 'info', // 預設圖標
    confirmText = '確定',
    isCanCancel = false,
    cancelText = '取消',
    onConfirm,
    onCancel
  }: SweetAlertOptions = {}) => {
    $swal.fire({
      scrollbarPadding: false,
      title,
      text,
      icon,
      confirmButtonText: confirmText,
      showCancelButton: isCanCancel,
      cancelButtonText: cancelText,
      customClass: {
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button'
      }
    }).then((result) => {
      if (result.isConfirmed && onConfirm) {
        onConfirm() // 執行傳入的確認按鈕回調
      } else if (result.dismiss && onCancel) {
        onCancel() // 執行傳入的取消按鈕回調
      }
    })
  }

  return { showAlert }
}