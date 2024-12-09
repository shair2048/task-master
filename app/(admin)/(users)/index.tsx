import ActionButtons from "@/components/btn-optiton";
import { router, useRouter } from "expo-router";
import React from "react";
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, ScrollView, Dimensions, useWindowDimensions } from "react-native";

const users = [
  {
    id: "1",
    name: "John Doe",
    account_name: "johndoe",
    date_of_birth: "1990-01-15",
    phone_number: "123456789",
    address: "123 Main St, City",
    s_role: "User",
  },
  {
    id: "2",
    name: "Jane Smith",
    account_name: "janesmith",
    date_of_birth: "1995-05-20",
    phone_number: "987654321",
    address: "456 Elm St, City",
    s_role: "User",
  },
  {
    id: "3",
    name: "Reed Miles",
    account_name: "reedmiles",
    date_of_birth: "1994-03-28",
    phone_number: "3454366754",
    address: "456 Elm St, City",
    s_role: "User",
  },
  {
    id: "4",
    name: "ZZZ",
    account_name: "zzz",
    date_of_birth: "1995-05-20",
    phone_number: "987654321",
    address: "456 Elm St, City",
    s_role: "Admin",
  },
  
];

const UserTable = () => {
  const router = useRouter();

  const handleEdit = (user: any) => {
    router.push(`/create-member`);
  };

  const handleDelete = (user: any) => {
    console.log(`Delete project ${user.name}`);
  };

  const handleNavigateToDetail = (id: string) => {
    // Điều hướng tới trang chi tiết dự án, truyền id qua URL
    router.push(`/(user-detail)/${id}`);
  };

  const renderUserRow = ({ item }: { item: any }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      {/* Sử dụng `item` đúng cách để truyền id qua hàm điều hướng */}
      <TouchableOpacity style={styles.cell} onPress={() => handleNavigateToDetail(item.id)}>
        <Text style={styles.cell}>{item.name}</Text>
      </TouchableOpacity>
      <Text style={styles.cell}>{item.account_name}</Text>
      <Text style={styles.cell}>{item.date_of_birth}</Text>
      <Text style={styles.cell}>{item.phone_number}</Text>
      <Text style={styles.cell}>{item.address}</Text>
      <Text style={styles.cell}>{item.s_role}</Text>
      <View style={styles.cell}>
        <ActionButtons onEdit={() => handleEdit(item)} onDelete={() => handleDelete(item)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>ID</Text>
        <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCell}>Account</Text>
        <Text style={styles.headerCell}>DOB</Text>
        <Text style={styles.headerCell}>Phone</Text>
        <Text style={styles.headerCell}>Address</Text>
        <Text style={styles.headerCell}>Sub Role</Text>
        <Text style={styles.headerCell}>Options</Text>
      </View>

      {/* Rows */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUserRow}
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
        <UserTable />
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