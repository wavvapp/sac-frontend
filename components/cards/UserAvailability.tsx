import React from "react"
import { StyleSheet, View, ViewProps } from "react-native"
import CustomText from "@/components/ui/CustomText"

interface UserAvailabilityProps extends ViewProps {
  firstName: string
  lastName: string
  time: string
  activity: string
}

export default function UserAvailability({
  firstName,
  lastName,
  time,
  activity,
  style,
  ...rest
}: UserAvailabilityProps) {
  return (
    <View style={(styles.container, style)} {...rest}>
      <View style={styles.header}>
        <CustomText style={styles.name} fontWeight="semibold">
          {firstName} {lastName}
        </CustomText>
        <View style={styles.dot} />
        <CustomText style={styles.time} fontFamily="marfa">
          {time}
        </CustomText>
      </View>
      <CustomText style={styles.activity} fontFamily="writer-mono">
        {activity}
      </CustomText>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    gap: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  name: {
    textTransform: "capitalize",
  },
  time: {
    opacity: 0.5,
    textTransform: "capitalize",
  },
  dot: {
    backgroundColor: "#000000",
    opacity: 0.5,
    height: 2,
    width: 2,
    borderRadius: 2,
  },
  activity: {
    textTransform: "capitalize",
  },
})
