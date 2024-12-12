import CreateTaskButton from "@/components/btn-create-task";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const CreateTeamScreen = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Member 1", value: "en" },
    { label: "Member 2", value: "de" },
    { label: "Member 3", value: "fr" },
  ]);

  const handlePress = async () => {
    router.push("/(tabs)/(teams)");
  };

  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Team Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Team Name"
            placeholderTextColor="#98A2B3"
            // onChangeText={setTaskName}
          />
        </View>

        <View style={{ zIndex: 2 }}>
          <Text style={styles.title}>Members</Text>

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
      </View>
      <CreateTaskButton label="Create Task" onChangePress={handlePress} />
    </View>
  );
};

export default CreateTeamScreen;

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
