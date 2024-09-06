import { Icon, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";
import {
  getEmploymentTypeText,
  getWorkLocationTypeText,
} from "../../../utils/offer.util";

const JobInformations = ({
  jobTitle,
  location,
  workLocationType,
  employmentType,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.logoContainer,
          {
            backgroundColor: theme.colors.primary100,
          },
        ]}
      >
        <Icon
          name="briefcase"
          type="font-awesome"
          size={60}
          color={theme.colors.primary500}
        />
      </View>
      <Text
        h4
        style={[
          styles.jobTitle,
          {
            color: theme.colors.text,
          },
        ]}
      >
        {jobTitle}
      </Text>
      <Text
        style={[
          styles.address,
          {
            color: theme.colors.text700,
          },
        ]}
      >
        {location}
      </Text>
      <View style={styles.details}>
        <View
          style={[
            styles.detail,
            {
              borderColor: theme.colors.backgroundSecondary,
            },
          ]}
        >
          <Icon
            name="briefcase-outline"
            type="material-community"
            size={20}
            color={theme.colors.text500}
          />
          <Text
            style={[
              styles.detailText,
              {
                color: theme.colors.text700,
              },
            ]}
          >
            {getEmploymentTypeText(employmentType)}
          </Text>
        </View>
        <View
          style={[
            styles.detail,
            {
              borderColor: theme.colors.backgroundSecondary,
            },
          ]}
        >
          <Icon
            name="timer"
            type="ionicon"
            size={20}
            color={theme.colors.text500}
          />
          <Text
            style={[
              styles.detailText,
              {
                color: theme.colors.text700,
              },
            ]}
          >
            {getWorkLocationTypeText(workLocationType)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF", // Ensure the background is clean and bright
    borderRadius: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  logoContainer: {
    padding: 12,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E0E0E0", // Subtle background color for the logo container
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  address: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 16,
    textAlign: "center",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 400, // Ensure details don't stretch too wide
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "#DDDDDD",
    backgroundColor: "#F9F9F9", // Light background for detail items
  },
  detailText: {
    fontSize: 14,
    fontWeight: "400",
    marginLeft: 8,
  },
});

export default JobInformations;
