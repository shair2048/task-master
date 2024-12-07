import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import ProfileItems from "@/components/profile-items";

const ProfileScreen = () => {
  return (
    <View style={profileScreenStyles.container}>
      <View style={profileScreenStyles.generalInfo}>
        <TouchableOpacity>
          <Image
            style={profileScreenStyles.avatar}
            source={require("../assets/images/avt-full.png")}
          />
        </TouchableOpacity>

        <Text style={profileScreenStyles.name}>Tonald Drump</Text>
        <Text style={profileScreenStyles.roleName}>Personally</Text>
      </View>
      <View style={{ gap: 8 }}>
        <Text style={profileScreenStyles.infoTitle}>ACCOUNT</Text>
        <View style={profileScreenStyles.accountInfo}>
          {/* <View>
            <Text style={profileScreenStyles.infoItem}>******</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text
                style={[profileScreenStyles.infoItem, { color: "#B6C2D7" }]}
              >
                Change
              </Text>
            </TouchableOpacity>
          </View> */}

          <ProfileItems value="abc@gmail.com" onChangePress={() => {}} />
          <ProfileItems value="******" onChangePress={() => {}} />
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <Text style={profileScreenStyles.infoTitle}>SETTING</Text>
        <View style={profileScreenStyles.accountInfo}>
          <TouchableOpacity>
            <Text style={profileScreenStyles.item}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
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
