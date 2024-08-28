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
    value: [`Salaire annuel ${salary}$`],
  };

  const data = [requirements, responsibilities, salary];

  return (
    <View>
      {data.map((item, id) => (
        <View key={id}>
          {item.title && <JobSectionTitle title={item.title} />}
          <View style={styles.responsabilities}>
            <FlatList
              alwaysBounceVertical={false}
              data={item.value}
              renderItem={({ item, index }) => {
                return (
                  <JobSection
                    label={
                      data[id].label == 1 ? `${index + 1}.` : data[id].label
                    }
                    icon={data[id].icon}
                    value={item}
                  />
                );
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  responsabilities: {
    paddingVertical: 16,
    gap: 12,
  },
});

export default JobDetails;
