import Tasks from "@/app/tasks";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

const taskDates = {
  "2024-12-18": { startingDay: true, color: "blue", textColor: "white" },
  "2024-12-19": { color: "blue", textColor: "white" },
  "2024-12-20": {
    // selected: true,
    endingDay: true,
    color: "blue",
    textColor: "white",
  },
  "2024-12-23": { marked: true, dotColor: "blue" },
  "2024-12-24": { marked: true, dotColor: "blue" },
};

const CalendarScreen = () => {
  return (
    <View style={calendarScreenStyles.container}>
      <Calendar
        markingType={"period"}
        markedDates={taskDates}
        // onDayPress={onDayPress}
        // theme={{
        //   selectedDayBackgroundColor: "blue",
        //   selectedDayTextColor: "#ffffff",
        //   todayTextColor: "red",
        //   arrowColor: "blue",
        // }}
        style={calendarScreenStyles.calendar}
      />
      <View style={{ gap: 10 }}>
        <Text style={calendarScreenStyles.infoTitle}>Selected Task</Text>
        {/* <TouchableOpacity onPress={() => {}}>
          <Text style={calendarScreenStyles.taskTitle}>
            Wiring Dashboard Analytics
          </Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Text style={calendarScreenStyles.taskTag}>In Progress</Text>
            <Text style={calendarScreenStyles.taskTag}>High</Text>
          </View>
        </TouchableOpacity> */}
        <Tasks />
      </View>
    </View>
  );
};

export default CalendarScreen;

const calendarScreenStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginVertical: 16,
    marginHorizontal: 12,
    gap: 12,
    overflow: "hidden",
  },
  calendar: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#EAECF0",
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: "600",
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
});
