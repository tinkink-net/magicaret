import { MagicaretOptions } from './types'

export const BUILT_IN_STYLES: Record<string, string[]> = {
  default: ['#6366f1', '#8b5cf6'],
  neon: ['#00ff00', '#00ffff'],
  rainbow: ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#8b00ff'],
  fire: ['#ff4500', '#ff8c00', '#ffd700'],
  ocean: ['#00bfff', '#1e90ff', '#4169e1'],
  purple: ['#9400d3', '#8a2be2', '#9370db'],
  green: ['#00ff7f', '#00fa9a', '#7cfc00'],
  pink: ['#ff1493', '#ff69b4', '#ffb6c1'],
}

export function getColors(options: MagicaretOptions): string[] {
  if (options.color) {
    return Array.isArray(options.color) ? options.color : [options.color]
  }
  if (options.style && BUILT_IN_STYLES[options.style]) {
    return BUILT_IN_STYLES[options.style]
  }
  return BUILT_IN_STYLES.default
}

export function getGradient(colors: string[]): string {
  if (colors.length === 1) {
    return colors[0]
  }
  return `linear-gradient(180deg, ${colors.join(', ')})`
}