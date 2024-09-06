import { Text, useTheme, Button } from "@rneui/themed";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
import { JobCard } from "../../components/common";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getFilteredOffers } from "../../data-fetching/dataReading";
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
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Chargement des offres...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text h4 h4Style style={[styles.title, { color: theme.colors.primary }]}>
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
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: "#fff", // Utiliser une couleur de fond blanche ou celle du thème
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 24, // Taille de police plus grande pour le titre
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  jobs: {
    paddingTop: 12,
  },
  job: {
    marginBottom: 16, // Espacement entre chaque carte de job
    borderRadius: 12, // Ajouter un radius pour arrondir les bords des cartes
    backgroundColor: "#f9f9f9", // Couleur de fond douce pour chaque carte
    shadowColor: "#000", // Ombre pour Android
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3, // Ombre pour iOS
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
});

export default SearchResultList;
