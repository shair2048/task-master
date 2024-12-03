import CreateTaskButton from '@/components/btn-create-task';
import ActionButtons from '@/components/btn-optiton';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;

interface Tag {
  title: string;
  value: number;
}

interface Project {
  id: number;
  name: string;
  progress: number;
  taskCount: number;
  deadline: string;
}

interface Task {
  id: number;
  name: string;
  project: string;
  priority: string;
  deadline: string;
}

const tags: Tag[] = [
  { title: "All", value: 8 },
  { title: "To do", value: 5 },
  { title: "In progress", value: 2 },
  { title: "Done", value: 1 },
];

const data = {
  labels: ['Low', 'Medium', 'High'],
  datasets: [
    {
      data: [5, 2, 1],
    },
  ],
};

const projects: Project[] = [
  { id: 1, name: "Project A", progress: 80, taskCount: 10, deadline: "2024-11-30" },
  { id: 2, name: "Project B", progress: 50, taskCount: 5, deadline: "2024-12-05" },
  { id: 2, name: "Project B", progress: 50, taskCount: 5, deadline: "2024-12-05" },
];

const tasks: Task[] = [
  { id: 1, name: "Task 1", project: "Project A", priority: "High", deadline: "2024-11-28" },
  { id: 2, name: "Task 2", project: "Project B", priority: "Medium", deadline: "2024-11-29" },
  { id: 2, name: "Task 2", project: "Project B", priority: "Medium", deadline: "2024-11-29" },
];

const DashboardScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={progressSummaryStyles.container}>
            <Text style={progressSummaryStyles.textTitle}>
              Summary of Work
            </Text>
            <Text style={progressSummaryStyles.textDescription}>
              Current task progress
            </Text>
            <View style={progressSummaryStyles.tagsStyles}>
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
          <View style={progressSummaryStyles.container}>
            <Text style={progressSummaryStyles.textTitle}>Task Priorities</Text>
            <Text style={progressSummaryStyles.textDescription}>
              Current task priorities
            </Text>
            <BarChart
              data={data}
              width={screenWidth - 50} 
              height={220}
              chartConfig={chartConfig}
              verticalLabelRotation={0}
              fromZero
              showBarTops={false}
              yAxisLabel=""
              yAxisSuffix=""
            />
          </View>
          <View style={wrapContainerStyles.container}>
            {/* Projects Near Deadline - Table */}
            <View style={wrapContainerStyles.containerItem}>
              <Text style={progressSummaryStyles.textTitle}>Projects Near Deadline</Text>
              <View style={tableStyles.table}>
                <View style={tableStyles.tableRow}>
                  <Text style={tableStyles.tableHeader}>Project Name</Text>
                  <Text style={tableStyles.tableHeader}>Progress</Text>
                  <Text style={tableStyles.tableHeader}>Tasks</Text>
                  <Text style={tableStyles.tableHeader}>Deadline</Text>
                  <Text style={tableStyles.tableHeader}>Option</Text>
                </View>
                {projects.map((project) => (
                  <View key={project.id} style={tableStyles.tableRow}>
                    <Text style={tableStyles.tableCell}>{project.name}</Text>
                    <Text style={tableStyles.tableCell}>{project.progress}%</Text>
                    <Text style={tableStyles.tableCell}>{project.taskCount}</Text>
                    <Text style={tableStyles.tableCell}>{project.deadline}</Text>
                    <View style={tableStyles.tableCell}>
                      <ActionButtons
                        onEdit={() => console.log(`Edit project ${project.id}`)}
                        onDelete={() => console.log(`Delete project ${project.id}`)}
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Tasks Near Deadline - Table */}
            <View style={wrapContainerStyles.containerItem}>
              <Text style={progressSummaryStyles.textTitle}>Tasks Near Deadline</Text>
              <View style={tableStyles.table}>
                <View style={tableStyles.tableRow}>
                  <Text style={tableStyles.tableHeader}>Task Name</Text>
                  <Text style={tableStyles.tableHeader}>Project</Text>
                  <Text style={tableStyles.tableHeader}>Priority</Text>
                  <Text style={tableStyles.tableHeader}>Deadline</Text>
                  <Text style={tableStyles.tableHeader}>Option</Text>
                </View>
                {tasks.map((task) => (
                  <View key={task.id} style={tableStyles.tableRow}>
                    <Text style={tableStyles.tableCell}>{task.name}</Text>
                    <Text style={tableStyles.tableCell}>{task.project}</Text>
                    <Text style={tableStyles.tableCell}>{task.priority}</Text>
                    <Text style={tableStyles.tableCell}>{task.deadline}</Text>
                    <View style={tableStyles.tableCell}>
                      <ActionButtons
                        onEdit={() => console.log(`Edit task ${task.id}`)}
                        onDelete={() => console.log(`Delete task ${task.id}`)}
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

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

const tableStyles = StyleSheet.create({
  table: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#EBECEE",
    borderRadius: 8,
  },
  tableRow: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EBECEE",
  },
  tableHeader: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475467",
    flex: 1,
  },
  tableCell: {
    fontSize: 12,
    fontWeight: "400",
    color: "#101828",
    flex: 1,
  },
});

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
  barPercentage: 2,
};

const wrapContainerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap", 
    justifyContent: "space-around", 
    gap: 12,
  },

  containerItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 8,
    flexBasis: "48%",
    maxWidth: "48%",  
    minWidth: 400,
    marginBottom: 12, 
  },
});