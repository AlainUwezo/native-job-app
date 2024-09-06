import React from "react";
import { Text, Icon } from "@rneui/themed";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import TwoLineTruncateText from "./TwoLineTuncateText";
import JobDetailTitle from "./JobDetailTitle";
import { useNavigation } from "@react-navigation/native";

const JobCard = ({ offerId, company, title, description, details, style }) => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const detailJobHandler = () => {
    navigation.navigate("JobDetail", { offerId });
  };

  return (
    <Pressable onPress={detailJobHandler} style={[styles.card, style]}>
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.backgroundSecondary },
        ]}
      >
        <View style={styles.header}>
          {/* New Icon replacing the old Image */}
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: theme.colors.primary100 },
            ]}
          >
            <Icon
              name="briefcase-outline"
              type="ionicon"
              color={theme.colors.primary}
              size={30}
            />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.company, { color: theme.colors.text700 }]}>
              {company}
            </Text>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              {title}
            </Text>
          </View>
        </View>
        <View style={styles.description}>
          <TwoLineTruncateText textStyle={{ color: theme.colors.text500 }}>
            {description}
          </TwoLineTruncateText>
        </View>
        <ScrollView
          horizontal
          alwaysBounceHorizontal={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={[styles.details]}>
            {details &&
              details.map((detail, index) => (
                <JobDetailTitle key={detail + index} title={detail} />
              ))}
          </View>
        </ScrollView>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  container: {
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, // For Android shadow
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    marginLeft: 12,
    flex: 1,
  },
  company: {
    fontSize: 14,
    fontWeight: "600",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 2,
  },
  description: {
    marginVertical: 8,
  },
  details: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    marginTop: 8,
    paddingTop: 8,
    gap: 8,
  },
});

export default JobCard;
