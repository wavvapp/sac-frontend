import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  ViewProps,
} from "react-native"
interface UserProfileProps extends ViewProps {
  imageUrl?: ImageSourcePropType
  size?: "small" | "large"
}

export default function UserAvatar({
  size = "small",
  imageUrl,
  style,
  ...rest
}: UserProfileProps) {
  const source: ImageSourcePropType = imageUrl
    ? { uri: imageUrl }
    : require("@/assets/images/users/default-image.png")
  return (
    <View
      {...rest}
      style={[
        styles.container,
        size === "small" ? styles.small : styles.large,
        style,
      ]}>
      <Image source={source} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#353535",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 80,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  small: {
    width: 56,
    height: 56,
  },
  large: {
    width: 160,
    height: 160,
  },
})
