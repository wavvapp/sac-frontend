import { useCallback, useEffect, useState } from "react"
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native"
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import dayjs, { Dayjs } from "dayjs"
import CloseIcon from "@/components/vectors/CloseIcon"
import { theme } from "@/theme"
import DatepickerBottomDrawer from "@/components/DatePickerModal"
import { TemporaryStatusType, useStatus } from "@/contexts/StatusContext"
import { Alert } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { CustomTitle } from "@/components/ui/CustomTitle"

type DatePickerProps = {
  onCloseDatePicker: () => void
  previousTimeSlots: string | null
}

export default function DatePicker({
  onCloseDatePicker,
  previousTimeSlots,
}: DatePickerProps) {
  const formatPreviousTimeSlots = useCallback((): Date[] => {
    if (previousTimeSlots) {
      const [from, to] = previousTimeSlots.split("-")
      const [fromHours, fromMinutes] = from.split(":")
      const [toHours, toMinutes] = to.split(":")
      return [
        dayjs()
          .hour(Number(fromHours))
          .minute(Number(fromMinutes))
          .second(0)
          .toDate(),
        dayjs()
          .hour(Number(toHours))
          .minute(Number(toMinutes))
          .second(0)
          .toDate(),
      ]
    } else {
      return [dayjs().toDate(), dayjs().add(2, "hour").toDate()]
    }
  }, [previousTimeSlots])

  const [fromTime, setFromTime] = useState(formatPreviousTimeSlots()[0])
  const [toTime, setToTime] = useState(formatPreviousTimeSlots()[1])
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
    saveTemporaryTimeSlot(newFromTime, newToTime)
  }

  const saveTemporaryTimeSlot = useCallback(
    (newFromTime: Dayjs | Date, newToTime: Dayjs | Date) => {
      setTemporaryStatus((prev: TemporaryStatusType) => ({
        ...prev,
        timeSlot: `${dayjs(newFromTime).format("HH:mm")}-${dayjs(
          newToTime,
        ).format("HH:mm")}`,
        startsAt: dayjs(newFromTime).toDate(),
        endsAt: dayjs(newToTime).toDate(),
      }))
    },
    [setTemporaryStatus],
  )

  const cancelTimeSettingOperation = useCallback(() => {
    setTemporaryStatus((prev: TemporaryStatusType) => {
      // @ts-ignore
      delete prev.endsAt
      // @ts-ignore
      delete prev.startsAt

      return {
        ...prev,
        timeSlot: "now",
      }
    })
    onCloseDatePicker()
  }, [onCloseDatePicker, setTemporaryStatus])

  useEffect(() => {
    saveTemporaryTimeSlot(fromTime, toTime)
  }, [fromTime, saveTemporaryTimeSlot, toTime])
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.column}>
          <CustomTitle text="FROM" />
          <CustomTitle text="TO" />
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => openTimePicker("FROM")}>
            <CustomText size="lg" fontWeight="semibold">
              {dayjs(fromTime).format("HH:mm")}
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openTimePicker("TO")}>
            <CustomText size="lg" fontWeight="semibold">
              {dayjs(toTime).format("HH:mm")}
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={cancelTimeSettingOperation}>
            <CloseIcon color={theme.colors.black} />
          </TouchableOpacity>
        </View>
      </View>
      {Platform.OS === "android" && isTimePickerModalVisible && (
        <DateTimePicker
          value={tempTime}
          mode="time"
          display="spinner"
          locale="en_US"
          is24Hour
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
    paddingHorizontal: 20,
    paddingVertical: 1,
    borderRadius: 8,
    width: "100%",
  },
  contentContainer: {
    flexDirection: "column",
  },
  column: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    width: "48%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    right: -12,
  },
  drawerContent: {
    alignItems: "center",
    paddingVertical: 10,
  },
})
