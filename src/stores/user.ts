import { defineStore } from 'pinia'
import { getToken, setToken as setLocalToken } from '@/utils/auth'

export const useUserStore = defineStore('user', () => {
  const token = ref(getToken())

  const setToken = (newToken: string) => {
    token.value = newToken
    setLocalToken(newToken)
  }

  return { token, setToken }
})
