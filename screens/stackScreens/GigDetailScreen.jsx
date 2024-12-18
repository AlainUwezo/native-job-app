import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Button, Input, Text, Card } from "@rneui/themed";
import { useForm, Controller } from "react-hook-form";

const GigDetailScreen = ({ route }) => {
  const [isApplying, setIsApplying] = useState(false); // Toggle for showing the form
  const { gig } = route.params; // Détails du gig transmis via navigation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Gig :", gig); // Détails du gig
    console.log("Candidature :", data); // Détails de la candidature

    Alert.alert(
      "Candidature soumise !",
      `Merci pour votre candidature, ${data.fullName}.`
    );
    setIsApplying(false); // Fermer le formulaire
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Détails du gig */}
      <Card>
        <Card.Title>{gig.title}</Card.Title>
        <Card.Divider />
        <Text style={styles.description}>{gig.description}</Text>
        <Text style={styles.price}>Prix : {gig.price}</Text>
        <Text style={styles.location}>Lieu : {gig.location}</Text>
      </Card>

      {/* Bouton Postuler */}
      {!isApplying && (
        <Button
          title="Postuler"
          onPress={() => setIsApplying(true)}
          buttonStyle={styles.applyButton}
        />
      )}

      {/* Formulaire de candidature */}
      {isApplying && (
        <View style={styles.formContainer}>
          <Text h4>Formulaire de candidature</Text>

          {/* Nom complet */}
          <Controller
            control={control}
            rules={{ required: "Le nom complet est requis." }}
            name="fullName"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Nom complet"
                placeholder="Entrez votre nom complet"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.fullName?.message}
              />
            )}
          />

          {/* Email */}
          <Controller
            control={control}
            rules={{
              required: "L'email est requis.",
              pattern: {
                value: /^\S+@\S+$/,
                message: "Format d'email invalide.",
              },
            }}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Email"
                placeholder="Entrez votre email"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                errorMessage={errors.email?.message}
              />
            )}
          />

          {/* Études */}
          <Controller
            control={control}
            rules={{ required: "Veuillez répondre à cette question." }}
            name="education"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Avez-vous fait des études ? Si oui, lesquelles ?"
                placeholder="Entrez vos diplômes ou formations"
                value={value}
                onChangeText={onChange}
                multiline
                errorMessage={errors.education?.message}
              />
            )}
          />

          {/* Expérience professionnelle */}
          <Controller
            control={control}
            rules={{ required: "Veuillez répondre à cette question." }}
            name="experience"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Avez-vous de l'expérience professionnelle ? Si oui, précisez."
                placeholder="Entrez vos expériences"
                value={value}
                onChangeText={onChange}
                multiline
                errorMessage={errors.experience?.message}
              />
            )}
          />

          {/* Motivation */}
          <Controller
            control={control}
            rules={{
              required: "Votre motivation est requise.",
              minLength: {
                value: 20,
                message: "Minimum 20 caractères requis.",
              },
            }}
            name="motivation"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Pourquoi êtes-vous intéressé par ce gig ?"
                placeholder="Expliquez votre intérêt"
                value={value}
                onChangeText={onChange}
                multiline
                errorMessage={errors.motivation?.message}
              />
            )}
          />

          {/* Soumettre */}
          <Button
            title="Soumettre"
            onPress={handleSubmit(onSubmit)}
            buttonStyle={styles.submitButton}
          />

          {/* Annuler */}
          <Button
            title="Annuler"
            onPress={() => setIsApplying(false)}
            type="clear"
          />
        </View>
      )}
    </ScrollView>
  );
};

export default GigDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
    color: "#666",
  },
  price: {
    fontSize: 16,
    marginVertical: 10,
    color: "#2a9d8f",
  },
  location: {
    fontSize: 16,
    marginVertical: 10,
    color: "#264653",
  },
  id: {
    fontSize: 14,
    marginVertical: 10,
    color: "#888",
  },
  applyButton: {
    backgroundColor: "#2a9d8f",
    marginTop: 20,
  },
  formContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: "#264653",
    marginTop: 10,
  },
});
