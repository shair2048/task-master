import React, { useState, useLayoutEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList, useWindowDimensions, ScrollView } from "react-native";
import { useSearchParams } from "expo-router/build/hooks";
import { useNavigation } from "@react-navigation/native";
import ActionButtons from "@/components/btn-optiton";
import BlockButton from "@/components/btn-block";
import { router } from "expo-router";

type User = {
  id: string;
  name: string;
  account_name: string;
  date_of_birth: string;
  phone_number: string;
  address: string;
  s_role: string;
};

type Project = {
  id: string;
  id_user: string;
  name: string;
  description: string;
  progress: number;
  members: number;
  tasks: number;
  startDate: string;
  endDate: string;
};

type Task = {
  id: string;
  id_project: string;
  name: string;
  description: string;
  assignee: string;
  progress: string;
  priority: string;
  startDate: string;
  endDate: string;
};

const users: User[] = [
  { id: "1", name: "John Doe", account_name: "johndoe", date_of_birth: "1990-01-15", phone_number: "123456789", address: "123 Main St, City", s_role: "User" },
  { id: "2", name: "Jane Smith", account_name: "janesmith", date_of_birth: "1995-05-20", phone_number: "987654321", address: "456 Elm St, City", s_role: "User" },
];

const projects: Project[] = [
  { id: "1", id_user: "1", name: "First Project", description: "Details about your project", progress: 33, members: 3, tasks: 3, startDate: "2024-11-01", endDate: "2024-11-30" },
  { id: "2", id_user: "1", name: "Second Project", description: "More details about this project", progress: 75, members: 6, tasks: 10, startDate: "2024-12-01", endDate: "2024-12-15" },
];

const tasks: Task[] = [
  { id: "1", id_project: "1", name: "Design UI", description: "Create user interface designs", assignee: "John Doe", progress: "to do", priority: "High", startDate: "2024-12-01", endDate: "2024-12-10" },
  { id: "2", id_project: "1", name: "Develop Backend", description: "Set up backend APIs", assignee: "Jane Smith", progress: "in process", priority: "Medium", startDate: "2024-12-05", endDate: "2024-12-20" },
];

// Component to render tasks for a specific project
const TaskList = ({ projectId }: { projectId: string }) => {
  const filteredTasks = tasks.filter((task) => task.id_project === projectId);

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
      {filteredTasks.length > 0 ? (
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
                <ActionButtons
                  onEdit={() => router.push(`/create-member`)}
                  onDelete={() => console.log(`Delete task ${item.name}`)}
                />
              </Text>
            </View>
          )}
        />
      ) : (
        <Text style={{ textAlign: "center", padding: 10, color: "#888" }}>
          No tasks available for this project.
        </Text>
      )}
    </View>
  );
};


// Component to render projects with dropdown
const ProjectList = ({ userId }: { userId: string }) => {
  const userProjects = projects.filter((project) => project.id_user === userId);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { width } = useWindowDimensions(); 
  const isSmallScreen = width < 500;

  const toggleDropdown = (projectId: string) => {
    setExpanded(expanded === projectId ? null : projectId);
  };

  return (
    <View>
      {userProjects.map((project) => (
        <View key={project.id} style={styles.card}>
          <TouchableOpacity onPress={() => toggleDropdown(project.id)} style={styles.projectHeader}>
            <Text style={styles.projectTitle}>{project.name}</Text>
            <Text style={styles.projectDescription}>{project.description}</Text>
          </TouchableOpacity>
          <ScrollView horizontal={isSmallScreen}>
            {expanded === project.id && <TaskList projectId={project.id} />}
          </ScrollView>
        </View>
      ))}
    </View>
  );
};

const ProjectCard = ({ user, id }: { user: User, id: string }) => {
  const handleEdit = () => {
    router.push(`/create-member`);
  };

  const handleDelete = () => {
    console.log(`Delete project ${user.name}`);
  };

  const handleBlock = () => {
    console.log(`Block user ${user.name}`);
  }

  return (
    <View style={UserStyles.card}>
      {/* Header */}
      <View style={styles.card}>
        <View style={UserStyles.header}>
          <View style={{ flex: 1 }}>
            <Text style={UserStyles.title}>{user.name}</Text>
            <Text style={UserStyles.description}>{user.account_name}</Text>
          </View>
          <ActionButtons onEdit={handleEdit} onDelete={handleDelete} />
          <BlockButton onBlock={handleBlock} />
        </View>

        {/* Body */}
        <View style={UserStyles.body}>
          <Text style={styles.userDetails}>DOB: {user.date_of_birth}</Text>
          <Text style={styles.userDetails}>Phone: {user.phone_number}</Text>
          <Text style={styles.userDetails}>Address: {user.address}</Text>
          <Text style={styles.userDetails}>Role: {user.s_role}</Text>
        </View>

        {/* Footer */}
        <View style={UserStyles.footer}>
          <Text style={UserStyles.taskCount}> Projects, Tasks</Text>
        </View>
      </View>
      <View style={TabsStyles.container}> 
        <View style={TabsStyles.tabItem}>
          <Text style={TabsStyles.tabTitle}>Projects</Text>
        </View>
      </View>
      <ProjectList userId={id} />
    </View>
  );
};

const UserDetail = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const user = users.find((u) => u.id === id);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    if (user) {
      navigation.setOptions({ title: user.name });
    }
  }, [user, navigation]);

  if (!user) {
    return <Text>User not found!</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <ProjectCard user={user} id={id} />
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
