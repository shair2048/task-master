import ActionButtons from "@/components/btn-optiton";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, useWindowDimensions } from "react-native";
import api from "@/api";

interface Account {
  _id: string;
  username: string;
  email: string;
  role: string;
  teams: any[];
  createdAt: string;
  updatedAt: string;
}

// Hàm lấy danh sách tài khoản từ API
const handleGetAccounts = async () => {
  try {
    const response = await api.get("/account"); // Endpoint cho danh sách tài khoản
    return response.data || [];
  } catch (error) {
    console.error("Fetch accounts error", error);
    return [];
  }
};

const AccountRow = ({ account }: { account: Account }) => {
  const router = useRouter();

  const handleNavigateToUserDetail = useCallback(() => {
    router.push(`/(user-detail)/${account._id}`);
  }, [router, account._id]);

  const handleEdit = async () => {
    try {
      const updatedAccount = { username: "newUsername" }; // Cập nhật dữ liệu tài khoản
      const response = await api.put(`/account/${account._id}`, updatedAccount);
      console.log("Updated account:", response);
    } catch (error) {
      console.error("Error editing account", error);
    }
  };
  
  const handleDelete = async () => {
    try {
      const response = await api.delete(`/account/${account._id}`);
      console.log("Deleted account:", response);
    } catch (error) {
      console.error("Error deleting account", error);
    }
  };
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.cell} onPress={handleNavigateToUserDetail}>
        <Text style={styles.cell}>{account.username}</Text>
      </TouchableOpacity>
      <Text style={styles.cell}>{account.email}</Text>
      <Text style={styles.cell}>{account.role}</Text>
      <Text style={styles.cell}>{account.teams.length || 0}</Text>
      <Text style={styles.cell}>{new Date(account.createdAt).toLocaleDateString()}</Text>
      <Text style={styles.cell}>{new Date(account.updatedAt).toLocaleDateString()}</Text>
      <View style={styles.cell}>
        <ActionButtons
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </View>
    </View>
  );
};

const AccountTable = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setIsLoading(true);
        const data = await handleGetAccounts();
        setAccounts(data);
      } catch (err) {
        setError("Failed to fetch accounts.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading accounts...</Text>
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
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Username</Text>
        <Text style={styles.headerCell}>Email</Text>
        <Text style={styles.headerCell}>Role</Text>
        <Text style={styles.headerCell}>Teams</Text>
        <Text style={styles.headerCell}>Created At</Text>
        <Text style={styles.headerCell}>Updated At</Text>
        <Text style={styles.headerCell}>Actions</Text>
      </View>

      <FlatList
        data={accounts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <AccountRow account={item} />}
      />
    </View>
  );
};

const App = () => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 500;

  return (
    <View style={styles.container}>
      <ScrollView horizontal={isSmallScreen}>
        <AccountTable />
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
