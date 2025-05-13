<template>
  <div class="w-full h-[100vh] flex justify-center items-center">
    <div class="w-[500px] h-[500px] !px-4">
      <h1 class="w-full text-center !mb-10 pl-[80px]">登录</h1>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="loginForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="loginForm.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button class="w-full" type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

interface LoginFormType {
  username: string;
  password: string;
}

const loginFormRef = ref<FormInstance>();

const loginForm = reactive<LoginFormType>({
  username: '',
  password: '',
});

const rules = reactive<FormRules<LoginFormType>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 1, max: 12, message: '用户名长度在 2 到 12个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3,max: 6, message: '密码长度在 3 到 6 位'}
  ]
})

const handleLogin = async () => {
  await loginFormRef.value?.validate();
  console.log(loginForm);
}
</script>

<style scoped>

</style>
