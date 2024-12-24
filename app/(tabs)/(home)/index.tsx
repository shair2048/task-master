import api from "@/api";
import { Link, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  ScrollView,
} from "react-native";

interface TaskProps {
  _id: string;
  taskName: string;
  taskStatus: string;
  taskPriority: string;
  deadline: string;
}

const Tasks = ({ _id, taskName, taskStatus, taskPriority, deadline }: TaskProps) => {
  return (
    <View style={styles.taskContainer}>
      <Text>{taskName}</Text>
      <Text>{taskStatus}</Text>
      <Text>{taskPriority}</Text>
      <Text>{deadline}</Text>
    </View>
  );
};

const HomeScreen = () => {
  const router = useRouter();

  type Task = {
    _id: string;
    taskName: string;
    taskStatus: string;
    priority: string;
    deadline: string;
  };

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const taskInfo = async () => {
      // const id = await AsyncStorage.getItem("userId");
      const teamId = await AsyncStorage.getItem("currentTeamId");

      if (!teamId) return;

      try {
        const response = await api.get(`/tasks/workspace/${teamId}`);

        setTasks(response.data);
      } catch (error) {
        console.log("Error call API:", error);
      }
    };
    taskInfo();
  }, [tasks]);
  // console.log(tasks);

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
          {tasks.map((task, index) => (
            <Tasks
              key={index}
              _id={task._id}
              taskName={task.taskName}
              taskStatus={task.taskStatus}
              taskPriority={task.priority}
              deadline={task.deadline}
            />
          ))}
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
  taskContainer: {
    padding: 10,
    margin: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
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