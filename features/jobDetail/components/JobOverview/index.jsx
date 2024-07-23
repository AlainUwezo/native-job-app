import { Text } from "@rneui/themed";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import JobSummary from "./JoSummary";
import ApplyNowButton from "./ApplyNowButton";
import JobDetails from "./JobDetails";

const JobOverview = () => {
  return (
    <View style={styles.container}>
      <JobSummary />
      <JobDetails />
      <ApplyNowButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    gap: 24,
  },
});

export default JobOverview;
