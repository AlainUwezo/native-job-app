import { Button, Text } from "@rneui/themed";
import {
  JobInformations,
  JobOverview,
} from "../../features/jobDetail/components";
import { useTheme } from "../../theme/ThemeProvider";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getOfferById } from "../../data-fetching/dataReading";

const {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} = require("react-native");

const JobDetailScreen = () => {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const route = useRoute();
  const { offerId } = route.params;
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    let isCanceled = false;
    const fetchOffer = async () => {
      if (isCanceled) return;
      try {
        const data = await getOfferById(offerId);
        setOffer(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();

    return () => {
      isCanceled = true;
    };
  }, [offerId]);

  const onApplicationHandler = () => {
    navigation.navigate("CandidateFormScreen", {
      offerId: offer.id,
    });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {offer ? (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            <JobInformations
              jobTitle={offer.jobTitle}
              workLocationType={offer.workLocationType}
              employmentType={offer.employmentType}
              location={offer.location}
            />
            <ScrollView horizontal alwaysBounceHorizontal={false}>
              <View style={{ width: Dimensions.get("window").width - 48 }}>
                <JobOverview offer={offer} />
              </View>
            </ScrollView>
          </ScrollView>
          <View style={styles.applyButtonContainer}>
            <Button
              buttonStyle={[
                styles.applyButton,
                {
                  backgroundColor: theme.colors.primary,
                },
              ]}
              title={"Postuler maintenant"}
              onPress={onApplicationHandler}
            />
          </View>
        </>
      ) : (
        <View style={{ paddingTop: 30 }}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  innerContainer: {
    maxHeight: "80%",
  },
  applyButtonContainer: {
    paddingBottom: 48,
    paddingTop: 12,
  },
  applyButton: {
    borderRadius: 100,
  },
});

export default JobDetailScreen;
