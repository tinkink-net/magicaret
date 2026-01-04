import type { CaretPosition } from './types'

export function getCaretPosition(element: HTMLElement, mirrorElement: HTMLDivElement | null): CaretPosition | null {
  if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
    return getInputCaretPosition(element, mirrorElement)
  } else {
    return getEditableCaretPosition(element)
  }
}

function getEditableCaretPosition(element: HTMLElement): CaretPosition | null {
  const selection = window.getSelection()

  if (!selection || selection.rangeCount === 0) {
    return null
  }

  const range = selection.getRangeAt(0)
  const rects = range.getClientRects()
  const rect = element.getBoundingClientRect()
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft

  if (rects.length > 0) {
    const caretRect = rects[rects.length - 1]
    return {
      x: caretRect.left + scrollLeft,
      y: caretRect.top + scrollTop,
    }
  }

  return {
    x: rect.left + scrollLeft,
    y: rect.top + scrollTop,
  }
}

function getInputCaretPosition(element: HTMLInputElement | HTMLTextAreaElement, mirrorElement: HTMLDivElement | null): CaretPosition | null {
  if (!mirrorElement) {
    return null
  }

  let selectionStart: number | null = null
  try {
    selectionStart = element.selectionStart
  } catch (e) {
    return null
  }

  if (selectionStart === null) {
    return null
  }

  const textBeforeCaret = element.value.substring(0, selectionStart)
  const textAfterCaret = element.value.substring(selectionStart)

  mirrorElement.innerHTML = ''

  const beforeSpan = document.createElement('span')
  beforeSpan.textContent = textBeforeCaret
  mirrorElement.appendChild(beforeSpan)

  const caretSpan = document.createElement('span')
  caretSpan.textContent = '|'
  mirrorElement.appendChild(caretSpan)

  const afterSpan = document.createElement('span')
  afterSpan.textContent = textAfterCaret
  mirrorElement.appendChild(afterSpan)

  const spanRect = caretSpan.getBoundingClientRect()
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft

  const elementScrollLeft = element.scrollLeft
  const elementScrollTop = element.scrollTop

  const x = spanRect.left + scrollLeft - elementScrollLeft
  const y = spanRect.top + scrollTop - elementScrollTop

  mirrorElement.innerHTML = ''

  return { x, y }
}

export function createMirrorElement(): HTMLDivElement {
  const mirror = document.createElement('div')
  mirror.style.position = 'absolute'
  mirror.style.visibility = 'hidden'
  mirror.style.whiteSpace = 'pre-wrap'
  mirror.style.wordWrap = 'break-word'
  mirror.style.overflow = 'hidden'
  mirror.style.top = '0'
  mirror.style.left = '0'
  document.body.appendChild(mirror)
  return mirror
}

export function updateMirrorElement(element: HTMLElement, mirrorElement: HTMLDivElement): void {
  const styles = window.getComputedStyle(element)
  const rect = element.getBoundingClientRect()
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft

  mirrorElement.style.position = 'absolute'
  mirrorElement.style.left = `${rect.left + scrollLeft}px`
  mirrorElement.style.top = `${rect.top + scrollTop}px`
  mirrorElement.style.width = `${rect.width}px`
  mirrorElement.style.height = `${rect.height}px`
  mirrorElement.style.font = styles.font
  mirrorElement.style.fontSize = styles.fontSize
  mirrorElement.style.fontFamily = styles.fontFamily
  mirrorElement.style.fontWeight = styles.fontWeight
  mirrorElement.style.fontStyle = styles.fontStyle
  mirrorElement.style.letterSpacing = styles.letterSpacing
  mirrorElement.style.textTransform = styles.textTransform
  mirrorElement.style.padding = styles.padding
  mirrorElement.style.paddingLeft = styles.paddingLeft
  mirrorElement.style.paddingRight = styles.paddingRight
  mirrorElement.style.paddingTop = styles.paddingTop
  mirrorElement.style.paddingBottom = styles.paddingBottom
  mirrorElement.style.border = styles.border
  mirrorElement.style.borderLeft = styles.borderLeft
  mirrorElement.style.borderRight = styles.borderRight
  mirrorElement.style.borderTop = styles.borderTop
  mirrorElement.style.borderBottom = styles.borderBottom
  mirrorElement.style.boxSizing = styles.boxSizing
  mirrorElement.style.lineHeight = styles.lineHeight
  mirrorElement.style.textIndent = styles.textIndent
  mirrorElement.style.direction = styles.direction
  mirrorElement.style.textAlign = styles.textAlign
  mirrorElement.style.whiteSpace = styles.whiteSpace || 'pre-wrap'
  mirrorElement.style.wordWrap = styles.wordWrap || 'break-word'
  mirrorElement.style.overflow = styles.overflow || 'hidden'
  mirrorElement.style.overflowWrap = styles.overflowWrap || 'break-word'
  mirrorElement.style.display = styles.display || 'block'

  mirrorElement.style.fontVariant = styles.fontVariant
  mirrorElement.style.fontStretch = styles.fontStretch
  mirrorElement.style.fontSizeAdjust = styles.fontSizeAdjust
  mirrorElement.style.fontKerning = styles.fontKerning

  if (element instanceof HTMLInputElement) {
    mirrorElement.style.whiteSpace = 'pre'
  } else if (element instanceof HTMLTextAreaElement) {
    mirrorElement.style.whiteSpace = 'pre-wrap'
    mirrorElement.style.overflow = 'hidden'
  }
}
