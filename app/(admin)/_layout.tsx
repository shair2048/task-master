import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

const AdminLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="(dashboard)" 
          options={{
            drawerLabel: 'Dashboard Management',
            title: 'Dashboard Management', 
          }}
        />
        <Drawer.Screen
          name="(projects)" 
          options={{
            drawerLabel: 'Projects Management',
            title: 'Projects Management',
          }}
        />
        <Drawer.Screen
          name="(users)" 
          options={{
            drawerLabel: 'Users Management',
            title: 'Users Management',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default AdminLayout;
