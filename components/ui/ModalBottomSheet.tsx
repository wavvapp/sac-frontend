import { BlurView, BlurViewProps } from "@react-native-community/blur"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withTiming,
  Easing,
} from "react-native-reanimated"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { View, StyleSheet, Dimensions, BackHandler } from "react-native"
import { ReactNode, useEffect } from "react"
import { theme } from "../../theme"
import { StyleProp } from "react-native"
import { ViewStyle } from "react-native"

const { height } = Dimensions.get("window")

type ModalBottomSheetProps = {
  bluredBackdrop?: boolean
  toggleModalBottomSheet: () => void
  renderBackdrop?: () => ReactNode
  children: ReactNode
  modalContainerStyle?: StyleProp<ViewStyle>
  modalStyle?: StyleProp<ViewStyle>
  dragHandleStyle?: StyleProp<ViewStyle>
  sheetContainerStyle?: StyleProp<ViewStyle>
  blurBackdrop?: BlurViewProps
  isVisible: boolean
  animationDuration?: number
}

// Improved ModalBottomSheet with bottom-to-top and top-to-bottom animations
export default function ModalBottomSheet({
  bluredBackdrop = true,
  toggleModalBottomSheet,
  renderBackdrop,
  children,
  modalContainerStyle = {},
  dragHandleStyle = {},
  modalStyle = {},
  sheetContainerStyle = {},
  blurBackdrop,
  isVisible = false,
  animationDuration = 300,
}: ModalBottomSheetProps) {
  const translateY = useSharedValue(height)
  const backdropOpacity = useSharedValue(0)
  const context = useSharedValue({ y: 0 })

  // Handle visibility changes
  useEffect(() => {
    if (isVisible) {
      // Open animation (bottom to top)
      backdropOpacity.value = withTiming(1, { duration: animationDuration })
      translateY.value = withTiming(0, {
        duration: animationDuration,
        easing: Easing.in(Easing.cubic),
      })
    } else {
      // Close animation (top to bottom)
      backdropOpacity.value = withTiming(0, { duration: animationDuration })
      translateY.value = withTiming(height, {
        duration: animationDuration,
        easing: Easing.out(Easing.cubic),
      })
    }
  }, [isVisible, animationDuration])

  // Handle back button press
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isVisible) {
          closeModal()
          return true
        }
        return false
      },
    )

    return () => backHandler.remove()
  }, [isVisible])

  const closeModal = () => {
    "worklet"
    // Start closing animation
    backdropOpacity.value = withTiming(0, { duration: animationDuration })
    translateY.value = withTiming(
      height,
      {
        duration: animationDuration,
        easing: Easing.out(Easing.cubic),
      },
      () => {
        // After animation completes, call the toggle function
        runOnJS(toggleModalBottomSheet)()
      },
    )
  }

  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value }
    })
    .onUpdate((event) => {
      if (event.translationY > 0) {
        const newTranslateY = context.value.y + event.translationY
        translateY.value = newTranslateY

        // Fade backdrop as sheet is dragged down
        // Calculate drag progress as a percentage (0 to 1)
        // Using (height * 0.5) means the backdrop will reach minimum opacity
        // when the sheet is dragged down half the screen height
        const dragProgress = Math.min(newTranslateY / (height * 0.5), 1)

        // Reduce opacity based on drag progress, but only by 70% (0.7)
        // This ensures the backdrop is still partially visible (0.3 opacity) even at maximum drag
        // before the sheet is fully dismissed
        backdropOpacity.value = 1 - dragProgress * 0.7
      }
    })
    .onEnd((event) => {
      // Determine whether to dismiss the sheet based on two conditions:
      // 1. If dragged more than 20% of screen height (height * 0.2)
      // 2. OR if the flick/swipe velocity exceeds 500 units per second
      // This creates a natural feel where either sufficient distance OR a quick flick will dismiss
      if (translateY.value > height * 0.2 || event.velocityY > 500) {
        closeModal()
      } else {
        // Snap back to open position
        backdropOpacity.value = withTiming(1, { duration: 150 })
        translateY.value = withTiming(0, {
          duration: animationDuration,
          easing: Easing.out(Easing.cubic),
        })
      }
    })

  const scrollGesture = Gesture.Native()
  const composedGesture = Gesture.Simultaneous(panGesture, scrollGesture)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }))

  const renderBluredBackdrop = () => (
    <Animated.View style={[styles.backdropContainer, backdropAnimatedStyle]}>
      <BlurView
        onTouchEnd={() => closeModal()}
        blurAmount={1}
        blurType="dark"
        style={styles.backdrop}
        {...blurBackdrop}
      />
    </Animated.View>
  )

  return (
    <View style={[styles.modalContainer, modalContainerStyle]}>
      {renderBackdrop?.()}
      {bluredBackdrop && renderBluredBackdrop()}
      <GestureDetector gesture={composedGesture}>
        <Animated.View
          style={[styles.sheetContainer, animatedStyle, sheetContainerStyle]}>
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
  backdropContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
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
