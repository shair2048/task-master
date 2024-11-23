import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const SignInScreen = () => {
  return (
    <View>
      <Text>SignInScreen</Text>
      <Link href="/sign-up">Go to Sign Up</Link>
    </View>
  );
};

export default SignInScreen;
