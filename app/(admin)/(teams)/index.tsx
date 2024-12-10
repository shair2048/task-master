import ActionButtons from "@/components/btn-optiton";
import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView, useWindowDimensions, TouchableOpacity } from "react-native";
import { Link, useRouter } from 'expo-router';

const teams = [
  {
    id: "1",
    name: "First team",
    progress: 33,
    members: 3,
    tasks: 3,
    startDate: "2024-11-01",
    endDate: "2024-11-30",
  },
  {
    id: "2",
    name: "Second team",
    progress: 75,
    members: 3,
    tasks: 10,
    startDate: "2024-12-01",
    endDate: "2024-12-15",
  },
  {
    id: "3",
    name: "Third team",
    progress: 50,
    members: 7,
    tasks: 5,
    startDate: "2024-11-15",
    endDate: "2024-12-10",
  },
  {
    id: "4",
    name: "Fourth team",
    progress: 20,
    members: 4,
    tasks: 6,
    startDate: "2024-12-01",
    endDate: "2024-12-20",
  },
];

interface Team {
  id: string;
  name: string;
  progress: number;
  members: number;
  tasks: number;
  startDate: string;
  endDate: string;
}

const TeamRow = ({ team }: { team: Team }) => {
  const router = useRouter(); // Khởi tạo useRouter

  const handleEdit = () => {
    router.push(`/create-team`); 
  };

  const handleDelete = () => {
    console.log(`Delete team ${team.name}`);
  };

  const handleNavigateToDetail = () => {
    // Điều hướng tới trang chi tiết dự án
    router.push(`/(team-detail)/${team.id}` as any);
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.cell} onPress={handleNavigateToDetail}>
        <Text style={styles.cell}>{team.name}</Text>
      </TouchableOpacity>
      <Text style={styles.cell}>{team.progress}%</Text>
      <Text style={styles.cell}>{team.members}</Text>
      <Text style={styles.cell}>{team.tasks}</Text>
      <Text style={styles.cell}>{team.startDate}</Text>
      <Text style={styles.cell}>{team.endDate}</Text>
      <View style={styles.cell}>
        <ActionButtons onEdit={handleEdit} onDelete={handleDelete} />
      </View>
    </View>
  );
};


const App = () => {
  const { width } = useWindowDimensions(); // Lấy chiều rộng màn hình
  const isSmallScreen = width < 500; // Kiểm tra nếu chiều rộng nhỏ hơn 500

  return (
    <View style={styles.container}>
      <ScrollView horizontal={isSmallScreen}>
        <View style={styles.table}>
          {/* Header */}
            <View style={styles.tableHeader}>
              <Text style={styles.headerCell}>Team Name</Text>
              <Text style={styles.headerCell}>Progress</Text>
              <Text style={styles.headerCell}>Members</Text>
              <Text style={styles.headerCell}>Tasks</Text>
              <Text style={styles.headerCell}>Start Date</Text>
              <Text style={styles.headerCell}>End Date</Text>
              <Text style={styles.headerCell}>Actions</Text>
            </View>
      
            {/* Rows */}
            <FlatList
              data={teams}
              renderItem={({ item }) => <TeamRow team={item} />}
              keyExtractor={(item) => item.id}
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
});

export default App;