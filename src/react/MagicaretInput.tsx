import { forwardRef, useEffect, useRef } from 'react'
import { Magicaret } from '../Magicaret'
import type { MagicaretOptions } from '../types'

export interface MagicaretInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'ref'> {
  magicaretOptions?: MagicaretOptions
}

export const MagicaretInput = forwardRef<HTMLInputElement, MagicaretInputProps>(
  ({ magicaretOptions = {}, ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement | null>(null)
    const magicaretRef = useRef<Magicaret | null>(null)

    const setRefs = (node: HTMLInputElement | null) => {
      internalRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    useEffect(() => {
      if (internalRef.current) {
        magicaretRef.current = new Magicaret(internalRef.current, magicaretOptions)
      }

      return () => {
        if (magicaretRef.current) {
          magicaretRef.current.destroy()
        }
      }
    }, [])

    useEffect(() => {
      if (magicaretRef.current) {
        magicaretRef.current.updateOptions(magicaretOptions)
      }
    }, [magicaretOptions])

    return <input ref={setRefs} {...props} />
  }
)

MagicaretInput.displayName = 'MagicaretInput'