import React, { useLayoutEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList, useWindowDimensions, ScrollView } from "react-native";
import { router, SearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useSearchParams } from "expo-router/build/hooks";
import ActionButtons from "@/components/btn-optiton";


type Team = {
  id: string;
  name: string;
  description: string;
  progress: number;
  members: number;
  tasks: number;
  startDate: string;
  endDate: string;
};

const teams = [
  {
    id: "1",
    name: "First team",
    description: "Here you can say more details about your team or your team.",
    progress: 33,
    members: 3,
    tasks: 3,
    startDate: "2024-11-01",
    endDate: "2024-11-30",
  },
  {
    id: "2",
    name: "Second team",
    description: "This is details of your team.",
    progress: 75,
    members: 6,
    tasks: 10,
    startDate: "2024-12-01",
    endDate: "2024-12-15",
  },
  {
    id: "3",
    name: "Second team",
    description: "This is details of your team.",
    progress: 75,
    members: 5,
    tasks: 10,
    startDate: "2024-12-01",
    endDate: "2024-12-15",
  },
  {
    id: "4",
    name: "Second team",
    description: "This is details of your team.",
    progress: 75,
    members: 4,
    tasks: 10,
    startDate: "2024-12-01",
    endDate: "2024-12-15",
  },
  {
    id: "5",
    name: "Second team",
    description: "This is details of your team.",
    progress: 75,
    members: 3,
    tasks: 10,
    startDate: "2024-12-01",
    endDate: "2024-12-15",
  },
];

const tabs: TeamTab[] = [
  { title: "Tasks" },
  { title: "Members" },
];

type TeamTab = {
  title: string;
};

const tasks = [
  {
    id: "1",
    id_team: "1",
    name: "Design UI",
    description: "Create user interface designs for the app",
    assignee: "John Doe",
    progress: "to do",
    priority: "High",
    startDate: "2024-12-01",
    endDate: "2024-12-10",
  },
  {
    id: "2",
    id_team: "1",
    name: "Develop Backend",
    description: "Set up backend APIs",
    assignee: "Jane Smith",
    progress: "in process",
    priority: "Medium",
    startDate: "2024-12-05",
    endDate: "2024-12-20",
  },
  {
    id: "3",
    id_team: "1",
    name: "Develop Backend",
    description: "Set up environment",
    assignee: "Reed Miles",
    progress: "in process",
    priority: "Medium",
    startDate: "2024-12-05",
    endDate: "2024-12-20",
  },
];

const members = [
  {
    id: "1",
    id_team: "1",
    name: "John Doe",
    age: 28,
    task: "Design UI",
    role: "Leader",
  },
  {
    id: "2",
    id_team: "1",
    name: "Jane Smith",
    age: 30,
    task: "Develop Backend",
    role: "Personal",
  },
  {
    id: "3",
    id_team: "1",
    name: "Reed Miles",
    age: 26,
    task: "Develop Backend",
    role: "Personal",
  },
];


const renderTasksTable = (id_team: string) => {
  const filteredTasks = tasks.filter((task) => task.id_team === id_team);

  const handleEdit = () => {
    router.push(`/create-task`);
  };

  const handleDelete = () => {
    console.log(`Delete team ${filteredTasks.map(task => task.name).join(', ')}`);
  };

  return (
    <View style={Tablestyles.table}>
      {/* Header */}
      <View style={Tablestyles.tableHeader}>
        <Text style={Tablestyles.headerCell}>Name</Text>
        <Text style={Tablestyles.headerCell}>Description</Text>
        <Text style={Tablestyles.headerCell}>Assignee</Text>
        <Text style={Tablestyles.headerCell}>Progress</Text>
        <Text style={Tablestyles.headerCell}>Priority</Text>
        <Text style={Tablestyles.headerCell}>Start Date</Text>
        <Text style={Tablestyles.headerCell}>End Date</Text>
        <Text style={Tablestyles.headerCell}>Options</Text>
      </View>

      {/* Rows */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={Tablestyles.row}>
            <Text style={Tablestyles.cell}>{item.name}</Text>
            <Text style={Tablestyles.cell}>{item.description}</Text>
            <Text style={Tablestyles.cell}>{item.assignee}</Text>
            <Text style={Tablestyles.cell}>{item.progress}</Text>
            <Text style={Tablestyles.cell}>{item.priority}</Text>
            <Text style={Tablestyles.cell}>{item.startDate}</Text>
            <Text style={Tablestyles.cell}>{item.endDate}</Text>
            <Text style={Tablestyles.cell}>
              <ActionButtons onEdit={handleEdit} onDelete={handleDelete} />
            </Text>
          </View>
        )}
      />
    </View>
  );
};


const renderMembersTable = (id_team: string) => {
  const filteredMembers = members.filter((member) => member.id_team === id_team);

  const handleEdit = () => {
    router.push(`/create-user`);
  };

  const handleDelete = () => {
    console.log(`Delete team ${filteredMembers.map(member => member.name).join(', ')}`);
  };

  return (
    <View style={Tablestyles.table}>
      {/* Header */}
      <View style={Tablestyles.tableHeader}>
        <Text style={Tablestyles.headerCell}>Name</Text>
        <Text style={Tablestyles.headerCell}>Age</Text>
        <Text style={Tablestyles.headerCell}>Task</Text>
        <Text style={Tablestyles.headerCell}>Role</Text>
        <Text style={Tablestyles.headerCell}>Options</Text>
      </View>

      {/* Rows */}
      <FlatList
        data={filteredMembers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={Tablestyles.row}>
            <Text style={Tablestyles.cell}>{item.name}</Text>
            <Text style={Tablestyles.cell}>{item.age}</Text>
            <Text style={Tablestyles.cell}>{item.task}</Text>
            <Text style={Tablestyles.cell}>{item.role}</Text>
            <Text style={Tablestyles.cell}>
              <ActionButtons onEdit={handleEdit} onDelete={handleDelete} />
            </Text>
          </View>
        )}
      />
    </View>
  );
};


const TeamCard = ({ team }: { team: Team }) => {
  const handleEdit = () => {
    console.log(`Edit team ${team.name}`);
  };

  const handleDelete = () => {
    console.log(`Delete team ${team.name}`);
  };

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{team.name}</Text>
          <Text style={styles.description}>{team.description}</Text>
        </View>
        <ActionButtons onEdit={handleEdit} onDelete={handleDelete} />
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.label}>Progress</Text>
        <View style={styles.progressWrapper}>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, { width: `${team.progress}%` }]}
            />
          </View>
          <Text style={styles.progressText}>{team.progress}%</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.taskCount}>{team.tasks} Tasks, {team.members} Members</Text>
        <Text style={styles.dateRange}>
          {team.startDate} - {team.endDate}
        </Text>
      </View>
    </View>
  );
};

const TeamTab = ({ id_team }: { id_team: string }) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const { width } = useWindowDimensions(); 
  const isSmallScreen = width < 500;

  const renderTabContent = () => {
      if (selectedTab === 0) {
          return ( 
            <ScrollView horizontal={isSmallScreen}>
                  {renderTasksTable(id_team)}
            </ScrollView>
          );
      } else {
        return ( 
          <ScrollView horizontal={isSmallScreen}>
                {renderMembersTable(id_team)}
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
                      style={[
                          TabsStyles.tabItem,
                          selectedTab === index && TabsStyles.activeTab,
                      ]}
                      onPress={() => setSelectedTab(index)}
                  >
                      <Text
                          style={[
                              TabsStyles.tabTitle,
                              selectedTab === index && TabsStyles.activeTab,
                          ]}
                      >
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
  const searchParams = useSearchParams(); // Lấy id từ query
  const id = searchParams.get("id");

  // Tìm dự án tương ứng với id
  const team = teams.find((proj) => proj.id === id);

  if (!team) {
    return <Text>team not found!</Text>;
  }
  const navigation = useNavigation();

  useLayoutEffect(() => {
    // Dùng navigation.setOptions để thay đổi tiêu đề thanh tiêu đề của trang
    navigation.setOptions({
      title: team.name,  // Tên tiêu đề thanh header
    });
  }, [team, navigation]);

  return (
    <View style={styles.card}>
      <TeamCard team={team} />
      {id && <TeamTab id_team={id} />}
    </View>
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
