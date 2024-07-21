// ThemeProvider.js
import React, { createContext, useContext, useState } from "react";
import { ThemeProvider as RNEThemeProvider, createTheme } from "@rneui/themed";

// Définition des thèmes clair et sombre
const lightTheme = {
  colors: {
    primary: "#007BFF",
    primary100: "#007BFF19",
    secondary: "#6C757D",
    accent: "#17A2B8",
    background: "#F8F9FA",
    backgroundSecondary: "#E9ECEF",
    border: "#ddd",
    darkBackground: "#2C2C2C",
    text: "#212529",
    text200: "#21252933",
    text500: "#21252980",
    text700: "#212529B3",
    dark: "#343A40",
    error: "#DC3545",
  },
};

const darkTheme = {
  colors: {
    primary: "#1  E90FF",
    primary100: "#1E90FF1A",
    secondary: "#ADB5BD",
    accent: "#20C997",
    background: "#343A40",
    backgroundSecondary: "#495057",
    border: "#444444",
    border: "#ddd",
    darkBackground: "#000000",
    text: "#F8F9FA",
    text200: "#F8F9FA33",
    text500: "#F8F9FA80",
    text700: "#F8F9FAB3",
    dark: "#000000",
    error: "#E57373",
  },
};

// Contexte de thème
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const theme = createTheme(isDarkTheme ? darkTheme : lightTheme);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme, theme }}>
      <RNEThemeProvider theme={theme}>{children}</RNEThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
