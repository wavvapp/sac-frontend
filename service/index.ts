import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://your-api-url.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request Interceptor
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem('@Auth:token') // Dynamically get token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log('Unauthorized, redirecting to login...')
      // Handle unauthorized errors
    }
    return Promise.reject(error)
  }
)

export default api
