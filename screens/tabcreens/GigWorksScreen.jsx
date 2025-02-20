// src/screens/tabcreens/GigWorksScreen.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GigList from "../../features/gig/GigList";
import { SafeAreaView } from "react-native-safe-area-context";
import useStatusBar from "../../hooks/useStatusBar";
import { Button } from "@rneui/themed";
import { useTheme } from "../../theme/ThemeProvider";

const GigWorksScreen = () => {
  useStatusBar("dark-content");
  const { theme } = useTheme();
  useStatusBar("light-mode");

  return (
    <SafeAreaView
      style={{
        paddingTop: 0,
        backgroundColor: theme.colors.primary,
      }}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Freelances</Text>
        </View>
      </View>
      <GigList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    marginBottom: 10,
  },
  title: {
    marginHorizontal: 15,
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 12,
    textAlign: "center",
    color: "white",
  },
});

export default GigWorksScreen;
