import api from "@/api";
import Tasks from "@/app/tasks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
const { format } = require("date-fns");

type Task = {
  _id: string;
  taskName: string;
  taskStatus: string;
  priority: string;
  deadline: string;
  createdAt: string;
};

type MarkedDate = {
  [date: string]: {
    startingDay?: boolean;
    endingDay?: boolean;
    color?: string;
    textColor?: string;
    marked?: boolean;
    dotColor?: string;
  };
};

const CalendarScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [markedDates, setMarkedDates] = useState<MarkedDate>({});
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);

  const convertToISOFormat = (dateStr: string): string => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("-");
    return `${year}-${month}-${day}`;
  };

  const getDatesBetween = (startDate: string, endDate: string): string[] => {
    const convertToDateObject = (dateStr: string): Date => {
      const [day, month, year] = dateStr.split("-");
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    };

    const dates: string[] = [];
    const currentDate = convertToDateObject(startDate);
    const end = convertToDateObject(endDate);

    // while (currentDate <= end) {
    //   dates.push(currentDate.toISOString().split("T")[0]);
    //   currentDate.setDate(currentDate.getDate() + 1);
    // }
    // dates.push(currentDate.toString()[0]);

    while (currentDate <= end) {
      dates.push(format(currentDate, "yyyy-MM-dd"));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  useEffect(() => {
    const taskInfo = async () => {
      const teamId = await AsyncStorage.getItem("currentTeamId");

      if (!teamId) return;

      try {
        const response = await api.get(`/tasks/workspace/${teamId}`);
        const tasksData = response.data;

        setTasks(tasksData);

        const newMarkedDates: MarkedDate = {};
        tasksData.forEach((task: Task) => {
          const dates = getDatesBetween(task.createdAt, task.deadline);
          // console.log(dates);

          dates.forEach((date, index) => {
            newMarkedDates[date] = {
              ...(newMarkedDates[date] || {}),
              color: "blue",
              textColor: "white",
            };
            if (index === 0) {
              newMarkedDates[date].startingDay = true;
            }
            if (index === dates.length - 1) {
              newMarkedDates[date].endingDay = true;
            }
          });
        });

        setMarkedDates(newMarkedDates);
      } catch (error) {
        console.log("Error call API:", error);
      }
    };
    taskInfo();
  }, [tasks]);
  // console.log(tasks);

  const onDayPress = (day: { dateString: string }) => {
    const selectedDate = day.dateString;
    const tasksForSelectedDate = tasks.filter((task) => {
      const taskStartDate = task.createdAt;
      const taskEndDate = task.deadline;
      const dates = getDatesBetween(taskStartDate, taskEndDate);

      return dates.includes(selectedDate);
    });

    setSelectedTasks(tasksForSelectedDate);
  };

  return (
    <View style={calendarScreenStyles.container}>
      <Calendar
        markingType={"period"}
        markedDates={markedDates}
        // theme={{
        //   selectedDayBackgroundColor: "blue",
        //   selectedDayTextColor: "#ffffff",
        //   todayTextColor: "red",
        //   arrowColor: "blue",
        // }}
        onDayPress={onDayPress}
        style={calendarScreenStyles.calendar}
      />
      <View style={{ gap: 10 }}>
        <Text style={calendarScreenStyles.infoTitle}>Selected Task</Text>

        {selectedTasks.map((task, index) => (
          <Tasks
            key={index}
            _id={task._id}
            taskName={task.taskName}
            taskStatus={task.taskStatus}
            taskPriority={task.priority}
            deadline={task.deadline}
          />
        ))}
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
