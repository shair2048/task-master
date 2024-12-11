import api from "@/api";
import Tasks from "@/app/tasks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  ScrollView,
} from "react-native";

const HomeScreen = () => {
  const router = useRouter();

  type Task = {
    taskName: string;
    taskStatus: string;
    priority: string;
    deadline: string;
  };

  const [tasks, setTasks] = useState<Task[]>([]);

  const taskInfo = async () => {
    const id = await AsyncStorage.getItem("userId");

    if (!id) return;

    try {
      const response = await api.get(`/tasks/${id}`);

      setTasks(response.data);
    } catch (error) {
      console.log("Error call API:", error);
    }
  };

  useEffect(() => {
    taskInfo();
    // console.log(tasks);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={textStyles.textTitle}>Today Tasks</Text>
            <Text style={textStyles.textDescription}>
              The tasks assigned to you for today
            </Text>
          </View>
          {tasks.map((task, idex) => (
            <Tasks
              key={idex}
              taskName={task.taskName}
              taskStatus={task.taskStatus}
              taskPriority={task.priority}
              deadline={task.deadline}
            />
          ))}

          {/* <Tasks
            taskName="Task 1"
            taskStatus="To do"
            taskPriority="High"
            deadline="15-12-2024"
          /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    // height: 191,
    // alignItems: "center",
    marginVertical: 16,
    marginHorizontal: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: "white",
    borderRadius: 8,
  },
});

const textStyles = StyleSheet.create({
  textTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  textDescription: {
    fontSize: 12,
    fontWeight: "400",
  },
});
