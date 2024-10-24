import React, { useState } from "react"
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import CustomText from "@/components/ui/CustomText"
import Badge from "@/components/ui/Badge"
import { theme } from "@/theme"

interface StatusProps {
  timeSlots: string[]
}

function Status({ timeSlots }: StatusProps) {
  const [activeSlot, setActiveSlot] = useState<string>(timeSlots[0])
  const handlePress = (slot: string) => {
    setActiveSlot(slot)
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
              <TouchableOpacity onPress={() => handlePress(slot)} key={slot}>
                <Badge
                  name={slot}
                  variant={activeSlot === slot ? "default" : "outline"}
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
