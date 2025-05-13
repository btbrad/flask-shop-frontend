import request from '@/utils/request'

interface LoginParamsType {
  name: string
  pwd: string
}

// 登录
export const loginApi = (data: LoginParamsType) => {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}
