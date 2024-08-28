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

      const result = await updateCandidateById(
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
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement des données du profil...</Text>
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
        <View style={styles.inputContainer}>
          <Icon
            name="person"
            type="material"
            color="#888"
            containerStyle={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name="person"
            type="material"
            color="#888"
            containerStyle={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name="email"
            type="material"
            color="#888"
            containerStyle={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name="assignment"
            type="material"
            color="#888"
            containerStyle={styles.icon}
          />
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
          <Icon
            name="male"
            type="material"
            color="#888"
            containerStyle={styles.icon}
          />
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
          <Icon
            name="cake"
            type="material"
            color="#888"
            containerStyle={styles.icon}
          />
          <Button
            title={birthDate.toDateString()}
            onPress={() => setShowDatePicker(true)}
          />
          {showDatePicker && (
            <RNDateTimePicker
              value={birthDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name="work"
            type="material"
            color="#888"
            containerStyle={styles.icon}
          />
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
          <Icon
            name="star"
            type="material"
            color="#888"
            containerStyle={styles.icon}
          />
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
          <Icon
            name="school"
            type="material"
            color="#888"
            containerStyle={styles.icon}
          />
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
          <Icon
            name="language"
            type="material"
            color="#888"
            containerStyle={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Langues parlées"
            value={spokenLanguages}
            onChangeText={setSpokenLanguages}
          />
        </View>

        <Button
          onPress={handleSubmit}
          loading={isLoading}
          title={buttonTitle ? buttonTitle : "Mettre à jour le Profil"}
          containerStyle={styles.buttonContainer}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingBottom: 48,
    backgroundColor: "#f5f5f5",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    height: 100,
  },
  icon: {
    marginRight: 10,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});

export default CandidateForm;
