# Magicaret

A beautiful and smooth animated caret library for web applications. Transform your input caret into a custom caret with beautiful styles and smooth animations.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://magicaret.tink.ink)
[![npm](https://img.shields.io/npm/v/magicaret)](https://www.npmjs.com/package/magicaret)
[![License](https://img.shields.io/npm/l/magicaret)](LICENSE)

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

### Using the useMagicaretDirective hook

```jsx
import { useMagicaretDirective } from 'magicaret/react'

function App() {
  const nameRef = useMagicaretDirective({
    style: 'rainbow',
    size: 3
  })

  return <input ref={nameRef} placeholder="Type something..." />
}
```

### Multiple inputs with same options

```jsx
import { useMagicaretDirective } from 'magicaret/react'

function App() {
  const inputRef = useMagicaretDirective({ style: 'neon' })

  return (
    <div>
      <input ref={inputRef} placeholder="Name" />
      <input ref={inputRef} placeholder="Email" />
      <textarea ref={inputRef} placeholder="Message" />
    </div>
  )
}
```

## Vue Usage

### Using the v-magicaret directive

```vue
<template>
  <input
    v-magicaret="{ style: 'rainbow', size: 3 }"
    placeholder="Type something..."
  />
</template>

<script setup>
import { vMagicaret } from 'magicaret/vue'
</script>
```

### Multiple inputs with same options

```vue
<template>
  <div>
    <input
      v-magicaret="{ style: 'neon' }"
      placeholder="Name"
    />
    <input
      v-magicaret="{ style: 'neon' }"
      placeholder="Email"
    />
    <textarea
      v-magicaret="{ style: 'neon' }"
      placeholder="Message"
    />
  </div>
</template>

<script setup>
import { vMagicaret } from 'magicaret/vue'
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
