import { ReactNode } from "react"
import { Modal } from "react-native"

interface BottomModalProps {
  visible: boolean
  onClose: () => void
  onShow: () => void
  children: ReactNode
}

export default function BottomModal({
  visible,
  onClose,
  onShow,
  children,
}: BottomModalProps) {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      presentationStyle="overFullScreen"
      onRequestClose={onClose}
      onShow={onShow}
      visible={visible}>
      {children}
    </Modal>
  )
}
