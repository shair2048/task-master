import { Stack, useRouter } from "expo-router";
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
import React, { useEffect, useState } from "react";
import BackIcon from "../assets/images/back-icon.svg";
import CustomHeader from "../components/custom-header";
import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const isLoggedIn = false;

export default function RootLayout() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.push("/sign-in");
  //   }
  // }, [isLoggedIn]);

  const checkAuthStatus = async (callback: (id: string) => void) => {
    const token = await AsyncStorage.getItem("authToken");
    const id = await AsyncStorage.getItem("userId");
    if (token && id) {
      router.push("/(tabs)");
      callback(id);
    } else {
      router.push("/sign-in");
    }
  };

  const profileHandlePress = () => {
    router.push("/profile");
  };

  const userInfo = async (id: string) => {
    if (!id) return;
    try {
      const response = await api.get(`/account/${id}`);
      // console.log(response.data);

      setUsername(response.data.username);
      setRole(response.data.role);
    } catch (error) {
      console.log("Error call API:", error);
    }
  };

  useEffect(() => {
    checkAuthStatus((userId) => {
      userInfo(userId); // Gọi userInfo khi checkAuthStatus hoàn tất và có userId
    });
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="(admin)" options={{ headerShown: false }} /> */}
      <Stack.Screen
        name="(tabs)"
        options={{
          header: (props) => (
            <SafeAreaView>
              <View style={[styles.header, styles.container]}>
                <TouchableOpacity
                  onPress={profileHandlePress}
                  style={styles.container}
                >
                  {/* <Image
                    source={require("../assets/images/default-avt.png")}
                    style={{ width: 44, height: 44, borderRadius: 100 }}
                  /> */}
                  <DefaultAvatar />

                  <View style={textStyles.baseText}>
                    <Text style={textStyles.nameFont}>{username}</Text>
                    <Text style={textStyles.roleFont}>{role}</Text>
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
      <Stack.Screen
        name="task-details"
        options={{
          header: () => (
            <SafeAreaView>
              <CustomHeader title="Task Detail" />
            </SafeAreaView>
          ),
        }}
      />
      <Stack.Screen
        name="create-task"
        options={{
          header: () => (
            <SafeAreaView>
              <CustomHeader title="Create New Task" />
            </SafeAreaView>
          ),
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          header: () => (
            <SafeAreaView>
              <CustomHeader title="My Profile" />
            </SafeAreaView>
          ),
        }}
      />
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
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#EAECF0",
    // paddingTop:
    //   Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
