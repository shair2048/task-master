import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

interface itemsProps {
  value: string;
  onChangePress: () => void;
}

const ProfileItems = ({ value, onChangePress }: itemsProps) => {
  return (
    <View style={profileItemsStyles.container}>
      <Text style={profileItemsStyles.infoItem}>{value}</Text>
      <TouchableOpacity onPress={onChangePress}>
        <Text style={[profileItemsStyles.infoItem, { color: "#B6C2D7" }]}>
          Change
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileItems;

const profileItemsStyles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItem: {
    fontSize: 13,
    fontWeight: "500",
  },
});
