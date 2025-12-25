import { useEffect, useRef } from 'react'
import { Magicaret } from '../Magicaret'
import type { MagicaretOptions } from '../types'

export function useMagicaret(options: MagicaretOptions = {}) {
  const magicaretRef = useRef<Magicaret | null>(null)
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (elementRef.current) {
      magicaretRef.current = new Magicaret(elementRef.current, options)
    }

    return () => {
      if (magicaretRef.current) {
        magicaretRef.current.destroy()
      }
    }
  }, [])

  useEffect(() => {
    if (magicaretRef.current) {
      magicaretRef.current.updateOptions(options)
    }
  }, [options])

  return { elementRef }
}
