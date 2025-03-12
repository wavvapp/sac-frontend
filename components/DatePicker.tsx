import { useState } from "react"
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native"
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import dayjs from "dayjs"
import CloseIcon from "@/components/vectors/CloseIcon"
import { theme } from "@/theme"
import DatepickerBottomDrawer from "@/components/DatePickerModal"
import { TemporaryStatusType, useStatus } from "@/contexts/StatusContext"
import { Alert } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { CustomTitle } from "@/components/ui/CustomTitle"

type DatePickerProps = {
  onCloseDatePicker: () => void
}

export default function DatePicker({ onCloseDatePicker }: DatePickerProps) {
  const [fromTime, setFromTime] = useState(dayjs().toDate())
  const [toTime, setToTime] = useState(dayjs().add(2, "hour").toDate())
  const [tempTime, setTempTime] = useState(dayjs().toDate())
  const [isTimePickerModalVisible, setIsTimePickerModalVisible] =
    useState(false)
  const [activeTimeType, setActiveTimeType] = useState<"FROM" | "TO">("FROM")
  const { setTemporaryStatus } = useStatus()

  const openTimePicker = (type: "FROM" | "TO") => {
    setIsTimePickerModalVisible(true)
    setActiveTimeType(type)
    setTempTime(type === "FROM" ? fromTime : toTime)
  }

  const closeDrawer = () => setIsTimePickerModalVisible(false)

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
    if (event.type === "dismissed") {
      setIsTimePickerModalVisible(false)
    }
  }

  const saveTime = (selectedDate: Date) => {
    closeDrawer()
    const currentTime = dayjs()
    const newTime = dayjs(selectedDate)
    let newFromTime = activeTimeType === "FROM" ? newTime : fromTime
    let newToTime = activeTimeType === "TO" ? newTime : toTime

    if (
      dayjs(newFromTime).isBefore(currentTime) &&
      activeTimeType === "FROM" &&
      dayjs(newToTime).minute() !== currentTime.minute()
    ) {
      Alert.alert(
        "Invalid time",
        "The 'From' time needs to be after the current time. Please pick a later time.",
      )
      return
    }

    if (!dayjs(newToTime).isAfter(newFromTime) && activeTimeType === "TO") {
      Alert.alert(
        "Invalid time",
        "The 'To' time needs to be after the 'From' time. Please pick a later time.",
      )
      return
    }

    const maxToTime = dayjs(newFromTime).add(24, "hour")
    if (dayjs(newToTime).isAfter(maxToTime) && activeTimeType === "TO") {
      Alert.alert(
        "Invalid time",
        "To time must be within 24 hours of from time",
      )
      return
    }

    setFromTime(dayjs(newFromTime).toDate())
    setToTime(dayjs(newToTime).toDate())
    setTemporaryStatus((prev: TemporaryStatusType) => ({
      ...prev,
      timeSlot: `${dayjs(newFromTime).format("hh:mm")}-${dayjs(
        newToTime,
      ).format("hh:mm")}`,
      startsAt: dayjs(newFromTime).toDate(),
      endsAt: dayjs(newToTime).toDate(),
    }))
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.column}>
          <CustomTitle text="FROM" />
          <TouchableOpacity onPress={() => openTimePicker("FROM")}>
            <CustomText size="lg" fontWeight="semibold">
              {dayjs(fromTime).format("hh:mm")}
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={styles.column}>
          <CustomTitle text="TO" />
          <TouchableOpacity onPress={() => openTimePicker("TO")}>
            <CustomText size="lg" fontWeight="semibold">
              {dayjs(toTime).format("hh:mm")}
            </CustomText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onCloseDatePicker}>
          <CloseIcon color={theme.colors.black} />
        </TouchableOpacity>
      </View>
      {Platform.OS === "android" && isTimePickerModalVisible && (
        <DateTimePicker
          value={tempTime}
          mode="time"
          display="spinner"
          locale="en_US"
          is24Hour={false}
          onChange={handleTimeChange}
        />
      )}
      {Platform.OS === "ios" && (
        <DatepickerBottomDrawer
          isVisible={isTimePickerModalVisible}
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
