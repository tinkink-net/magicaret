import { onMounted, onUnmounted, ref, Ref, watch } from 'vue'
import { Magicaret } from '../Magicaret'
import type { MagicaretOptions } from '../types'

export function useMagicaret(options: MagicaretOptions = {}) {
  const elementRef: Ref<HTMLElement | null> = ref(null)
  const magicaretRef = ref<Magicaret | null>(null)

  onMounted(() => {
    if (elementRef.value) {
      magicaretRef.value = new Magicaret(elementRef.value, options)
    }
  })

  onUnmounted(() => {
    if (magicaretRef.value) {
      magicaretRef.value.destroy()
    }
  })

  watch(
    () => options,
    (newOptions) => {
      if (magicaretRef.value) {
        magicaretRef.value.updateOptions(newOptions)
      }
    },
    { deep: true }
  )

  return { elementRef }
}