import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import CalendarFillIcon from "../assets/images/calendar-fill-icon.svg";
import { useRouter } from "expo-router";

interface taskInfoProps {
  taskName: string;
  taskStatus: string;
  taskPriority: string;
  deadline: string;
}

const Tasks = ({
  taskName,
  taskStatus,
  taskPriority,
  deadline,
}: taskInfoProps) => {
  const router = useRouter();

  const handlePress = () => {
    router.push("/task-details");
  };

  return (
    <TouchableOpacity onPress={handlePress} style={taskInfoStyles.taskInfo}>
      <Text style={taskInfoStyles.taskTitle}>{taskName}</Text>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <Text style={taskInfoStyles.taskTag}>{taskStatus}</Text>
        <Text style={taskInfoStyles.taskTag}>{taskPriority}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={taskInfoStyles.members}>
          <Text style={taskInfoStyles.numberMembers}>+3</Text>
        </View>
        <View style={taskInfoStyles.taskDeadline}>
          <CalendarFillIcon width={16} height={16} color="#D0D5DD" />
          <Text style={taskInfoStyles.textDeadline}>{deadline}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Tasks;

const taskInfoStyles = StyleSheet.create({
  taskInfo: {
    padding: 12,
    // marginTop: 12,
    gap: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderColor: "#EAECF0",
    borderWidth: 1,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: "500",
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

  members: {
    padding: 9,
    width: 35,
    backgroundColor: "white",
    borderRadius: 100,
  },
  numberMembers: { textAlign: "center", fontSize: 12 },

  iconStyles: {
    width: 16,
    height: 16,
    // backgroundColor: "#D0D5DD"
  },
  taskDeadline: {
    flexDirection: "row",
    paddingVertical: 9,
    paddingHorizontal: 14,
    gap: 2,
    backgroundColor: "white",
    borderRadius: 100,
  },
  textDeadline: {
    fontSize: 10,
    fontWeight: "500",
    color: "#101828",
  },
});
