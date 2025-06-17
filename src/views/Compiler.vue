<template>
  <div class="compiler">
    <div class="compiler__container">
      <!-- Editor Panel -->
      <div class="compiler__panel editor-panel">
        <div class="panel__header">
          <div class="panel__title">
            <span class="icon">📝</span>
            <h2>代码编辑器</h2>
          </div>
          <div class="panel__actions">
            <button 
              class="btn btn--primary"
              :class="{ 'btn--loading': isRunning }"
              @click="runCode"
              :disabled="isRunning"
            >
              <span class="btn__icon">▶</span>
              <span class="btn__text">{{ isRunning ? '运行中...' : '运行代码' }}</span>
            </button>
          </div>
        </div>
        <div ref="editorContainer" class="panel__content editor"></div>
      </div>

      <!-- Output Panel -->
      <div class="compiler__panel output-panel">
        <div class="panel__header">
          <div class="panel__title">
            <span class="icon">📊</span>
            <h2>运行结果</h2>
          </div>
          <div class="panel__actions">
            <button 
              class="btn btn--secondary"
              @click="clearOutput"
              :disabled="!output"
            >
              <span class="btn__icon">🗑</span>
              <span class="btn__text">清除</span>
            </button>
          </div>
        </div>
        <div class="panel__content output">
          <pre v-text="output || '暂无输出'"></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as monaco from 'monaco-editor'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// State
const editorContainer = ref(null)
const output = ref('')
const isRunning = ref(false)
let editor = null

// Constants
const DEFAULT_CODE = `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`

const EDITOR_CONFIG = {
  value: DEFAULT_CODE,
  language: 'c',
  theme: 'vs-dark',
  fontSize: 14,
  lineHeight: 20,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 2,
  wordWrap: 'on',
  renderWhitespace: 'selection',
  padding: { top: 16, bottom: 16 },
  scrollbar: {
    vertical: 'visible',
    horizontal: 'visible',
    useShadows: true,
    verticalScrollbarSize: 8,
    horizontalScrollbarSize: 8
  }
}

// Lifecycle
onMounted(() => {
  initEditor()
})

onBeforeUnmount(() => {
  editor?.dispose()
})

// Methods
const initEditor = () => {
  editor = monaco.editor.create(editorContainer.value, EDITOR_CONFIG)
  
  window.addEventListener('resize', () => {
    editor?.layout()
  })
}

const getHeaders = () => ({
  'token': localStorage.getItem('token') || '',
  'Content-Type': 'application/json'
})

const runCode = async () => {
  if (isRunning.value) return
  
  try {
    isRunning.value = true
    output.value = '正在编译运行...'
    
    const code = editor.getValue()
    const file = new Blob([code], { type: 'text/x-csrc' })
    
    // Upload
    const uploadRes = await axios.post('/api/upload', file, {
      headers: {
        ...getHeaders(),
        'Content-Type': 'multipart/form-data'
      }
    })

    if (uploadRes.data.code !== "SUCCESS") {
      throw new Error(uploadRes.data.msg || '上传失败')
    }

    const { fileId } = uploadRes.data

    // Compile
    const compileRes = await axios.post(
      `/api/compile?fileId=${encodeURIComponent(fileId)}`,
      {
        compilerType: 'gcc',
        compilerVersion: 'latest',
        compilerArgs: '-Wall -O2'
      },
      { headers: getHeaders() }
    )

    if (compileRes.data.code !== "SUCCESS") {
      throw new Error(compileRes.data.msg || '编译失败')
    }

    // Run
    const runRes = await axios.get('api/run', {
      params: {
        args: "-g",
        fileId: fileId,
      },
      headers: {
        ...getHeaders(),
        'outputUrl': compileRes.data.data
      }
    })

    output.value = runRes.data.data || '运行成功'
  } catch (error) {
    const errorMessage = error.response?.data?.msg || error.message
    output.value = `错误: ${errorMessage}`
    ElMessage.error(errorMessage)
  } finally {
    isRunning.value = false
  }
}

const clearOutput = () => {
  output.value = ''
}
</script>

<style>
.compiler {
  height: 100vh;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
}

.compiler__container {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  height: 100%;
  overflow: hidden;
}

.compiler__panel {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel__header {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel__title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.panel__title h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.panel__actions {
  display: flex;
  gap: 0.5rem;
}

.panel__content {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.editor {
  height: 100%;
}

.output {
  padding: 1rem;
  background: #1e293b;
  color: #e2e8f0;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.output pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
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

/* Monaco Editor Overrides */
:deep(.monaco-editor) {
  padding: 1rem;
}

:deep(.monaco-editor .margin) {
  background: #1e293b !important;
}

/* Responsive */
@media (max-width: 1024px) {
  .compiler__container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
}
</style>