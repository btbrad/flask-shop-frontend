//  src/utils/request.ts
import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getToken } from './auth'

interface AxiosResponseError {
  response: {
    data: {
      code: number | string
      msg: string
    }
  }
  message: string
}

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  (error: unknown) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('response', response)

    const { status, msg } = response.data
    // 登录成功
    if (status === 200) {
      return response.data
    }

    ElMessage.error(msg || '系统出错')
    return Promise.reject(new Error(msg || 'Error'))
  },
  (error: AxiosResponseError) => {
    if (error.response.data) {
      const { code, msg } = error.response.data
      // token 过期，跳转登录页
      if (code === 'A0230') {
        ElMessageBox.confirm('当前页面已失效，请重新登录', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        }).then(() => {
          localStorage.clear() // @vueuse/core 自动导入
          window.location.href = '/'
        })
      } else {
        ElMessage.error(msg || '系统出错')
      }
    }
    return Promise.reject(error.message)
  },
)

// 导出 axios 实例
export default service
