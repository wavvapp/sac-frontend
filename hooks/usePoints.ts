import api from "@/service"
import { useEffect, useState } from "react"

export const usePoints = () => {
  const [points, setPoints] = useState(0)
  const fetchPoints = async () => {
    const response = await api.get(`/points`)
    setPoints(response.data.points)
  }
  console.log(points)

  useEffect(() => {
    fetchPoints()
  }, [])
  return {
    points,
    fetchPoints,
  }
}
