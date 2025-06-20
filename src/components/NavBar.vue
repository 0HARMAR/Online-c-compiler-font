<template>
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
              @click="$emit('logout')"
              class="bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-800 transform hover:scale-105 transition-all duration-300"
            >
              退出
            </button>
          </template>
          <template v-else>
            <button
              @click="$emit('show-login')"
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
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  isLoggedIn: Boolean,
  username: String,
  navigation: Array
})
</script>

<!-- 样式建议保留在 App.vue 或全局 -->
