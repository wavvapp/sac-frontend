import React, { useState } from "react"
import { View, ScrollView, StyleSheet } from "react-native"
import { CustomButton } from "@/components/ui/Button"
import CustomText from "@/components/ui/CustomText"
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
              <View key={slot}>
                <CustomButton
                  title={slot}
                  onPress={() => handlePress(slot)}
                  textSize="base"
                  variant="secondary"
                  active={activeSlot === slot}
                  textStyles={styles.buttonText}
                />
              </View>
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
  buttonText: {
    fontFamily: theme.fontFamily["writer-mono"].normal?.normal,
  },
})
