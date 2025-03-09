import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import CloseIcon from "./vectors/CloseIcon"
import { theme } from "@/theme"

type DatePickerProps = {
  onClose: () => void
}

export default function DatePicker({ onClose }: DatePickerProps) {
  const [isFromTimePickerVisible, setIsFromTimePickerVisible] = useState(false)
  const [isToTimePickerVisible, setIsToTimePickerVisible] = useState(false)
  const [fromTime, setFromTime] = useState(new Date()) // Default to current time
  const [toTime, setToTime] = useState(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  ) // 24 hours from current time

  const handleFromTimeChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setFromTime(selectedDate)
    }
    setIsFromTimePickerVisible(false)
  }

  const handleToTimeChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setToTime(selectedDate)
    }
    setIsToTimePickerVisible(false)
  }

  const formatTime = (date: Date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const formattedHours = hours % 12 || 12 // Converts 24-hour format to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    return `${formattedHours}:${formattedMinutes}`
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.column}>
          <Text style={styles.label}>FROM</Text>
          <TouchableOpacity onPress={() => setIsFromTimePickerVisible(true)}>
            <Text style={styles.timeText}>{formatTime(fromTime)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>TO</Text>
          <TouchableOpacity onPress={() => setIsToTimePickerVisible(true)}>
            <Text style={styles.timeText}>{formatTime(toTime)}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <CloseIcon color={theme.colors.black} />
        </TouchableOpacity>
      </View>

      {/* Time picker for 'FROM' */}
      {isFromTimePickerVisible && (
        <DateTimePicker
          value={fromTime}
          mode="time"
          is24Hour={false} // This enables AM/PM selection
          display="default"
          onChange={handleFromTimeChange}
        />
      )}

      {/* Time picker for 'TO' */}
      {isToTimePickerVisible && (
        <DateTimePicker
          value={toTime}
          mode="time"
          is24Hour={false} // This enables AM/PM selection
          display="default"
          onChange={handleToTimeChange}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    width: "100%",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  column: {
    flexDirection: "column",
    gap: 10,
  },
  label: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.black,
    fontFamily: theme.fontFamily["writer-monos"].normal?.normal,
    textTransform: "uppercase",
  },
  timeText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.black,
    fontFamily: theme.fontFamily.suisse.normal?.normal,
  },
  closeButton: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
  },
})
