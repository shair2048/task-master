import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList, useWindowDimensions, ScrollView } from "react-native";
import { router, SearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useSearchParams } from "expo-router/build/hooks";
import ActionButtons from "@/components/btn-optiton";
import api from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface Team {
  _id: string;
  teamName: string;
  members: any[];
  createdAt: string;
  updatedAt: string;
}

type Task = {
  _id: string;
  taskName: string;
  taskStatus: string;
  priority: string;
  deadline: string;
  createdAt: string;
  updatedAt: string;
};

type Member = {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

const handleGetTeamById = async (id: string) => {
  try {
    const response = await api.get(`/teams/${id}`);
    return response.data || [];
  } catch (error) {
    console.error("Fetch accounts error", error);
    return [];
  }
}

const TeamCard = ({ team }: { team: Team }) => {
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

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{team.teamName}</Text>
        </View>
      </View>

      <View style={styles.body}>
      <Text style={styles.userDetails}>Leader: {leaderName || "No leader"}</Text>
        <Text style={styles.userDetails}>
          Members: {team.members.length}
        </Text>
        <Text style={styles.userDetails}>
          Created at: {new Date(team.createdAt).toLocaleDateString()}
        </Text>
        <Text style={styles.userDetails}>
          Updated at: {new Date(team.updatedAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.footer}>
      {/* <Text style={styles.taskCount}>{} Tasks, {team.members.length} Members </Text> */}
      </View>
    </View>
  );
};

const TeamView = ({ team }: { team: Team }) => {
  return (
    <View style={styles.card}>
      <TeamCard team={team} />
      <TeamTab id_team={team._id} />
    </View>
  );
};

const tabs: TeamTab[] = [
  { title: "Tasks" },
  { title: "Members" },
];

type TeamTab = {
  title: string;
};



const renderTasksTable = (tasks: Task[]) => {
  return (
    <View style={Tablestyles.table}>
      {/* Header */}
      <View style={Tablestyles.tableHeader}>
        <Text style={Tablestyles.headerCell}>Name</Text>
        <Text style={Tablestyles.headerCell}>Priority</Text>
        <Text style={Tablestyles.headerCell}>Status</Text>
        <Text style={Tablestyles.headerCell}>Deadline</Text>
        <Text style={Tablestyles.headerCell}>Created At</Text>
        <Text style={Tablestyles.headerCell}>Updated At</Text>
      </View>

      {/* Rows */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={Tablestyles.row}>
            <Text style={Tablestyles.cell}>{item.taskName}</Text>
            <Text style={Tablestyles.cell}>{item.priority}</Text>
            <Text style={Tablestyles.cell}>{item.taskStatus}</Text>
            <Text style={Tablestyles.cell}>{item.deadline}</Text>
            <Text style={Tablestyles.cell}>{new Date(item.createdAt).toLocaleDateString()}</Text>
            <Text style={Tablestyles.cell}>{new Date(item.updatedAt).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const renderMembersTable = (members: Member[], handleNavigateToUserDetail: (UserId: string) => void) => {
  return (
    <View style={Tablestyles.table}>
      {/* Header */}
      <View style={Tablestyles.tableHeader}>
        <Text style={Tablestyles.headerCell}>User Name</Text>
        <Text style={Tablestyles.headerCell}>Email</Text>
        <Text style={Tablestyles.headerCell}>Role</Text>
        <Text style={Tablestyles.headerCell}>Created At</Text>
        <Text style={Tablestyles.headerCell}>Updated At</Text>
      </View>

      {/* Rows */}
      <FlatList
        data={members}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={Tablestyles.row}>
            <TouchableOpacity style={Tablestyles.cell} onPress={() => handleNavigateToUserDetail(item._id)}>
              <Text style={Tablestyles.cell}>{item.username || "Unnamed"}</Text>
            </TouchableOpacity>
            <Text style={Tablestyles.cell}>{item.email}</Text>
            <Text style={Tablestyles.cell}>{item.role}</Text>
            <Text style={Tablestyles.cell}>{new Date(item.createdAt).toLocaleDateString()}</Text>
            <Text style={Tablestyles.cell}>{new Date(item.updatedAt).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const TeamTab = ({ id_team }: { id_team: string }) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 500;

  const handleNavigateToUserDetail = useCallback((UserId: string) => {
    router.push(`/(user-detail)/${UserId}`);
  }, [router]);

  useEffect(() => {
    // Fetch tasks and members for the team
    const fetchTeamData = async () => {
      try {
        const responseTasks = await api.get(`/tasks/workspace/${id_team}`);
        setTasks(responseTasks.data);

        // Assuming you fetch members for the team as well
        const responseMembers = await api.get(`/account/team/${id_team}`);
        setMembers(responseMembers.data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeamData();
  }, [id_team]);

  const renderTabContent = () => {
    if (selectedTab === 0) {
      return (
        <ScrollView horizontal={isSmallScreen}>
          {renderTasksTable(tasks)} {/* Pass tasks directly as prop */}
        </ScrollView>
      );
    } else {
      return (
        <ScrollView horizontal={isSmallScreen}>
          {renderMembersTable(members, handleNavigateToUserDetail)} {/* Pass handler directly */}
        </ScrollView>
      );
    }
  };

  return (
    <View style={styles.card}>
      {/* Tabs */}
      <View style={TabsStyles.container}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[TabsStyles.tabItem, selectedTab === index && TabsStyles.activeTab]}
            onPress={() => setSelectedTab(index)}
          >
            <Text style={[TabsStyles.tabTitle, selectedTab === index && TabsStyles.activeTab]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <View>{renderTabContent()}</View>
    </View>
  );
};



const TeamDetail = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || ""; // Lấy ID từ URL
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    if (id) {
      handleGetTeamById(id).then(setTeam); // Gọi API để lấy thông tin người dùng theo ID
    }
  }, [id]);

  if (!team) {
    return <Text>team not found!</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <TeamView team={team} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f8f9fa",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 12,
    color: "#666",
  },
  body: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  progressWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  progressBarContainer: {
    flex: 1,
    maxWidth: 500,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: "green",
  },
  progressText: {
    fontSize: 14,
    color: "#333",
  },
  userDetails: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
    marginTop: 10,
  },
  taskCount: {
    fontSize: 14,
    color: "green",
    fontWeight: "bold",
  },
  dateRange: {
    fontSize: 12,
    color: "#555",
  },
});

const TabsStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 4,
    borderRadius: 32,
    backgroundColor: "silver",
    height: 36,
    maxWidth: 500,
  },
  tabItem: {
    flex: 1,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#7A5AF8",
    color: "#fff",
  },
  tabTitle: {
    fontSize: 12,
    fontWeight: "500",
  },
});

const Tablestyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#f3f4f6",
  },
  table: {
    width: "100%",
    marginTop: 12,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2d3748",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#e7e7e7",
  },
  headerCell: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e7e7e7",
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    color: "#2d3748",
  },
});


export default TeamDetail;
