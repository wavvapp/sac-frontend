import { useState } from "react"
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import Badge from "@/components/ui/Badge"
import { theme } from "@/theme"
import { TemporaryStatusType, useStatus } from "@/contexts/StatusContext"
import DatePicker from "../DatePicker"

type StatusProps = {
  timeSlots: string[]
}

export const Status: React.FC<StatusProps> = ({ timeSlots }) => {
  const { temporaryStatus, setTemporaryStatus } = useStatus()
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

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
        <DatePicker onClose={() => setIsDatePickerOpen(false)} />
      ) : (
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
                      temporaryStatus.timeSlot.toLowerCase() ===
                      slot.toLowerCase()
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
      )}
    </View>
  )
}

export default Status

const styles = StyleSheet.create({
  container: { gap: 12 },
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
