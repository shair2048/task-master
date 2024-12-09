import { Tabs } from "expo-router";
import HomeIcon from "../../assets/images/home-icon.svg";
import HomeFillIcon from "../../assets/images/home-fill-icon.svg";
import CalendarIcon from "../../assets/images/calendar-icon.svg";
import CalendarFillIcon from "../../assets/images/calendar-fill-icon.svg";
import TasksIcon from "../../assets/images/tasks-icon.svg";
import TasksFillIcon from "../../assets/images/tasks-fill-icon.svg";

import TeamIcon from "../../assets/images/team-icon.svg";
import TeamFillIcon from "../../assets/images/team-fill-icon.svg";

export const unstable_settings = {
  initialRouteName: "(home)/index",
};

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <HomeFillIcon /> : <HomeIcon />,
        }}
      />
      <Tabs.Screen
        name="(calendar)"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <CalendarFillIcon /> : <CalendarIcon />,
        }}
      />
      <Tabs.Screen
        name="(tasks)"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <TasksFillIcon /> : <TasksIcon />,
        }}
      />

      <Tabs.Screen
        name="(teams)"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <TeamFillIcon /> : <TeamIcon />,
        }}
      />
    </Tabs>
  );
}
