<template>
  <div class="common-layout">
    <el-container>
      <el-header class="bg-blue-400 flex items-center">
        <div class="w-[200px] h-full flex justify-center items-center">
          <div class=" font-extrabold text-white text-center text-2xl">Flask Shop</div>
        </div>
        <div class="flex-1 flex justify-end">
          <el-button type="danger" @click="handleLogout">登出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { removeToken } from '@/utils/auth'

const handleLogout = () => {
  removeToken()
  window.location.reload()
}
</script>

<style scoped>

</style>
