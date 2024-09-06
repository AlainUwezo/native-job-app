import { Button, Text } from "@rneui/themed";
import {
  JobInformations,
  JobOverview,
} from "../../features/jobDetail/components";
import { useTheme } from "../../theme/ThemeProvider";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getOfferById } from "../../data-fetching/dataReading";
import useStatusBar from "../../hooks/useStatusBar";

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

  useStatusBar("dark-content");

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
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        offer && (
          <>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContent}
              nestedScrollEnabled
            >
              <JobInformations
                jobTitle={offer.jobTitle}
                workLocationType={offer.workLocationType}
                employmentType={offer.employmentType}
                location={offer.location}
              />
              <View style={styles.jobOverviewContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.jobOverviewContent}>
                    <JobOverview offer={offer} />
                  </View>
                </ScrollView>
              </View>
            </ScrollView>
            <View style={styles.applyButtonContainer}>
              <Button
                buttonStyle={[
                  styles.applyButton,
                  { backgroundColor: theme.colors.primary },
                ]}
                title={"Postuler maintenant"}
                onPress={onApplicationHandler}
                containerStyle={styles.applyButton}
              />
            </View>
          </>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  jobOverviewContainer: {
    marginTop: 24,
  },
  jobOverviewContent: {
    width: Dimensions.get("window").width - 48,
  },
  applyButtonContainer: {
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  applyButton: {
    borderRadius: 100,
    paddingVertical: 16,
  },
});

export default JobDetailScreen;
