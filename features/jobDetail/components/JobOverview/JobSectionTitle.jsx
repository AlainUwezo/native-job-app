import { Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";

const JobSectionTitle = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: "bold" },
});

export default JobSectionTitle;
