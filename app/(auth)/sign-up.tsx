import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import BtnAuth from "@/components/btn-auth";
import { Link, useRouter } from "expo-router";
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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      // setEmail("");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    try {
      const response = await api.post("/register", {
        username,
        email,
        password,
      });
      setMessage(response.data.message);
      setError("");
      router.push("/sign-in");
    } catch (err) {
      setError("Registration failed");
      setMessage("");
    }
  };

  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.screenTitle}>Sign Up</Text>

      <TxtField
        label="Username"
        placeholderValue="My username"
        value={username}
        onChangeText={setUsername}
        secureText={false}
      />
      <TxtField
        label="Email"
        placeholderValue="My Email"
        value={email}
        onChangeText={setEmail}
        secureText={false}
      />
      <TxtField
        label="Password"
        placeholderValue="My Password"
        value={password}
        onChangeText={setPassword}
        secureText={true}
      />
      <TxtField
        label="Confirm Password"
        placeholderValue="Confirm My Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureText={true}
      />
      {/* {error ? <Text style={styles.error}>{error}</Text> : null} */}
      {message ? <Text style={screenStyles.txtMessage}>{message}</Text> : null}
      <BtnAuth label="Sign Up" onChangePress={handleRegister} />

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
  txtMessage: {
    fontSize: 12,
    fontWeight: "400",
    color: "#F95555",
  },
});
