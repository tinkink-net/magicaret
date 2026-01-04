import React, { useState } from 'react'
import { useMagicaretDirective } from 'magicaret/react'
import './App.css'

const styles = ['default', 'neon', 'rainbow', 'fire', 'ocean', 'purple', 'green', 'pink'] as const

function App() {
  const [selectedStyle, setSelectedStyle] = useState<'default' | 'neon' | 'rainbow' | 'fire' | 'ocean' | 'purple' | 'green' | 'pink'>('default')
  const nameRef = useMagicaretDirective({ style: selectedStyle })
  const emailRef = useMagicaretDirective({ style: selectedStyle })
  const messageRef = useMagicaretDirective({ style: selectedStyle })

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
        <input
          id="name"
          type="text"
          ref={nameRef as any}
          className="magicaret-input"
          placeholder="Type your name here..."
        />
      </div>

      <div className="input-group">
        <label htmlFor="email">Email Address:</label>
        <input
          id="email"
          type="email"
          ref={emailRef as any}
          className="magicaret-input"
          placeholder="your@email.com"
        />
      </div>

      <div className="input-group">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          ref={messageRef as any}
          className="magicaret-input"
          placeholder="Write your message here..."
        ></textarea>
      </div>

      <div className="info">
        <strong>💡 Tip:</strong> Click on any input field to see the animated caret. Try typing and moving around to see the smooth animation and comet trail effect!
      </div>
    </div>
  )
}

export default App
