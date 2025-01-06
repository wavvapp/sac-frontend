import { useState } from "react"
import { Modal, View, StyleSheet } from "react-native"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"
import { CustomButton } from "./ui/Button"

export default function AlertDialog() {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View style={styles.centeredView}>
      <CustomButton onPress={() => setModalVisible(true)}>
        <CustomText style={{ color: theme.colors.white }}>
          Show Modal
        </CustomText>
      </CustomButton>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <CustomText
              style={styles.title}
              fontWeight="semibold"
              fontFamily="suisse"
              size="lg">
              No connection
            </CustomText>
            <CustomText
              style={styles.description}
              fontFamily="marfa"
              size="base">
              Make sure that you are connected{"\n"}to the internet and try
              again
            </CustomText>
            <CustomButton
              style={styles.button}
              onPress={() => setModalVisible(false)}
              title="CLOSE"
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.blur,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    alignItems: "flex-start",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 7,
  },
  description: {
    marginBottom: 26,
  },
  button: {
    width: "100%",
    backgroundColor: theme.colors.black,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
})
