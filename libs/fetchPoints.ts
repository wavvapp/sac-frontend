import api from "@/service"

export const fetchPoints = async () => {
  try {
    const response = await api.get(`/points`)
    return response.data
  } catch (error) {
    console.error("Error fetching Points", error)
  }
}
