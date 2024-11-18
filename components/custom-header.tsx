import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";
import BackIcon from "../assets/images/back-icon.svg";
import { router, useRouter } from "expo-router";

interface CustomHeaderProps {
  title: string;
}

const CustomHeader = ({ title }: CustomHeaderProps) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.btnBack}>
        <BackIcon width={19} height={19} color="#D0D5DD" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 24,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#EAECF0",
  },
  btnBack: {
    padding: 7,
    backgroundColor: "#F4F3FF",
    borderRadius: 100,
    zIndex: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
