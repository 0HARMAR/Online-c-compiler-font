<template>
  <div>
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
            <h1 class="text-5xl font-extrabold text-primary-800 mb-6">创建杰出的开发体验</h1>
            <div class="card">
              <p>高级代码编辑功能，实时错误检测，智能代码补全以及深度的代码分析。无论项目规模如何，都能提供无与伦比的开发效率。</p>
            </div>
            <div class="flex mt-8">
              <router-link to="/compile" class="btn px-4 py-2 text-base">开始体验 <i class="fas fa-arrow-right"></i></router-link>
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
            <h1 class="text-5xl font-extrabold text-primary-800 mb-6">强大开发工具</h1>
            <div class="card">
              <p>集成调试器、版本控制、数据库工具、测试运行器、部署工具等功能于一身的开发环境，让您只需一个应用程序即可完成所有开发工作。</p>
            </div>
            <div class="flex mt-8">
              <router-link to="/compile" class="btn">探索工具 <i class="fas fa-arrow-right"></i></router-link>
            </div>
          </div>
        </div>
      </section>
      <!-- 第三部分 -->
      <section id="section-3">
        <div class="content">
          <div class="text-content">
            <h1 class="text-5xl font-extrabold text-primary-800 mb-6">高效的代码调试</h1>
            <div class="card">
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
                </div>
              </div>
            </div>
            <div class="flex mt-8">
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
            <h1 class="text-5xl font-extrabold text-primary-800 mb-6">智能重构</h1>
            <div class="card">
              <p>强大的重构工具，帮助您安全而高效地改进代码结构。无论是重命名标识符、提取方法、变量或接口，还是更改函数签名，都能轻松应对。</p>
            </div>
            <div class="flex mt-8">
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
</template>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
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
</script>
