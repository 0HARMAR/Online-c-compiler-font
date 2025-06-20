<template>
  <el-dialog
    :model-value="modelValue"
    @update:modelValue="val => $emit('update:modelValue', val)"
    title="登录"
    width="30%"
    class="rounded-lg"
  >
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
          @click="$emit('update:modelValue', false)"
          class="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          取消
        </button>
        <button
          @click="$emit('login')"
          class="btn btn-primary"
        >
          登录
        </button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  modelValue: Boolean,
  loginForm: Object
})
</script>
