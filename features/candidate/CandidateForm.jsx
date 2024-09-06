import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { Button } from "@rneui/themed";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import dayjs from "dayjs";
import { useAppContext } from "../../contexts/AppContext";
import { getCandidateByUserId } from "../../data-fetching/dataReading";
import { updateCandidateById } from "../../data-fetching/dataUpdating";
import { createCandidate } from "../../data-fetching/dataCreating";
import Loader from "../../components/common/Loader";
import FlashMessage from "react-native-flash-message";

const CandidateForm = ({ buttonTitle, onUpdateFinish, navigateScreen }) => {
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
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    {
      label: "Informations Personnelles",
      fields: ["firstName", "lastName", "email"],
    },
    {
      label: "Détails de la Carrière",
      fields: [
        "resume",
        "gender",
        "birthDate",
        "competences",
        "experiences",
        "formations",
        "spokenLanguages",
      ],
    },
  ];
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
          showMessage({
            message: "Erreur",
            description: "Aucun candidat trouvé",
            type: "danger",
          });
        }
      } catch (error) {
        showMessage({
          message: "Erreur",
          description: "Erreur lors de la récupération du candidat",
          type: "danger",
        });
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
      showMessage({
        message: "Erreur",
        description: "Veuillez remplir tous les champs requis",
        type: "danger",
      });
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
      showMessage({
        message: "Erreur",
        description: "Format de la date invalide",
        type: "danger",
      });
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

      setIsUpdated((prev) => !prev);
      onUpdateFinish && onUpdateFinish();
    } catch (error) {
      showMessage({
        message: "Erreur",
        description: "Erreur lors de la mise à jour du candidat",
        type: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const currentFields = steps[currentStep - 1].fields;

  if (isFetching) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{steps[currentStep - 1].label}</Text>

        {currentFields.includes("firstName") && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Prénom</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez votre prénom"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
        )}

        {currentFields.includes("lastName") && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nom</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez votre nom"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        )}

        {currentFields.includes("email") && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez votre email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
        )}

        {currentFields.includes("resume") && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Résumé</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Entrez votre résumé"
              value={resume}
              onChangeText={setResume}
              multiline
              numberOfLines={4}
            />
          </View>
        )}

        {currentFields.includes("gender") && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Genre</Text>
            <RNPickerSelect
              placeholder={{ label: "Sélectionnez votre genre", value: "" }}
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
        )}

        {currentFields.includes("birthDate") && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date de Naissance</Text>
            <Button
              title={dayjs(birthDate).format("DD/MM/YYYY")}
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
        )}

        {currentFields.includes("competences") && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Compétences</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Entrez vos compétences"
              value={competences}
              onChangeText={setCompetences}
              multiline
              numberOfLines={4}
            />
          </View>
        )}

        {currentFields.includes("experiences") && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Expériences</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Entrez vos expériences"
              value={experiences}
              onChangeText={setExperiences}
              multiline
              numberOfLines={4}
            />
          </View>
        )}

        {currentFields.includes("formations") && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Formations</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Entrez vos formations"
              value={formations}
              onChangeText={setFormations}
              multiline
              numberOfLines={4}
            />
          </View>
        )}

        {currentFields.includes("spokenLanguages") && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Langues Parlées</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Entrez les langues que vous parlez"
              value={spokenLanguages}
              onChangeText={setSpokenLanguages}
              multiline
              numberOfLines={4}
            />
          </View>
        )}

        <View style={styles.buttonContainer}>
          {currentStep > 1 && (
            <Button
              title="Précédent"
              onPress={() => setCurrentStep((prev) => prev - 1)}
              buttonStyle={styles.navButton}
              titleStyle={styles.navButtonTitle}
            />
          )}

          {currentStep < steps.length ? (
            <Button
              title="Continuer"
              onPress={() => setCurrentStep((prev) => prev + 1)}
              buttonStyle={styles.navButton}
              titleStyle={styles.navButtonTitle}
            />
          ) : (
            <Button
              title={buttonTitle || "Soumettre"}
              onPress={handleSubmit}
              loading={isLoading}
              containerStyle={{ flexGrow: "1" }}
              buttonStyle={styles.submitButton}
              titleStyle={styles.submitButtonTitle}
            />
          )}
        </View>
        <FlashMessage position="top" />
      </ScrollView>
      {/* {isLoading && <Loader />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333333",
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "#C8C8C8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  textArea: {
    height: 100,
    borderColor: "#C8C8C8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlignVertical: "top",
  },
  dateButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  dateButtonTitle: {
    color: "#FFFFFF",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    paddingVertical: 15,
    borderRadius: 5,
    flex: 1,
  },
  submitButtonTitle: {
    color: "#FFFFFF",
  },
  navButton: {
    backgroundColor: "#C8C8C8",
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  navButtonTitle: {
    color: "#000000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333333",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#C8C8C8",
    borderRadius: 5,
    color: "#000",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#C8C8C8",
    borderRadius: 5,
    color: "#000",
    paddingRight: 30,
  },
});

export default CandidateForm;
