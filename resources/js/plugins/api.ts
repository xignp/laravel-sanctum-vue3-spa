import axios from 'axios'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const api = axios.create({
  baseURL: process.env.MIX_API_BASE_URL,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const store = useAuthStore()
    const router = useRouter()
    if (error.response?.status === 401) {
      store.setName({ name: '' })
      router.push({ name: 'Login' })
    }
  }
)

export default api
