import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
  Text,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface BlockButtonProps {
  onBlock: () => void;
}

const BlockButton: React.FC<BlockButtonProps> = ({ onBlock }) => {
  const [isBlockConfirmVisible, setBlockConfirmVisible] = useState(false);

  const handleBlock = () => {
    setBlockConfirmVisible(false);
    onBlock();
  };

  return (
    <View>
      {/* Nút Block */}
      <TouchableOpacity
        style={styles.blockButton}
        onPress={() => setBlockConfirmVisible(true)}
      >
        <Icon name="block" size={20} color="white" />
      </TouchableOpacity>

      {/* Modal xác nhận Block */}
      <Modal
        transparent={true}
        visible={isBlockConfirmVisible}
        animationType="none"
        onRequestClose={() => setBlockConfirmVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Block</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to block this user?
            </Text>
            <View style={styles.modalActions}>
              <Button
                title="Cancel"
                onPress={() => setBlockConfirmVisible(false)}
                color="#6C757D"
              />
              <Button title="Block" onPress={handleBlock} color="#FF9800" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  blockButton: {
    backgroundColor: "#FF9800",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 14,
    color: "#6C757D",
    textAlign: "center",
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-around",
    width: "100%",
    maxWidth: 200,
  },
});

export default BlockButton;
