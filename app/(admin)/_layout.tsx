import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AdminLayout = () => {
  return (
    <View>
      <Stack>
        <Stack.Screen name="admin-page" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
};

export default AdminLayout;
