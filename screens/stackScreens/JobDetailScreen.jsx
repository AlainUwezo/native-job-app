import { Button } from "@rneui/themed";
import {
  JobInformations,
  JobOverview,
} from "../../features/jobDetail/components";
import { useTheme } from "../../theme/ThemeProvider";
import { useState } from "react";

const { View, StyleSheet, ScrollView, Dimensions } = require("react-native");

const JobDetailScreen = () => {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <JobInformations />
        <ScrollView horizontal alwaysBounceHorizontal={false}>
          <View style={{ width: Dimensions.get("window").width - 48 }}>
            <JobOverview />
          </View>
        </ScrollView>
      </ScrollView>
      <View style={styles.applyButtonContainer}>
        <Button
          buttonStyle={[
            styles.applyButton,
            {
              backgroundColor: theme.colors.primary,
            },
          ]}
          title={"Postuler maintenant"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  innerContainer: {
    maxHeight: "80%",
  },
  applyButtonContainer: {
    paddingBottom: 48,
    paddingTop: 12,
  },
  applyButton: {
    borderRadius: 100,
  },
});

export default JobDetailScreen;
