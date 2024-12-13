import CustomText from "@/components/ui/CustomText"
import CrossMark from "@/components/vectors/CrossMark"
import { theme } from "@/theme"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/navigation"
import { STATIC_SCREEN_CONTENTS } from "@/constants/static-screen-content"

type StaticPageScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "StaticContentScreen"
>

function StaticContentScreen({ route, navigation }: StaticPageScreenProps) {
  const { page } = route.params
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.navBar}>
        <CustomText style={styles.headerText} fontStyle="italic">
          {STATIC_SCREEN_CONTENTS[page].pageTitle}
        </CustomText>
        <TouchableOpacity
          onPress={async () => {
            navigation.navigate("EntryScreen")
          }}
          style={styles.CrossMarkButton}>
          <CrossMark color="#ffffff" width="20" height="20" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ flexGrow: 1, paddingBottom: 40 }}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentText}>
        {STATIC_SCREEN_CONTENTS[page].pageContent.map((section, index) => {
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
    </View>
  )
}

export default StaticContentScreen

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
})
