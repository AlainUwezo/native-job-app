import { StyleSheet, View } from "react-native";
import ApplicationList from "../../features/applications/ApplicationList";
import { useAppContext } from "../../contexts/AppContext";
import { Text } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";

const JobsScreen = () => {
  const { candidateId } = useAppContext();

  return (
    <SafeAreaView>
      <Text h4 style={styles.header}>
        Mes Candidatures
      </Text>
      <ApplicationList candidateId={candidateId} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 12,
  },
});

export default JobsScreen;
