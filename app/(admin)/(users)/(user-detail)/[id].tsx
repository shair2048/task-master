import React, { useState, useLayoutEffect, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList, useWindowDimensions, ScrollView } from "react-native";
import { useSearchParams } from "expo-router/build/hooks";
import { useNavigation } from "@react-navigation/native";
import ActionButtons from "@/components/btn-optiton";
import BlockButton from "@/components/btn-block";
import { router } from "expo-router";
import api from "@/api";
import { Use } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Account {
  _id: string;
  username: string;
  email: string;
  role: string;
  teams: any[];
  createdAt: string;
  updatedAt: string;
}

interface Team {
  _id: string;
  teamName: string;
  members: any[];
  createdAt: string;
  updatedAt: string;
}


const handleGetAccountById = async (id: string) => {
  try {
    const response = await api.get(`/account/${id}`);
    return response.data || [];
  } catch (error) {
    console.error("Fetch accounts error", error);
    return [];
  }
}

const UserCard = ({ user }: { user: Account }) => {
  const handleEdit = async (userId: string) => {
    router.push(`/create-user?id=${userId}`);
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/account/${user._id}`);
      console.log("Deleted account:", response);
    } catch (error) {
      console.error("Error deleting account", error);
    }
  };

  // const handleBlock = () => {
  //   console.log(`Block user ${user.username}`);
  // };

  return (
      <View style={styles.card}>
        <View style={UserStyles.header}>
          <View style={{ flex: 1 }}>
            <Text style={UserStyles.title}>{user.username}</Text>
            <Text style={UserStyles.description}>{user.email}</Text>
          </View>
          <ActionButtons onEdit={() => handleEdit(user._id)} onDelete={handleDelete} />
          {/* <BlockButton onBlock={handleBlock} /> */}
        </View>

        <View style={UserStyles.body}>
          <Text style={styles.userDetails}>Role: {user.role}</Text>
          <Text style={styles.userDetails}>
            Teams: {user.teams?.length}
          </Text>
          <Text style={styles.userDetails}>
            Created at: {new Date(user.createdAt).toLocaleDateString()}
          </Text>
          <Text style={styles.userDetails}>
            Updated at: {new Date(user.updatedAt).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.footer}>
          {/* <Text style={styles.taskCount}>{user.teams.length} Teams, {} Task</Text> */}
        </View>
      </View>
  );
};

const UserView = ({ user }: { user: Account }) => {
  return (
    <View style={UserStyles.card}>
      <UserCard user={user} />
      <View style={TabsStyles.container}> 
        <View style={TabsStyles.tabItem}>
          <Text style={TabsStyles.tabTitle}>Teams</Text>
        </View>
      </View>
      <ProjectList userId={user._id} />
    </View>
  );
};

const renderTeamsTable = (teams: Team[]) => {
  const [leaderName, setLeaderName] = useState<string>("");

  // Tìm leader
  const leader = teams.flatMap(team => team.members).find((member) => member.role === "Leader");

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

  const handleNavigateToTeamDetail = useCallback((teamId: string) => {
      router.push(`/(team-detail)/${teamId}`);
    }, [router]);
  const handleNavigateToUserDetail = useCallback(() => {
    router.push(`/(user-detail)/${leader?.userId}`);
  }, [router, leader?.userId]);

  return (
    <View style={Tablestyles.table}>
      {/* Header */}
      <View style={Tablestyles.tableHeader}>
        <Text style={Tablestyles.headerCell}>Team Name</Text>
        <Text style={Tablestyles.headerCell}>Members</Text>
        <Text style={Tablestyles.headerCell}>Leader</Text>
        <Text style={Tablestyles.headerCell}>Create At</Text>
        <Text style={Tablestyles.headerCell}>Update At</Text>
      </View>

      {/* Rows */}
      <FlatList
        data={teams}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={Tablestyles.row}>
            <TouchableOpacity style={Tablestyles.cell} onPress={() => handleNavigateToTeamDetail(item._id)}>
                    <Text style={Tablestyles.cell}>{item.teamName || "Unnamed Team"}</Text>
                  </TouchableOpacity>
            <Text style={Tablestyles.cell}>{item.members.length}</Text>
            <TouchableOpacity style={Tablestyles.cell} onPress={handleNavigateToUserDetail}>
              <Text style={Tablestyles.cell}>{leaderName || "No leader"}</Text>
            </TouchableOpacity>
            <Text style={Tablestyles.cell}>{new Date(item.createdAt).toLocaleDateString()}</Text>
            <Text style={Tablestyles.cell}>{new Date(item.updatedAt).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
};


// Component to render projects with dropdown
const ProjectList = ({ userId }: { userId: string }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { width } = useWindowDimensions(); 
  const isSmallScreen = width < 500;

  useEffect(() => {
    const teamsInfo = async () => {

      try {
        const response = await api.get(`/teams/user/${userId}`);
        setTeams(response.data);
      } catch (error) {
        console.log("Error call API:", error);
      }
    };
    teamsInfo();
  }, [userId]);

  return (
    <ScrollView horizontal={isSmallScreen}>
              {renderTeamsTable(teams)} {/* Pass tasks directly as prop */}
            </ScrollView>
  );
};

const UserDetail = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || ""; // Lấy ID từ URL
  const [user, setUser] = useState<Account | null>(null);

  useEffect(() => {
    if (id) {
      handleGetAccountById(id).then(setUser); // Gọi API để lấy thông tin người dùng theo ID
    }
  }, [id]);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not found or loading failed.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <UserView user={user} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f9fa",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userDetails: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
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
  projectHeader: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  projectDescription: {
    fontSize: 14,
    color: "#777",
  },
  dropdown: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    marginTop: 5,
  },
  taskRow: {
    marginVertical: 5,
  },
  taskCell: {
    fontSize: 14,
    color: "#333",
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
});

const UserStyles = StyleSheet.create({
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
  members: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
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

const TabsStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 4,
    borderRadius: 32,
    backgroundColor: "#7A5AF8",
    height: 36,
    maxWidth: 250,
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
    color: "#fff",
  },
});

export default UserDetail;
