<template>
  <div class="projects">
    <div class="projects__container">
      <!-- Upload Section -->
      <div class="projects__section upload-section">
        <div class="section__header">
          <div class="section__title">
            <span class="icon">📤</span>
            <h2>项目上传</h2>
          </div>
        </div>
        
        <div class="section__content">
          <el-upload
            class="upload-area"
            drag
            action="/api/uploads"
            :headers="uploadHeaders"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
            :before-upload="beforeUpload"
            :show-file-list="false"
          >
            <div class="upload-area__content">
              <div class="upload-area__icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <div class="upload-area__text">
                <p class="upload-area__title">拖拽文件到此处或点击上传</p>
                <p class="upload-area__subtitle">支持上传 .zip 格式的C语言项目文件</p>
              </div>
            </div>
          </el-upload>
        </div>
      </div>

      <!-- Projects List Section -->
      <div class="projects__section projects-list">
        <div class="section__header">
          <div class="section__title">
            <span class="icon">📁</span>
            <h2>项目列表</h2>
          </div>
          
          <div class="section__actions">
            <button 
              class="btn btn--secondary"
              @click="refreshProjects"
              :disabled="isLoading"
            >
              <span class="btn__icon">🔄</span>
              <span class="btn__text">刷新</span>
            </button>
          </div>
        </div>

        <div class="section__content">
          <div class="projects-table">
            <table>
              <thead>
                <tr>
                  <th>项目名称</th>
                  <th>上传时间</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="projects.length > 0">
                  <tr v-for="project in projects" :key="project.id" class="project-row">
                    <td class="project-name">
                      <span class="icon">📄</span>
                      {{ project.name }}
                    </td>
                    <td class="project-time">{{ formatDate(project.uploadTime) }}</td>
                    <td class="project-status">
                      <span 
                        class="status-badge"
                        :class="getStatusClass(project.status)"
                      >
                        {{ getStatusText(project.status) }}
                      </span>
                    </td>
                    <td class="project-actions">
                      <div class="actions-group">
                        <button
                          class="btn btn--primary btn--icon"
                          @click="compileProject(project)"
                          :disabled="project.status === 'compiling'"
                          :title="project.status === 'compiling' ? '正在编译' : '编译项目'"
                        >
                          <span class="btn__icon">⚙️</span>
                        </button>
                        
                        <button
                          class="btn btn--success btn--icon"
                          @click="downloadOutput(project)"
                          :disabled="project.status !== 'success'"
                          :title="project.status === 'success' ? '下载输出' : '等待编译完成'"
                        >
                          <span class="btn__icon">⬇️</span>
                        </button>
                        
                        <button
                          class="btn btn--danger btn--icon"
                          @click="confirmDelete(project)"
                          title="删除项目"
                        >
                          <span class="btn__icon">🗑️</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </template>
                <tr v-else>
                  <td colspan="4" class="empty-state">
                    <div class="empty-state__content">
                      <span class="icon">📭</span>
                      <p>暂无项目</p>
                      <p class="empty-state__subtitle">上传一个项目开始使用</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

// State
const projects = ref([])
const isLoading = ref(false)

// Headers
const uploadHeaders = {
  'token': localStorage.getItem('token') || ''
}

// Lifecycle
onMounted(() => {
  refreshProjects()
})

// Methods
const refreshProjects = async () => {
  if (isLoading.value) return
  
  try {
    isLoading.value = true
    const response = await axios.get('/api/projects', {
      headers: uploadHeaders
    })
    projects.value = response.data.data
  } catch (error) {
    ElMessage.error('获取项目列表失败: ' + error.message)
  } finally {
    isLoading.value = false
  }
}

const beforeUpload = (file) => {
  const isZip = file.type === 'application/zip'
  if (!isZip) {
    ElMessage.error('只能上传 ZIP 格式的文件!')
  }
  return isZip
}

const handleUploadSuccess = (response) => {
  if (response.code === 'SUCCESS') {
    ElMessage.success('项目上传成功')
    refreshProjects()
  } else {
    ElMessage.error(response.msg || '上传失败')
  }
}

const handleUploadError = (error) => {
  ElMessage.error('项目上传失败: ' + error.message)
}

const compileProject = async (project) => {
  try {
    await axios.post('/api/compiles', {
      projectId: project.id,
      compilerType: 'gcc',
      compilerVersion: 'latest',
      compilerArgs: '-Wall -O2'
    }, {
      headers: uploadHeaders
    })
    ElMessage.success('编译请求已发送')
    refreshProjects()
  } catch (error) {
    ElMessage.error('编译失败: ' + error.message)
  }
}

const downloadOutput = async (project) => {
  try {
    const response = await axios.post('/api/download', {
      projectId: project.id
    }, {
      headers: uploadHeaders,
      responseType: 'blob'
    })
    
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${project.name}.out`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    ElMessage.error('下载失败: ' + error.message)
  }
}

const confirmDelete = (project) => {
  ElMessageBox.confirm(
    `确定要删除项目 "${project.name}" 吗？`,
    '删除确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    deleteProject(project)
  }).catch(() => {})
}

const deleteProject = async (project) => {
  try {
    await axios.delete(`/api/projects/${project.id}`, {
      headers: uploadHeaders
    })
    ElMessage.success('项目删除成功')
    refreshProjects()
  } catch (error) {
    ElMessage.error('删除失败: ' + error.message)
  }
}

// Utils
const formatDate = (date) => {
  return new Date(date).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusClass = (status) => {
  const statusMap = {
    'pending': 'status--pending',
    'compiling': 'status--compiling',
    'success': 'status--success',
    'failed': 'status--failed'
  }
  return statusMap[status] || 'status--pending'
}

const getStatusText = (status) => {
  const statusMap = {
    'pending': '等待编译',
    'compiling': '编译中',
    'success': '编译成功',
    'failed': '编译失败'
  }
  return statusMap[status] || '未知状态'
}
</script>

<style>
.projects {
  min-height: 100vh;
  background: #f8fafc;
  padding: 2rem;
}

.projects__container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.projects__section {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.section__header {
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section__title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section__title h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.section__content {
  padding: 1.5rem;
}

/* Upload Area */
.upload-area {
  width: 100%;
}

.upload-area__content {
  padding: 3rem 2rem;
  border: 2px dashed #e2e8f0;
  border-radius: 0.75rem;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
}

.upload-area:hover .upload-area__content {
  border-color: #3b82f6;
  background: #f8fafc;
}

.upload-area__icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  color: #94a3b8;
}

.upload-area__icon svg {
  width: 100%;
  height: 100%;
}

.upload-area__title {
  font-size: 1.125rem;
  font-weight: 500;
  color: #1e293b;
  margin: 0 0 0.5rem;
}

.upload-area__subtitle {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

/* Projects Table */
.projects-table {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  padding: 1rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

td {
  padding: 1rem;
  font-size: 0.875rem;
  color: #1e293b;
  border-bottom: 1px solid #e2e8f0;
}

.project-row:hover {
  background: #f8fafc;
}

.project-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.project-time {
  color: #64748b;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status--pending {
  background: #f1f5f9;
  color: #64748b;
}

.status--compiling {
  background: #fef3c7;
  color: #92400e;
}

.status--success {
  background: #dcfce7;
  color: #166534;
}

.status--failed {
  background: #fee2e2;
  color: #991b1b;
}

.actions-group {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
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

.btn--icon {
  padding: 0.5rem;
}

.btn--primary {
  background: #3b82f6;
  color: white;
}

.btn--primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn--success {
  background: #22c55e;
  color: white;
}

.btn--success:hover:not(:disabled) {
  background: #16a34a;
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

.icon {
  font-size: 1.25rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
}

.empty-state__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
}

.empty-state__subtitle {
  font-size: 0.875rem;
}

/* Responsive */
@media (max-width: 768px) {
  .projects {
    padding: 1rem;
  }
  
  .section__header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .section__actions {
    width: 100%;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
  
  .actions-group {
    flex-wrap: wrap;
  }
  
  .btn--icon {
    flex: 1;
  }
}

/* Title Section */
.projects__title {
  margin-bottom: 1rem;
}

.title-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: #1e293b;
  transition: all 0.2s;
}

.title-link:hover {
  color: #3b82f6;
  transform: translateY(-1px);
}

.title-link h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.title-link .icon {
  font-size: 1.75rem;
}
</style> 