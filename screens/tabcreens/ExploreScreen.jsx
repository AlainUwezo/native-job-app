import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
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
        nestedScrollEnabled={true}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
      >
        <JobSearchCard />
        <ScrollView
          horizontal={true}
          alwaysBounceVertical={false}
          alwaysBounceHorizontal={false}
        >
          <View style={{ width: Dimensions.get("window").width }}>
            <WorkRecommandation />
          </View>
        </ScrollView>
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
