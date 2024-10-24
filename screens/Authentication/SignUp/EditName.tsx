import ButtonChildren from "@/components/ButtonChildren"
import Badge from "@/components/ui/Badge"
import { CustomButton } from "@/components/ui/Button"
import CustomText from "@/components/ui/CustomText"
import Input from "@/components/ui/Input"
import CrossMark from "@/components/vectors/CrossMark"
import { RootStackParamList } from "@/navigation"
import { theme } from "@/theme"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useEffect, useMemo, useState } from "react"
import { StyleSheet, View, SafeAreaView } from "react-native"

type EditNameScrenProps = NativeStackNavigationProp<
  RootStackParamList,
  "EditSignal"
>
const isNameScreen = true

export default function EditName() {
  const navigation = useNavigation<EditNameScrenProps>()
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const isDisabled = useMemo(() => {
    if (isLoading || isError) return true
    return text.trim().length <= 10
  }, [isError, isLoading, text])

  const badgeName = isNameScreen ? "3/4" : "4/4"
  const badgeOpacity = isNameScreen ? 0.3 : 1

  const titleText = isNameScreen ? "What is your name?" : "Add your username"
  const inputPlaceholder = isNameScreen ? "Full name" : "Username"
  const descriptionText = isNameScreen
    ? "Add your name so friends can find you."
    : "Usernames can only contain letter, numbers, underscores and periods."
  const buttonText = useMemo(() => {
    if (isNameScreen) return "NEXT"

    // if it loading or disabled we clear the button text so that we can use `children` prop instead of using a text
    if (isLoading || isError) return ""
    return "NEXT"
  }, [isError, isLoading])

  const handleSubmit = () => {
    if (text.trim().length <= 10) return
    setIsLoading(true)

    setTimeout(() => {
      if (text === "Known username") setIsError(true)
      setIsLoading(false)
    }, 2000)
  }

  // This is a temporaly solution to reset the states once the text is empty again.
  useEffect(() => {
    if (text.trim() === "") {
      setIsLoading(false)
      setIsError(false)
    }
  }, [text])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigation}>
        <View
          style={{
            flexGrow: 1,
          }}>
          <Badge
            variant="primary"
            name={badgeName}
            style={isDisabled ? { opacity: badgeOpacity } : {}}
          />
        </View>
        <CrossMark
          color={theme.colors.white}
          onPress={() => navigation.push("Home")}
        />
      </View>
      <View style={styles.mainContent}>
        <CustomText style={styles.title} size="lg">
          {titleText}
        </CustomText>
        <Input
          handleTextChange={setText}
          variant="secondary"
          placeholder={inputPlaceholder}
          value={text}
          onSubmitEditing={handleSubmit}
          autoFocus
        />
        <CustomText size="base" style={styles.description}>
          {descriptionText}
        </CustomText>
      </View>
      <CustomButton
        disabled={isDisabled}
        fullWidth
        title={buttonText}
        variant="primary"
        containerStyles={{ width: "100%" }}
        onPress={handleSubmit}>
        {(isLoading || isError) && (
          <ButtonChildren
            text={isLoading ? "checking availability" : "username not found"}
            icon={isLoading ? "loader" : "info"}
          />
        )}
      </CustomButton>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black,
    flex: 1,
    paddingTop: 44,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  navigation: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    zIndex: 10,
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
})
