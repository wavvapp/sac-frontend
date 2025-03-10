import { BottomSheetScrollView, TouchableOpacity } from "@gorhom/bottom-sheet"
import Badge from "@/components/ui/Badge"
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native"
import { options } from "@/data/default-wavv-options"
import { theme } from "@/theme"
import { useState } from "react"
import { CustomTitle } from "@/components/ui/CustomTitle"
import { CustomButton } from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { TemporaryStatusType, useStatus } from "@/contexts/StatusContext"
interface SetStatusProps {
  closeBottomSheet: () => void
}
export function SetStatus({ closeBottomSheet }: SetStatusProps) {
  const { temporaryStatus, setTemporaryStatus } = useStatus()
  const [inputHeigt, setInputHeight] = useState<number>(42)
  const [activityText, setActivityText] = useState<string>(
    temporaryStatus.activity,
  )
  const updateStatus = (text: string) => {
    setTemporaryStatus((prev: TemporaryStatusType) => ({
      ...prev,
      activity: text.trim(),
    }))
    closeBottomSheet()
    Keyboard.dismiss()
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      onStartShouldSetResponder={() => true}
      style={styles.container}>
      <View style={styles.formHeader}>
        <CustomTitle text="whats your wavv" />
        <CustomButton
          variant="default"
          textSize="sm"
          title="save"
          textStyles={styles.button}
          onPress={() => updateStatus(activityText)}
          disabled={!activityText?.trim()}
          containerStyles={{
            opacity: !activityText?.trim() ? 0.5 : 1,
            height: 32,
          }}
        />
      </View>
      <Input
        textSize="lg"
        placeholder="Enter your plan or pick an option"
        handleTextChange={setActivityText}
        value={activityText}
        variant="ghost"
        style={[styles.inputContainer, { height: Math.max(42, inputHeigt) }]}
        onContentSizeChange={(event) => {
          setInputHeight(event.nativeEvent.contentSize.height)
        }}
        multiline={true}
        autoCapitalize="none"
      />
      <View style={styles.line} />
      <BottomSheetScrollView
        contentContainerStyle={styles.badgesContainer}
        keyboardShouldPersistTaps="handled">
        {options.map((slot) => (
          <TouchableOpacity
            onPress={() => {
              setActivityText(slot)
              updateStatus(slot)
            }}
            key={slot}>
            <Badge
              name={slot}
              variant={
                activityText.toLowerCase() === slot.toLowerCase()
                  ? "default"
                  : "outline"
              }
              style={styles.badge}
            />
          </TouchableOpacity>
        ))}
      </BottomSheetScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: 40,
  },
  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
  button: {
    fontWeight: theme.fontWeight.semibold,
    fontSize: 13,
    lineHeight: 14,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: theme.colors.gray,
    marginBottom: 16,
  },
  badgesContainer: {
    alignItems: "flex-start",
    gap: 8,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  badge: {
    paddingVertical: 7.5,
    paddingHorizontal: 16,
    fontSize: theme.fontSize.sm,
    borderColor: theme.colors.gray,
    letterSpacing: 0.003,
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
})
