import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter, SearchParams } from "expo-router"; // Hoặc react-router nếu bạn dùng trên web
import { useSearchParams } from "expo-router/build/hooks";

const CreateUserScreen = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Lấy ID từ URL

  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
    password: "",
    role: "",
    workspaceType: "",
    teams: [],
  });

  // Hàm tải dữ liệu người dùng từ database
  const fetchUserData = async (userId: string) => {
    try {
      const response = await fetch(`https://your-api.com/users/${userId}`);
      const data = await response.json();
      setUser(data); // Cập nhật state với dữ liệu từ server
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserData(id as string); // Gọi hàm tải dữ liệu nếu có ID
    }
  }, [id]);

  const handleInputChange = (field: keyof typeof user, value: string) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          value={user.username}
          onChangeText={(value) => handleInputChange("username", value)}
        />
      </View>

      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          keyboardType="email-address"
          value={user.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />
      </View>

      <View>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          value={user.password}
          onChangeText={(value) => handleInputChange("password", value)}
        />
      </View>

      <View>
        <Text style={styles.label}>Role</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Role"
          value={user.role}
          onChangeText={(value) => handleInputChange("role", value)}
        />
      </View>

      <View>
        <Text style={styles.label}>Workspace Type</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Workspace Type"
          value={user.workspaceType}
          onChangeText={(value) => handleInputChange("workspaceType", value)}
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
