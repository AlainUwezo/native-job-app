import { Icon, Text } from "@rneui/themed";
import { FlatList, StyleSheet, View } from "react-native";
import { useTheme } from "../../../../theme/ThemeProvider";
import JobSectionTitle from "./JobSectionTitle";
import JobSection from "./JobSesction";

const JobDetails = ({ offer }) => {
  const { theme } = useTheme();

  const requirements = {
    title: "Exigences",
    label: 1,
    icon: "playlist-add-check",
    value: offer.requirements.split(","),
  };

  const responsibilities = {
    title: "Responsabilités",
    icon: "work",
    label: "",
    value: offer.responsabilities.split(","),
  };

  const salary = {
    title: "Avantages et salaires",
    icon: "attach-money",
    value: [`Salaire annuel ${offer.salary}$`], // Ensure salary is provided in the offer
  };

  const data = [requirements, responsibilities, salary];

  return (
    <View style={styles.container}>
      {data.map((item, id) => (
        <View key={id}>
          {item.title && <JobSectionTitle title={item.title} />}
          <FlatList
            data={item.value}
            renderItem={({ item, index }) => (
              <JobSection
                label={data[id].label === 1 ? `${index + 1}.` : data[id].label}
                icon={data[id].icon}
                value={item}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listContainer: {
    paddingVertical: 12,
  },
});

export default JobDetails;
