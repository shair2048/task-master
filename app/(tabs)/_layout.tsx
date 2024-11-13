import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Tabs.Screen name="(home)"/>
      <Tabs.Screen name="(calendar)"/>
      <Tabs.Screen name="(tasks)"/>
      <Tabs.Screen name="(teams)"/>
      <Tabs.Screen name="(profile)"/>
    </Tabs>
  );
}

