import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const CreateUserScreen = () => {


  const [user, setUser] = useState({
    id: "",
    name: "",
    account_name: "",
    date_of_birth: "",
    phone_number: "",
    address: "",
    s_role: "",
  });

  const handleInputChange = (field: keyof typeof user, value: string) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View>
        <Text style={styles.label}>ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ID"
          value={user.id}
          onChangeText={(value) => handleInputChange("id", value)}
        />
      </View>

      <View>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={user.name}
          onChangeText={(value) => handleInputChange("name", value)}
        />
      </View>

      <View>
        <Text style={styles.label}>Account Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Account Name"
          value={user.account_name}
          onChangeText={(value) => handleInputChange("account_name", value)}
        />
      </View>

      <View>
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={user.date_of_birth}
          onChangeText={(value) => handleInputChange("date_of_birth", value)}
        />
      </View>

      <View>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          keyboardType="phone-pad"
          value={user.phone_number}
          onChangeText={(value) => handleInputChange("phone_number", value)}
        />
      </View>

      <View>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Address"
          value={user.address}
          onChangeText={(value) => handleInputChange("address", value)}
        />
      </View>

      <View>
        <Text style={styles.label}>Role</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Role"
          value={user.s_role}
          onChangeText={(value) => handleInputChange("s_role", value)}
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateUserScreen;

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
