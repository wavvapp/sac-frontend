import AsyncStorage from "@react-native-async-storage/async-storage"
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios"

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request Interceptor
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem("@Auth:token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {
    const refreshToken = await AsyncStorage.getItem("@Auth:refreshToken")
    if (error.response?.status === 401 && refreshToken) {
      const url = `${process.env.API_BASE_URL}/api/auth/refresh-token`
      const body = {
        refresh_token: refreshToken,
      }
      const { data } = await axios.post(url, body)

      const accessToken = data.access_token
      const new_refreshToken = data.refresh_token
      await AsyncStorage.setItem("@Auth:token", accessToken)
      await AsyncStorage.setItem("@Auth:refreshToken", new_refreshToken)

      error.response.config.headers["Authorization"] = "Bearer " + accessToken
      console.log("============Successfully refresh token!=============")
      return axios(error.response.config)
    }
    return Promise.reject(error)
  },
)

export default api
