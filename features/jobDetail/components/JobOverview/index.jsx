import { Text } from "@rneui/themed";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import JobSummary from "./JoSummary";
import ApplyNowButton from "./ApplyNowButton";
import JobDetails from "./JobDetails";
import { useRoute } from "@react-navigation/native";
import { getOfferById } from "../../../../data-fetching/dataReading";
import { useEffect, useState } from "react";

const JobOverview = ({ offer }) => {
  return (
    <View style={styles.container}>
      <JobSummary offer={offer} />
      <JobDetails offer={offer} />
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
