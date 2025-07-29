import { useNuxtApp } from '#app'

export function useSweetAlert() {
  const { $swal } = useNuxtApp()

  const showAlert = ({ title, text, icon, confirmText, isCanCancel, cancelText, onConfirm, onCancel }) => {
    $swal.fire({
      scrollbarPadding: false,
      title: title || '提示', // 預設標題
      text: text || '',     // 預設文字
      icon: icon || 'info', // 預設圖標
      confirmButtonText: confirmText || '確定',
      showCancelButton: isCanCancel || false,
      cancelButtonText: cancelText || '取消',
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