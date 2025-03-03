import { StyleSheet, TouchableOpacity } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"
import { useNavigation } from "@react-navigation/native"
import { HomeScreenProps } from "@/screens/Home"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useStatus } from "@/contexts/StatusContext"
import api from "@/service"
import { useOfflineHandler } from "@/hooks/useOfflineHandler"

export default function TapWavv() {
  const navigation = useNavigation<HomeScreenProps>()
  const { handleOfflineAction } = useOfflineHandler()
  const queryClient = useQueryClient()
  const { isOn } = useStatus()
  const turnOnSignal = useMutation({
    mutationKey: ["toggle-signal-change"],
    mutationFn: () => api.post("/my-signal/turn-on"),
    networkMode: "online",
    onMutate: () => {
      handleOfflineAction(() => (isOn.value = !isOn.value))
      navigation.push("EditSignal", { isNewSignal: true })
    },
    onError: () => {
      isOn.value = !isOn.value
    },
    onSettled() {
      queryClient.refetchQueries({ queryKey: ["points"] })
      queryClient.refetchQueries({ queryKey: ["fetch-my-signal"] })
    },
  })

  return (
    <TouchableOpacity
      style={styles.headlineTextContainer}
      onPress={() => turnOnSignal.mutate()}>
      <CustomText
        fontFamily="writer-mono"
        size="sm"
        style={styles.headlineText}>
        Tap anywhere to Wavv
      </CustomText>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  headlineTextContainer: {
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  headlineText: {
    color: theme.colors.white,
    textAlign: "center",
  },
})
