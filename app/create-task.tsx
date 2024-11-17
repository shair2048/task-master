import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CreateTaskButton from "./component/btn-create-task";
import { RadioButton, TouchableRipple } from "react-native-paper";

const CreateTaskScreen = () => {
  const [selectedValue, setSelectedValue] = useState("option1");

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Task Title</Text>
        <TextInput style={styles.textInput} placeholder="Enter Task Title" />
      </View>
      <View>
        <Text style={styles.title}>Task Description</Text>
        <TextInput
          style={[styles.textInput, { height: 100 }]}
          placeholder="Enter Task Description"
          multiline={true}
          numberOfLines={5}
        />
      </View>
      <View style={radioBtnStyles.container}>
        <Text style={styles.title}>Assign To</Text>
        <TouchableRipple
          onPress={() => setSelectedValue("option1")}
          style={radioBtnStyles.radioGroup}
        >
          <View style={radioBtnStyles.radioBtn}>
            <Text style={radioBtnStyles.radioLabel}>Low</Text>

            <RadioButton
              value="option1"
              status={selectedValue === "option1" ? "checked" : "unchecked"}
              onPress={() => setSelectedValue("option1")}
              color="#7A5AF8"
            />
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => setSelectedValue("option2")}>
          <View style={radioBtnStyles.radioBtn}>
            <Text style={radioBtnStyles.radioLabel}>Medium</Text>

            <RadioButton
              value="option2"
              status={selectedValue === "option2" ? "checked" : "unchecked"}
              onPress={() => setSelectedValue("option1")}
              color="#7A5AF8"
            />
          </View>
        </TouchableRipple>
      </View>

      {/* <CreateTaskButton /> */}
    </View>
  );
};

export default CreateTaskScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginVertical: 16,
    marginHorizontal: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 16,
    backgroundColor: "white",
    borderRadius: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: "400",
    color: "#475467",
    marginBottom: 4,
  },
  textInput: {
    height: 44,
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#98A2B3",
    // height: 200,
    textAlignVertical: "top",
  },
});

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
