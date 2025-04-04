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

type MultiPeriodMarkedDates = {
  [date: string]: {
    periods: {
      startingDay?: boolean;
      endingDay?: boolean;
      color?: string;
      textColor?: string;
      marked?: boolean;
      dotColor?: string;
    }[];
  };
};

const CalendarScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [markedDates, setMarkedDates] = useState<MultiPeriodMarkedDates>({});
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);

  const getTaskColor = (index: number) => {
    const colors = ["#5f9ea0", "#ffa500", "#f0e68c", "#ff6347", "#9370db"];
    return colors[index % colors.length];
  };

  const getDatesBetween = (startDate: string, endDate: string): string[] => {
    const convertToDateObject = (dateStr: string): Date => {
      const [day, month, year] = dateStr.split("-");
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    };

    const dates: string[] = [];
    const currentDate = convertToDateObject(startDate);
    const end = convertToDateObject(endDate);

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

        const newMarkedDates: MultiPeriodMarkedDates = {};

        tasksData.forEach((task: Task, index: number) => {
          const dates = getDatesBetween(task.createdAt, task.deadline);
          const periodColor = getTaskColor(index);

          dates.forEach((date) => {
            if (!newMarkedDates[date]) {
              newMarkedDates[date] = { periods: [] };
            }

            const periodsArray = newMarkedDates[date].periods;

            // Thêm placeholder cho đến khi vị trí index tồn tại
            while (periodsArray.length <= index) {
              periodsArray.push({ color: "transparent" });
            }

            periodsArray[index] = { color: periodColor };
          });
        });

        setMarkedDates(newMarkedDates);
      } catch (error) {
        console.log("Error call API:", error);
      }
    };
    taskInfo();
  }, [tasks]);

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
        markingType={"multi-period"}
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
