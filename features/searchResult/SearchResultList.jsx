import { Text } from "@rneui/themed";
import { FlatList, StyleSheet, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { JobCard } from "../../components/common";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  getFilteredOffers,
  getRecentOffers,
} from "../../data-fetching/dataReading";
import {
  getEmploymentTypeText,
  getWorkLocationTypeText,
} from "../../utils/offer.util";

const SearchResultList = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { job, category, location } = route.params;

  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilteredJobs = async () => {
      try {
        setLoading(true);
        const jobs = await getFilteredOffers(job, category, location);
        setFilteredJobs(jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredJobs();
  }, [job, category, location]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

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
        {filteredJobs.length} offres trouvées
      </Text>
      <View style={styles.jobs}>
        <FlatList
          alwaysBounceVertical={false}
          data={filteredJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <JobCard
              offerId={item.id}
              company={item.Recruiter.company}
              description={item.description}
              title={item.jobTitle}
              details={[
                item.location,
                getEmploymentTypeText(item.employmentType),
                getWorkLocationTypeText(item.workLocationType),
                `${item.salary}$`,
              ]}
              style={styles.job}
            />
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchResultList;
