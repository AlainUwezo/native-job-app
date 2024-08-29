import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { getApplicationsByCandidateId } from "../../data-fetching/dataReading";

const ApplicationList = ({ candidateId }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const applicationsData = await getApplicationsByCandidateId(
          candidateId
        );
        setApplications(applicationsData);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [candidateId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading applications...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.applicationItem}>
      <Text style={styles.jobTitle}>{item.Offer.jobTitle}</Text>
      <Text style={styles.location}>Localisation: {item.Offer.location}</Text>
      <Text style={styles.status}>Statut: {item.status}</Text>
      <Text style={styles.score}>Score: {item.score.toFixed(2)}%</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        alwaysBounceVertical={false}
        data={applications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No applications found.</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  applicationItem: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  score: {
    fontSize: 14,
    color: "#007bff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginTop: 20,
  },
});

export default ApplicationList;
