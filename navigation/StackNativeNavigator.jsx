import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import {
  CandidateFormScreen,
  JobDetailScreen,
  SearchResultScreen,
} from "../screens/stackScreens";
import { Icon } from "@rneui/themed";
import SuccessApplicationScreen from "../screens/stackScreens/SuccessApplicationScreen";
import AuthScreen from "../screens/stackScreens/AuthScreen";

const Stack = createNativeStackNavigator();

const StackNativeNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
      <Stack.Screen name="SearchResult" component={SearchResultScreen} />
      <Stack.Screen
        name="SuccessApplicationScreen"
        component={SuccessApplicationScreen}
      />
      <Stack.Screen
        name="JobDetail"
        component={JobDetailScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: "Detail de l'offre",
          headerLeft: ({ color, size }) => (
            <Icon
              name="chevron-left"
              color={color}
              size={36}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: ({ color, size }) => (
            <Icon
              name="share"
              type="material-community"
              color={color}
              size={24}
            />
          ),
        })}
      />
      <Stack.Screen
        name="CandidateFormScreen"
        component={CandidateFormScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: "Informations de mon profile",
          headerLeft: ({ color, size }) => (
            <Icon
              name="chevron-left"
              color={color}
              size={36}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNativeNavigator;
