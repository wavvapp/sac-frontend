import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Function to refresh the access token
const refreshAccessToken = async (refreshToken: string) => {
  const url = `${process.env.API_BASE_URL}/auth/refresh-token`
  const body = { refresh_token: refreshToken }
  const { data } = await axios.post(url, body)

  await AsyncStorage.setItem("@Auth:accessToken", data.access_token)
  await AsyncStorage.setItem("@Auth:refreshToken", data.refresh_token)

  return data.access_token // Return the new access token
}

// Request Interceptor
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem("@Auth:accessToken")
    const user = await AsyncStorage.getItem("@Auth:user")
    if (token) {
      user && (await refreshAccessToken(token))
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
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const refreshToken = await AsyncStorage.getItem("@Auth:refreshToken")
      if (refreshToken) {
        try {
          const newAccessToken = await refreshAccessToken(refreshToken)
          error.response.config.headers["Authorization"] =
            `Bearer ${newAccessToken}`
          return axios(error.response.config)
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError)
        }
      }
    }
    return Promise.reject(error)
  },
)

export default api
