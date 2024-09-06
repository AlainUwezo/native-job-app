import { StyleSheet, View } from "react-native";
import ApplicationList from "../../features/applications/ApplicationList";
import { useAppContext } from "../../contexts/AppContext";
import { Text } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import useStatusBar from "../../hooks/useStatusBar";

const JobsScreen = () => {
  const { candidateId } = useAppContext();

  useStatusBar("dark-content");

  return (
    <View style={styles.container}>
      <ApplicationList candidateId={candidateId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default JobsScreen;
