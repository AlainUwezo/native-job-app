import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Input, Button, Icon } from "@rneui/themed";
import RNPickerSelect from "react-native-picker-select";
import { useTheme } from "../../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { getWorkLocationTypeText } from "../../../utils/offer.util";

const rdcCities = [
  { label: "Kinshasa", value: "Kinshasa" },
  { label: "Lubumbashi", value: "Lubumbashi" },
  { label: "Mbuji-Mayi", value: "Mbuji-Mayi" },
  { label: "Kananga", value: "Kananga" },
  { label: "Kisangani", value: "Kisangani" },
  { label: "Bukavu", value: "Bukavu" },
  { label: "Goma", value: "Goma" },
  { label: "Matadi", value: "Matadi" },
  { label: "Kolwezi", value: "Kolwezi" },
  { label: "Likasi", value: "Likasi" },
];

const JobSearchForm = () => {
  const [job, setJob] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleSearch = () => {
    // Rediriger vers l'écran de résultats avec les paramètres de recherche
    navigation.navigate("SearchResult", {
      job,
      category,
      location,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Input
          placeholder="Rechercher une offre"
          value={job}
          onChangeText={setJob}
          leftIcon={
            <Icon
              type="font-awesome"
              name="search"
              color={theme.colors.text500}
              style={styles.icon}
            />
          }
          containerStyle={styles.inputContainer}
          errorStyle={styles.inputError}
          inputContainerStyle={[styles.inputInnerContainer]}
          inputStyle={styles.input}
        />
        <View style={styles.pickerContainer}>
          <Icon
            name="briefcase"
            type="feather"
            style={styles.icon}
            color={theme.colors.text500}
          />
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            items={[
              { label: getWorkLocationTypeText(1), value: "1" },
              { label: getWorkLocationTypeText(2), value: "2" },
              { label: getWorkLocationTypeText(3), value: "3" },
            ]}
            placeholder={{ label: "Type de localisation", value: null }}
            style={pickerSelectStyles}
          />
        </View>
        <View>
          <View style={styles.pickerAndButtonContainer}>
            <View
              style={[styles.pickerContainer, styles.pickerLocationContainer]}
            >
              <Icon
                name="map-pin"
                type="feather"
                style={styles.icon}
                color={theme.colors.text500}
              />
              <RNPickerSelect
                onValueChange={(value) => setLocation(value)}
                items={rdcCities}
                placeholder={{ label: "Select Location", value: null }}
                style={pickerSelectStyles}
              />
            </View>
            <Button
              title="Rechercher"
              onPress={handleSearch}
              buttonStyle={styles.button}
              size="lg"
              containerStyle={[
                styles.buttonContainer,
                { backgroundColor: theme.colors.darkBackground },
              ]}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 16,
    paddingLeft: 16,
  },
  inputContainer: {
    padding: 0,
    margin: 0,
    marginBottom: 8,
  },
  inputInnerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 0,
    margin: 0,
    marginRight: 16,
  },
  input: {
    fontSize: 16,
    color: "#333",
  },
  inputError: { height: 0, margin: 0 },
  icon: {
    marginRight: 10,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 8,
    marginRight: 16,
  },

  pickerAndButtonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 0,
  },
  pickerLocationContainer: {
    flex: 1,
    marginRight: 10,
    borderBottomWidth: 0,
  },
  button: {
    backgroundColor: "#007BFF",
    borderTopLeftRadius: 8,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    borderTopLeftRadius: 12,
    flexShrink: 0,
    paddingLeft: 10,
    paddingTop: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: "#333",
    minWidth: 1000,
  },
  inputAndroid: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: "#333",
    minWidth: 1000,
  },
  iconContainer: {
    top: Platform.OS === "android" ? 8 : 10,
    right: 10,
  },
});

export default JobSearchForm;
