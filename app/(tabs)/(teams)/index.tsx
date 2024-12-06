import CreateTaskButton from "@/components/btn-create-task";
import WorkspaceItems from "@/components/workspace-items";
import { Link } from "expo-router";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  ScrollView,
} from "react-native";

const TeamsScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={teamsScreenStyles.container}>
          <View style={teamsScreenStyles.workspace}>
            <Text style={teamsScreenStyles.workspaceTitle}>
              Current Workspace
            </Text>
            <WorkspaceItems name="Personally" onChangePress={() => {}} />
          </View>
          <View style={teamsScreenStyles.workspace}>
            <Text style={teamsScreenStyles.workspaceTitle}>
              Other Workspace
            </Text>
            <WorkspaceItems name="Team 1" onChangePress={() => {}} />
            <WorkspaceItems name="Team 2" onChangePress={() => {}} />
            <WorkspaceItems name="Team 3" onChangePress={() => {}} />
          </View>
        </View>
      </ScrollView>

      <CreateTaskButton label="New Team" onChangePress={() => {}} />
    </View>
  );
};

export default TeamsScreen;

const teamsScreenStyles = StyleSheet.create({
  container: {
    marginVertical: 16,
    marginHorizontal: 12,
    gap: 12,
  },
  workspace: {
    padding: 12,
    gap: 15,
    borderRadius: 8,
    backgroundColor: "white",
  },
  workspaceTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
});
