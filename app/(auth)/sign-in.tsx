import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import BtnAuth from "@/components/btn-auth";
import TxtField from "@/components/txt-field";
import api from "../../api";

// interface FieldLabels {
//   label: string;
//   value: string;
// }

// const fieldLabels: FieldLabels[] = [
//   { label: "Email", value: "My Email" },
//   { label: "Password", value: "My Password" },
// ];

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    // if (password !== confirmPassword) {
    //   setMessage("Passwords do not match");
    //   setPassword("");
    //   setConfirmPassword("");
    //   return;
    // }

    try {
      const response = await api.post("/register", {
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
      <Text style={screenStyles.screenTitle}>Sign In</Text>

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
      <Text style={screenStyles.forgotPassword}>
        <Link href="/sign-up">Forgot Password</Link>
      </Text>
      <BtnAuth label="Sign In" onChangePress={() => {}} />
      <Text style={screenStyles.linkToSignUp}>
        Don’t have an account?
        <Link href="/sign-up" style={{ color: "#6938EF" }}>
          Sign Up
        </Link>
      </Text>
    </View>
  );
};

export default SignInScreen;

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
