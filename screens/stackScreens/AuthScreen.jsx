// src/screens/AuthScreen.js
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { Input, Button, Text, Icon } from "@rneui/themed";
import { supabase } from "../../config/supabaseClient";
import { useNavigation } from "@react-navigation/native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useAppContext } from "../../contexts/AppContext";
import { getCandidateByUserId } from "../../data-fetching/dataReading";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { setUserId, setCandidateId } = useAppContext(); // Utilisation du contexte

  const handleSignIn = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      showMessage({
        message: "Erreur",
        description: "Identifiants incorrects. Veuillez réessayer.",
        type: "danger",
      });
    } else {
      const userId = data.user.id; // Récupérer l'ID utilisateur
      setUserId(userId); // Mettre à jour le userId dans le contexte

      // Récupérer le candidateId en fonction du userId
      const candidates = await getCandidateByUserId(userId);

      showMessage({
        message: "Succès",
        description: "Connecté avec succès!",
        type: "success",
      });
      if (candidates && candidates.length > 0) {
        setCandidateId(candidates[0].id); // Mettre à jour le candidateId s'il est trouvé

        navigation.navigate("BottomTabs", { screen: "AddCandidate" });
      } else {
        setCandidateId(""); // Laisser vide si aucun candidateId n'est trouvé
        navigation.navigate("AddCandidate");
      }
      // navigation.navigate("BottomTabs", { screen: "Explore" });
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: null, // Ne pas envoyer d'e-mail de confirmation
      },
    });

    if (error) {
      showMessage({
        message: "Erreur",
        description: error.message,
        type: "danger",
      });
    } else {
      showMessage({
        message: "Succès",
        description:
          "Inscription réussie! Vous pouvez maintenant vous connecter.",
        type: "success",
      });
    }
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text h3 style={styles.title}>
          {isSignUp ? "Créer un compte" : "Se connecter"}
        </Text>
        <Input
          placeholder="Email"
          leftIcon={<Icon name="mail-outline" type="ionicon" color="#007AFF" />}
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          keyboardType="email-address"
          inputStyle={styles.inputText}
          containerStyle={styles.inputContainer}
        />
        <Input
          placeholder="Mot de passe"
          leftIcon={
            <Icon name="lock-closed-outline" type="ionicon" color="#007AFF" />
          }
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          inputStyle={styles.inputText}
          containerStyle={styles.inputContainer}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <>
            <Button
              title={isSignUp ? "Créer un compte" : "Se connecter"}
              onPress={isSignUp ? handleSignUp : handleSignIn}
              buttonStyle={styles.button}
              containerStyle={styles.buttonContainer}
            />
            <Button
              type="clear"
              title={
                isSignUp
                  ? "Déjà un compte ? Se connecter"
                  : "Pas de compte ? S'inscrire"
              }
              onPress={() => setIsSignUp(!isSignUp)}
              titleStyle={styles.switchText}
            />
          </>
        )}
        <FlashMessage position="top" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0f0f5",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputText: {
    color: "#333",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  switchText: {
    color: "#007AFF",
  },
});

export default AuthScreen;
