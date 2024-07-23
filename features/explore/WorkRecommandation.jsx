import { Text } from "@rneui/themed";
import { FlatList, StyleSheet, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { JobCard } from "../../components/common";
import { JOBS } from "../../data/mockData";

const WorkRecommandation = () => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text
        h4
        style={[
          styles.title,
          {
            color: theme.colors.text,
          },
        ]}
      >
        Recommandation des offres
      </Text>
      <Text
        style={[
          styles.description,
          {
            color: theme.colors.text700,
          },
        ]}
      >
        Découvrer les offres correspondant à votre profil
      </Text>
      <View style={styles.jobs}>
        <FlatList
          data={JOBS}
          keyExtractor={(item) => item.id}
          alwaysBounceVertical={false}
          renderItem={({ item }) => <JobCard {...item} style={styles.job} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 36,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
  jobs: {
    paddingVertical: 24,
    gap: 24,
  },
  job: {
    marginBottom: 24,
  },
});

export default WorkRecommandation;
