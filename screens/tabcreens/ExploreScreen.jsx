import { ScrollView, StyleSheet, View } from "react-native";
import { JobSearchCard, WorkRecommandation } from "../../features/explore";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../../theme/ThemeProvider";

const ExploreScreen = () => {
  const { theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style="auto" />
      <ScrollView
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
      >
        <JobSearchCard />
        <WorkRecommandation />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ExploreScreen;
