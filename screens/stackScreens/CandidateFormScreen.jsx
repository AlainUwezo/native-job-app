import { Text } from "@rneui/themed";
import { useAppContext } from "../../contexts/AppContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import CandidateForm from "../../features/candidate/CandidateForm";

const {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} = require("react-native");

const CandidateFormScreen = () => {
  const { candidateId } = useAppContext();
  const route = useRoute();
  const { offerId } = route.params;
  const navigation = useNavigation();

  const onApplicantJob = () => {
    console.log("candidate id", candidateId, "offer id", offerId);
    navigation.navigate("SuccessApplicationScreen");
  };

  return (
    <View style={styles.container}>
      <CandidateForm buttonTitle="Postuler" onUpdateFinish={onApplicantJob} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});

export default CandidateFormScreen;
