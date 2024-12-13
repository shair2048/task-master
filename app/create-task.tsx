import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import React, { useState } from "react";
import CreateTaskButton from "../components/btn-create-task";
import {
  Modal,
  Portal,
  Provider,
  RadioButton,
  TouchableRipple,
} from "react-native-paper";
import RadioBtn from "../components/radio-btn";
import ArrowDown from "../assets/images/arrow-down.svg";
// import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import api from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface BtnInfo {
  label: string;
  title: string;
}

const btnInfos: BtnInfo[] = [
  { label: "Assign To", title: "Select Member" },
  { label: "Priority", title: "Select Priority" },
  { label: "Deadline", title: "Select Deadline" },
];

const taskPriorityLabels = [
  { label: "Low" },
  { label: "Medium" },
  { label: "High" },
];

const CreateTaskScreen = () => {
  const router = useRouter();

  // Task Information
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  // Priority Dropdown
  const [openPriority, setOpenPriority] = useState(false);
  const [priority, setValuePriority] = useState(null);
  const [itemsPriority, setItemsPriority] = useState([
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
  ]);

  // Assign To Dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "English", value: "en" },
    { label: "Deutsch", value: "de" },
    { label: "French", value: "fr" },
  ]);

  // const showModal = () => setModalVisible(true);
  // const hideModal = () => setModalVisible(false);

  // Date and Time Picker
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<"date" | "time">("date");
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isTimeSelected, setIsTimeSelected] = useState(false);

  const [error, setError] = useState("");

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      if (mode === "date") {
        setIsDateSelected(true);
      }

      if (mode === "time") {
        setIsTimeSelected(true);
      }
    }
  };

  const showDatePicker = () => {
    setMode("date");
    setShow(true);
  };

  const showTimePicker = () => {
    setMode("time");
    setShow(true);
  };

  const dateString = date.toLocaleDateString();
  const timeString = date.toLocaleTimeString();

  const handleCreateTask = async () => {
    const id = await AsyncStorage.getItem("userId");

    try {
      // Kết hợp date và time vào deadline
      const combinedDeadline = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      );

      const deadline = combinedDeadline.toISOString();

      // console.log("userId:", id);
      // console.log("taskName:", taskName);
      // console.log("taskDescription:", taskDescription);
      // console.log("priority:", priority);
      // console.log("deadline:", deadline);

      await api.post(`/tasks/user/${id}`, {
        taskName,
        taskDescription,
        priority,
        deadline,
      });

      router.push("/(tabs)/(tasks)");
    } catch (err) {
      setError("Create task failed");
    }
  };

  return (
    // <ScrollView>
    <View>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Task Title</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Task Title"
            placeholderTextColor="#98A2B3"
            onChangeText={setTaskName}
          />
        </View>
        <View>
          <Text style={styles.title}>Task Description</Text>
          <TextInput
            style={[styles.textInput, { height: 100 }]}
            placeholder="Enter Task Description"
            placeholderTextColor="#98A2B3"
            multiline={true}
            numberOfLines={5}
            onChangeText={setTaskDescription}
          />
        </View>

        {/* {btnInfos.map((btnInfo, index) => (
          <View key={index}>
            <Text style={styles.title}>{btnInfo.label}</Text>
            <TouchableOpacity onPress={showModal} style={btnStyles.container}>
              <Text style={btnStyles.btnTitle}>{btnInfo.title}</Text>
              <ArrowDown />
            </TouchableOpacity>
          </View>
        ))} */}
        <View style={{ zIndex: 2 }}>
          <Text style={styles.title}>Assign To</Text>

          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select Member"
            style={btnStyles.container}
            dropDownDirection="BOTTOM"
          />
        </View>
        <View style={{ zIndex: 1 }}>
          <Text style={styles.title}>Priority</Text>

          <DropDownPicker
            open={openPriority}
            value={priority}
            items={itemsPriority}
            setOpen={setOpenPriority}
            setValue={setValuePriority}
            setItems={setItemsPriority}
            placeholder="Select Priority"
            style={btnStyles.container}
            dropDownDirection="BOTTOM"
          />
        </View>
        <View style={{ zIndex: 0 }}>
          <Text style={styles.title}>Select Deadline Date</Text>

          <TouchableOpacity
            onPress={showDatePicker}
            style={btnStyles.container}
          >
            <Text style={btnStyles.btnTitle}>
              {!isDateSelected ? "Select Date" : dateString}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ zIndex: 0 }}>
          <Text style={styles.title}>Select Deadline Time</Text>

          <TouchableOpacity
            onPress={showTimePicker}
            style={btnStyles.container}
          >
            <Text style={btnStyles.btnTitle}>
              {!isTimeSelected ? "Select Time" : timeString}
            </Text>
          </TouchableOpacity>
        </View>

        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            // display={Platform.OS === "ios" ? "spinner" : "default"} // Spinner cho iOS
            onChange={onChange}
          />
        )}
      </View>
      <CreateTaskButton label="Create Task" onChangePress={handleCreateTask} />
    </View>

    // </ScrollView>
  );
};

export default CreateTaskScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginVertical: 16,
    marginHorizontal: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 16,
    backgroundColor: "white",
    borderRadius: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: "400",
    color: "#475467",
    marginBottom: 4,
  },
  textInput: {
    height: 44,
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#98A2B3",
    // height: 200,
    textAlignVertical: "top",
  },
});

const btnStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    height: 44,
    borderRadius: 8,
    borderColor: "#98A2B3",
    borderWidth: 1,
  },
  btnTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#101828",
  },
});

const modalStyles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingHorizontal: 24,
    backgroundColor: "white",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    gap: 32,
    // height: 400,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },

  btnModalStyles: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    gap: 12,
  },
  btnModalItem: {
    flex: 1,
    height: 48,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyles: {
    fontSize: 14,
    fontWeight: "500",
  },
});
