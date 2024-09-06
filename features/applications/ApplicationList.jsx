import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { getApplicationsByCandidateId } from "../../data-fetching/dataReading";
import { useAppContext } from "../../contexts/AppContext";
import { deleteAllApplicationById } from "../../data-fetching/dataDeleting";
import dayjs from "dayjs";
import { ApplicationStatus } from "../../models/ApplicationStatus";
import { getStatusText } from "../../utils";
import { Icon } from "@rneui/themed";

const ApplicationList = ({ candidateId }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const { isCandidate } = useAppContext();

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const applicationsData = await getApplicationsByCandidateId(candidateId);
      if (filterStatus !== "all") {
        setApplications(
          applicationsData.filter((app) => app.status === filterStatus)
        );
      } else {
        setApplications(applicationsData);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [candidateId, isCandidate, filterStatus]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchApplications().then(() => setRefreshing(false));
  }, [candidateId, filterStatus]);

  const handleDeleteApplication = (applicationId) => {
    Alert.alert(
      "Retirer la candidature",
      "Êtes-vous sûr de vouloir retirer cette candidature ? (Cette action est irréversible)",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Retirer",
          style: "destructive",
          onPress: async () => {
            setIsDeleting(true);
            try {
              await deleteAllApplicationById(applicationId);
              await fetchApplications();
            } catch (error) {
              console.error("Error deleting application:", error);
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Candidatures</Text>
      <Text style={styles.headerSubtitle}>
        Voir et gérer la liste de mes candidatures
      </Text>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setModalVisible(true)}
      >
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="filter-list" type="material" size={20} color="#fff" />
          <Text style={styles.filterButtonText}>
            Filtrer par statut - {getStatusText(filterStatus)}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.applicationItem,
        {
          borderColor: getStatusColor(item.status),
          borderWidth: 2,
        },
      ]}
    >
      <View style={styles.applicationInfo}>
        <Text style={styles.jobTitle}>{item.Offer.jobTitle}</Text>
        <Text style={styles.location}>Localisation: {item.Offer.location}</Text>
        <Text style={styles.status}>Statut: {getStatusText(item.status)}</Text>
        <Text style={styles.score}>
          Date: {dayjs(item.createdAt).format("DD/MM/YYYY")}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteApplication(item.id)}
      >
        <Text style={styles.deleteButtonText}>Retirer</Text>
      </TouchableOpacity>
    </View>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "#4CAF50";
      case "Rejected":
        return "#FF3B30";
      case "Pending":
        return "#FFC107";
      default:
        return "#007AFF";
    }
  };

  if (loading && !refreshing && !isDeleting) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Chargement des candidatures...</Text>
      </View>
    );
  }

  if (isDeleting) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF3B30" />
        <Text style={styles.loadingText}>Suppression en cours...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={applications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>Aucune candidature disponible</Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#007AFF"
          />
        }
        contentContainerStyle={styles.listContent}
      />

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtrer par statut</Text>
            {Object.entries(ApplicationStatus).map(([key, value]) => (
              <Pressable
                key={value}
                style={styles.filterOption}
                onPress={() => {
                  setFilterStatus(value);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.filterOptionText}>
                  {getStatusText(value)}
                </Text>
              </Pressable>
            ))}
            <Pressable
              style={styles.filterOption}
              onPress={() => {
                setFilterStatus("all");
                setModalVisible(false);
              }}
            >
              <Text style={styles.filterOptionText}>Tout</Text>
            </Pressable>
            <Pressable
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa",
    flex: 1,
  },
  header: {
    backgroundColor: "#007AFF",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#f1f1f1",
    marginTop: 5,
  },
  filterButton: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  filterButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
  listContent: {
    padding: 10,
  },
  applicationItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  applicationInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: "500",
    color: "#007AFF",
    marginBottom: 4,
  },
  score: {
    fontSize: 14,
    color: "#4CAF50",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  filterOption: {
    paddingVertical: 10,
  },
  filterOptionText: {
    fontSize: 16,
    color: "#007AFF",
  },
  cancelButton: {
    marginTop: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#FF3B30",
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ApplicationList;
