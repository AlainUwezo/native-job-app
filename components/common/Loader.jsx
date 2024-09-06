import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

const Loader = () => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" color="#007AFF" />
    <Text style={styles.loaderText}>Chargement...</Text>
  </View>
);

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333333",
  },
});

export default Loader;
