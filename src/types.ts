export interface MagicaretOptions {
  color?: string | string[]
  size?: number
  animationDuration?: number
  trailLength?: number
  trailOpacity?: number
  trailWidth?: number
  style?: 'default' | 'neon' | 'rainbow' | 'fire' | 'ocean' | 'purple' | 'green' | 'pink'
}

export interface NormalizedMagicaretOptions {
  color: string | string[] | undefined
  size: number
  animationDuration: number
  trailLength: number
  trailOpacity: number
  trailWidth: number
  style: 'default' | 'neon' | 'rainbow' | 'fire' | 'ocean' | 'purple' | 'green' | 'pink'
}

export interface CaretPosition {
  x: number
  y: number
}

export interface TrailParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
}
