import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import { JobDetailScreen, SearchResultScreen } from "../screens/stackScreens";
import { Icon } from "@rneui/themed";

const Stack = createNativeStackNavigator();

const StackNativeNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
      <Stack.Screen name="SearchResult" component={SearchResultScreen} />
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
    </Stack.Navigator>
  );
};

export default StackNativeNavigator;
