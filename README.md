# Magicaret

A beautiful and smooth animated caret library for web applications. Transform your input caret into a custom caret with beautiful styles and smooth animations.

## Features

- **Multi-framework Support**: Vanilla JS, React, and Vue
- **Easy to Use**: Simple API with no dependencies
- **Beautiful Styles**: Default gradient colors with several built-in styles
- **Smooth Animations**: Animates caret position smoothly with comet trail effects
- **Customizable**: Customize color, size, animation, and more
- **TypeScript Support**: Full TypeScript support included

## Installation

```bash
pnpm install magicaret
```

## Vanilla JS Usage

```javascript
import { Magicaret } from 'magicaret'

const input = document.getElementById('my-input')
const magicaret = new Magicaret(input, {
  style: 'rainbow',
  size: 3,
  trailLength: 15
})

// Update options later
magicaret.updateOptions({
  style: 'neon'
})

// Clean up
magicaret.destroy()
```

## React Usage

### Using the MagicaretInput component

```jsx
import { MagicaretInput } from 'magicaret/react'

function App() {
  return (
    <MagicaretInput
      placeholder="Type something..."
      magicaretOptions={{
        style: 'rainbow',
        size: 3,
        trailLength: 15
      }}
    />
  )
}
```

### Using the useMagicaret hook

```jsx
import { useMagicaret } from 'magicaret/react'

function App() {
  const { elementRef } = useMagicaret({
    style: 'rainbow',
    size: 3
  })

  return <input ref={elementRef} placeholder="Type something..." />
}
```

## Vue Usage

### Using the MagicaretInput component

```vue
<template>
  <MagicaretInput
    placeholder="Type something..."
    :magicaretOptions="{
      style: 'rainbow',
      size: 3,
      trailLength: 15
    }"
  />
</template>

<script setup>
import { MagicaretInput } from 'magicaret/vue'
</script>
```

### Using the useMagicaret composable

```vue
<template>
  <input ref="elementRef" placeholder="Type something..." />
</template>

<script setup>
import { useMagicaret } from 'magicaret/vue'

const { elementRef } = useMagicaret({
  style: 'rainbow',
  size: 3
})
</script>
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `color` | `string \| string[]` | `undefined` | Custom color or array of colors for gradient |
| `size` | `number` | `2` | Width of the caret in pixels |
| `animationDuration` | `number` | `150` | Duration of caret animation in milliseconds |
| `trailLength` | `number` | `10` | Number of trail particles |
| `trailOpacity` | `number` | `0.5` | Opacity of trail particles (0-1) |
| `trailWidth` | `number` | `2` | Width of trail particles |
| `style` | `string` | `'default'` | Built-in style preset |

## Built-in Styles

- `default` - Purple to indigo gradient
- `neon` - Green to cyan gradient
- `rainbow` - Full rainbow gradient
- `fire` - Red to orange to yellow gradient
- `ocean` - Light blue to dark blue gradient
- `purple` - Purple gradient
- `green` - Green gradient
- `pink` - Pink gradient

## Custom Colors

You can also use custom colors:

```javascript
const magicaret = new Magicaret(input, {
  color: '#ff0000' // Single color
})

// Or gradient
const magicaret = new Magicaret(input, {
  color: ['#ff0000', '#00ff00', '#0000ff'] // Gradient
})
```

## Examples

### Simple input with neon style

```javascript
const input = document.getElementById('my-input')
new Magicaret(input, { style: 'neon' })
```

### Large caret with long trail

```javascript
const magicaret = new Magicaret(input, {
  size: 4,
  trailLength: 20,
  trailOpacity: 0.7
})
```

### Custom gradient colors

```javascript
const magicaret = new Magicaret(input, {
  color: ['#ff6b6b', '#feca57', '#48dbfb']
})
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.