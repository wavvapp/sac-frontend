import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet"
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react"
import { useQueryClient } from "@tanstack/react-query"

interface BottomDrawerRef {
  openBottomSheet: () => void
}

interface DrawerProps {
  children: React.ReactNode
}

const BottomDrawer = forwardRef<BottomDrawerRef, DrawerProps>((props, ref) => {
  const snapPoints = useMemo(() => ["20%", "88%"], [])
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [isbottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false)
  const { children } = props
  const queryClient = useQueryClient()
  useImperativeHandle(ref, () => ({
    openBottomSheet: () => {
      bottomSheetRef.current?.expand()
    },
  }))

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop {...props} pressBehavior="collapse" />
  )

  const handleSheetChanges = useCallback((index: number) => {
    setIsBottomSheetOpen(index === 1)
  }, [])

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (isbottomSheetOpen) {
      intervalId = setInterval(() => {
        queryClient.invalidateQueries({ queryKey: ["friends"] })
        queryClient.invalidateQueries({ queryKey: ["friend-signals"] })
      }, 5000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [queryClient, isbottomSheetOpen])

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
