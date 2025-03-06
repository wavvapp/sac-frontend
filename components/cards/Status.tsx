import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { CustomTitle } from "@/components/ui/CustomTitle"
import Badge from "@/components/ui/Badge"
import { theme } from "@/theme"
import { TemporaryStatusType, useStatus } from "@/contexts/StatusContext"

type StatusProps = {
  timeSlots: string[]
}

export const Status: React.FC<StatusProps> = ({ timeSlots }) => {
  const { temporaryStatus, setTemporaryStatus } = useStatus()

  const handleTimeSlotChange = (selectedTime: string) => {
    setTemporaryStatus((prev: TemporaryStatusType) => ({
      ...prev,
      timeSlot: selectedTime,
    }))
  }

  return (
    <View style={styles.container}>
      <CustomTitle text="When" style={styles.title} />
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
    </View>
  )
}

export default Status

const styles = StyleSheet.create({
  container: {
    gap: 18,
  },
  title: {
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexDirection: "row",
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },
  badge: {
    paddingVertical: 7.5,
    paddingHorizontal: 16,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.sm,
  },
})
