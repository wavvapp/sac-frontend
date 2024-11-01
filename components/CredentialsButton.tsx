import CustomText from "@/components/ui/CustomText"
import { CustomButton } from "@/components/ui/Button"
import InfoIcon from "@/components/vectors/InfoIcon"
import LoaderIcon from "@/components/vectors/LoaderIcon"
import { theme } from "@/theme"
import { StyleSheet, View } from "react-native"
import { useMemo } from "react"

interface CredentialsButtonProps {
  isDisabled: boolean
  isLoading: boolean
  isError: boolean
  handleSubmit: () => void
}
export default function CredentialsButton({
  isDisabled,
  isLoading,
  isError,
  handleSubmit,
}: CredentialsButtonProps) {
  const buttonText = useMemo(() => {
    if (!isLoading && !isError) return "NEXT"
  }, [isError, isLoading])

  return (
    <CustomButton
      disabled={isDisabled}
      fullWidth
      title={buttonText}
      variant="primary"
      containerStyles={{ width: "100%", marginBottom: 20 }}
      textStyles={styles.buttonText}
      onPress={handleSubmit}>
      {(isLoading || isError) && (
        <View style={styles.buttonChildren}>
          {isError ? <InfoIcon /> : <LoaderIcon />}
          <CustomText
            fontWeight="semibold"
            fontFamily="marfa"
            size="sm"
            style={styles.buttonText}>
            {isLoading ? "checking availability" : "username not available"}
          </CustomText>
        </View>
      )}
    </CustomButton>
  )
}

const styles = StyleSheet.create({
  buttonChildren: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
  },
  buttonText: {
    flexGrow: 1,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.003,
    fontWeight: theme.fontWeight.bold,
  },
})