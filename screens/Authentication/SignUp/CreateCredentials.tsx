import ButtonChildren from "@/components/ButtonChildren"
import Badge from "@/components/ui/Badge"
import { CustomButton } from "@/components/ui/Button"
import CustomText from "@/components/ui/CustomText"
import Input from "@/components/ui/Input"
import CrossMark from "@/components/vectors/CrossMark"
import { VALIDATION_PATTERNS } from "@/constants/patterns"
import { RootStackParamList } from "@/navigation"
import { theme } from "@/theme"
import { AccountCreationStep } from "@/types"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useEffect, useMemo, useState } from "react"
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native"

type CredentialsScrenProps = NativeStackNavigationProp<
  RootStackParamList,
  "EditSignal"
>

export default function CreateCredentials() {
  const navigation = useNavigation<CredentialsScrenProps>()
  const [step, setStep] = useState<AccountCreationStep>(1)
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const isInputValid = useMemo(() => {
    if (text.trim().length < 5) return false

    if (step === 1 && VALIDATION_PATTERNS.fullName.test(text)) return true
    if (step === 2 && VALIDATION_PATTERNS.username.test(text)) return true
  }, [step, text])

  const isDisabled = useMemo(() => {
    if (isLoading || isError) return true
    return !isInputValid
  }, [isError, isInputValid, isLoading])

  const stepsData: Record<
    AccountCreationStep,
    {
      badgeName: string
      titleText: string
      inputPlaceholder: string
      descriptionText: string
    }
  > = {
    1: {
      badgeName: "3/4",
      titleText: "What is your name?",
      inputPlaceholder: "Full name",
      descriptionText: "Add your name so friends can find you.",
    },
    2: {
      badgeName: "4/4",
      titleText: "Add your username",
      inputPlaceholder: "Username",
      descriptionText:
        "Usernames can only contain letters, numbers, underscores, and periods.",
    },
  }

  const buttonText = useMemo(() => {
    if (isLoading || isError) return "" // we then use the <ButtonChildren component

    return "NEXT"
  }, [isError, isLoading])

  const handleUsernameSubmit = async () => {
    setIsLoading(true)
    // setTimeout to mock fetching username from the backend.
    await new Promise((resolve) => setTimeout(resolve, 2000))
    if (text === "Username123") setIsError(true)
    setIsLoading(false)
  }

  const handleNameSubmit = () => {
    // TODO: logic for name submission.
    setText("")
    setStep(2)
  }

  const handleSubmit = async () => {
    if (!isInputValid) return

    if (step === 1) handleNameSubmit()
    else await handleUsernameSubmit()
  }

  // Clear the states on every keystroke
  useEffect(() => {
    setIsLoading(false)
    setIsError(false)
  }, [text])

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.modalContainer]}
        onTouchStart={(e) => e.stopPropagation()}>
        <View style={styles.navigation}>
          <View
            style={{
              flexGrow: 1,
            }}>
            <Badge
              variant="primary"
              name={stepsData[step].badgeName}
              style={[isDisabled && styles.disabledBadge]}
            />
          </View>
          <TouchableOpacity
            style={styles.crossMarkContainer}
            onPress={() => navigation.push("Home")}>
            <CrossMark color={theme.colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.mainContent}>
          <CustomText style={styles.title} size="lg">
            {stepsData[step].titleText}
          </CustomText>
          <Input
            handleTextChange={setText}
            variant="secondary"
            placeholder={stepsData[step].inputPlaceholder}
            value={text}
            onSubmitEditing={handleSubmit}
            autoFocus
          />
          <CustomText size="base" style={styles.description}>
            {stepsData[step].descriptionText}
          </CustomText>
        </View>

        <CustomButton
          disabled={isDisabled}
          fullWidth
          title={buttonText}
          variant="primary"
          containerStyles={{ width: "100%", marginBottom: 50 }}
          textStyles={styles.buttonText}
          onPress={handleSubmit}>
          {(isLoading || isError) && (
            <ButtonChildren
              text={
                isLoading ? "checking availability" : "username not available"
              }
              icon={isError ? "info" : "loader"}
            />
          )}
        </CustomButton>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black,
    flex: 1,
    paddingTop: 44,
    paddingHorizontal: 20,
  },
  navigation: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
    paddingVertical: 20,
  },
  crossMarkContainer: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
  },
  title: {
    color: theme.colors.white,
  },
  description: {
    color: theme.colors.white,
    opacity: 0.5,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    gap: 12,
  },
  disabledBadge: {
    opacity: 0.3,
  },
  buttonText: {
    fontWeight: theme.fontWeight.bold,
  },
  modalContainer: {
    height: "100%",
    flex: 1,
  },
})
