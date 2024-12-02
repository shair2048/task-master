import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

interface BtnAuthProps {
  label: string;
}

const BtnAuth = ({ label }: BtnAuthProps) => {
  return (
    <TouchableOpacity style={btnStyles.container}>
      <Text style={btnStyles.btnLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default BtnAuth;

const btnStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    backgroundColor: "#8862F2",
    borderRadius: 100,
  },
  btnLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
  },
});
