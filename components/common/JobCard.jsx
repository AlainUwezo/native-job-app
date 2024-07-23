import { Text } from "@rneui/themed";
import { Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import TwoLineTruncateText from "./TwoLineTuncateText";
import JobDetailTitle from "./JobDetailTitle";

const JobCard = ({ company, title, description, details, style, onPress }) => {
  const { theme } = useTheme();
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          styles.container,
          {
            borderColor: theme.colors.backgroundSecondary,
          },
          style,
        ]}
      >
        <View style={styles.titleContainer}>
          <View
            style={[
              styles.logoContainer,
              {
                backgroundColor: theme.colors.primary100,
              },
            ]}
          >
            <Image
              source={require("./../../assets/images/twitter.png")}
              style={styles.logo}
            />
          </View>
          <View>
            <Text
              style={[
                styles.company,
                {
                  color: theme.colors.text700,
                },
              ]}
            >
              {company}
            </Text>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
        <View style={styles.description}>
          <TwoLineTruncateText
            textStyle={{
              color: theme.colors.text500,
            }}
          >
            {description}
          </TwoLineTruncateText>
        </View>
        <ScrollView
          horizontal
          alwaysBounceHorizontal={false}
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={[
              styles.details,
              {
                borderTopColor: theme.colors.backgroundSecondary,
              },
            ]}
          >
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
  container: {
    paddingHorizontal: 12,
    paddingVertical: 24,
    borderWidth: 1,
    borderRadius: 12,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoContainer: {
    height: 50,
    width: 50,
    padding: 10,
    borderRadius: 25,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  company: {
    fontSize: 16,
    marginBottom: 3,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  description: {
    marginVertical: 12,
  },
  details: {
    paddingTop: 24,
    flexDirection: "row",
    gap: 3,
    overflow: "scroll",
    borderTopWidth: 1,
  },
});

export default JobCard;
