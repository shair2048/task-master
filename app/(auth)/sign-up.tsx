import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import BtnAuth from "@/components/btn-auth";
import { Link } from "expo-router";
import TxtField from "@/components/txt-field";

interface FieldLabel {
  label: string;
  value: string;
}

const fieldLabels: FieldLabel[] = [
  { label: "Email", value: "My Email" },
  { label: "Password", value: "My Password" },
  { label: "Confirm Password", value: "Confirm My Password" },
];

const SignUpScreen = () => {
  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.screenTitle}>Sign Up</Text>

      <TxtField fieldLabels={fieldLabels} />
      <BtnAuth label="Sign Up" />
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
