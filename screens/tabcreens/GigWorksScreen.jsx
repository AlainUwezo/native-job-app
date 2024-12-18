// src/screens/tabcreens/GigWorksScreen.tsx

import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import GigList from "../../features/gig/GigList";
import { SafeAreaView } from "react-native-safe-area-context";
import useStatusBar from "../../hooks/useStatusBar";

const GigWorksScreen = () => {
  useStatusBar("dark-content");

  return (
    <SafeAreaView>
      <Text style={styles.title}>Liste des Gig Works</Text>
      <GigList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 15,
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 12,
  },
});

export default GigWorksScreen;
