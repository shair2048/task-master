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
          name="(teams)" 
          options={{
            drawerLabel: 'Teams Management',
            title: 'Teams Management',
          }}
        />
        <Drawer.Screen
          name="(users)" 
          options={{
            drawerLabel: 'Users Management',
            title: 'Users Management',
          }}
        />
        {/* <Drawer.Screen
          name="(trash)" 
          options={{
            drawerLabel: 'Trash Management',
            title: 'Trash Management',
          }}
        /> */}
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default AdminLayout;
