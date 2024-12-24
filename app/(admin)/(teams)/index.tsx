import ActionButtons from "@/components/btn-optiton";
import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView, useWindowDimensions, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import api from "@/api";

// Hàm lấy dữ liệu từ API
const handleGetTeams = async () => {
  try {
    const response = await api.get("/teams");
    return response.data || []; // Trả về mảng rỗng nếu không có dữ liệu
  } catch (error) {
    console.error("Fetch teams error", error);
    return [];
  }
};

// Thành phần hiển thị từng dòng dữ liệu team
interface Teams {
  _id: string;
  teamName: string;
  members: any[];
  createdAt: string;
  updatedAt: string;
}

const TeamRow = ({team}: { team: Teams}) => {
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
      router.push(`/(user-detail)/${leader?.userId}`);
    }, [router, team._id]);

  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.cell} onPress={handleNavigateToTeamDetail}>
        <Text style={styles.cell}>{team.teamName || "Unnamed Team"}</Text>
      </TouchableOpacity>
      <Text style={styles.cell}>{team.members.length || 0}</Text>
      <TouchableOpacity style={styles.cell} onPress={handleNavigateToUserDetail}>
        <Text style={styles.cell}>{leaderName || "No leader"}</Text>
      </TouchableOpacity>
      <Text style={styles.cell}>{new Date(team.createdAt).toLocaleDateString()}</Text>
      <Text style={styles.cell}>{new Date(team.updatedAt).toLocaleDateString()}</Text>
    </View>
  );
};

const App = () => {
  const [teams, setTeams] = useState<Teams[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { width } = useWindowDimensions();
  const isSmallScreen = width < 500;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        const data = await handleGetTeams();
        setTeams(data);
      } catch (err) {
        setError("Failed to fetch teams");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleEdit = (teamId: any) => {
    console.log(`Edit team ${teamId}`);
  };

  const handleDelete = (teamId: any) => {
    console.log(`Delete team ${teamId}`);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading teams...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={isSmallScreen}>
        <View style={styles.table}>
          {/* Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Team Name</Text>
            <Text style={styles.headerCell}>Members</Text>
            <Text style={styles.headerCell}>Leader</Text>
            <Text style={styles.headerCell}>Created At</Text>
            <Text style={styles.headerCell}>Updated At</Text>
          </View>

          {/* Rows */}
          <FlatList
            data={teams}
            renderItem={({ item }) => (
              <TeamRow team={item}/>
            )}
            keyExtractor={(item) => item._id.toString()} // Đảm bảo key là string
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#f3f4f6",
  },
  table: {
    width: "100%",
    minWidth: 500,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#2d3748",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default App;
