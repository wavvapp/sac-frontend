import React, { useRef, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import BottomSheet from "@gorhom/bottom-sheet"
import { theme } from "@/theme"

type TimePickerBottomSheetProps = {
  onSave: (time: Date) => void
  onClose: () => void
  initialTime: Date
}

const TimePickerBottomSheet = ({
  onSave,
  onClose,
  initialTime,
}: TimePickerBottomSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [selectedTime, setSelectedTime] = useState(initialTime)

  const handleTimeChange = (event: any, date?: Date) => {
    if (date) {
      setSelectedTime(date)
    }
  }

  const handleSave = () => {
    onSave(selectedTime)
    onClose()
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={["40%"]} // Adjust the height as needed
      enablePanDownToClose
      onClose={onClose}
      backgroundComponent={() => <View style={styles.background} />} // Optional: Custom background
    >
      <View style={styles.bottomSheetContent}>
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={handleTimeChange}
          minimumDate={new Date()} // Disable times before now
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  bottomSheetContent: {
    padding: 16,
    alignItems: "center",
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "white",
    fontSize: theme.fontSize.base,
    fontWeight: "bold",
  },
})

export default TimePickerBottomSheet
