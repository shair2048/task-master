import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { RadioButton, TouchableRipple } from "react-native-paper";

interface RadioLabel {
  label: string;
}

const radioLabels: RadioLabel[] = [
  { label: "Low" },
  { label: "Medium" },
  { label: "High" },
];

const RadioBtn = () => {
  const [selectedValue, setSelectedValue] = useState("option1");

  return (
    <View style={radioBtnStyles.container}>
      {radioLabels.map((radioLabel, index) => (
        <TouchableRipple
          key={index}
          onPress={() => setSelectedValue(radioLabel.label)}
          style={radioBtnStyles.radioGroup}
        >
          <View style={radioBtnStyles.radioBtn}>
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
      {/* <TouchableRipple onPress={() => setSelectedValue("option2")}>
        <View style={radioBtnStyles.radioBtn}>
          <Text style={radioBtnStyles.radioLabel}>Medium</Text>

          <RadioButton
            value="option2"
            status={selectedValue === "option2" ? "checked" : "unchecked"}
            color="#7A5AF8"
          />
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={() => setSelectedValue("option3")}>
        <View style={radioBtnStyles.radioBtn}>
          <Text style={radioBtnStyles.radioLabel}>High</Text>

          <RadioButton
            value="option3"
            status={selectedValue === "option3" ? "checked" : "unchecked"}
            color="#7A5AF8"
          />
        </View>
      </TouchableRipple> */}
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
    borderRadius: 8,
    // backgroundColor: "red",
  },
  radioBtn: {
    flexDirection: "row",
    height: 56,
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
  },
});
