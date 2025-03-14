import { theme } from "@/theme"
import { View, ViewProps, StyleSheet, Platform } from "react-native"

export interface HeaderWrapperProps extends ViewProps {}
export default function HeaderWrapper(props: HeaderWrapperProps) {
  const { style, ...rest } = props
  return <View style={[styles.container, style]} {...rest} />
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 40 : 60,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    paddingBottom: 12,
    borderColor: theme.colors.black_100,
    width: "100%",
  },
})
