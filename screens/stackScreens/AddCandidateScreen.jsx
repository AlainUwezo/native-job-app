import React, { useState } from "react";
import {
  View,
  Alert,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import { Button, Icon, Text } from "@rneui/themed";
import { supabase } from "../../config/supabaseClient";
import { SafeAreaView } from "react-native-safe-area-context";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { createCandidate } from "../../data-fetching/dataCreating";

const AddCandidate = () => {
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
  const userId = "982de37c-2949-43b4-983b-f224dbf9c3a4";

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

    // Formatage des champs textarea
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

    // Console log des données
    // console.log({
    //   resume,
    //   gender,
    //   birthDate: birthDate.toDateString(),
    //   competences: formattedCompetences,
    //   experiences: formattedExperiences,
    //   formations: formattedFormations,
    //   spokenLanguages,
    //   firstName,
    //   lastName,
    //   email,
    // });

    try {
      setIsLoading(true);

      if (userId) {
        const result = await createCandidate(
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

        if (result) {
          setResume("");
          setGender("");
          setBirthDate(new Date());
          setCompetences("");
          setExperiences("");
          setFormations("");
          setSpokenLanguages("");
          setFirstName("");
          setLastName("");
          setEmail("");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
      >
        <Text h4 style={styles.header}>
          Mon Profil
        </Text>
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
          title="Ajouter Candidat"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    height: 50,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1d1", // Couleur plus douce pour la bordure
    paddingHorizontal: 10,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1d1", // Couleur plus douce pour la bordure
    paddingHorizontal: 10,
    fontSize: 16,
    textAlignVertical: "top", // Alignement du texte en haut
  },
  buttonContainer: {
    marginTop: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1d1", // Couleur plus douce pour la bordure
    paddingHorizontal: 10,
    fontSize: 16,
  },
  inputAndroid: {
    height: 50,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1d1", // Couleur plus douce pour la bordure
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default AddCandidate;
