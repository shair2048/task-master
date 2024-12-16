import api from "@/api";
import CreateTaskButton from "@/components/btn-create-task";
import WorkspaceItems from "@/components/workspace-items";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  ScrollView,
} from "react-native";

const TeamsScreen = () => {
  const router = useRouter();

  type Team = {
    _id: string;
    teamName: string;
  };

  const [teams, setTeams] = useState<Team[]>([]);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);

  useEffect(() => {
    const teamsInfo = async () => {
      const id = await AsyncStorage.getItem("userId");

      if (!id) return;

      try {
        const response = await api.get(`/teams/user/${id}`);

        setTeams(response.data);

        if (response.data.length > 0) {
          setCurrentTeam(response.data[0]);
        }
      } catch (error) {
        console.log("Error call API:", error);
      }
    };
    teamsInfo();
  }, [teams]);

  const handlePress = async () => {
    router.push("/create-team");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={teamsScreenStyles.container}>
          <View style={teamsScreenStyles.workspace}>
            <Text style={teamsScreenStyles.workspaceTitle}>
              Current Workspace
            </Text>
            {/* <WorkspaceItems name={currentTeam} onChangePress={() => {}} /> */}
            {currentTeam && (
              <WorkspaceItems
                name={currentTeam.teamName}
                onChangePress={() => {}}
              />
            )}
          </View>
          <View style={teamsScreenStyles.workspace}>
            <Text style={teamsScreenStyles.workspaceTitle}>
              Other Workspace
            </Text>

            {teams.map((team, index) => (
              <WorkspaceItems
                key={index}
                name={team.teamName}
                onChangePress={() => {
                  setCurrentTeam(team);

                  setTeams((prevTeams) => {
                    const updatedTeams = prevTeams.filter(
                      (t) => t.teamName !== team.teamName
                    );
                    return [team, ...updatedTeams];
                  });
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <CreateTaskButton label="New Team" onChangePress={handlePress} />
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
