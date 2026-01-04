<template>
  <div class="container">
    <h1>✨ Magicaret</h1>
    <p class="subtitle">Beautiful animated caret library for Vue applications</p>

    <div class="input-group">
      <label>Choose a style:</label>
      <div class="style-selector">
        <button
          v-for="style in styles"
          :key="style"
          :class="['style-btn', { active: selectedStyle === style }]"
          @click="selectedStyle = style"
        >
          {{ style.charAt(0).toUpperCase() + style.slice(1) }}
        </button>
      </div>
    </div>

    <div class="input-group">
      <label for="name">Your Name:</label>
      <input
        id="name"
        v-magicaret="{ style: selectedStyle }"
        placeholder="Type your name here..."
      />
    </div>

    <div class="input-group">
      <label for="email">Email Address:</label>
      <input
        id="email"
        v-magicaret="{ style: selectedStyle }"
        type="email"
        placeholder="your@email.com"
      />
    </div>

    <div class="input-group">
      <label for="message">Message:</label>
      <textarea
        id="message"
        v-magicaret="{ style: selectedStyle }"
        placeholder="Write your message here..."
      ></textarea>
    </div>

    <div class="info">
      <strong>💡 Tip:</strong> Click on any input field to see the animated caret. Try typing and moving around to see the smooth animation and comet trail effect!
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vMagicaret } from 'magicaret/vue'

const styles = ['default', 'neon', 'rainbow', 'fire', 'ocean', 'purple', 'green', 'pink'] as const
const selectedStyle = ref<'default' | 'neon' | 'rainbow' | 'fire' | 'ocean' | 'purple' | 'green' | 'pink'>('default')
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>

<style>
input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 0.3s;
  outline: none;
  font-family: inherit;
}

input[type="text"]:focus,
input[type="email"]:focus,
textarea:focus {
  border-color: #667eea;
}

textarea {
  min-height: 120px;
  resize: vertical;
}
</style>

<style scoped>
.container {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
}

h1 {
  color: #333;
  margin-bottom: 10px;
  font-size: 32px;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
  font-size: 14px;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
  font-size: 14px;
}

.style-selector {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.style-btn {
  padding: 8px 16px;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.3s;
  font-weight: 500;
}

.style-btn:hover {
  border-color: #667eea;
  transform: translateY(-2px);
}

.style-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.info {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 10px;
  margin-top: 20px;
  font-size: 13px;
  color: #666;
  line-height: 1.6;
}

.info strong {
  color: #333;
}
</style>
