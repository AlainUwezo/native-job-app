import React, { useState, useCallback, useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
} from "react-native";
import { JobSearchCard, WorkRecommandation } from "../../features/explore";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../../theme/ThemeProvider";
import { getRecentOffers } from "../../data-fetching/dataReading";
import useStatusBar from "../../hooks/useStatusBar";

const ExploreScreen = () => {
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les offres d'emploi
  const fetchRecentJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const recentJobs = await getRecentOffers();
      setJobs(recentJobs);
    } catch (error) {
      setError("Une erreur est survenue lors de la récupération des offres.");
    } finally {
      setLoading(false);
    }
  };

  useStatusBar("blue", "light-content");

  // Appel de la fonction de récupération des données au montage du composant
  useEffect(() => {
    fetchRecentJobs();
  }, []);

  // Fonction pour rafraîchir les offres d'emploi
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchRecentJobs().finally(() => setRefreshing(false));
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style="light" />
      <ScrollView
        nestedScrollEnabled={true}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary} // Changez la couleur selon vos préférences
          />
        }
      >
        <JobSearchCard />
        <ScrollView
          horizontal={true}
          alwaysBounceVertical={false}
          alwaysBounceHorizontal={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          <View style={{ width: Dimensions.get("window").width }}>
            <WorkRecommandation jobs={jobs} loading={loading} error={error} />
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
  horizontalScroll: {
    paddingVertical: 16,
  },
});

export default ExploreScreen;
