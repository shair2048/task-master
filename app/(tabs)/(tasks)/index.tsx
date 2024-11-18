import CreateTaskButton from "@/components/btn-create-task";
import Tasks from "@/app/tasks";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

interface Tag {
  title: string;
  value: number;
}
interface ProgressTab {
  title: string;
}

const tags: Tag[] = [
  { title: "To do", value: 5 },
  { title: "In progress", value: 2 },
  { title: "Done", value: 1 },
];

const TasksScreen = () => {
  const [selectedProgressTab, setSelectedProgressTab] = useState<number>(0);

  const tabs: ProgressTab[] = [
    { title: "All" },
    { title: "In Progress" },
    { title: "Finish" },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={progressSummaryStyles.container}>
            <Text style={progressSummaryStyles.textTitle}>
              Summary of Your Work
            </Text>
            <Text style={progressSummaryStyles.textDescription}>
              Your current task progress
            </Text>
            <View style={progressSummaryStyles.tagsStyles}>
              {/* <View style={progressSummaryStyles.tagItem}>
            <Text style={progressSummaryStyles.tagTitle}>To do</Text>
            <Text style={progressSummaryStyles.tagValue}>5</Text>
          </View>
          <View style={progressSummaryStyles.tagItem}>
            <Text style={progressSummaryStyles.tagTitle}>In progress</Text>
            <Text style={progressSummaryStyles.tagValue}>2</Text>
          </View>
          <View style={progressSummaryStyles.tagItem}>
            <Text style={progressSummaryStyles.tagTitle}>Done</Text>
            <Text style={progressSummaryStyles.tagValue}>1</Text>
          </View> */}

              {tags.map((tag, index) => (
                <View key={index} style={progressSummaryStyles.tagItem}>
                  <Text style={progressSummaryStyles.tagTitle}>
                    {tag.title}
                  </Text>
                  <Text style={progressSummaryStyles.tagValue}>
                    {tag.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View style={progressTabsStyles.container}>
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  progressTabsStyles.tabItem,
                  selectedProgressTab === index && {
                    backgroundColor: "#7A5AF8",
                  },
                ]}
                onPress={() => {
                  setSelectedProgressTab(index);
                  // onTabPress(index);
                }}
              >
                <Text
                  style={[
                    progressTabsStyles.tabTitle,
                    selectedProgressTab === index && { color: "white" },
                  ]}
                >
                  {tab.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Tasks />
          <Tasks />
          <Tasks />
          <Tasks />
          <Tasks />
        </View>
      </ScrollView>
      <CreateTaskButton />
    </View>
  );
};

export default TasksScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 16,
    marginVertical: 16,
    marginHorizontal: 12,
  },
});

const progressSummaryStyles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 8,
  },
  textTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  textDescription: {
    fontSize: 12,
    fontWeight: "400",
  },
  tagsStyles: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  tagItem: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
    padding: 12,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    borderColor: "#EBECEE",
    borderWidth: 1,
  },

  tagTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#475467",
  },
  tagValue: {
    fontSize: 20,
    fontWeight: "400",
    color: "#101828",
  },
});

const progressTabsStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 4,
    borderRadius: 32,
    backgroundColor: "white",
    height: 36,
  },
  tabItem: {
    flex: 1,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  tabTitle: {
    fontSize: 12,
    fontWeight: "500",
  },
});
