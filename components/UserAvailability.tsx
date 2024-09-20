import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "@/components/ui/CustomText";
import EditIcon from "@/components/vectors/EditIcon";
import { useState } from "react";
import { theme } from "@/theme";

export default function UserAvailability() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <CustomText size="sm" fontWeight="medium" style={styles.signalText}>
        Signal
      </CustomText>
      <View style={styles.availableContainer}>
        <CustomText size="xl">Available</CustomText>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <EditIcon />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <CustomText size="sm" fontWeight="medium" style={styles.signalText}>
              Signal
            </CustomText>
            <CustomText size="xl">Available</CustomText>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
    width: "100%",
    paddingLeft: 12,
    paddingRight: 21,
    paddingVertical: 5,
    backgroundColor: theme.colors.white,
  },
  signalText: {
    lineHeight: 17,
    letterSpacing: -1,
    textTransform: "uppercase",
  },
  availableContainer: { flexDirection: "row", justifyContent: "space-between" },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: theme.colors.blackOverlay,
  },
  modalView: {
    width: "100%",
    backgroundColor: theme.colors.white,
    height: 600,
    borderRadius: 12,
    padding:16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
