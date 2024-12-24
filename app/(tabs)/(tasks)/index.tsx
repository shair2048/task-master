import CreateTaskButton from "@/components/btn-create-task";
import Tasks from "@/app/tasks";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/api";

type Task = {
  _id: string;
  taskName: string;
  taskStatus: string;
  priority: string;
  deadline: string;
};

interface Tag {
  title: string;
  value: number;
}
interface ProgressTab {
  title: string;
}

const TasksScreen = () => {
  const router = useRouter();

  const [selectedProgressTab, setSelectedProgressTab] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTabTasks, setSelectedTabTasks] = useState<Task[]>([]);

  const taskStatusMap: { [key: number]: string } = {
    0: "To do",
    1: "In Progress",
    2: "Done",
  };

  const tabs: ProgressTab[] = [
    { title: "To do" },
    { title: "In Progress" },
    { title: "Finish" },
  ];

  const tags: Tag[] = [
    {
      title: "To do",
      value: tasks.filter((task) => task.taskStatus === "To do").length,
    },
    {
      title: "In progress",
      value: tasks.filter((task) => task.taskStatus === "In Progress").length,
    },
    {
      title: "Done",
      value: tasks.filter((task) => task.taskStatus === "Done").length,
    },
  ];

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

  const handlePress = () => {
    router.push("/create-task");
  };

  useEffect(() => {
    const status = taskStatusMap[selectedProgressTab];
    if (status) {
      setSelectedTabTasks(tasks.filter((task) => task.taskStatus === status));
    }
  }, [selectedProgressTab, tasks]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={progressSummaryStyles.container}>
            <Text style={progressSummaryStyles.textTitle}>
              Summary of Your Work
            </Text>
            <Text style={progressSummaryStyles.textDescription}>
              Your current task progress
            </Text>
            <View style={progressSummaryStyles.tagsStyles}>
              {tags.map((tag, index) => (
                <View key={index} style={progressSummaryStyles.tagItem}>
                  <Text style={progressSummaryStyles.tagTitle}>
                    {tag.title}
                  </Text>
                  <Text style={progressSummaryStyles.tagValue}>
                    {tag.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View style={progressTabsStyles.container}>
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  progressTabsStyles.tabItem,
                  selectedProgressTab === index && {
                    backgroundColor: "#7A5AF8",
                  },
                ]}
                onPress={() => {
                  setSelectedProgressTab(index);
                  // onTabPress(index);
                }}
              >
                <Text
                  style={[
                    progressTabsStyles.tabTitle,
                    selectedProgressTab === index && { color: "white" },
                  ]}
                >
                  {tab.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedTabTasks.map((task, index) => (
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
      <CreateTaskButton label="New Task" onChangePress={handlePress} />
    </View>
  );
};

export default TasksScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 16,
    marginVertical: 16,
    marginHorizontal: 12,
  },
});

const progressSummaryStyles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 8,
  },
  textTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  textDescription: {
    fontSize: 12,
    fontWeight: "400",
  },
  tagsStyles: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  tagItem: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
    padding: 12,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    borderColor: "#EBECEE",
    borderWidth: 1,
  },

  tagTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#475467",
  },
  tagValue: {
    fontSize: 20,
    fontWeight: "400",
    color: "#101828",
  },
});

const progressTabsStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 4,
    borderRadius: 32,
    backgroundColor: "white",
    height: 36,
  },
  tabItem: {
    flex: 1,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  tabTitle: {
    fontSize: 12,
    fontWeight: "500",
  },
});
