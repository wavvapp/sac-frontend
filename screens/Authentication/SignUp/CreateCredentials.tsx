import CredentialsButton from "@/components/CredentialsButton"
import Badge from "@/components/ui/Badge"
import CustomText from "@/components/ui/CustomText"
import Input from "@/components/ui/Input"
import CrossMark from "@/components/vectors/CrossMark"
import { ACCOUNT_SETUP_STEPS } from "@/constants/account-setup-steps"
import { VALIDATION_PATTERNS } from "@/constants/patterns"
import { useAuth } from "@/contexts/AuthContext"
import { RootStackParamList } from "@/types"
import api from "@/service"
import { theme } from "@/theme"
import { AccountCreationStep } from "@/types"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useMutation } from "@tanstack/react-query"
import { useCallback, useEffect, useMemo, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { swapFullNames } from "@/utils"

export type CredentialsScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "EditSignal"
>

export default function CreateCredentials() {
  const navigation = useNavigation<CredentialsScreenProps>()
  const [step, setStep] = useState<AccountCreationStep>(1)
  const [userInput, setUserInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const { registerUser } = useAuth()

  const isInputValid = useMemo(() => {
    if (userInput.trim().length < 5) return false
    if (step === 1 && VALIDATION_PATTERNS.fullName.test(userInput)) return true
    if (step === 2 && VALIDATION_PATTERNS.username.test(userInput)) return true

    return false
  }, [step, userInput])

  const isDisabled = useMemo(() => {
    if (isLoading || isError) return true
    return !isInputValid
  }, [isError, isInputValid, isLoading])

  const handleUsernameSubmit = useMutation({
    mutationFn: async () => {
      if (!isInputValid) return
      const { data } = await api.get(`/users/${userInput}`)
      if (data.message.toLowerCase() === "username already exist") {
        throw new Error("Username already exists")
      }
      registerUser(userInput)
    },
    onMutate: () => {
      setIsLoading(true)
    },
    onError: (error) => {
      console.error("Error fetching user data:", error)
      setIsError(true)
    },
    onSettled: () => {
      setIsLoading(false)
    },
  })

  const getUserFullNames = useCallback(async () => {
    try {
      const storedNames = await AsyncStorage.getItem("@Auth:names")
      if (step !== 2) return
      if (storedNames) {
        const swappedNames = swapFullNames(storedNames)
        setUserInput(swappedNames)
      }
    } catch (error) {
      console.error("Error fetching user names:", error)
    }
  }, [step])

  useEffect(() => {
    getUserFullNames()
  }, [getUserFullNames])

  const handleFullNamesSubmit = async () => {
    try {
      await AsyncStorage.setItem("@Auth:names", userInput)
      setUserInput("")
      setStep(2)
    } catch (error) {
      console.error("Error saving edited names:", error)
    }
  }

  const handleSubmit = async () => {
    if (!isInputValid) return
    if (step === 1) await handleFullNamesSubmit()
    if (step === 2) handleUsernameSubmit.mutate()
  }

  useEffect(() => {
    setIsLoading(false)
    setIsError(false)
  }, [userInput])

  return (
    <SafeAreaView style={styles.container}>
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
              name={ACCOUNT_SETUP_STEPS[step].badgeName}
              style={[isDisabled && styles.disabledBadge]}
            />
          </View>
          <TouchableOpacity
            style={styles.crossMarkContainer}
            onPress={() => {
              setUserInput("")
              navigation.goBack()
            }}>
            <CrossMark color={theme.colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.mainContent}>
          <CustomText style={styles.title} size="lg">
            {ACCOUNT_SETUP_STEPS[step].titleText}
          </CustomText>
          <Input
            handleTextChange={setUserInput}
            variant="secondary"
            placeholder={ACCOUNT_SETUP_STEPS[step].inputPlaceholder}
            value={userInput}
            onSubmitEditing={handleSubmit}
            autoFocus
          />
          <CustomText size="base" style={styles.description}>
            {ACCOUNT_SETUP_STEPS[step].descriptionText}
          </CustomText>
        </View>
        <CredentialsButton
          step={step}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isError={isError}
          handleSubmit={handleSubmit}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black,
    flex: 1,
    paddingTop: 7,
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
