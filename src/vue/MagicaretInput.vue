<template>
  <input ref="inputRef" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { Magicaret } from '../Magicaret'
import type { MagicaretOptions } from '../types'

interface Props {
  magicaretOptions?: MagicaretOptions
}

const props = withDefaults(defineProps<Props>(), {
  magicaretOptions: () => ({})
})

const inputRef = ref<HTMLInputElement | null>(null)
const magicaretRef = ref<Magicaret | null>(null)

onMounted(() => {
  if (inputRef.value) {
    magicaretRef.value = new Magicaret(inputRef.value, props.magicaretOptions)
  }
})

onUnmounted(() => {
  if (magicaretRef.value) {
    magicaretRef.value.destroy()
  }
})

watch(
  () => props.magicaretOptions,
  (newOptions) => {
    if (magicaretRef.value) {
      magicaretRef.value.updateOptions(newOptions)
    }
  },
  { deep: true }
)
</script>