import { Image, StyleSheet, View } from "react-native"
import { CustomButton } from "@/components/ui/Button"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"
export default function NoFriends() {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/images/noise-sm.png")}
        />
        <View style={styles.content}>
          <CustomText size="lg" fontWeight="semibold">
            Welcome to Wavv
          </CustomText>
          <CustomText style={styles.descriptionText}>
            Add your friends to signal your availability
          </CustomText>
          {/* //TODO: Redirect to the search screen once it's ready */}
          <CustomButton
            title="FIND FRIENDS"
            variant="secondary"
            textSize="sm"
            textStyles={styles.button}
          />
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 20,
    borderWidth: 1,
  },
  content: {
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  image: {
    resizeMode: "cover",
  },
  descriptionText: {
    marginBottom: 24,
    marginTop: 4,
  },
  button: {
    textTransform: "uppercase",
  },
})
