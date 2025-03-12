import { useState, useEffect } from "react"
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { CustomTitle } from "@/components/ui/CustomTitle"
import Badge from "@/components/ui/Badge"
import { theme } from "@/theme"
import { TemporaryStatusType, useStatus } from "@/contexts/StatusContext"
import DatePicker from "@/components/DatePicker"
import AsyncStorage from "@react-native-async-storage/async-storage"

type StatusProps = {
  timeSlots: string[]
}

export const Status: React.FC<StatusProps> = ({ timeSlots }) => {
  const { temporaryStatus, setTemporaryStatus } = useStatus()
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [fromTime, setFromTime] = useState<Date | null>(null)
  const [toTime, setToTime] = useState<Date | null>(null)

  useEffect(() => {
    const loadSavedTimes = async () => {
      const savedFrom = await AsyncStorage.getItem("fromTime")
      const savedTo = await AsyncStorage.getItem("toTime")

      if (savedFrom && savedTo) {
        const from = new Date(savedFrom)
        const to = new Date(savedTo)
        const now = new Date()
        if (from < now) {
          setFromTime(now)
          setToTime(new Date(now.getTime() + 60 * 60 * 1000))
        } else {
          setFromTime(from)
          setToTime(to)
        }
      } else {
        const now = new Date()
        setFromTime(now)
        setToTime(new Date(now.getTime() + 60 * 60 * 1000))
      }
    }

    loadSavedTimes()
  }, [])

  const handleSaveTimes = (data: {
    from: Date
    to: Date
    timeRange: string
  }) => {
    setFromTime(data.from)
    setToTime(data.to)
    setTemporaryStatus((prev: TemporaryStatusType) => ({
      ...prev,
      timeSlot: data.timeRange,
    }))
  }

  const handleTimeSlotChange = (selectedTime: string) => {
    if (selectedTime.toLowerCase() === "set time") {
      setIsDatePickerOpen(true)
    } else {
      setTemporaryStatus((prev: TemporaryStatusType) => ({
        ...prev,
        timeSlot: selectedTime,
      }))
    }
  }

  return (
    <View style={styles.container}>
      {isDatePickerOpen ? (
        <DatePicker
          onClose={() => setIsDatePickerOpen(false)}
          initialFromTime={fromTime ?? new Date()}
          initialToTime={
            toTime ?? new Date(new Date().getTime() + 60 * 60 * 1000)
          }
          onSave={handleSaveTimes}
        />
      ) : (
        <>
          <CustomTitle text="When" style={styles.title} />
          <View style={styles.scrollContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContentContainer}>
              <View style={styles.buttonContainer}>
                {timeSlots.map((slot) => (
                  <TouchableOpacity
                    onPress={() => handleTimeSlotChange(slot)}
                    key={slot}>
                    <Badge
                      name={slot}
                      variant={
                        temporaryStatus.timeSlot === slot ||
                        (slot.toLowerCase() === "set time" &&
                          temporaryStatus.timeSlot.includes("-"))
                          ? "default"
                          : "outline"
                      }
                      style={styles.badge}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </>
      )}
    </View>
  )
}

export default Status

const styles = StyleSheet.create({
  container: { gap: 12, height: 70 },
  title: { paddingHorizontal: 20 },
  scrollContainer: { flexDirection: "row" },
  scrollContentContainer: { paddingHorizontal: 20 },
  buttonContainer: { flexDirection: "row", gap: 8 },
  badge: {
    paddingVertical: 7.5,
    paddingHorizontal: 16,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
  },
})
