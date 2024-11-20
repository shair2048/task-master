import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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

interface BtnInfo {
  label: string;
  title: string;
}

const btnInfos: BtnInfo[] = [
  { label: "Assign To", title: "Select Member" },
  { label: "Priority", title: "Select Priority" },
  { label: "Difficulty", title: "Select Difficulty" },
];

const taskPriorityLabels = [
  { label: "Low" },
  { label: "Medium" },
  { label: "High" },
];

const CreateTaskScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <Provider>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Task Title</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Task Title"
              placeholderTextColor="#98A2B3"
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
            />
          </View>
          {/* <View>
        <Text style={styles.title}>Assign To</Text>
        <RadioBtn radioLabels={taskPriorityLabels} />
        <TouchableOpacity style={btnStyles.container}>
          <Text style={btnStyles.btnTitle}>Select Member</Text>
          <ArrowDown />
        </TouchableOpacity>
      </View> */}
          {btnInfos.map((btnInfo, index) => (
            <View key={index}>
              <Text style={styles.title}>{btnInfo.label}</Text>
              <TouchableOpacity onPress={showModal} style={btnStyles.container}>
                <Text style={btnStyles.btnTitle}>{btnInfo.title}</Text>
                <ArrowDown />
              </TouchableOpacity>
            </View>
          ))}
          <Portal>
            <Modal
              // animationType="slide"
              // transparent={true}
              // backdropOpacity={0.5}
              // visible={modalVisible}
              // onRequestClose={() => setModalVisible(false)}

              visible={modalVisible}
              onDismiss={hideModal}
              contentContainerStyle={modalStyles.container}
            >
              {/* <View style={modalStyles.container}> */}
              <RadioBtn radioLabels={taskPriorityLabels} />

              <View style={modalStyles.btnModalStyles}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={[
                    modalStyles.btnModalItem,
                    { borderColor: "#6938EF", borderWidth: 1 },
                  ]}
                >
                  <Text style={[modalStyles.textStyles, { color: "#6938EF" }]}>
                    Close
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={[
                    modalStyles.btnModalItem,
                    { backgroundColor: "#6938EF" },
                  ]}
                >
                  <Text style={[modalStyles.textStyles, { color: "white" }]}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
              {/* </View> */}
            </Modal>
          </Portal>
        </View>
      </ScrollView>
      <CreateTaskButton />
    </Provider>
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
