import { ReactNode } from "react"
import { Modal } from "react-native"

interface BottomModalProps {
  visible: boolean
  onClose: () => void
  children: ReactNode
}

export default function BottomModal({
  visible,
  onClose,
  children,
}: BottomModalProps) {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      presentationStyle="overFullScreen"
      onRequestClose={onClose}
      visible={visible}>
      {children}
    </Modal>
  )
}
