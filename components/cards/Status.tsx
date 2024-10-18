import React, { useState } from "react"
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import CustomText, { fontFamilyMap } from "@/components/ui/CustomText"
import Badge from "../ui/Badge"

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
    paddingVertical: 7.5,
    paddingHorizontal: 16,
    fontFamily: fontFamilyMap["writer-mono"].normal?.normal,
    fontSize: 13,
    lineHeight: 20,
  },
})
