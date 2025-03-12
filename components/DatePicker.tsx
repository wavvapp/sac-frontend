import { useCallback, useEffect, useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native"
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import dayjs from "dayjs"
import CloseIcon from "@/components/vectors/CloseIcon"
import { theme } from "@/theme"
import DatepickerBottomDrawer from "@/components/DatePickerModal"
import { DateFormatter } from "@/constants/DateFormatter"

type DatePickerProps = {
  onClose: () => void
  initialFromTime: Date
  initialToTime: Date
  onSave: (data: { from: Date; to: Date; timeRange: string }) => void
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
  const [isAndroidPickerVisible, setIsAndroidPickerVisible] = useState(false)

  useEffect(() => {
    setFromTime(initialFromTime)
    setToTime(initialToTime)
  }, [initialFromTime, initialToTime])

  const openTimePicker = (type: "FROM" | "TO") => {
    setActiveTimeType(type)
    setTempTime(type === "FROM" ? fromTime : toTime)
    if (Platform.OS === "android") {
      setIsAndroidPickerVisible(true)
    } else {
      setIsBottomDrawerVisible(true)
    }
  }

  const closeDrawer = useCallback(() => setIsBottomDrawerVisible(false), [])

  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (event.type === "set" && selectedDate) {
      setTempTime(selectedDate)
      if (Platform.OS === "android") {
        saveTime(selectedDate)
      }
    }
    setIsAndroidPickerVisible(false)
  }

  const saveTime = useCallback(
    async (newTime?: Date) => {
      if (!newTime) return
      const now = dayjs()
      const time = dayjs(newTime)
      let from = activeTimeType === "FROM" ? time : dayjs(fromTime)
      let to = activeTimeType === "TO" ? time : dayjs(toTime)
      if (from.isBefore(now)) {
        from = now
      }
      if (!to.isAfter(from)) {
        to = from.add(1, "hour")
      }

      const fromDate = from.toDate()
      const toDate = to.toDate()

      const timeRange = `${DateFormatter(fromDate)}-${DateFormatter(toDate)}`

      try {
        await AsyncStorage.setItem("fromTime", fromDate.toISOString())
        await AsyncStorage.setItem("toTime", toDate.toISOString())
      } catch (error) {
        console.error("Failed to save times to AsyncStorage:", error)
      }

      setFromTime(fromDate)
      setToTime(toDate)
      onSave({ from: fromDate, to: toDate, timeRange })

      closeDrawer()
    },
    [activeTimeType, fromTime, toTime, onSave, closeDrawer],
  )

  const getMinimumDate = useCallback(() => {
    return activeTimeType === "FROM" ? new Date() : fromTime
  }, [activeTimeType, fromTime])

  const getMaximumDate = useCallback(() => {
    return dayjs(fromTime).add(24, "hour").toDate()
  }, [fromTime])

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.column}>
          <Text style={styles.label}>FROM</Text>
          <TouchableOpacity onPress={() => openTimePicker("FROM")}>
            <Text style={styles.timeText}>{DateFormatter(fromTime)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>TO</Text>
          <TouchableOpacity onPress={() => openTimePicker("TO")}>
            <Text style={styles.timeText}>{DateFormatter(toTime)}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <CloseIcon color={theme.colors.black} />
        </TouchableOpacity>
      </View>
      {Platform.OS === "android" && isAndroidPickerVisible && (
        <DateTimePicker
          value={tempTime}
          mode="time"
          is24Hour={false}
          onChange={handleTimeChange}
          minimumDate={getMinimumDate()}
          maximumDate={getMaximumDate()}
        />
      )}
      {Platform.OS === "ios" && (
        <DatepickerBottomDrawer
          isVisible={isBottomDrawerVisible}
          onClose={closeDrawer}
          title={activeTimeType}
          onSave={() => saveTime(tempTime)}>
          <View style={styles.drawerContent}>
            <DateTimePicker
              value={tempTime}
              mode="time"
              is24Hour={false}
              display="spinner"
              locale="en_US"
              minimumDate={getMinimumDate()}
              maximumDate={getMaximumDate()}
              onChange={handleTimeChange}
            />
          </View>
        </DatepickerBottomDrawer>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 1,
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
