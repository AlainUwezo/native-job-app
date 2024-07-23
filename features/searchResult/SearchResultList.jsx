import { Text } from "@rneui/themed";
import { FlatList, StyleSheet, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { JOBS } from "../../data/mockData";
import { JobCard } from "../../components/common";
import { useNavigation } from "@react-navigation/native";

const SearchResultList = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const detailJobHandler = () => {
    navigation.navigate("JobDetail");
  };

  return (
    <View style={styles.container}>
      <Text h4 h4Style style={styles.title}>
        Résultat de la recherche
      </Text>
      <Text
        style={[
          styles.description,
          {
            color: theme.colors.text500,
          },
        ]}
      >
        20 offres trouvées
      </Text>
      <View style={styles.jobs}>
        <FlatList
          alwaysBounceVertical={false}
          data={JOBS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <JobCard onPress={detailJobHandler} {...item} style={styles.job} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 12,
    marginBottom: 100,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
  },
  jobs: {
    paddingVertical: 24,
  },
  job: {
    marginBottom: 24,
  },
});

export default SearchResultList;
