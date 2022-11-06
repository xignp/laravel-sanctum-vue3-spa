import { defineStore } from 'pinia'
import api from '../plugins/api'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      name: '',
    }
  },
  getters: {
    getName(state) {
      return state.name
    },
    getAuth(state) {
      return !!state.name
    },
  },
  actions: {
    setName(payload: { name: string }) {
      this.name = payload.name
    },
    async login(payload: { email: string; password: string }) {
      try {
        const { email, password } = payload
        await api.get('/csrf-cookie')
        const response = await api.post('/login', {
          email,
          password,
        })
        this.name = response.data.name
      } catch (e) {
        throw e
      }
    },
    async register(payload: { name: string; email: string; password: string; passwordConfirm: string }) {
      try {
        const { name, email, password, passwordConfirm } = payload
        await api.post('/register', {
          name,
          email,
          password,
          password_confirmation: passwordConfirm,
        })
      } catch (e) {
        throw e
      }
    },
    async logout() {
      try {
        await api.post('/logout')
        this.name = ''
      } catch (e) {
        throw e
      }
    },
    async fetchUser() {
      try {
        const response = await api.get('/user')
        if (!response.data.name) {
          throw Error('Failed to get user name')
        }
        this.name = response.data.name
      } catch (e) {
        throw e
      }
    },
  },
  persist: true,
})
