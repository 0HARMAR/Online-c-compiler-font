<template>
  <div class="terminal">
    <div class="terminal__container">
      <!-- Terminal Header -->
      <div class="terminal__header">
        <div class="terminal__title">
          <span class="icon">💻</span>
          <h2>终端</h2>
          <span v-if="isConnected" class="status status--connected">已连接</span>
          <span v-else class="status status--disconnected">未连接</span>
        </div>
        
        <div class="terminal__actions">
          <button 
            class="btn btn--primary"
            :class="{ 'btn--loading': isConnecting }"
            @click="createTerminal"
            :disabled="isConnected || isConnecting"
          >
            <span class="btn__icon">➕</span>
            <span class="btn__text">新建终端</span>
          </button>
          
          <button 
            class="btn btn--danger"
            @click="closeTerminal"
            :disabled="!isConnected"
          >
            <span class="btn__icon">✖</span>
            <span class="btn__text">关闭终端</span>
          </button>

          <button 
            class="btn btn--secondary"
            @click="clearTerminal"
            :disabled="!isConnected"
          >
            <span class="btn__icon">🗑</span>
            <span class="btn__text">清屏</span>
          </button>
        </div>
      </div>

      <!-- Terminal Content -->
      <div 
        ref="terminalElement" 
        class="terminal__content"
        :class="{ 'terminal__content--loading': isConnecting }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links'
import 'xterm/css/xterm.css'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// State
const terminalElement = ref(null)
const isConnected = ref(false)
const isConnecting = ref(false)
let terminal = null
let websocket = null
let terminalId = null

// Terminal Configuration
const TERMINAL_CONFIG = {
  cursorBlink: true,
  theme: {
    background: '#1a1a1a',
    foreground: '#ffffff',
    cursor: '#ffffff',
    selection: 'rgba(255, 255, 255, 0.3)',
    black: '#000000',
    red: '#e06c75',
    green: '#98c379',
    yellow: '#d19a66',
    blue: '#61afef',
    magenta: '#c678dd',
    cyan: '#56b6c2',
    white: '#ffffff',
    brightBlack: '#5c6370',
    brightRed: '#e06c75',
    brightGreen: '#98c379',
    brightYellow: '#d19a66',
    brightBlue: '#61afef',
    brightMagenta: '#c678dd',
    brightCyan: '#56b6c2',
    brightWhite: '#ffffff'
  },
  fontSize: 14,
  fontFamily: 'Fira Code, Menlo, Monaco, "Courier New", monospace',
  lineHeight: 1.5,
  letterSpacing: 0,
  scrollback: 1000,
  bellStyle: 'sound',
  allowTransparency: true
}

// Lifecycle
onMounted(() => {
  initTerminal()
})

onBeforeUnmount(() => {
  cleanup()
})

// Methods
const initTerminal = () => {
  terminal = new Terminal(TERMINAL_CONFIG)
  
  // Addons
  const fitAddon = new FitAddon()
  terminal.loadAddon(fitAddon)
  terminal.loadAddon(new WebLinksAddon())

  terminal.open(terminalElement.value)
  fitAddon.fit()

  // Handle window resize
  window.addEventListener('resize', () => {
    fitAddon.fit()
  })

  // Initial message
  terminal.writeln('\x1b[1;33m欢迎使用在线终端\x1b[0m')
  terminal.writeln('输入 "help" 获取帮助信息')
}

const createTerminal = async () => {
  if (isConnecting.value) return
  
  try {
    isConnecting.value = true
    const response = await axios.post('/terminals', {})
    terminalId = response.data.id
    await connectWebSocket()
    ElMessage.success('终端创建成功')
  } catch (error) {
    ElMessage.error('创建终端失败: ' + error.message)
  } finally {
    isConnecting.value = false
  }
}

const connectWebSocket = () => {
  return new Promise((resolve, reject) => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const wsUrl = `${protocol}//${window.location.host}/terminal`
    
    websocket = new WebSocket(wsUrl)
    
    websocket.onopen = () => {
      isConnected.value = true
      terminal.write('\r\n\x1b[1;32m*** 连接成功 ***\x1b[0m\r\n')
      resolve()
    }
    
    websocket.onmessage = (event) => {
      terminal.write(event.data)
    }
    
    websocket.onclose = () => {
      isConnected.value = false
      terminal.write('\r\n\x1b[1;31m*** 连接已关闭 ***\x1b[0m\r\n')
    }
    
    websocket.onerror = (error) => {
      isConnected.value = false
      terminal.write('\r\n\x1b[1;31m*** 连接错误 ***\x1b[0m\r\n')
      reject(error)
    }

    terminal.onData(data => {
      if (websocket?.readyState === WebSocket.OPEN) {
        websocket.send(data)
      }
    })
  })
}

const closeTerminal = async () => {
  if (!terminalId || !isConnected.value) return
  
  try {
    await axios.post(`/terminals/${terminalId}`, {})
    cleanup()
    ElMessage.success('终端已关闭')
  } catch (error) {
    ElMessage.error('关闭终端失败: ' + error.message)
  }
}

const clearTerminal = () => {
  if (terminal) {
    terminal.clear()
  }
}

const cleanup = () => {
  if (websocket) {
    websocket.close()
    websocket = null
  }
  if (terminal) {
    terminal.clear()
  }
  terminalId = null
  isConnected.value = false
}
</script>

<style>
.terminal {
  height: 100vh;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
}

.terminal__container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  height: 100%;
  overflow: hidden;
}

.terminal__header {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.terminal__title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.terminal__title h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status--connected {
  background: #dcfce7;
  color: #166534;
}

.status--disconnected {
  background: #fee2e2;
  color: #991b1b;
}

.terminal__actions {
  display: flex;
  gap: 0.5rem;
}

.terminal__content {
  flex: 1;
  background: #1a1a1a;
  border-radius: 0.75rem;
  overflow: hidden;
  position: relative;
  transition: opacity 0.2s;
}

.terminal__content--loading {
  opacity: 0.7;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn--primary {
  background: #3b82f6;
  color: white;
}

.btn--primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn--danger {
  background: #ef4444;
  color: white;
}

.btn--danger:hover:not(:disabled) {
  background: #dc2626;
}

.btn--secondary {
  background: #f1f5f9;
  color: #475569;
}

.btn--secondary:hover:not(:disabled) {
  background: #e2e8f0;
}

.btn--loading {
  position: relative;
  color: transparent;
}

.btn--loading::after {
  content: '';
  position: absolute;
  width: 1rem;
  height: 1rem;
  border: 2px solid white;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

.icon {
  font-size: 1.25rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Terminal Overrides */
:deep(.xterm) {
  padding: 1rem;
  height: 100%;
}

:deep(.xterm-viewport) {
  overflow-y: auto !important;
}

:deep(.xterm-screen) {
  padding: 0.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .terminal__header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .terminal__actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .btn {
    flex: 1;
    justify-content: center;
  }
}
</style> 