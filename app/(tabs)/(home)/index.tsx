import Tasks from "@/app/tasks";
import { Link } from "expo-router";
import { Image, StyleSheet, Platform, View, Text } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={textStyles.textTitle}>Today Tasks</Text>
      <Text style={textStyles.textDescription}>
        The tasks assigned to you for today
      </Text>
      <Tasks />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    // height: 191,
    // alignItems: "center",
    marginTop: 16,
    marginHorizontal: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderRadius: 8,
  },
});

const textStyles = StyleSheet.create({
  textTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  textDescription: {
    fontSize: 12,
    fontWeight: "400",
  },
});
