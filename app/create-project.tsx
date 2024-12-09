import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const CreateProjectScreen = () => {
  const [project, setProject] = useState({
    id: "",
    name: "",
    description: "",
    progress: "",
    members: "",
    tasks: "",
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (field: keyof typeof project, value: string) => {
    setProject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.label}>Project ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Project ID"
          value={project.id}
          onChangeText={(value) => handleInputChange("id", value)}
        />
      </View>

      <View>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Project Name"
          value={project.name}
          onChangeText={(value) => handleInputChange("name", value)}
        />
      </View>

      <View>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Enter Project Description"
          value={project.description}
          multiline={true}
          onChangeText={(value) => handleInputChange("description", value)}
        />
      </View>

      <View>
        <Text style={styles.label}>Progress (%)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Progress (0-100)"
          value={project.progress}
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange("progress", value)}
        />
      </View>

      <View>
        <Text style={styles.label}>Members</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Number of Members"
          value={project.members}
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange("members", value)}
        />
      </View>

      <View>
        <Text style={styles.label}>Tasks</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Number of Tasks"
          value={project.tasks}
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange("tasks", value)}
        />
      </View>

      <View>
        <Text style={styles.label}>Start Date</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={project.startDate}
          onChangeText={(value) => handleInputChange("startDate", value)}
        />
      </View>

      <View>
        <Text style={styles.label}>End Date</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={project.endDate}
          onChangeText={(value) => handleInputChange("endDate", value)}
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateProjectScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    color: "#475467",
    marginBottom: 4,
  },
  input: {
    height: 44,
    padding: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "white",
  },
  textarea: {
    height: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
