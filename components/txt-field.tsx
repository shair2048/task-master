import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

// interface FieldLabels {
//   label: string;
//   value: string;
// }

// interface FieldLabelProps {
//   fieldLabels: FieldLabels[];
// }

interface FieldLabelProps {
  label: string;
  value: string;
  secureText: boolean;
  placeholderValue: string;
  onChangeText: (text: string) => void;
}

// const fieldLabels: FieldLabel[] = [
//   { label: "Email", value: "My Email" },
//   { label: "Password", value: "My Password" },
// ];

const TxtField = ({
  label,
  value,
  placeholderValue,
  secureText,
  onChangeText,
}: FieldLabelProps) => {
  return (
    <View style={{ gap: 24 }}>
      {/* {fieldLabels.map((fieldLabel, index) => (
        <View key={index} style={{ gap: 4 }}>
          <Text style={txtFieldStyles.fieldLabel}>{fieldLabel.label}</Text>
          <TextInput
            style={txtFieldStyles.fieldInput}
            placeholder={fieldLabel.value}
            placeholderTextColor="#98A2B3"
          />
        </View>
      ))} */}
      <View style={{ gap: 4 }}>
        <Text style={txtFieldStyles.fieldLabel}>{label}</Text>
        <TextInput
          style={txtFieldStyles.fieldInput}
          value={value}
          placeholder={placeholderValue}
          placeholderTextColor="#98A2B3"
          onChangeText={onChangeText}
          secureTextEntry={secureText}
        />
      </View>
    </View>
  );
};

export default TxtField;

const txtFieldStyles = StyleSheet.create({
  fieldLabel: {
    fontSize: 12,
    fontWeight: "400",
    color: "#475467",
  },
  fieldInput: {
    height: 44,
    borderRadius: 8,
    borderColor: "#98A2B3",
    borderWidth: 1,
    paddingHorizontal: 12,
  },
});
