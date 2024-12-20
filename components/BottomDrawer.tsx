import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
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

interface BottomDrawerRef {
  openBottomSheet: () => void
}

interface DrawerProps {
  children: React.ReactNode
  setIsBottomSheetOpen: Dispatch<SetStateAction<boolean>>
}

const BottomDrawer = forwardRef<BottomDrawerRef, DrawerProps>((props, ref) => {
  const snapPoints = useMemo(() => ["20%", "88%"], [])
  const bottomSheetRef = useRef<BottomSheet>(null)
  const { children } = props
  useImperativeHandle(ref, () => ({
    openBottomSheet: () => {
      bottomSheetRef.current?.expand()
    },
  }))

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop {...props} pressBehavior="collapse" />
  )

  const handleSheetChanges = useCallback(
    (index: number) => {
      props.setIsBottomSheetOpen(index === 1)
    },
    [props],
  )

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}>
      {children}
    </BottomSheet>
  )
})

BottomDrawer.displayName = "Bottom drawer"

export default BottomDrawer
