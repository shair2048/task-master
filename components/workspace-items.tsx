import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import DefaultAvatar from "../assets/images/default-avt.svg";

interface workspaceNameProps {
  name: string;
  onChangePress: () => void;
}

const WorkspaceItems = ({ name, onChangePress }: workspaceNameProps) => {
  return (
    <TouchableOpacity
      onPress={onChangePress}
      style={workspaceItemStyles.workspaceContent}
    >
      <DefaultAvatar />
      <Text style={workspaceItemStyles.workspaceName}>{name}</Text>
    </TouchableOpacity>
  );
};

export default WorkspaceItems;

const workspaceItemStyles = StyleSheet.create({
  workspaceContent: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EAECF0",
  },
  workspaceName: {
    fontSize: 14,
    fontWeight: "500",
  },
});
