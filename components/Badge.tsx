import { theme } from "@/theme";
import { StyleSheet, View, ViewProps } from "react-native";
import CustomText from "@/components/ui/CustomText";

interface BadgeProps extends ViewProps {
  name: string;
  variant?: "default" | "outline";
}

export default function Badge({
  name,
  variant = "default",
  style,
  ...rest
}: BadgeProps) {
  return (
    <View
      {...rest}
      style={[
        styles.container,
        variant === "outline" ? styles.outline : styles.default,
        style,
      ]}
    >
      <CustomText
        size="xs"
        fontWeight={variant === "outline" ? "normal" : "bold"}
        style={[styles[`${variant}Text`], styles.text]}
      >
        {name}
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
  },
  text: {
    textTransform: "uppercase",
  },
  defaultText: {
    color: theme.colors.white,
  },
  outlineText: {
    color: theme.colors.black,
  },
  default: {
    backgroundColor: theme.colors.black,
    paddingVertical: 1,
    paddingHorizontal: 6,
  },
  outline: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderColor: theme.colors.black,
    borderWidth: 1,
  },
});
