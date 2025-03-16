import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import ProfileItems from "@/components/profile-items";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/api";

type User = {
  _id: string;
  username: string;
  email: string;
};

const ProfileScreen = () => {
  const router = useRouter();
  const [user, setUser] = React.useState<User>();

  useEffect(() => {
    const userInfos = async () => {
      const id = await AsyncStorage.getItem("userId");

      try {
        const response = await api.get(`/account/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch username", error);
      }
    };

    userInfos();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("userId");

      router.push("/sign-in");
      router.replace("/sign-in");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <View style={profileScreenStyles.container}>
      {/* <View style={profileScreenStyles.card}> */}
      <View style={profileScreenStyles.generalInfo}>
        <TouchableOpacity>
          <Image
            style={profileScreenStyles.avatar}
            source={require("../assets/images/avt-full.png")}
          />
        </TouchableOpacity>

        <Text style={profileScreenStyles.name}>{user?.username}</Text>
        <Text style={profileScreenStyles.roleName}>Individual</Text>
      </View>
      <View style={{ gap: 8 }}>
        <Text style={profileScreenStyles.infoTitle}>ACCOUNT</Text>
        <View style={profileScreenStyles.accountInfo}>
          <ProfileItems value={user?.email ?? ""} onChangePress={() => {}} />
          <ProfileItems value="******" onChangePress={() => {}} />
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <Text style={profileScreenStyles.infoTitle}>SETTING</Text>
        <View style={profileScreenStyles.accountInfo}>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={profileScreenStyles.item}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </View> */}
    </View>
  );
};

export default ProfileScreen;

const profileScreenStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 25,
    gap: 20,
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
    maxWidth: 700,
    alignSelf: "center",
    width: "100%",
  },
  generalInfo: {
    alignItems: "center",
    gap: 4,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "white",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  roleName: {
    fontSize: 13,
    fontWeight: "500",
    color: "#7A5AF8",
  },

  accountInfo: {
    padding: 16,
    backgroundColor: "white",
    gap: 12,
    borderRadius: 12,
  },
  item: {
    fontSize: 13,
    fontWeight: "500",
  },

  infoTitle: {
    fontSize: 13,
    fontWeight: "600",
  },
});
