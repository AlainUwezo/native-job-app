import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { Button, Input } from "@rneui/themed";
import RNPickerSelect from "react-native-picker-select";
import { cities } from "../../data/mockData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../theme/ThemeProvider";

const AddGigModal = ({ isVisible, onClose, onAddGig }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const statusHeight = useSafeAreaInsets().top;
  const { theme } = useTheme();

  const handleSubmit = () => {
    if (!title || !description || !price || !location) {
      Alert.alert("Veuillez remplir tous les champs");
      return;
    }

    const newGig = {
      title,
      description,
      price,
      location,
    };

    onAddGig(newGig);
    onClose();
    setTitle("");
    setDescription("");
    setPrice("");
    setLocation("");
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View
        style={[
          styles.modalContainer,
          {
            paddingTop: statusHeight + 40,
          },
        ]}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.header}>Nouvelle tâche</Text>

          <Input
            label="Titre"
            placeholder="Ex: Photographe pour mariage"
            value={title}
            onChangeText={setTitle}
          />

          <Input
            label="Description"
            placeholder="Décrivez votre gig..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />

          <Input
            label="Prix"
            placeholder="Ex: 150"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          <Text style={styles.label}>Location</Text>
          <RNPickerSelect
            onValueChange={setLocation}
            items={cities.map((city) => ({
              label: city,
              value: city,
            }))}
            placeholder={{ label: "Sélectionnez une ville", value: null }}
            style={pickerStyles}
          />

          <Button
            title="Ajouter"
            buttonStyle={[
              styles.addButton,
              {
                backgroundColor: theme.colors.primary,
              },
            ]}
            onPress={handleSubmit}
          />
          <Button
            title="Annuler"
            type="clear"
            titleStyle={{ color: theme.colors.error }}
            onPress={onClose}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default AddGigModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  content: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#555",
  },
  addButton: {
    backgroundColor: "#34c759",
    borderRadius: 8,
    marginVertical: 16,
  },
});

const pickerStyles = {
  inputIOS: {
    height: 50,
    fontSize: 16,
    paddingHorizontal: 8,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 16,
  },
  inputAndroid: {
    height: 50,
    fontSize: 16,
    paddingHorizontal: 8,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 16,
  },
};
