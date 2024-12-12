import { CustomButton } from "@/components/ui/Button"
import CustomText from "@/components/ui/CustomText"
import CrossMark from "@/components/vectors/CrossMark"
import { theme } from "@/theme"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/navigation"
import { useNavigation } from "@react-navigation/native"
import { PRIVACY_POLICY_SECTIONS } from "@/constants/privacyPolicyContent"

type PrivacyPolicyScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "EditSignal"
>
function PrivacyPolicy() {
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false)
  const navigation = useNavigation<PrivacyPolicyScreenProps>()

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent
    const isEndReached =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
    setHasScrolledToEnd(isEndReached)
  }
  const acceptTerms = async () => {
    await AsyncStorage.setItem("@privacy_accepted", "true")
    navigation.navigate("EntryScreen")
  }
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.navBar}>
        <CustomText style={styles.headerText} fontStyle="italic">
          Privacy policy
        </CustomText>
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.setItem("@privacy_accepted", "false")
          }}
          style={styles.CrossMarkButton}>
          <CrossMark color="#ffffff" width="20" height="20" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ flexGrow: 1 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentText}>
        {PRIVACY_POLICY_SECTIONS.map((section, index) => {
          return (
            <View key={index} style={styles.sectionContainer}>
              <CustomText size="base" style={styles.sectionTitle}>
                {index + 1}. {section.title}
              </CustomText>
              <CustomText>{section.content}</CustomText>
            </View>
          )
        })}
      </ScrollView>
      <View style={styles.footer}>
        <CustomButton
          variant="default"
          textSize="sm"
          title="Accept"
          disabled={!hasScrolledToEnd}
          textStyles={{ fontWeight: 600 }}
          onPress={acceptTerms}
        />
      </View>
    </View>
  )
}

export default PrivacyPolicy

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    flexDirection: "column",
  },
  navBar: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    borderBottomColor: theme.colors.gray,
    borderBottomWidth: 2,
  },
  headerText: {
    flexGrow: 1,
    fontSize: 20,
    lineHeight: 28,
  },
  CrossMarkButton: {
    padding: 5,
    backgroundColor: theme.colors.gray,
    borderRadius: 20,
    marginVertical: 20,
  },
  contentText: {
    padding: 20,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 8,
    textTransform: "uppercase",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
    borderTopColor: theme.colors.gray,
    backgroundColor: theme.colors.white,
    borderTopWidth: 2,
  },
})
