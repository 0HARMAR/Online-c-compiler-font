<template>
  <footer class="footer-container">
    <div class="max-w-7xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- 产品 -->
        <div>
          <h3 class="text-lg font-semibold text-primary-800 mb-4">产品</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-600 hover:text-primary-600">在线编译器</a></li>
            <li><a href="#" class="text-gray-600 hover:text-primary-600">代码编辑器</a></li>
            <li><a href="#" class="text-gray-600 hover:text-primary-600">终端工具</a></li>
            <li><a href="#" class="text-gray-600 hover:text-primary-600">项目管理</a></li>
          </ul>
        </div>
        <!-- 解决方案 -->
        <div>
          <h3 class="text-lg font-semibold text-primary-800 mb-4">解决方案</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-600 hover:text-primary-600">C++开发</a></li>
            <li><a href="#" class="text-gray-600 hover:text-primary-600">Web开发</a></li>
            <li><a href="#" class="text-gray-600 hover:text-primary-600">移动开发</a></li>
            <li><a href="#" class="text-gray-600 hover:text-primary-600">云开发</a></li>
          </ul>
        </div>
        <!-- 资源 -->
        <div>
          <h3 class="text-lg font-semibold text-primary-800 mb-4">资源</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-600 hover:text-primary-600">文档</a></li>
            <li><a href="#" class="text-gray-600 hover:text-primary-600">教程</a></li>
            <li><a href="#" class="text-gray-600 hover:text-primary-600">博客</a></li>
            <li><a href="#" class="text-gray-600 hover:text-primary-600">社区</a></li>
          </ul>
        </div>
        <!-- 公司 -->
        <div>
          <h3 class="text-lg font-semibold text-primary-800 mb-4">公司</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-600 hover:text-primary-600">关于我们</a></li>
            <li><a href="#" class="text-gray-600 hover:text-primary-600">联系我们</a></li>
            <li><a href="#" class="text-gray-600 hover:text-primary-600">加入我们</a></li>
            <li><a href="#" class="text-gray-600 hover:text-primary-600">合作伙伴</a></li>
          </ul>
        </div>
      </div>
      
      <!-- 底部信息 -->
      <div class="mt-12 pt-8 border-t border-gray-200">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center space-x-4 mb-4 md:mb-0">
            <span class="text-gray-600">简体中文</span>
            <span class="text-gray-600">|</span>
            <a href="#" class="text-gray-600 hover:text-primary-600">隐私政策</a>
            <span class="text-gray-600">|</span>
            <a href="#" class="text-gray-600 hover:text-primary-600">使用条款</a>
          </div>
          <div class="text-gray-600 text-sm">
            Copyright © 2024 Online C Compiler. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 组件逻辑可以在这里添加
</script>

<style scoped>
.footer-container {
  width: 100%;
  background: white;
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
  border-top: 2px solid var(--primary-200);
  position: relative;
  z-index: 2;
}

.footer-container a {
  transition: color 0.3s ease;
  color: var(--primary-600);
}

.footer-container a:hover {
  color: var(--primary-800);
}

.footer-container h3 {
  color: var(--primary-800);
}

.footer-container .text-gray-600 {
  color: #4B5563;
}

@media (max-width: 768px) {
  .footer-container .grid {
    gap: 2rem;
  }
}
</style> 