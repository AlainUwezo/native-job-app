import { Icon, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import JobSearchForm from "./JobSearchForm";
import { useTheme } from "../../../theme/ThemeProvider";

const JobSearchCard = () => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  const { theme } = useTheme();

  return (
    <>
      <View
        style={[
          styles.container,
          {
            paddingTop: statusBarHeight,
            backgroundColor: theme.colors.darkBackground,
          },
        ]}
      >
        <View style={styles.titleContainer}>
          <Text h3 style={[styles.title, { color: "white" }]}>
            Explorer les offres
          </Text>
          <Icon
            name="notifications-none"
            type="material"
            style={styles.notificationIcon}
            size={42}
            color={"white"}
          />
        </View>
        <View style={styles.searchForm}>
          <JobSearchForm />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: 24,
  },
  title: {
    fontWeight: "bold",
  },
  searchForm: {
    marginTop: 36,
    borderRadius: 12,
    overflow: "hidden",
  },
});

export default JobSearchCard;
