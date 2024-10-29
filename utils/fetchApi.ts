import api from "@/service"

export const fetchApi = async (url: string) => {
  try {
    const response = await api.get(url)
    return response
  } catch (error) {
    console.error("Error fetching data:", error)
    return null
  }
}
