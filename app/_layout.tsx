import { Stack } from "expo-router";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Platform,
} from "react-native";
import Notification from "../assets/images/notification-icon.svg";
import DefaultAvatar from "../assets/images/default-avt.svg";
import Message from "../assets/images/message-icon.svg";
import { SafeAreaView } from "react-native-safe-area-context";

// const headerIconStyle = {
//   marginHorizontal: 20,
//   marginVertical: 16,
// };

// const styles = StyleSheet.create({
//   svgIcon: {
//     width: 24,
//     height: 24,
//   },
// });

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          // headerShown: false,
          // headerTitle: "",
          // headerLeft: () => (
          // <TouchableOpacity onPress={() => {}} style={headerIconStyle}>
          //   <Image
          //     source={require("../assets/images/default-avt.png")}
          //     style={{ width: 44, height: 44, borderRadius: 100 }}
          //   />
          // </TouchableOpacity>
          // ),
          // headerRight: () => (
          // <TouchableOpacity onPress={() => {}} style={headerIconStyle}>
          //   <Notification />
          // </TouchableOpacity>
          // ),
          header: (props) => (
            <SafeAreaView>
              <View style={[styles.header, styles.container]}>
                <TouchableOpacity onPress={() => {}} style={styles.container}>
                  {/* <Image
                    source={require("../assets/images/default-avt.png")}
                    style={{ width: 44, height: 44, borderRadius: 100 }}
                  /> */}
                  <DefaultAvatar />

                  <View style={textStyles.baseText}>
                    <Text style={textStyles.nameFont}>Tonald Drump</Text>
                    <Text style={textStyles.roleFont}>Personally</Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.container}>
                  <TouchableOpacity
                    onPress={() => {}}
                    style={{ marginRight: 26 }}
                  >
                    <Message />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {}}>
                    <Notification />
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          ),
        }}
      />
      {/* <Stack.Screen name="task-details" /> */}
    </Stack>
  );
}

const textStyles = StyleSheet.create({
  baseText: {
    marginLeft: 9,
    flexDirection: "column",
  },
  nameFont: {
    fontWeight: "500",
    fontSize: 16,
  },
  roleFont: {
    fontWeight: "500",
    fontSize: 12,
    color: "#6E62FF",
  },
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    height: 80,
    backgroundColor: "white",
    paddingHorizontal: 20,
    // paddingVertical: 16,
    justifyContent: "space-between",
    // paddingTop:
    //   Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
