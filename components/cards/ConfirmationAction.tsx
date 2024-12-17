import React from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"

interface ActionCardProps extends TouchableOpacityProps {
  leftIcon: React.ReactNode
  rightIcon?: React.ReactNode
  title: string
  description?: string
  titleColor?: string
  onPress: () => void
}

export function ConfirmationAction({
  leftIcon,
  rightIcon,
  title,
  description,
  titleColor = theme.colors.white,
  onPress,
  ...rest
}: ActionCardProps) {
  return (
    <TouchableOpacity {...rest} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.leftContent}>
          {leftIcon}
          <View style={styles.textContainer}>
            <CustomText
              size="base"
              fontWeight="semibold"
              style={[styles.title, { color: titleColor }]}>
              {title}
            </CustomText>
            {description && (
              <CustomText size="sm" style={styles.description}>
                {description}
              </CustomText>
            )}
          </View>
        </View>
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 10,
    // backgroundColor: theme.colors.gray,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  description: {
    color: theme.colors.white,
  },
  rightIcon: {
    marginLeft: 16,
  },
})
