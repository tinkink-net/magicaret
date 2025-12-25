import { MagicaretOptions, NormalizedMagicaretOptions, CaretPosition, TrailParticle } from './types'
import { getColors, getGradient } from './styles'

export class Magicaret {
  private element: HTMLElement
  private options: NormalizedMagicaretOptions
  private caretElement: HTMLElement
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private trailParticles: TrailParticle[] = []
  private currentPosition: CaretPosition = { x: 0, y: 0 }
  private targetPosition: CaretPosition = { x: 0, y: 0 }
  private animationId: number | null = null
  private isFocused: boolean = false
  private mirrorElement: HTMLDivElement | null = null
  private lastTargetPosition: CaretPosition = { x: 0, y: 0 }
  private burstEndTime: number | null = null
  private resizeCanvasHandler = () => this.resizeCanvas()
  private handleFocus = () => {
    this.isFocused = true
    this.caretElement.style.transition = 'none'
    this.caretElement.style.display = 'block'
    this.updateCaretPosition()
    requestAnimationFrame(() => {
      this.caretElement.style.transition = `all ${this.options.animationDuration}ms ease-out`
    })
  }
  private handleBlur = () => {
    this.isFocused = false
    this.caretElement.style.display = 'none'
    this.stopAnimation()
  }
  private handleInput = () => {
    this.updateCaretPosition()
  }
  private handleClick = () => {
    this.updateCaretPosition()
  }
  private handleKeyDown = () => {
    // Wait a frame so the browser updates caret/selection before reading it
    requestAnimationFrame(() => this.updateCaretPosition())
  }
  private handleKeyUp = () => {
    this.updateCaretPosition()
  }
  private handleSelectionChange = () => {
    if (!this.isFocused) return
    if (document.activeElement !== this.element) return
    this.updateCaretPosition()
  }

  constructor(element: HTMLElement, options: MagicaretOptions = {}) {
    this.element = element
    this.options = this.normalizeOptions(options)
    this.canvas = this.createCanvas()
    this.ctx = this.canvas.getContext('2d')!
    this.resizeCanvas()
    this.caretElement = this.createCaretElement()
    this.updateCaretHeight()
    this.mirrorElement = this.createMirrorElement()
    this.init()
  }

  private normalizeOptions(options: MagicaretOptions): NormalizedMagicaretOptions {
    return {
      color: options.color,
      size: options.size || 2,
      animationDuration: options.animationDuration || 150,
      trailLength: options.trailLength || 10,
      trailOpacity: options.trailOpacity || 0.5,
      trailWidth: options.trailWidth || 2,
      style: options.style || 'default',
    }
  }

  private createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas')
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '9999'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    document.body.appendChild(canvas)
    window.addEventListener('resize', this.resizeCanvasHandler)
    return canvas
  }

  private resizeCanvas(): void {
    if (!this.canvas) return
    const dpr = window.devicePixelRatio || 1
    this.canvas.width = window.innerWidth * dpr
    this.canvas.height = window.innerHeight * dpr
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'
    if (this.ctx) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0)
      this.ctx.scale(dpr, dpr)
    }
  }

  private createCaretElement(): HTMLElement {
    const caret = document.createElement('div')
    caret.style.position = 'absolute'
    caret.style.pointerEvents = 'none'
    caret.style.zIndex = '10000'
    caret.style.width = `${this.options.size}px`
    caret.style.borderRadius = '2px'
    caret.style.background = getGradient(getColors(this.options))
    caret.style.boxShadow = `0 0 10px ${getColors(this.options)[0]}`
    caret.style.transition = `all ${this.options.animationDuration}ms ease-out`
    caret.style.display = 'none'
    document.body.appendChild(caret)
    return caret
  }

  private updateCaretHeight(): void {
    const styles = window.getComputedStyle(this.element)
    const fontSize = parseFloat(styles.fontSize)
    const lineHeight = parseFloat(styles.lineHeight) || fontSize * 1.2
    this.caretElement.style.height = `${lineHeight}px`
  }

  private createMirrorElement(): HTMLDivElement {
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

  private updateMirrorElement(): void {
    if (!this.mirrorElement) return

    const styles = window.getComputedStyle(this.element)
    const rect = this.element.getBoundingClientRect()
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft

    this.mirrorElement.style.position = 'absolute'
    this.mirrorElement.style.left = `${rect.left + scrollLeft}px`
    this.mirrorElement.style.top = `${rect.top + scrollTop}px`
    this.mirrorElement.style.width = `${rect.width}px`
    this.mirrorElement.style.height = `${rect.height}px`
    this.mirrorElement.style.font = styles.font
    this.mirrorElement.style.fontSize = styles.fontSize
    this.mirrorElement.style.fontFamily = styles.fontFamily
    this.mirrorElement.style.fontWeight = styles.fontWeight
    this.mirrorElement.style.fontStyle = styles.fontStyle
    this.mirrorElement.style.letterSpacing = styles.letterSpacing
    this.mirrorElement.style.textTransform = styles.textTransform
    this.mirrorElement.style.padding = styles.padding
    this.mirrorElement.style.paddingLeft = styles.paddingLeft
    this.mirrorElement.style.paddingRight = styles.paddingRight
    this.mirrorElement.style.paddingTop = styles.paddingTop
    this.mirrorElement.style.paddingBottom = styles.paddingBottom
    this.mirrorElement.style.border = styles.border
    this.mirrorElement.style.borderLeft = styles.borderLeft
    this.mirrorElement.style.borderRight = styles.borderRight
    this.mirrorElement.style.borderTop = styles.borderTop
    this.mirrorElement.style.borderBottom = styles.borderBottom
    this.mirrorElement.style.boxSizing = styles.boxSizing
    this.mirrorElement.style.lineHeight = styles.lineHeight
    this.mirrorElement.style.textIndent = styles.textIndent
    this.mirrorElement.style.direction = styles.direction
    this.mirrorElement.style.textAlign = styles.textAlign
    this.mirrorElement.style.whiteSpace = styles.whiteSpace || 'pre-wrap'
    this.mirrorElement.style.wordWrap = styles.wordWrap || 'break-word'
    this.mirrorElement.style.overflow = styles.overflow || 'hidden'
    this.mirrorElement.style.overflowWrap = styles.overflowWrap || 'break-word'
    this.mirrorElement.style.display = styles.display || 'block'

    // Ensure font properties are copied exactly
    this.mirrorElement.style.fontVariant = styles.fontVariant
    this.mirrorElement.style.fontStretch = styles.fontStretch
    this.mirrorElement.style.fontSizeAdjust = styles.fontSizeAdjust
    this.mirrorElement.style.fontKerning = styles.fontKerning

    if (this.element instanceof HTMLInputElement) {
      this.mirrorElement.style.whiteSpace = 'pre'
    } else if (this.element instanceof HTMLTextAreaElement) {
      this.mirrorElement.style.whiteSpace = 'pre-wrap'
      this.mirrorElement.style.overflow = 'hidden'
    }
  }

  private init(): void {
    this.element.style.caretColor = 'transparent'
    this.element.addEventListener('focus', this.handleFocus)
    this.element.addEventListener('blur', this.handleBlur)
    this.element.addEventListener('input', this.handleInput)
    this.element.addEventListener('click', this.handleClick)
    this.element.addEventListener('keydown', this.handleKeyDown)
    this.element.addEventListener('keyup', this.handleKeyUp)
    document.addEventListener('selectionchange', this.handleSelectionChange)
  }

  private updateCaretPosition(): void {
    if (!this.isFocused) return

    const rect = this.element.getBoundingClientRect()
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft

    // Update current position from DOM for trail
    const caretRect = this.caretElement.getBoundingClientRect()
    this.currentPosition = {
      x: caretRect.left + scrollLeft,
      y: caretRect.top + scrollTop
    }

    // this.addTrailParticle() // Removed, handled in animation loop

    if (this.element instanceof HTMLInputElement || this.element instanceof HTMLTextAreaElement) {
      const caretPos = this.getInputCaretPosition()
      if (caretPos) {
        this.targetPosition = {
          x: caretPos.x,
          y: caretPos.y,
        }
        this.element.style.caretColor = 'transparent'
        this.caretElement.style.display = 'block'
      } else {
        this.element.style.caretColor = 'auto'
        this.caretElement.style.display = 'none'
        // Don't return, let it fall through to updateCaretElement which will hide it effectively
        // Actually, we should just stop here for this frame
        return
      }
    } else {
      const selection = window.getSelection()

      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const rects = range.getClientRects()

        if (rects.length > 0) {
          const caretRect = rects[rects.length - 1]
          this.targetPosition = {
            x: caretRect.left + scrollLeft,
            y: caretRect.top + scrollTop,
          }
        } else {
          this.targetPosition = {
            x: rect.left + scrollLeft,
            y: rect.top + scrollTop,
          }
        }
      } else {
        this.targetPosition = {
          x: rect.left + scrollLeft,
          y: rect.top + scrollTop,
        }
      }
    }

    this.updateCaretElement()
    const moved = this.targetPosition.x !== this.lastTargetPosition.x || this.targetPosition.y !== this.lastTargetPosition.y
    if (moved) {
      this.lastTargetPosition = { ...this.targetPosition }
      this.triggerBurst()
    }
  }

  private getInputCaretPosition(): { x: number; y: number } | null {
    if (!this.mirrorElement) return null

    this.updateMirrorElement()

    const element = this.element as HTMLInputElement | HTMLTextAreaElement
    let selectionStart: number | null = null
    try {
      selectionStart = element.selectionStart
    } catch (e) {
      // ignore
    }

    if (selectionStart === null) {
      return null
    }

    const textBeforeCaret = element.value.substring(0, selectionStart)
    const textAfterCaret = element.value.substring(selectionStart)

    this.mirrorElement.innerHTML = ''

    const beforeSpan = document.createElement('span')
    beforeSpan.textContent = textBeforeCaret
    this.mirrorElement.appendChild(beforeSpan)

    const caretSpan = document.createElement('span')
    caretSpan.textContent = '|'
    this.mirrorElement.appendChild(caretSpan)

    const afterSpan = document.createElement('span')
    afterSpan.textContent = textAfterCaret
    this.mirrorElement.appendChild(afterSpan)

    const spanRect = caretSpan.getBoundingClientRect()
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft

    const elementScrollLeft = element.scrollLeft
    const elementScrollTop = element.scrollTop

    const x = spanRect.left + scrollLeft - elementScrollLeft
    const y = spanRect.top + scrollTop - elementScrollTop

    this.mirrorElement.innerHTML = ''

    return { x, y }
  }

  private addTrailParticle(x: number, y: number): void {
    const colors = getColors(this.options)
    const color = colors[Math.floor(Math.random() * colors.length)]
    const angle = Math.random() * Math.PI * 2
    const speed = Math.random() * 0.8 + 0.2 // Smaller area and gentler motion

    this.trailParticles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1.0,
      maxLife: 1.0,
      size: this.options.trailWidth * (0.4 + Math.random() * 0.6), // Smaller particles
      color,
    })

    // Limit particles for performance
    if (this.trailParticles.length > this.options.trailLength * 10) { // Increased limit
      this.trailParticles.shift()
    }
  }

  private startAnimation(): void {
    if (this.animationId !== null) return

    const animate = () => {
      if (!this.isFocused) {
        this.stopAnimation()
        return
      }

      this.updateTrails()
      this.renderTrail()

      const now = performance.now()
      const hasParticles = this.trailParticles.length > 0
      const burstActive = this.burstEndTime !== null && now < this.burstEndTime

      if (!hasParticles && !burstActive) {
        this.stopAnimation()
        return
      }

      this.animationId = requestAnimationFrame(animate)
    }

    this.animationId = requestAnimationFrame(animate)
  }

  private triggerBurst(): void {
    const rect = this.caretElement.getBoundingClientRect()
    const scrollX = window.scrollX || document.documentElement.scrollLeft
    const scrollY = window.scrollY || document.documentElement.scrollTop

    const hasRect = rect.width > 0 && rect.height > 0
    const baseX = hasRect ? rect.left + scrollX + rect.width / 2 : this.targetPosition.x
    const baseY = hasRect ? rect.top + scrollY + rect.height / 2 : this.targetPosition.y

    const count = Math.max(3, Math.min(8, this.options.trailLength))
    for (let i = 0; i < count; i++) {
      this.addTrailParticle(baseX, baseY)
    }

    // Run animation only long enough to fade this burst
    const duration = Math.min(400, Math.max(150, this.options.animationDuration * 2))
    this.burstEndTime = performance.now() + duration
    this.startAnimation()
  }

  private updateTrails(): void {
    for (let i = this.trailParticles.length - 1; i >= 0; i--) {
      const p = this.trailParticles[i]
      p.x += p.vx
      p.y += p.vy
      p.life -= 0.02 // Fade out speed

      if (p.life <= 0) {
        this.trailParticles.splice(i, 1)
      }
    }
  }

  private stopAnimation(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
    this.trailParticles = []
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  private renderTrail(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    const scrollX = window.scrollX || document.documentElement.scrollLeft
    const scrollY = window.scrollY || document.documentElement.scrollTop

    this.trailParticles.forEach((particle) => {
      const opacity = particle.life * this.options.trailOpacity

      this.ctx.beginPath()
      this.ctx.arc(particle.x - scrollX, particle.y - scrollY, particle.size * particle.life, 0, Math.PI * 2)
      this.ctx.fillStyle = particle.color
      this.ctx.globalAlpha = opacity
      this.ctx.fill()
    })

    this.ctx.globalAlpha = 1
  }

  private updateCaretElement(): void {
    this.caretElement.style.left = `${this.targetPosition.x}px`
    this.caretElement.style.top = `${this.targetPosition.y}px`
  }

  public updateOptions(options: Partial<MagicaretOptions>): void {
    this.options = { ...this.options, ...this.normalizeOptions(options) }
    this.caretElement.style.background = getGradient(getColors(this.options))
    this.caretElement.style.boxShadow = `0 0 10px ${getColors(this.options)[0]}`
    this.caretElement.style.width = `${this.options.size}px`
    this.updateCaretHeight()
  }

  public destroy(): void {
    this.stopAnimation()
    this.element.removeEventListener('focus', this.handleFocus)
    this.element.removeEventListener('blur', this.handleBlur)
    this.element.removeEventListener('input', this.handleInput)
    this.element.removeEventListener('click', this.handleClick)
    this.element.removeEventListener('keydown', this.handleKeyDown)
    this.element.removeEventListener('keyup', this.handleKeyUp)
    document.removeEventListener('selectionchange', this.handleSelectionChange)
    window.removeEventListener('resize', this.resizeCanvasHandler)
    this.caretElement.remove()
    this.canvas.remove()
    if (this.mirrorElement) {
      this.mirrorElement.remove()
      this.mirrorElement = null
    }
  }
}
