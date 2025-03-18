import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetProps,
} from "@gorhom/bottom-sheet"
import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react"

export interface BottomDrawerRef {
  openBottomSheet: () => void
  closeBottomSheet: () => void
}

interface DrawerProps extends BottomSheetProps {
  children: React.ReactNode
  setIsBottomSheetOpen: Dispatch<SetStateAction<boolean>>
  fullyHiddenOnClose?: boolean
  isFullScreen?: boolean
}

const BottomDrawer = forwardRef<BottomDrawerRef, DrawerProps>((props, ref) => {
  const {
    children,
    setIsBottomSheetOpen,
    fullyHiddenOnClose = false,
    isFullScreen = false,
    ...rest
  } = props
  const snapPoints = useMemo(() => {
    if (isFullScreen) return ["1%", "93%"]
    return fullyHiddenOnClose ? ["1%", "88%"] : ["20%", "88%"]
  }, [fullyHiddenOnClose, isFullScreen])

  const bottomSheetRef = useRef<BottomSheet>(null)

  useImperativeHandle(ref, () => ({
    openBottomSheet: () => {
      bottomSheetRef.current?.expand()
    },
    closeBottomSheet: () => {
      bottomSheetRef.current?.collapse()
    },
  }))

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop {...props} pressBehavior="collapse" />
  )

  const handleSheetChanges = useCallback((index: number) => {
    setIsBottomSheetOpen(index === 1)
  }, [])

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={fullyHiddenOnClose ? -1 : 0}
      snapPoints={snapPoints}
      enablePanDownToClose={fullyHiddenOnClose}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      containerStyle={{ zIndex: 1 }}
      {...rest}>
      {children}
    </BottomSheet>
  )
})

BottomDrawer.displayName = "Bottom drawer"

export default BottomDrawer
