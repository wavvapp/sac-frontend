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
import { useQuery } from "@tanstack/react-query"

interface BottomDrawerRef {
  openBottomSheet: () => void
}

interface DrawerProps {
  children: React.ReactNode
  fetchFriends: () => Promise<any>
}

const BottomDrawer = forwardRef<BottomDrawerRef, DrawerProps>((props, ref) => {
  const snapPoints = useMemo(() => ["20%", "88%"], [])
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [isbottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false)
  const { children, fetchFriends } = props
  useImperativeHandle(ref, () => ({
    openBottomSheet: () => {
      bottomSheetRef.current?.expand()
    },
  }))

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop {...props} pressBehavior="collapse" />
  )

  const { refetch } = useQuery({
    queryKey: ["fetch-signaling-friends"],
    queryFn: () => fetchFriends(),
    refetchInterval: isbottomSheetOpen ? 5000 : false,
    refetchIntervalInBackground: false,
  })

  const handleSheetChanges = useCallback((index: number) => {
    setIsBottomSheetOpen(index === 1)
  }, [])

  useEffect(() => {
    if (!isbottomSheetOpen) return
    refetch()
  }, [isbottomSheetOpen, refetch])
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
