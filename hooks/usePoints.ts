import { useCallback } from "react"

import api from "@/service"
import { useEffect, useState } from "react"
import { useStatus } from "@/contexts/StatusContext"

export const usePoints = () => {
  const { statusMessage, friends, timeSlot } = useStatus()
  const [points, setPoints] = useState(0)
  const [pointsLoading, setPointsLoading] = useState(false)
  const fetchPoints = useCallback(async () => {
    try {
      setPointsLoading(true)
      const response = await api.get(`/points`)
      setPoints(response.data.points)
    } catch (error) {
      console.error("Error fetching Points", error)
    } finally {
      setPointsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPoints()
  }, [fetchPoints, friends, timeSlot, statusMessage])

  return {
    points,
    fetchPoints,
    pointsLoading,
  }
}
