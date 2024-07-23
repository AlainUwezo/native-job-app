import { Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

const JobDetailTitle = ({ title }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.titleContainer,
        ,
        {
          backgroundColor: theme.colors.backgroundSecondary,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.text500,
          },
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    borderRadius: 50,
  },
  title: {
    padding: 4,
    paddingHorizontal: 12,
    fontWeight: 500,
    fontSize: 14,
  },
});

export default JobDetailTitle;
