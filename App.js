import { StatusBar } from "expo-status-bar";
import AppNavigator from "./navigation/AppNavigator";
import { ThemeProvider, useTheme } from "./theme/ThemeProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider } from "./contexts/AppContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const AppContent = () => {
  const { isDarkTheme } = useTheme();

  return (
    <>
      <AppProvider>
        <StatusBar style={isDarkTheme ? "light" : "dark"} />
        <AppNavigator />
      </AppProvider>
    </>
  );
};
