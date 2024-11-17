import CreateTaskScreen from "@/app/create-task";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

const TasksLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default TasksLayout;
