import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import BtnAuth from "@/components/btn-auth";
import { Link } from "expo-router";
import TxtField from "@/components/txt-field";
import api from "../../api";

// interface FieldLabel {
//   label: string;
//   value: string;
// }

// const fieldLabels: FieldLabel[] = [
//   { label: "Email", value: "My Email" },
//   { label: "Password", value: "My Password" },
//   { label: "Confirm Password", value: "Confirm My Password" },
// ];

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const response = await api.post("/register", { email, password });
      setMessage(response.data.message);
      setError("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Registration failed");
      setMessage("");
    }
  };

  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.screenTitle}>Sign Up</Text>

      <TxtField
        label="Email"
        placeholderValue="My Email"
        onChangeText={setEmail}
        secureText={false}
      />
      <TxtField
        label="Password"
        placeholderValue="My Password"
        onChangeText={setPassword}
        secureText={true}
      />
      <TxtField
        label="Confirm Password"
        placeholderValue="Confirm My Password"
        onChangeText={setConfirmPassword}
        secureText={true}
      />
      <BtnAuth label="Sign Up" onChangePress={handleRegister} />
      {/* {error ? <Text style={styles.error}>{error}</Text> : null}
      {message ? <Text style={styles.success}>{message}</Text> : null} */}
      <Text style={screenStyles.linkToSignUp}>
        Already have an account?
        <Link href="/sign-in" style={{ color: "#6938EF" }}>
          Sign In
        </Link>
      </Text>
    </View>
  );
};

export default SignUpScreen;

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 24,
    backgroundColor: "white",
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#101828",
    textAlign: "center",
  },

  forgotPassword: {
    fontSize: 12,
    fontWeight: "400",
    color: "#7A5AF8",
    textAlign: "right",
  },
  linkToSignUp: {
    fontSize: 12,
    fontWeight: "500",
    color: "#263238",
    textAlign: "center",
  },
});
