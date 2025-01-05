import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import BtnAuth from "@/components/btn-auth";
import TxtField from "@/components/txt-field";
import api from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const { width } = useWindowDimensions();

  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please enter all fields");
      return;
    }

    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      const token = response.data.token;
      const uid = response.data.uid;
      const role = response.data.role;

      if (!token) {
        setError("Login failed: No token received");
        return;
      }

      // if (Platform.OS === "web" && role === "Admin") {
      //   router.push("/(admin)");
      //   return;
      // }

      // if (Platform.OS === "android") {
      //   if (role === "Admin") {
      //     setError("Admin accounts are not allowed to log in on the app.");
      //     return;
      //   }

      //   await AsyncStorage.setItem("authToken", token);
      //   await AsyncStorage.setItem("userId", uid);

      //   router.push("/(tabs)");
      // }

      switch (Platform.OS) {
        case "web":
          if (role === "Admin") {
            // setMessage("Login failed");
            router.push("/(admin)");

            return;
          } else {
            await AsyncStorage.setItem("authToken", token);
            await AsyncStorage.setItem("userId", uid);
            router.push("/(tabs)");
          }

          // await AsyncStorage.setItem("authToken", token);
          // await AsyncStorage.setItem("userId", uid);
          // router.push("/(tabs)");
          break;

        case "android":
          if (role === "Admin") {
            setMessage("Login failed");
            return;
          }
          await AsyncStorage.setItem("authToken", token);
          await AsyncStorage.setItem("userId", uid);
          router.push("/(tabs)");
          break;

        default:
          break;
      }
    } catch (err) {
      setError("Login failed");
    }
  };

  const dynamicStyles = getDynamicStyles(width);

  return (
    <View style={[screenStyles.container, dynamicStyles.container]}>
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
  );
};

export default SignInScreen;

const getDynamicStyles = (width: number) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: Platform.OS === "web" ? width * 0.37 : 32,
      // maxWidth: Platform.OS === "web" ? 1000 : undefined,
      // alignSelf: Platform.OS === "web" ? "center" : undefined,
    },
  });

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    // paddingHorizontal: 32,
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
