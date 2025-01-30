import { ReactNode } from "react"
import { Modal } from "react-native"

interface BottomModalProps {
  visible: boolean
  transparent?: boolean
  onClose: () => void
  onShow?: () => void
  children: ReactNode
}

export default function BottomModal({
  visible,
  transparent = true,
  onClose,
  onShow,
  children,
}: BottomModalProps) {
  return (
    <Modal
      transparent={transparent}
      animationType="slide"
      presentationStyle="overFullScreen"
      onRequestClose={onClose}
      onShow={() => onShow && onShow()}
      visible={visible}>
      {children}
    </Modal>
  )
}
