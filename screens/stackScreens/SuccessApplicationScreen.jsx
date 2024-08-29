import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Text, Icon, Button } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { API_URL } from "../../config/constants";
import {
  getApplicationByOfferIdAndCandidateId,
  getCandidateById,
  getOfferById,
} from "../../data-fetching/dataReading";
import { createApplication } from "../../data-fetching/dataCreating";
import { ApplicationStatus } from "../../models/ApplicationStatus";

const SuccessApplicationScreen = ({ navigation }) => {
  const route = useRoute();
  const { offerId, candidateId } = route.params;
  const [offer, setOffer] = useState(null);
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);

  // Fonction pour formater les informations de l'offre
  const formatOfferText = (offer) => {
    return `Title: ${offer.jobTitle}. Description: ${offer.description}. Requirements: ${offer.requirements}. Responsibilities: ${offer.responsabilities}. Location: ${offer.location}. Employment Type: ${offer.employmentType}. Salary: ${offer.salary}`;
  };

  // Fonction pour formater les informations du candidat
  const formatCandidateText = (candidate) => {
    return `Name: ${candidate.firstName} ${candidate.lastName}. Skills: ${candidate.competences}. Experience: ${candidate.experiences}. Education: ${candidate.formations}. Languages: ${candidate.spokenLanguages}`;
  };

  useEffect(() => {
    let isCanceled = false;
    const fetchOffer = async () => {
      if (isCanceled) return;
      try {
        const result = await getApplicationByOfferIdAndCandidateId(
          offerId,
          candidateId
        );
        if (result) {
          return;
        }
        const offerData = await getOfferById(offerId);
        const candidateData = await getCandidateById(candidateId);
        setOffer(offerData);
        setCandidate(candidateData);
        console.log("Offer : ", offerData);
        console.log("Candidate : ", candidateData);

        // Formatter les textes à comparer
        const offerText = formatOfferText(offerData);
        const candidateText = formatCandidateText(candidateData);

        // Afficher le loader pendant le calcul
        setCalculating(true);

        // Envoyer les textes à l'API de comparaison
        fetch(`${API_URL}/api/compare`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            offerText: offerText,
            candidateText: candidateText,
          }),
        })
          .then((response) => response.json())
          .then(async (data) => {
            console.log("Similarity Score:", data.similarity);
            const application = await createApplication(
              new Date(),
              Math.round(data.similarity * 100) / 100,
              ApplicationStatus.PENDING,
              offerId, // offerId
              candidateId // candidateId
            );

            if (application) {
              console.log("Application créée avec succès", application);
            }
          })
          .catch((error) => {
            console.error("Error comparing texts:", error);
          })
          .finally(() => {
            setCalculating(false); // Masquer le loader après le calcul
          });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();

    return () => {
      isCanceled = true;
    };
  }, [offerId]);

  return (
    <SafeAreaView style={styles.container}>
      {loading || calculating ? ( // Affichez le loader pendant le chargement ou le calcul
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#2196f3" />
          <Text style={styles.loadingText}>
            Veuillez patienter pendant que nous traitons votre candidature...
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.iconContainer}>
            <Icon
              name="check-circle"
              type="material"
              color="#4caf50" // Vert pour succès
              size={100}
            />
          </View>
          <View style={styles.textContainer}>
            <Text h2 style={styles.header}>
              Candidature Envoyée !
            </Text>
            <Text style={styles.message}>
              Votre candidature a été envoyée avec succès. Nous examinerons
              votre dossier et vous contacterons sous peu.
            </Text>
          </View>
          <Button
            title="Explorer d'autres opportunités"
            onPress={() => navigation.navigate("Explore")}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
  iconContainer: {
    marginBottom: 20,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    backgroundColor: "#2196f3", // Couleur bleue pour le bouton
  },
});

export default SuccessApplicationScreen;
