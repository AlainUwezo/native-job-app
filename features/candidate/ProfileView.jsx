import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Button, Card, Avatar, Icon } from "@rneui/themed";
import dayjs from "dayjs";
import { useAppContext } from "../../contexts/AppContext";
import { getCandidateByUserId } from "../../data-fetching/dataReading";
import { supabase } from "../../config/supabaseClient";
import Loader from "../../components/common/Loader";
import ProfileAvatar from "../../components/common/ProfileAvatar";
import { useNavigation } from "@react-navigation/native";

const ProfileView = ({ OnUpdateProfile }) => {
  const [candidate, setCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeconnecting, setIsDeconnecting] = useState(false);
  const { userId } = useAppContext();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const data = await getCandidateByUserId(userId);
        if (data.length > 0) {
          setCandidate(data[0]);
        } else {
          Alert.alert("Erreur", "Aucun candidat trouvé.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du candidat:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidate();
  }, [userId]);

  const handleLogout = async () => {
    try {
      setIsDeconnecting(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setIsDeconnecting(false);
      navigation.navigate("Auth"); // Redirige vers l'écran de connexion ou accueil après déconnexion
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la déconnexion.");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!candidate) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: 100,
          },
        ]}
      >
        <Text style={styles.errorText}>Aucune information disponible.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header avec icône de retour et titre */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton}>
          {/* <Icon name="arrow-back" type="ionicon" color="#fff" /> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil du Candidat</Text>
      </View>

      <View style={styles.profileInfo}>
        <ProfileAvatar />
        <Text style={styles.name}>
          {candidate.firstName} {candidate.lastName}
        </Text>
        <Text style={styles.email}>{candidate.email}</Text>

        <Button
          title="Modifier le Profil"
          buttonStyle={styles.editButton}
          onPress={OnUpdateProfile}
          titleStyle={{ color: "#007AFF" }}
          iconPosition="left"
        />
      </View>

      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>
          Informations Personnelles
        </Card.Title>
        <Card.Divider />
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Date de Naissance:</Text>
          <Text style={styles.infoValue}>
            {dayjs(candidate.birthDate).format("DD/MM/YYYY")}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Genre:</Text>
          <Text style={styles.infoValue}>
            {candidate.gender === "male"
              ? "Homme"
              : candidate.gender === "female"
              ? "Femme"
              : "Autre"}
          </Text>
        </View>
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Détails de la Carrière</Card.Title>
        <Card.Divider />
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Résumé:</Text>
          <Text style={styles.infoValue}>
            {candidate.resume || "Non disponible"}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Compétences:</Text>
          <Text style={styles.infoValue}>
            {candidate.competences || "Non disponible"}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Expériences:</Text>
          <Text style={styles.infoValue}>
            {candidate.experiences || "Non disponible"}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Formations:</Text>
          <Text style={styles.infoValue}>
            {candidate.formations || "Non disponible"}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Langues Parlées:</Text>
          <Text style={styles.infoValue}>
            {candidate.spokenLanguages || "Non disponible"}
          </Text>
        </View>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          title="Déconnexion"
          buttonStyle={styles.logoutButton}
          loading={isDeconnecting}
          onPress={handleLogout}
          icon={<Icon name="log-out" type="ionicon" color="#fff" />}
          iconPosition="left"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  errorText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    color: "#FF3B30",
    textAlign: "center",
    marginTop: 20,
  },
  headerContainer: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  backButton: {
    position: "absolute",
    left: 15,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  profileInfo: {
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    color: "#333333",
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "#666666",
  },
  card: {
    borderRadius: 10,
    borderColor: "transparent",
    marginHorizontal: 15,
    marginBottom: 20,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#007AFF",
    textAlign: "left",
  },
  infoContainer: {
    marginVertical: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  infoValue: {
    fontSize: 16,
    color: "#666666",
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  editButton: {
    backgroundColor: "none",
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    width: "100%",
    borderRadius: 10,
  },
});

export default ProfileView;
