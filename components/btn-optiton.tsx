import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  Text,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete }) => {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const handleDelete = () => {
    // Đóng modal và gọi hàm xóa
    setIsConfirmVisible(false);
    onDelete();
  };

  return (
    <View style={styles.container}>
      {/* Nút Edit */}
      <TouchableOpacity style={styles.editButton} onPress={onEdit}>
        <Icon name="edit" size={20} color="white" />
      </TouchableOpacity>

      {/* Nút Delete */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => setIsConfirmVisible(true)}
      >
        <Icon name="delete" size={20} color="white" />
      </TouchableOpacity>

      {/* Modal xác nhận */}
      <Modal
        transparent={true}
        visible={isConfirmVisible}
        animationType="none" // Tắt hiệu ứng
        onRequestClose={() => setIsConfirmVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Delete</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete this item?
            </Text>
            <View style={styles.modalActions}>
              <Button
                title="Cancel"
                onPress={() => setIsConfirmVisible(false)}
                color="#6C757D"
              />
              <Button title="Delete" onPress={handleDelete} color="#F44336" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    padding: 8,
    borderRadius: 4,
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

export default ActionButtons;
