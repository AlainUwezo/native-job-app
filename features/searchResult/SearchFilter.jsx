import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Input, Icon } from "@rneui/themed";
import { useTheme } from "../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SearchFilter = () => {
  const [search, setSearch] = useState("");
  const { theme } = useTheme();
  const statusBarHeight = useSafeAreaInsets().top;
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={[
          styles.container,
          {
            paddingTop: statusBarHeight,
          },
        ]}
      >
        <BackButton navigation={navigation} />
        <Input
          placeholder="Search..."
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
            <Icon
              name="filter"
              type="feather"
              size={24}
              color={theme.colors.text500}
            />
          }
          rightIconContainerStyle={styles.rightIconContainer}
          errorStyle={styles.errors}
        />
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
  },
  inputContainer: {
    borderBottomWidth: 0,
    paddingHorizontal: 12,
    borderRadius: 50,
  },
  innerInputContainer: {
    flex: 1,
    maxWidth: 400,
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
    paddingRight: 0,
  },
  backButton: {
    alignItems: "center",
  },
});

export default SearchFilter;
