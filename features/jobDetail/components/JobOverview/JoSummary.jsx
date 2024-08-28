import { Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../../theme/ThemeProvider";
import JobSectionTitle from "./JobSectionTitle";

const JobSummary = ({ offer }) => {
  const { theme } = useTheme();

  return (
    <View>
      <JobSectionTitle title={"Résumé"} />
      <Text
        style={[
          styles.summary,
          {
            color: theme.colors.text700,
          },
        ]}
      >
        {offer.description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  summary: {
    paddingTop: 16,
  },
});

export default JobSummary;
