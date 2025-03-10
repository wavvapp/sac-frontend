import { useCallback, useEffect, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import CloseIcon from "./vectors/CloseIcon"
import { theme } from "@/theme"
import DatepickerBottomDrawer from "./DatePickerModal"

type DatePickerProps = {
  onClose: () => void
  initialFromTime: Date
  initialToTime: Date
  onSave: (fromTime: Date, toTime: Date) => void
}

export default function DatePicker({
  onClose,
  initialFromTime,
  initialToTime,
  onSave,
}: DatePickerProps) {
  const [fromTime, setFromTime] = useState(initialFromTime)
  const [toTime, setToTime] = useState(initialToTime)
  const [tempTime, setTempTime] = useState(new Date())

  const [isBottomDrawerVisible, setIsBottomDrawerVisible] = useState(false)
  const [activeTimeType, setActiveTimeType] = useState<"FROM" | "TO">("FROM")

  useEffect(() => {
    setFromTime(initialFromTime)
    setToTime(initialToTime)
  }, [initialFromTime, initialToTime])

  const formatTime = useCallback((date: Date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const formattedHours = hours % 12 || 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const period = hours >= 12 ? "PM" : "AM"
    return `${formattedHours}:${formattedMinutes} ${period}`
  }, [])

  const openTimePicker = (type: "FROM" | "TO") => {
    setActiveTimeType(type)
    setTempTime(type === "FROM" ? fromTime : toTime)
    setIsBottomDrawerVisible(true)
  }

  const closeDrawer = () => setIsBottomDrawerVisible(false)

  const handleTimeChange = (
    _event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (selectedDate) setTempTime(selectedDate)
  }

  const saveTime = () => {
    let newFromTime = fromTime
    let newToTime = toTime

    if (activeTimeType === "FROM") {
      newFromTime = tempTime
      if (tempTime > toTime) {
        newToTime = new Date(tempTime.getTime() + 60 * 60 * 1000)
      }
    } else {
      newToTime = tempTime
    }

    setFromTime(newFromTime)
    setToTime(newToTime)
    onSave(newFromTime, newToTime)
    closeDrawer()
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.column}>
          <Text style={styles.label}>FROM</Text>
          <TouchableOpacity onPress={() => openTimePicker("FROM")}>
            <Text style={styles.timeText}>{formatTime(fromTime)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>TO</Text>
          <TouchableOpacity onPress={() => openTimePicker("TO")}>
            <Text style={styles.timeText}>{formatTime(toTime)}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <CloseIcon color={theme.colors.black} />
        </TouchableOpacity>
      </View>

      <DatepickerBottomDrawer
        isVisible={isBottomDrawerVisible}
        onClose={closeDrawer}
        title={activeTimeType}
        onSave={saveTime}>
        <View style={styles.drawerContent}>
          <DateTimePicker
            value={tempTime}
            mode="time"
            is24Hour={false}
            display="spinner"
            locale="en_US"
            minimumDate={activeTimeType === "FROM" ? new Date() : fromTime}
            maximumDate={
              activeTimeType === "TO"
                ? new Date(fromTime.getTime() + 24 * 60 * 60 * 1000)
                : toTime
            }
            onChange={handleTimeChange}
          />
        </View>
      </DatepickerBottomDrawer>
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
  drawerContent: {
    alignItems: "center",
    paddingVertical: 10,
  },
})
