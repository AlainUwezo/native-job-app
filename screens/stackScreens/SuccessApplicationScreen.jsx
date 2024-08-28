import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Icon, Button } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";

const SuccessApplicationScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
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
          Votre candidature a été envoyée avec succès. Nous examinerons votre
          dossier et vous contacterons sous peu.
        </Text>
      </View>
      <Button
        title="Explorer d'autres opportunités"
        onPress={() => navigation.navigate("Explore")}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
      />
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
