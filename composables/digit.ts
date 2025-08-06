//將數字轉成千分位
export function thousandth(num: number) {
  return String(num).replace(/(\d)(?=(\d{3})+$)/g, "$1,");
}