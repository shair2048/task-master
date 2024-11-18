import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CreateTaskButton from "../components/btn-create-task";
import { RadioButton, TouchableRipple } from "react-native-paper";
import RadioBtn from "../components/radio-btn";

const taskPriorityLabels = [
  { label: "Low" },
  { label: "Medium" },
  { label: "High" },
];

const CreateTaskScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Task Title</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Task Title"
          placeholderTextColor="#98A2B3"
        />
      </View>
      <View>
        <Text style={styles.title}>Task Description</Text>
        <TextInput
          style={[styles.textInput, { height: 100 }]}
          placeholder="Enter Task Description"
          placeholderTextColor="#98A2B3"
          multiline={true}
          numberOfLines={5}
        />
      </View>
      <View>
        <Text style={styles.title}>Assign To</Text>
        <RadioBtn radioLabels={taskPriorityLabels} />
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
