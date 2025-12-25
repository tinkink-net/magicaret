import React, { useState } from 'react'
import { MagicaretInput } from 'magicaret/react'

const styles = ['default', 'neon', 'rainbow', 'fire', 'ocean', 'purple', 'green', 'pink'] as const

function App() {
  const [selectedStyle, setSelectedStyle] = useState<'default' | 'neon' | 'rainbow' | 'fire' | 'ocean' | 'purple' | 'green' | 'pink'>('default')

  return (
    <div className="container">
      <h1>✨ Magicaret</h1>
      <p className="subtitle">Beautiful animated caret library for React applications</p>

      <div className="input-group">
        <label>Choose a style:</label>
        <div className="style-selector">
          {styles.map((style) => (
            <button
              key={style}
              className={`style-btn ${selectedStyle === style ? 'active' : ''}`}
              onClick={() => setSelectedStyle(style)}
            >
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="name">Your Name:</label>
        <MagicaretInput
          id="name"
          placeholder="Type your name here..."
          magicaretOptions={{ style: selectedStyle }}
        />
      </div>

      <div className="input-group">
        <label htmlFor="email">Email Address:</label>
        <MagicaretInput
          id="email"
          type="email"
          placeholder="your@email.com"
          magicaretOptions={{ style: selectedStyle }}
        />
      </div>

      <div className="input-group">
        <label htmlFor="message">Message:</label>
        <MagicaretInput
          id="message"
          as="textarea"
          placeholder="Write your message here..."
          magicaretOptions={{ style: selectedStyle }}
        />
      </div>

      <div className="info">
        <strong>💡 Tip:</strong> Click on any input field to see the animated caret. Try typing and moving around to see the smooth animation and comet trail effect!
      </div>
    </div>
  )
}

export default App