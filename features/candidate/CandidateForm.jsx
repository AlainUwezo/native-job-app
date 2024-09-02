import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Button, Icon, Text } from "@rneui/themed";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { useAppContext } from "../../contexts/AppContext";
import { getCandidateByUserId } from "../../data-fetching/dataReading";
import { updateCandidateById } from "../../data-fetching/dataUpdating";
import { createCandidate } from "../../data-fetching/dataCreating";

const CandidateForm = ({ buttonTitle, onUpdateFinish }) => {
  const [candidateId, setCandidateId] = useState("");
  const [resume, setResume] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [competences, setCompetences] = useState("");
  const [experiences, setExperiences] = useState("");
  const [formations, setFormations] = useState("");
  const [spokenLanguages, setSpokenLanguages] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const { userId } = useAppContext();

  useEffect(() => {
    const fetchCandidate = async () => {
      setIsFetching(true);
      try {
        const data = await getCandidateByUserId(userId);
        if (data.length > 0) {
          const candidate = data[0];
          setCandidateId(candidate.id || "");
          setResume(candidate.resume || "");
          setGender(candidate.gender || "");
          setBirthDate(new Date(candidate.birthDate) || new Date());
          setCompetences(candidate.competences || "");
          setExperiences(candidate.experiences || "");
          setFormations(candidate.formations || "");
          setSpokenLanguages(candidate.spokenLanguages || "");
          setFirstName(candidate.firstName || "");
          setLastName(candidate.lastName || "");
          setEmail(candidate.email || "");
        } else {
          Alert.alert("Erreur", "Aucun candidat trouvé.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du candidat:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchCandidate();
  }, [userId, isUpdated]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(Platform.OS === "ios");
    setBirthDate(currentDate);
  };

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !gender || !birthDate) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs requis.");
      return;
    }

    // Convertir birthDate en objet Date si nécessaire
    let formattedBirthDate;
    try {
      formattedBirthDate = new Date(birthDate);
      if (isNaN(formattedBirthDate.getTime())) {
        throw new Error("Invalid date format");
      }
    } catch (error) {
      Alert.alert("Erreur", "Format de date invalide.");
      return;
    }

    const formatText = (text) => {
      return text
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => `${line.trim()}`)
        .join("; ");
    };

    const formattedCompetences = formatText(competences);
    const formattedExperiences = formatText(experiences);
    const formattedFormations = formatText(formations);

    try {
      setIsLoading(true);
      console.log("Bonjour Alain" + candidateId);

      let result;
      if (candidateId) {
        await updateCandidateById(
          candidateId,
          resume,
          gender,
          formattedBirthDate, // Utilisation de la date formatée ici
          formattedCompetences,
          formattedExperiences,
          formattedFormations,
          spokenLanguages,
          firstName,
          lastName,
          email,
          userId
        );
      } else {
        result = await createCandidate(
          resume,
          gender,
          birthDate,
          formattedCompetences,
          formattedExperiences,
          formattedFormations,
          spokenLanguages,
          firstName,
          lastName,
          email,
          userId
        );
      }

      if (result) {
        setIsUpdated((prev) => !prev);
        onUpdateFinish && onUpdateFinish();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du candidat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>
          Chargement des données du profil...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Formulaire du Candidat</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Résumé"
            value={resume}
            onChangeText={setResume}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputContainer}>
          <RNPickerSelect
            placeholder={{ label: "Genre", value: "" }}
            items={[
              { label: "Homme", value: "male" },
              { label: "Femme", value: "female" },
              { label: "Autre", value: "other" },
            ]}
            onValueChange={(value) => setGender(value)}
            value={gender}
            style={pickerSelectStyles}
          />
        </View>

        <View style={styles.inputContainer}>
          <Button
            title={birthDate.toDateString()}
            onPress={() => setShowDatePicker(true)}
            buttonStyle={styles.dateButton}
            titleStyle={styles.dateButtonTitle}
          />
          {showDatePicker && (
            <RNDateTimePicker
              value={birthDate}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Expériences"
            value={experiences}
            onChangeText={setExperiences}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Compétences"
            value={competences}
            onChangeText={setCompetences}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Formations"
            value={formations}
            onChangeText={setFormations}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Langues parlées"
            value={spokenLanguages}
            onChangeText={setSpokenLanguages}
            multiline
            numberOfLines={4}
          />
        </View>

        <Button
          title={buttonTitle}
          onPress={handleSubmit}
          loading={isLoading}
          buttonStyle={styles.submitButton}
          titleStyle={styles.submitButtonTitle}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    margin: 10,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#007AFF",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    fontSize: 16,
    color: "#333333",
    borderBottomWidth: 1,
    borderBottomColor: "#007AFF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  textArea: {
    minHeight: 80,
    fontSize: 16,
    color: "#333333",
    borderColor: "#007AFF",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
  },
  dateButton: {
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    borderColor: "#007AFF",
    borderWidth: 1,
    padding: 10,
  },
  dateButtonTitle: {
    color: "#333333",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#007AFF",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    color: "#333333",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#007AFF",
    backgroundColor: "#FFFFFF",
    height: 40,
    width: "100%",
  },
  inputAndroid: {
    fontSize: 16,
    color: "#333333",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#007AFF",
    backgroundColor: "#FFFFFF",
    height: 40,
    width: "100%",
  },
  placeholder: {
    color: "#B4B4B4",
  },
});

export default CandidateForm;
