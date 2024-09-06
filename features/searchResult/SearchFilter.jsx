import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import { Input, Icon } from "@rneui/themed";
import { useTheme } from "../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SearchFilter = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const { theme } = useTheme();
  const statusBarHeight = useSafeAreaInsets().top;
  const navigation = useNavigation();

  const handleSearch = () => {
    if (onSearch) {
      onSearch(search); // Call the search function passed as a prop
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={[
          styles.container,
          {
            paddingTop: statusBarHeight,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <BackButton navigation={navigation} />
        <View style={styles.searchContainer}>
          <Input
            placeholder="Search for offers..."
            value={search}
            onChangeText={setSearch}
            inputStyle={[
              styles.input,
              {
                color: theme.colors.text,
              },
            ]}
            inputContainerStyle={[
              styles.inputContainer,
              {
                backgroundColor: theme.colors.backgroundSecondary,
              },
            ]}
            containerStyle={styles.innerInputContainer}
            leftIcon={
              <Icon
                name="search"
                type="feather"
                size={24}
                color={theme.colors.text500}
              />
            }
            rightIcon={
              <Pressable onPress={handleSearch}>
                <Icon
                  name="arrow-right"
                  type="feather"
                  size={24}
                  color={theme.colors.text500}
                />
              </Pressable>
            }
            rightIconContainerStyle={styles.rightIconContainer}
            errorStyle={styles.errors}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const BackButton = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.goBack()}
    style={styles.backButton}
  >
    <Icon name="chevron-left" type="feather" size={30} color="#000" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#F9F9F9", // Background color similar to iOS design
  },
  searchContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  inputContainer: {
    borderBottomWidth: 0,
    paddingHorizontal: 12,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  innerInputContainer: {
    flex: 1,
  },
  errors: {
    padding: 0,
    margin: 0,
    height: 0,
  },
  input: {
    fontSize: 16,
  },
  rightIconContainer: {
    paddingRight: 12,
  },
  backButton: {
    alignItems: "center",
    marginRight: 16,
    marginTop: 12,
  },
});

export default SearchFilter;
