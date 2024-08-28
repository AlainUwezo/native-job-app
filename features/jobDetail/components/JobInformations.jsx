import { Icon, Text } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { Image, View } from "react-native";
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
        <Image
          style={[styles.logo]}
          source={require("./../../../assets/images/twitter.png")}
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
        jobTitle
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
            size={24}
            color={theme.colors.text500}
          />
          <Text
            style={[
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
            size={24}
            color={theme.colors.text500}
          />
          <Text
            style={[
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
    paddingTop: 48,
  },
  logoContainer: {
    padding: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  jobTitle: {
    marginTop: 24,
    marginBottom: 8,
    fontWeight: 500,
  },
  details: {
    marginVertical: 24,
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
  },
  detail: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 100,
  },
});

export default JobInformations;
