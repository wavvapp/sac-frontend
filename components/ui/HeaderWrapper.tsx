import { theme } from "@/theme"
import { View, ViewProps, StyleSheet } from "react-native"

export interface HeaderWrapperProps extends ViewProps {}
export default function HeaderWrapper(props: HeaderWrapperProps) {
  const { style, ...rest } = props
  return <View style={[styles.container, style]} {...rest} />
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    paddingBottom: 12,
    borderColor: theme.colors.gray,
    width: "100%",
  },
})
