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
    if (!email || !password) {
      setMessage("Please enter all fields");
      return;
    }

    try {
      await api.post("/login", {
        email,
        password,
      });
      // const token = response.data.token;

      // if (!token) {
      //   setError("Login failed: No token received");
      //   return;
      // }

      router.push("/(tabs)");
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.card}>
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

        {error ? <Text style={screenStyles.txtMessage}>{error}</Text> : null}
        {message ? <Text style={screenStyles.txtMessage}>{message}</Text> : null}

        <Text style={screenStyles.forgotPassword}>
          <Link href="/sign-up">Forgot Password</Link>
        </Text>
        <BtnAuth label="Sign In" onChangePress={handleLogin} />
        <Text style={screenStyles.linkToSignUp}>
          Don’t have an account?
          <Link href="/sign-up" style={{ color: "#6938EF" }}>
            Sign Up
          </Link>
        </Text>
      </View>
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    maxWidth: 400,
    alignSelf: "center",
    width: "100%",
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
