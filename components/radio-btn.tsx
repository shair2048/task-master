import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { RadioButton, TouchableRipple } from "react-native-paper";

interface RadioLabels {
  label: string;
}

interface RadioBtnProps {
  radioLabels: RadioLabels[];
}

const RadioBtn = ({ radioLabels }: RadioBtnProps) => {
  const [selectedValue, setSelectedValue] = useState(
    radioLabels[0]?.label || ""
  );

  return (
    <View style={radioBtnStyles.container}>
      {radioLabels.map((radioLabel, index) => (
        <TouchableRipple
          key={index}
          onPress={() => setSelectedValue(radioLabel.label)}
        >
          <View style={radioBtnStyles.radioGroup}>
            <Text style={radioBtnStyles.radioLabel}>{radioLabel.label}</Text>

            <RadioButton
              value={radioLabel.label}
              status={
                selectedValue === radioLabel.label ? "checked" : "unchecked"
              }
              //   onPress={() => setSelectedValue(radioLabel.label)}
              color="#7A5AF8"
            />
          </View>
        </TouchableRipple>
      ))}
    </View>
  );
};

export default RadioBtn;

const radioBtnStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 8,
  },

  radioGroup: {
    flexDirection: "row",
    height: 44,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#98A2B3",
  },
  radioLabel: {
    fontSize: 14,
    fontWeight: "400",
    color: "#2D2D2D",
  },
});
