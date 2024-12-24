import { useState, useEffect, useCallback } from "react";
import api from "@/api";
import CreateTaskButton from "@/components/btn-create-task";
import ActionButtons from "@/components/btn-optiton";
import { router, useRouter } from "expo-router";
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { BarChart } from "react-native-chart-kit";
import React from "react";

const screenWidth = Dimensions.get("window").width;

interface Tag {
  title: string;
}

interface Team {
  _id: string;
  teamName: string;
  members: any[];
  createdAt: string;
}

interface Task {
  _id: string;
  taskName: string;
  taskDescription: string;
  priority: string;
  taskStatus: string;
  deadline: string;
  createdBy: {
    userId: string;
    username: string;
  };
  assignTo: any[];
  teams: {
    teamId: string;
    teamName: string;
  };
  createdAt: string;
  updatedAt: string;
}

const tags: Tag[] = [
  { title: "To do"},
  { title: "In progress"},
  { title: "Done"},
];

interface Priority {
  title: string;
}

const priorities: Priority[] = [
  { title: "Low"},
  { title: "Medium"},
  { title: "High"},
];

const handleGetTeams = async () => {
  try {
    const response = await api.get("/teams");
    return response.data || []; // Trả về mảng rỗng nếu không có dữ liệu
  } catch (error) {
    console.error("Fetch teams error", error);
    return [];
  }
};

const handleGetTasks = async () => {
  try {
    const response = await api.get("/tasks");
    console.log(response.data);
    return response.data || []; 
  } catch (error) {
    console.error("Fetch tasks error", error);
    return [];
  }
}

const handleGetUserById = async (userId: string) => {
  try {
    const response = await api.get(`/account/${userId}`);
    return response.data || null;
  } catch (error) {
    console.error("Fetch user error", error);
    return null;
  }
};

const handleGetTeamById = async (teamId: string) => {
  try {
    const response = await api.get(`/teams/${teamId}`);
    return response.data || null;
  } catch (error) {
    console.error("Fetch team error", error);
    return null;
  }
};

const TeamItem = ({ team }: { team: Team }) => {
  const router = useRouter();
  const [leaderName, setLeaderName] = useState<string>("");

  // Tìm leader
  const leader = team.members.find((member) => member.role === "Leader");

  useEffect(() => {
    const fetchLeaderName = async () => {
      if (leader?.userId) {
        try {
          const response = await api.get(`/account/${leader.userId}`);
          setLeaderName(response.data.username || "Unknown");
        } catch (error) {
          console.error("Failed to fetch leader's username", error);
          setLeaderName("Unknown");
        }
      }
    };

    fetchLeaderName();
  }, [leader?.userId]);

  const handleNavigateToTeamDetail = useCallback(() => {
    router.push(`/(team-detail)/${team._id}`);
  }, [router, team._id]);

  const handleNavigateToUserDetail = useCallback(() => {
    if (leader?.userId) {
      router.push(`/(user-detail)/${leader.userId}`);
    }
  }, [router, leader?.userId]);

  return (
    <View style={styles.tableRow}>
      <TouchableOpacity style={styles.tableCell} onPress={handleNavigateToTeamDetail}>
        <Text style={styles.tableCell}>{team.teamName || "Unnamed Team"}</Text>
      </TouchableOpacity>
      <Text style={styles.tableCell}>{team.members.length || 0}</Text>
      <TouchableOpacity style={styles.tableCell} onPress={handleNavigateToUserDetail}>
        <Text style={styles.tableCell}>{leaderName || "No leader"}</Text>
      </TouchableOpacity>
      <Text style={styles.tableCell}>{new Date(team.createdAt).toLocaleDateString()}</Text>
    </View>
  );
};


const TaskItem = ({ task }: { task: Task }) => {
  const router = useRouter();
  const [user, setUser] = useState<{ _id: string; username: string } | null>(null);
  const [team, setTeam] = useState<{ _id: string; teamName: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await handleGetUserById(task.createdBy.userId);
      const teamResponse = await handleGetTeamById(task.teams.teamId);
      setUser(userResponse);
      setTeam(teamResponse);
    };

    fetchData();
  }, [task]);

  const handleNavigateToTaskDetail = useCallback(() => {
    router.push(`/(task-detail)/${task._id}`);
  }, [router, task._id]);

  const handleNavigateToUserDetail = useCallback(() => {
    if (user) {
      router.push(`/(user-detail)/${user._id}`);
    }
  }, [router, user]);

  const handleNavigateToTeamDetail = useCallback(() => {
    if (team) {
      router.push(`/(team-detail)/${team._id}`);
    }
  }, [router, team]);

  return (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{task.taskName || "Unnamed Task"}</Text>
      <TouchableOpacity style={styles.tableCell} onPress={handleNavigateToUserDetail}>
        <Text style={styles.tableCell}>{user ? user.username : ""}</Text>
      </TouchableOpacity>
      <Text style={styles.tableCell}>{task.assignTo.length || 0}</Text>
      <Text style={styles.tableCell}>{task.priority || "Unknown"}</Text>
      <Text style={styles.tableCell}>{task.taskStatus || "Unknown"}</Text>
      <TouchableOpacity style={styles.tableCell} onPress={handleNavigateToTeamDetail}>
        <Text style={styles.tableCell}>{team ? team.teamName : "No Team"}</Text>
      </TouchableOpacity>
      <Text style={styles.tableCell}>{new Date(task.createdAt).toLocaleDateString()}</Text>
      <Text style={styles.tableCell}>{new Date(task.deadline).toLocaleDateString()}</Text>
    </View>
  );
};

const titleStatusCount = (tasks: Task[], tags: Tag[]) => {
  const tagMap: { [key: string]: number } = {};

  tags.forEach(tag => {
    tagMap[tag.title] = 0;
  });

  tasks.forEach(task => {
    if (tagMap[task.taskStatus] !== undefined) {
      tagMap[task.taskStatus]++;
    }
  });

  return tags.map(tag => ({
    ...tag,
    count: tagMap[tag.title],
  }));
};

const titlePriorityCount = (tasks: Task[], priorities: Priority[]) => {
  const priorityMap: { [key: string]: number } = {};

  priorities.forEach(priority => {
    priorityMap[priority.title] = 0;
  });

  tasks.forEach(task => {
    if (priorityMap[task.priority] !== undefined) {
      priorityMap[task.priority]++;
    }
  });

  return priorities.map(priority => ({
    ...priority,
    count: priorityMap[priority.title],
  }));
};

const CurrentTask = ({ tasks }: { tasks: Task[] }) => {
  const updatedTags = titleStatusCount(tasks, tags);
  const updatedPriorities = titlePriorityCount(tasks, priorities);
  const data = {
    labels: updatedPriorities.map(priority => priority.title),
    datasets: [
      {
        data: updatedPriorities.map(priority => priority.count || 0),
      },
    ],
  };

  return (
    <>
    {/* <View style={styles.section}>
      <Text style={styles.sectionTitle}>Summary of Work</Text>
      <Text style={styles.sectionSubtitle}>Current task progress</Text>
      <View style={styles.tagsContainer}>
        {updatedTags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagTitle}>{tag.title}</Text>
            <Text style={styles.tagValue}>{tag.count}</Text>
          </View>
        ))}
      </View>
    </View> */}
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>Task Priorities</Text>
        <Text style={styles.sectionSubtitle}>Current task priorities</Text>
        <BarChart
          data={data}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          fromZero
          showBarTops={false}
          yAxisLabel=""
          yAxisSuffix="" />
      </View></>
    
  );
};

const DashboardScreen = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data1 = await handleGetTeams();
        const data2 = await handleGetTasks();
        setTeams(data1);
        setTasks(data2);
      } catch (err) {
        setError("Failed to fetch");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);



  const renderTeamItem = ({ item }: { item: Team }) => <TeamItem team={item} />;
  const renderTaskItem = ({ item }: { item: Task }) => <TaskItem task={item} />;

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.container}>
          <CurrentTask tasks={tasks} />

          {/* Teams Section */}
          <View style={wrapContainerStyles.container}>
            {/* Team Table */}
            <View style={wrapContainerStyles.containerItem}>   
              <Text style={styles.sectionTitle}>Teams</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Team Name</Text>
                  <Text style={styles.tableHeader}>Members</Text>
                  <Text style={styles.tableHeader}>Leader</Text>
                  <Text style={styles.tableHeader}>Created At</Text>
                </View>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#0000ff" />
                ) : (
                  <FlatList
                    data={teams}
                    renderItem={renderTeamItem}
                    keyExtractor={(item) => item._id.toString()}
                  />
                )}
              </View>
            </View>

          {/* Tasks Section */}
          <View style={wrapContainerStyles.containerItem}>              
              <Text style={styles.sectionTitle}>Tasks</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Task Name</Text>
                  <Text style={styles.tableHeader}>Created By</Text>
                  <Text style={styles.tableHeader}>Assign To</Text>
                  <Text style={styles.tableHeader}>Priority</Text>
                  <Text style={styles.tableHeader}>Status</Text>
                  <Text style={styles.tableHeader}>Team</Text>
                  <Text style={styles.tableHeader}>Created At</Text>
                  <Text style={styles.tableHeader}>Deadline</Text>
                </View>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#0000ff" />
                ) : (
                  <FlatList
                    data={tasks}
                    renderItem={renderTaskItem}
                    keyExtractor={(item) => item._id.toString()}
                  />
                )}
              </View>  
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    padding: 16,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EBECEE",
    alignItems: "center",
  },
  tagTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#475467",
  },
  tagValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#101828",
  },
  table: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#EBECEE",
    borderRadius: 8,
  },
  tableRow: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EBECEE",
  },
  tableHeader: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475467",
    flex: 1,
    textAlign: "center",
  },
  tableCell: {
    fontSize: 12,
    color: "#101828",
    flex: 1,
    textAlign: "center",
  },
});

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
  barPercentage: 1.5,
};


const wrapContainerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: 16,
  },
  containerItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 8,
    flexBasis: "48%",
    maxWidth: "48%",
    minWidth: 180,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
});
