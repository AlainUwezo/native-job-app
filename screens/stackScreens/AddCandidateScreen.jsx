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
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import CandidateForm from "../../features/candidate/CandidateForm";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../config/supabaseClient";
import Loader from "../../components/common/Loader";
import useStatusBar from "../../hooks/useStatusBar";

const AddCandidateScreen = () => {
  const navigation = useNavigation();
  const [isDeconnecting, setIsDeconnecting] = useState(false);
  useStatusBar("dark-content");

  const onAddFicshed = () => {
    navigation.navigate("BottomTabs", { screen: "AddCandidate" });
  };

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

  if (isDeconnecting) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Loader />
    </View>;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        alwaysBounceVertical={false}
        showsVerticalScrollInadicator={false}
      >
        <Header title={"Profil"} onBackPress={handleLogout} />
        <CandidateForm buttonTitle={"Modifier"} onUpdateFinish={onAddFicshed} />
      </ScrollView>
    </View>
  );
};

const Header = ({ title, onBackPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[headerStyle.headerContainer, { paddingTop: insets.top + 10 }]}
    >
      <TouchableOpacity
        onPress={onBackPress}
        style={[headerStyle.backButton, { paddingTop: insets.top }]}
      >
        <Icon name="arrow-back" type="ionicon" color="#fff" size={30} />
      </TouchableOpacity>
      <Text style={headerStyle.headerTitle}>{title}</Text>
    </View>
  );
};

const headerStyle = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Ombre portée pour donner de la profondeur
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  backButton: {
    position: "absolute",
    left: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default AddCandidateScreen;
