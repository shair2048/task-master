import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import CalendarFillIcon from "../assets/images/calendar-fill-icon.svg";

const TaskDetailScreen = () => {
  return (
    <View style={taskDetailScreenStyles.container}>
      <View>
        <View style={taskDetailScreenStyles.taskLabel}>
          <Text style={taskDetailScreenStyles.taskTitle}>
            Wiring Dashboard Analytics
          </Text>
          <TouchableOpacity>
            <Text style={taskDetailScreenStyles.taskTag}>In Progress</Text>
          </TouchableOpacity>
        </View>

        <Text style={taskDetailScreenStyles.dateCreated}>
          Created 27/11/2024
        </Text>
      </View>
      <View style={taskDetailScreenStyles.descriptionBlock}>
        <Text style={taskDetailScreenStyles.descriptionLabel}>Description</Text>
        <Text style={taskDetailScreenStyles.descriptionContent}>
          Create on boarding page based on pic, pixel perfect, with the user
          story of i want to know what kind of apps is this so i need to view
          onboarding screen to leverage my knowledge so that i know what kind of
          apps is this
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ gap: 4 }}>
          <Text style={taskDetailScreenStyles.descriptionLabel}>Priority</Text>
          <Text style={taskDetailScreenStyles.taskTag}>High</Text>
        </View>
        <View style={{ gap: 4 }}>
          <Text style={taskDetailScreenStyles.descriptionLabel}>Deadline</Text>
          <View>
            {/* <CalendarFillIcon width={16} height={16} color="#D0D5DD" /> */}
            <Text style={taskDetailScreenStyles.textDeadline}>01/12/2024</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TaskDetailScreen;

const taskDetailScreenStyles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 16,
    marginHorizontal: 12,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: "white",
    borderRadius: 8,
    gap: 16,
  },

  taskLabel: {
    flexDirection: "row",
    justifyContent: "space-between",

    // width: "100%",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
    flexWrap: "wrap",
  },
  taskTag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 12,
    fontWeight: "500",
    borderRadius: 100,
    backgroundColor: "#EAECF0",
    color: "#475467",
  },
  dateCreated: {
    fontSize: 12,
    fontWeight: "500",
    color: "#475467",
  },
  descriptionBlock: {
    padding: 12,
    gap: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EAECF0",
  },

  descriptionLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  descriptionContent: {
    fontSize: 14,
    fontWeight: "400",
    color: "#475467",
    textAlign: "justify",
  },

  // taskDeadline: {
  //   flexDirection: "row",
  //   paddingVertical: 9,
  //   paddingHorizontal: 14,
  //   gap: 2,
  //   backgroundColor: "white",
  //   borderRadius: 100,
  // },
  textDeadline: {
    fontSize: 12,
    fontWeight: "500",
    color: "#101828",
  },
});
