<template>
    <div class="layout">
        <aside class="sidebar">
            <el-collapse>
                <el-collapse-item 
                    v-for="header in headers"
                    :key="header.title"
                    :title="header.title">
                    <div>
                        <strong>头文件名：</strong>
                        {{ header.title }}
                    </div>
                    <div>
                        <strong>可用版本：</strong>
                        <el-tag
                            v-for = "ver in header.versions"
                            :key="ver"
                            type="success"
                            class="mr-2">
                            {{ ver }}
                        </el-tag>
                    </div>
                    <div class="mt-2">
                        <strong>描述：</strong>
                        <p>{{ header.description }}</p>
                    </div>
                    <div class="mt-2">
                        <strong>特点：</strong>
                        <p>{{ header.features }}</p>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </aside>
        <main class="main-content">
            <h1>编程语言手册</h1>
            <p>欢迎使用我们的在线编程语言手册。请选择左侧的编程语言以查看详细信息。</p>
            <slot/>
        </main>
    </div>
  
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const headers = ref([]);

const header_names = ref([])
// 获取头文件列表
console.log('Fetching headers...');
const fetchHeaders = async () => {
    console.log(' async HeaderList 执行了');
    try {
        const res = await axios.get('http://localhost:3000/headers')
        header_names.value = res.data.headers || [];
        console.log('Headers fetched:', header_names.value);

        for (const header_name of header_names.value){
            const res = await axios.get('http://localhost:3000/headers/' + header_name);
            headers.value.push({
                title: header_name,
                versions: res.data.introduced || [],
                description: res.data.description || '无描述',
                features: res.data.feature || []
            });
        }
    } catch (error) {
        console.error('Error fetching headers:', error);
    }
}

fetchHeaders();

// console.log('Headers:', headers.value);
</script>

<style scoped>
.layout {
    display: flex;
    height: 100vh;
}
.sidebar {
    width: 250px;
    background: #f5f7fa;
    padding: 16px 8px 16px 0;
    overflow-y: auto;
    border-right: 1px solid #ebeef5;
}
.main-content {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
}
</style>