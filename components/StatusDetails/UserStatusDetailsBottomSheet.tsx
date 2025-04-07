import { BlurView } from "@react-native-community/blur"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated"
import {
  Gesture,
  GestureDetector,
  FlatList,
} from "react-native-gesture-handler"
import { View, StyleSheet, Dimensions, ListRenderItem } from "react-native"
import { useRef } from "react"
import { theme } from "../../theme"
import { Friend } from "../../types"

const height = Dimensions.get("window").height

export default function UserStatusDetailsBottomSheet({
  toggleStatusDetailsModal,
  data,
  renderData,
  renderSignalDescription,
  renderTitle,
}: {
  toggleStatusDetailsModal: () => void
  data: Friend[]
  renderData: ListRenderItem<Friend>
  renderSignalDescription: () => JSX.Element
  renderTitle: () => JSX.Element
}) {
  const translateY = useSharedValue(0)
  const context = useSharedValue({ y: 0 })
  const scrollY = useSharedValue(0) // Track scroll position
  const listRef = useRef<FlatList>(null)

  const closeModal = () => {
    "worklet"
    runOnJS(toggleStatusDetailsModal)()
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

  const renderBackdrop = () => (
    <BlurView blurAmount={1} blurType="dark" style={styles.backdrop} />
  )

  return (
    <View style={styles.modalContainer}>
      {renderBackdrop()}
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[styles.sheet, animatedStyle]}>
          <View>
            <View style={styles.dragHandle} />
          </View>
          {renderSignalDescription()}
          <FlatList
            ref={listRef}
            data={data}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingTop: 20,
              paddingBottom: 20,
              gap: 12,
            }}
            ListHeaderComponent={renderTitle()}
            renderItem={renderData}
            keyExtractor={(item) => item.friendId}
            scrollEventThrottle={16}
            onScroll={(e) => {
              scrollY.value = e.nativeEvent.contentOffset.y
            }}
          />
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
    backgroundColor: "white",
    marginTop: "auto",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    zIndex: 2,
    maxHeight: "50%",
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
  text: {
    color: "black",
  },
})
