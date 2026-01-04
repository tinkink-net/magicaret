import { Directive, DirectiveBinding } from 'vue'
import { Magicaret } from '../Magicaret'
import type { MagicaretOptions } from '../types'

const magicaretInstances = new WeakMap<HTMLElement, Magicaret>()

export const vMagicaret: Directive<HTMLElement, MagicaretOptions> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<MagicaretOptions>) {
    const magicaret = new Magicaret(el, binding.value || {})
    magicaretInstances.set(el, magicaret)
  },

  updated(el: HTMLElement, binding: DirectiveBinding<MagicaretOptions>) {
    const magicaret = magicaretInstances.get(el)
    if (magicaret) {
      magicaret.updateOptions(binding.value || {})
    }
  },

  unmounted(el: HTMLElement) {
    const magicaret = magicaretInstances.get(el)
    if (magicaret) {
      magicaret.destroy()
      magicaretInstances.delete(el)
    }
  }
}
