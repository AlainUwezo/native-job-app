import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";
import { useTheme } from "../../theme/ThemeProvider";
import { JobCard } from "../../components/common";
import { getRecentOffers } from "../../data-fetching/dataReading";
import {
  getEmploymentTypeText,
  getWorkLocationTypeText,
} from "../../utils/offer.util";

const WorkRecommandation = () => {
  const { theme } = useTheme();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const recentJobs = await getRecentOffers();
        setJobs(recentJobs);
        console.log(recentJobs);
      } catch (error) {
        setError("Une erreur est survenue lors de la récupération des offres.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentJobs();
  }, []);

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
        Nouveautés
      </Text>
      <Text
        style={[
          styles.description,
          {
            color: theme.colors.text700,
          },
        ]}
      >
        Découvrez les offres correspondant à votre profil
      </Text>
      <View style={styles.jobs}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <FlatList
            data={jobs}
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
            contentContainerStyle={{ paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        )}
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
  },
  job: {
    marginBottom: 24,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 16,
  },
});

export default WorkRecommandation;
