import CredentialsButton from "@/components/CredentialsButton"
import Badge from "@/components/ui/Badge"
import CustomText from "@/components/ui/CustomText"
import Input from "@/components/ui/Input"
import CrossMark from "@/components/vectors/CrossMark"
import { VALIDATION_PATTERNS } from "@/constants/patterns"
import { useAuth } from "@/contexts/AuthContext"
import { RootStackParamList } from "@/navigation"
import api from "@/service"
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
  const [step, setStep] = useState<AccountCreationStep>(2)
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const { fetchCurrentUser } = useAuth()

  const isInputValid = useMemo(() => {
    if (text.trim().length < 5) return false

    if (step === 1 && VALIDATION_PATTERNS.fullName.test(text)) return true
    if (step === 2 && VALIDATION_PATTERNS.username.test(text)) return true

    return false
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
      badgeName: "1/2",
      titleText: "What is your name?",
      inputPlaceholder: "Full name",
      descriptionText: "Add your name so friends can find you.",
    },
    2: {
      badgeName: "2/2",
      titleText: "Add your username",
      inputPlaceholder: "Username",
      descriptionText:
        "Usernames can only contain letters, numbers, underscores, and periods.",
    },
  }

  const updateUsername = async () => {
    try {
      await api.patch("/auth/update-profile", {
        username: text,
      })
      await fetchCurrentUser()
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  const handleUsernameSubmit = async () => {
    try {
      if (!isInputValid) return
      setIsLoading(true)
      const { data } = await api.get(`/users/${text}`)
      if (data.message.toLowerCase() === "username already exist") {
        setIsError(true)
        return
      } else updateUsername()
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setIsLoading(false)
    }
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
        <CredentialsButton
          isDisabled={isDisabled}
          isLoading={isLoading}
          isError={isError}
          handleSubmit={handleSubmit}
        />
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
  modalContainer: {
    height: "100%",
    flex: 1,
  },
})
