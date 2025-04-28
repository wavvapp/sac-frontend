import { BlurView, BlurViewProps } from "@react-native-community/blur"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { View, StyleSheet, Dimensions } from "react-native"
import { ReactNode } from "react"
import { theme } from "../../theme"
import { StyleProp } from "react-native"
import { ViewStyle } from "react-native"

const height = Dimensions.get("window").height

type ModalBottomSheetProps = {
  bluredBackdrop?: boolean
  toggleModalBottomSheet: () => void
  renderBackdrop?: () => ReactNode
  children: ReactNode
  modalContainerStyle?: StyleProp<ViewStyle>
  modalStyle?: StyleProp<ViewStyle>
  dragHandleStyle?: StyleProp<ViewStyle>
  blurBackdrop?: BlurViewProps
}

// Inspired by android ModalBottomSheet
export default function ModalBottomSheet({
  bluredBackdrop = true,
  toggleModalBottomSheet,
  renderBackdrop,
  children,
  modalContainerStyle = {},
  dragHandleStyle = {},
  modalStyle = {},
  blurBackdrop,
}: ModalBottomSheetProps) {
  const translateY = useSharedValue(0)
  const context = useSharedValue({ y: 0 })

  const closeModal = () => {
    "worklet"
    runOnJS(toggleModalBottomSheet)()
  }

  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value }
    })
    .onUpdate((event) => {
      if (event.translationY > 0) {
        translateY.value = context.value.y + event.translationY
      }
    })
    .onEnd(() => {
      if (translateY.value > height * 0.2) {
        translateY.value = height
        closeModal()
      } else {
        translateY.value = 0
      }
    })

  const scrollGesture = Gesture.Native()

  const composedGesture = Gesture.Simultaneous(panGesture, scrollGesture)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  const renderBluredBackdrop = () => (
    <BlurView
      onTouchEnd={closeModal}
      blurAmount={1}
      blurType="dark"
      style={styles.backdrop}
      {...blurBackdrop}
    />
  )

  return (
    <View style={[styles.modalContainer, modalContainerStyle]}>
      {renderBackdrop?.()}
      {bluredBackdrop && renderBluredBackdrop()}
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[styles.sheetContainer, animatedStyle]}>
          <View>
            <View style={[styles.dragHandle, dragHandleStyle]} />
          </View>
          <View style={[styles.sheet, modalStyle]}>{children}</View>
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    height: "100%",
    position: "absolute",
    width: "100%",
    zIndex: 2,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  sheet: {
    zIndex: 2,
    width: "100%",
    height: "auto",
  },
  sheetContainer: {
    marginTop: "auto",
    backgroundColor: "white",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    zIndex: 2,
    maxHeight: "90%",
  },
  dragHandle: {
    width: 50,
    height: 5,
    marginTop: 10,
    backgroundColor: theme.colors.gray_100,
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 15,
  },
})
