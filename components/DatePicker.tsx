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
import dayjs from "dayjs"
import CloseIcon from "@/components/vectors/CloseIcon"
import { theme } from "@/theme"
import DatepickerBottomDrawer from "@/components/DatePickerModal"

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
  const [isAndroidPickerVisible, setIsAndroidPickerVisible] = useState(false)

  useEffect(() => {
    setFromTime(initialFromTime)
    setToTime(initialToTime)
  }, [initialFromTime, initialToTime])

  const formatTime = useCallback((date: Date) => {
    return dayjs(date).format("h:mm")
  }, [])

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
    (newTime?: Date) => {
      if (!newTime) return

      if (activeTimeType === "FROM") {
        setFromTime(newTime)
        if (dayjs(newTime).isAfter(dayjs(toTime))) {
          setToTime(dayjs(newTime).add(1, "hour").toDate())
        }
      } else {
        setToTime(newTime)
      }

      onSave(
        activeTimeType === "FROM" ? newTime : fromTime,
        activeTimeType === "TO" ? newTime : toTime,
      )
      closeDrawer()
    },
    [activeTimeType, fromTime, toTime, onSave, closeDrawer],
  )

  const getMinimumDate = useCallback(() => {
    if (activeTimeType === "FROM") {
      return new Date()
    } else {
      return fromTime
    }
  }, [activeTimeType, fromTime])

  const getMaximumDate = useCallback(() => {
    return dayjs().add(24, "hour").toDate()
  }, [])

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
      {Platform.OS === "android" && isAndroidPickerVisible && (
        <DateTimePicker
          value={tempTime}
          mode="time"
          is24Hour={false}
          display="clock"
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
