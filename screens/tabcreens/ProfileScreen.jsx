import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Button, Icon, Text } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { getCandidateByUserId } from "../../data-fetching/dataReading";
import { updateCandidateById } from "../../data-fetching/dataUpdating";
import { useAppContext } from "../../contexts/AppContext";
import CandidateForm from "../../features/candidate/CandidateForm";
import ProfileView from "../../features/candidate/ProfileView";
import useStatusBar from "../../hooks/useStatusBar";

const ProfileScreen = () => {
  const [isShowProfile, setIsShowProfile] = useState(true);

  const handleShowUpdateProfile = () => {
    setIsShowProfile(false);
  };

  const handleUpdateProfile = () => {
    setIsShowProfile(true);
  };
  const handleBackPress = () => {
    setIsShowProfile(true);
  };

  useStatusBar("light-content");

  return (
    <View style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
      >
        {isShowProfile ? (
          <ProfileView OnUpdateProfile={handleShowUpdateProfile} />
        ) : (
          <SafeAreaView>
            <View style={[styles.header]}>
              <TouchableOpacity
                onPress={handleBackPress}
                style={styles.backButton}
              >
                <Icon name="arrow-back" type="ionicon" color="#007AFF" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Modifier Votre Profil</Text>
            </View>
            <CandidateForm
              buttonTitle={"Modifier"}
              onUpdateFinish={handleUpdateProfile}
            />
          </SafeAreaView>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    height: Platform.OS === "ios" ? 80 : 60, // Hauteur pour iOS et Android
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
    elevation: 4, // Ombrage pour Android
    shadowColor: "#000", // Ombre pour iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    position: "absolute",
    color: "red",
    left: 15,
    top: Platform.OS === "ios" ? 30 : 15, // Position en haut du header
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    textAlign: "center",
    flex: 1,
    marginHorizontal: 40,
  },
  title: {
    fontSize: 24, // Taille du texte
    fontWeight: "bold", // Gras
    color: "#007AFF", // Couleur principale (bleu iOS)
    textAlign: "center", // Centré
    marginVertical: 20, // Espace vertical
    paddingHorizontal: 15, // Espacement horizontal
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

export default ProfileScreen;
