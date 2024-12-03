import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete }) => {
  return (
    <View style={styles.container}>
      {/* Nút Edit */}
      <TouchableOpacity style={styles.editButton} onPress={onEdit}>
        <Icon name="edit" size={20} color="white" />
      </TouchableOpacity>

      {/* Nút Delete */}
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Icon name="delete" size={20} color="white" />
      </TouchableOpacity>
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
});

export default ActionButtons;
