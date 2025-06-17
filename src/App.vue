<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200">
    <!-- 添加 Font Awesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <nav class="bg-gradient-to-r from-primary-600 to-primary-400 shadow-lg backdrop-blur-lg bg-opacity-90 sticky top-0 z-50">
      <div class="w-full px-4">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <router-link to="/" class="nav__title">
                <span class="icon">💻</span>
                <h1>Online C Compiler</h1>
              </router-link>
            </div>
            <div class="ml-10">
              <div class="flex space-x-4">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  :class="[
                    $route.path === item.href
                      ? 'bg-primary-700 text-white transform scale-105'
                      : 'text-white hover:bg-primary-500 hover:transform hover:scale-105',
                    'px-3 py-2 rounded-md text-sm font-medium transition-all duration-300'
                  ]"
                >
                  {{ item.name }}
                </router-link>
              </div>
            </div>
          </div>
          <div class="flex items-center">
            <template v-if="isLoggedIn">
              <span class="text-white mr-4 font-medium">{{ username }}</span>
              <button
                @click="handleLogout"
                class="bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-800 transform hover:scale-105 transition-all duration-300"
              >
                退出
              </button>
            </template>
            <template v-else>
              <button
                @click="showLoginDialog"
                class="bg-primary-700 text-white p-2 rounded-full hover:bg-primary-800 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                title="登录"
              >
                <i class="fas fa-user-circle text-xl"></i>
              </button>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- 根据路由显示不同内容 -->
    <div v-if="$route.path === '/'">
    <!-- 滑动首页内容 -->
    <div class="progress-container">
      <div class="progress-item active" data-index="0"></div>
      <div class="progress-item" data-index="1"></div>
      <div class="progress-item" data-index="2"></div>
      <div class="progress-item" data-index="3"></div>
    </div>
    <div class="scroll-container" id="scrollContainer">
      <!-- 第一部分 -->
      <section id="section-1" class="active">
        <div class="content">
          <div class="text-content">
            <h1>创建杰出的开发体验</h1>
            <div class="card">
              <h2>智能代码编辑器</h2>
              <p>高级代码编辑功能，实时错误检测，智能代码补全以及深度的代码分析。无论项目规模如何，都能提供无与伦比的开发效率。</p>
              <router-link to="/compile" class="btn">开始使用和探索工具 <i class="fas fa-arrow-right"></i></router-link>
            </div>
          </div>
          <div class="graphic-content">
            <div class="graphic">
              <div class="graphic-inner">
                <i class="fas fa-code"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <p>滚动继续浏览更多功能</p>
        </div>
      </section>
      <!-- 第二部分 -->
      <section id="section-2">
        <div class="content">
          <div class="graphic-content">
            <div class="graphic">
              <div class="graphic-inner">
                <i class="fas fa-tools"></i>
              </div>
            </div>
          </div>
          <div class="text-content">
            <div class="card">
              <h2>强大开发工具</h2>
              <p>集成调试器、版本控制、数据库工具、测试运行器、部署工具等功能于一身的开发环境，让您只需一个应用程序即可完成所有开发工作。</p>
              <router-link to="/compile" class="btn">探索工具 <i class="fas fa-arrow-right"></i></router-link>
            </div>
          </div>
        </div>
      </section>
      <!-- 第三部分 -->
      <section id="section-3">
        <div class="content">
          <div class="text-content">
            <div class="card">
              <h2>高效的代码调试</h2>
              <p>高级断点系统、表达式评估、变量监控等功能强大且直观的调试工具，让您在开发过程中能够快速定位和解决问题。</p>
              <div class="code-block">
                <div class="code-header">
                  <span>debug_demo.js</span>
                  <span>JavaScript</span>
                </div>
                <div class="code-content">
                  function calculateFactorial(n) {<br>
                  &nbsp;&nbsp;if (n === 0) return 1;<br>
                  &nbsp;&nbsp;return n * calculateFactorial(n - 1);<br>
                  }<br><br>
                  const result = calculateFactorial(5);<br>
                  console.log(result); // 输出：120
                </div>
              </div>
              <router-link to="/terminal" class="btn">学习调试 <i class="fas fa-arrow-right"></i></router-link>
            </div>
          </div>
          <div class="graphic-content">
            <div class="graphic">
              <div class="graphic-inner">
                <i class="fas fa-bug"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 第四部分 -->
      <section id="section-4">
        <div class="content">
          <div class="graphic-content">
            <div class="graphic">
              <div class="graphic-inner">
                <i class="fas fa-lightbulb"></i>
              </div>
            </div>
          </div>
          <div class="text-content">
            <div class="card">
              <h2>智能重构</h2>
              <p>强大的重构工具，帮助您安全而高效地改进代码结构。无论是重命名标识符、提取方法、变量或接口，还是更改函数签名，都能轻松应对。</p>
              <router-link to="/projects" class="btn">立即体验 <i class="fas fa-arrow-right"></i></router-link>
            </div>
          </div>
        </div>
        <div class="footer">
          <p>现代化开发工具集</p>
        </div>
      </section>
    </div>
    </div>
    <router-view v-else></router-view>

    <footer class="bg-gradient-to-r from-primary-50 to-primary-100 mt-auto">
      <div class="w-full py-4 px-4">
        <p class="text-center text-gray-500 text-sm">
          &copy; 2024 Online C Compiler. All rights reserved.
        </p>
      </div>
    </footer>

    <!-- 登录对话框 -->
    <el-dialog v-model="loginDialogVisible" title="登录" width="30%" class="rounded-lg">
      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">用户名</label>
          <input
            type="text"
            v-model="loginForm.username"
            class="mt-1 input w-full"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">密码</label>
          <input
            type="password"
            v-model="loginForm.password"
            class="mt-1 input w-full"
          />
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end space-x-3">
          <button
            @click="loginDialogVisible = false"
            class="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            取消
          </button>
          <button
            @click="handleLogin"
            class="btn btn-primary"
          >
            登录
          </button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 配置 axios
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // 如果有token，添加到请求头
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      ElMessage.error(`请求失败: ${error.response.status} - ${error.response.data?.message || '未知错误'}`)
    } else if (error.request) {
      ElMessage.error('无法连接到服务器，请检查网络连接')
    } else {
      ElMessage.error('请求配置错误: ' + error.message)
    }
    return Promise.reject(error)
  }
)

const router = useRouter()
const isLoggedIn = ref(false)
const username = ref('')
const loginDialogVisible = ref(false)
const loginForm = ref({
  username: '',
  password: ''
})

const navigation = [
  { name: '编辑器', href: '/compile' },
  { name: '终端', href: '/terminal' },
  { name: '项目管理', href: '/projects' }
]

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    isLoggedIn.value = true
    username.value = localStorage.getItem('username') || ''
  }

  const scrollContainer = document.getElementById('scrollContainer');
  const sections = document.querySelectorAll('section');
  const progressItems = document.querySelectorAll('.progress-item');
  let currentSection = 0;
  if (!scrollContainer) return;
  scrollContainer.addEventListener('scroll', function() {
    const scrollPosition = scrollContainer.scrollTop;
    const sectionHeight = window.innerHeight;
    const newSection = Math.round(scrollPosition / sectionHeight);
    if (newSection !== currentSection) {
      sections.forEach((section, index) => {
        if (index === newSection) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
      progressItems.forEach((item, index) => {
        if (index === newSection) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
      currentSection = newSection;
    }
  });
  progressItems.forEach(item => {
    item.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      scrollContainer.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      });
    });
  });
  let touchStartY = 0;
  scrollContainer.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  scrollContainer.addEventListener('touchmove', function(e) {
    e.preventDefault();
  }, { passive: false });
})

const showLoginDialog = () => {
  loginDialogVisible.value = true
}

const handleLogin = async () => {
  try {
    const response = await axios.post('/api/login', {
      id: 1,
      name: loginForm.value.username,
      password: loginForm.value.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (response.status === 200) {
      const { id, name: user,password,token } = response.data.data
      localStorage.setItem('id', id)
      localStorage.setItem('name', user)
      localStorage.setItem('password', password)
      localStorage.setItem('token', token)
      isLoggedIn.value = true
      username.value = user
      loginDialogVisible.value = false
      ElMessage.success('登录成功')
    } else {
      ElMessage.error(response.data.code)
      ElMessage.error(response.data.message || '登录失败')
    }
  } catch (error) {
    console.error('登录请求错误:', error)
    if (error.response) {
      ElMessage.error(`登录失败: ${error.response.status} - ${error.response.data?.message || '服务器错误'}`)
    } else if (error.request) {
      ElMessage.error('无法连接到服务器，请确保后端服务正在运行')
    } else {
      ElMessage.error('登录请求错误: ' + error.message)
    }
  }
}

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  isLoggedIn.value = false
  username.value = ''
  router.push('/')
  ElMessage.success('已退出登录')
}
</script>

<style>
/* ...保留原有样式... */
/* 引入scroll-demo的样式 */
.scroll-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  position: relative;
}
section {
  height: 100vh;
  width: 100%;
  scroll-snap-align: start;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  opacity: 0.2;
  transform: translateY(20px);
  transition: all 1.2s cubic-bezier(0.19, 1, 0.22, 1);
}
section.active {
  opacity: 1;
  transform: translateY(0);
}
.content {
  max-width: 1200px;
  width: 100%;
  padding: 0 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 60px;
}
.text-content {
  flex: 1;
  z-index: 2;
}
.graphic-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
.card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  transform: scale(0.95);
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
section.active .card {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}
h1 {
  font-size: 3rem;
  margin-bottom: 25px;
  background: linear-gradient(135deg, #2c3e50, #3498db, #2980b9);
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  animation: gradient 8s ease infinite;
}
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
h2 {
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #2c3e50;
}
p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #34495e;
  margin-bottom: 30px;
}
.btn {
  display: inline-block;
  padding: 15px 35px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-decoration: none;
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
  position: relative;
  overflow: hidden;
}
.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: 0.5s;
}
.btn:hover::before {
  left: 100%;
}
.btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(52, 152, 219, 0.6);
}
.btn i {
  margin-left: 8px;
  font-size: 0.9rem;
}
.progress-container {
  position: fixed;
  top: 50%;
  right: 40px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 100;
}
.progress-item {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
}
.progress-item::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease;
}
.progress-item:hover::before {
  transform: scale(1.2);
  border-color: rgba(255, 255, 255, 0.4);
}
.progress-item.active {
  background: white;
  transform: scale(1.3);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
}
.progress-item.active::before {
  transform: scale(1.5);
  border-color: rgba(255, 255, 255, 0.6);
}
.graphic {
  width: 300px;
  height: 300px;
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  transform: rotate(-5deg) translateY(20px);
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
}
section.active .graphic {
  transform: rotate(0deg) translateY(0);
}
.graphic::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
  animation: rotate 10s linear infinite;
}
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.graphic-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 3rem;
}
.code-block {
  background: #2d2d2d;
  border-radius: 12px;
  overflow: hidden;
  margin: 25px 0;
}
.code-header {
  background: #1e1e1e;
  padding: 10px 15px;
  color: #9cdcfe;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
}
.code-content {
  padding: 20px;
  font-family: 'Fira Code', monospace;
  color: #d4d4d4;
  line-height: 1.6;
  font-size: 1rem;
}
.footer {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}
@media (max-width: 900px) {
  .content {
    flex-direction: column;
    gap: 40px;
    padding: 20px;
  }
  .card {
    padding: 30px;
    margin: 0 20px;
  }
  h1 {
    font-size: 2.5rem;
    text-align: center;
  }
  .graphic {
    width: 250px;
    height: 250px;
  }
  .btn {
    width: 100%;
    text-align: center;
  }
}
/* 添加滚动条美化 */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}
::-webkit-scrollbar-thumb {
  background: rgba(52, 152, 219, 0.5);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(52, 152, 219, 0.7);
}
.nav__title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: #1e293b;
  transition: all 0.2s;
}

.nav__title:hover {
  color: #3b82f6;
  transform: translateY(-1px);
}

.nav__title h1 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.nav__title .icon {
  font-size: 1.5rem;
}
</style>