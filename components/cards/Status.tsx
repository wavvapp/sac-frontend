import React from "react"
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import CustomText from "@/components/ui/CustomText"
import Badge from "@/components/ui/Badge"
import { theme } from "@/theme"
import { useStatus } from "@/contexts/StatusContext" // Use the custom hook

type StatusProps = {
  timeSlots: string[] // Array of available time slots
}

export const Status: React.FC<StatusProps> = ({ timeSlots }) => {
  const { timeSlot, setTimeSlot } = useStatus()

  const handleTimeSlotChange = (selectedTime: string) => {
    setTimeSlot(selectedTime) // Update the selected time slot
  }

  return (
    <View style={styles.container}>
      <CustomText size="sm" style={styles.title} fontWeight="medium">
        When
      </CustomText>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}>
          <View style={styles.buttonContainer}>
            {timeSlots.map((slot) => (
              <TouchableOpacity
                onPress={() => handleTimeSlotChange(slot)}
                key={slot}>
                <Badge
                  name={slot}
                  variant={timeSlot === slot ? "default" : "outline"}
                  style={styles.badge}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default Status

const styles = StyleSheet.create({
  container: {
    gap: 18,
  },
  title: {
    paddingHorizontal: 15,
  },
  scrollContainer: {
    flexDirection: "row",
  },
  scrollContentContainer: {
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },
  badge: {
    fontFamily: theme.fontFamily["writer-mono"].normal?.normal,
    paddingVertical: 7.5,
    paddingHorizontal: 16,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
  },
})
