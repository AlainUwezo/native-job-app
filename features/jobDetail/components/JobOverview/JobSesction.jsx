import { Icon, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../../theme/ThemeProvider";

const JobSection = ({ icon, label, value }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {icon && (
        <Icon
          name={icon}
          type="material"
          size={8}
          color={theme.colors.text700}
          style={{ marginTop: 3 }}
        />
      )}
      {label && <Text>{label}</Text>}
      <Text style={{ color: theme.colors.text700 }}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
    marginBottom: 12,
  },
});

export default JobSection;
