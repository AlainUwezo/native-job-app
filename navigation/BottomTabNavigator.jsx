import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  ExploreScreen,
  JobsScreen,
  MessagesScreen,
  ProfileScreen,
} from "../screens/tabcreens";
import { Icon } from "@rneui/themed";
import { useTheme } from "../theme/ThemeProvider";

const Bottom = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { theme, isDarkTheme } = useTheme();

  return (
    <Bottom.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: theme.colors.text500,
      }}
    >
      <Bottom.Screen
        name="Explorer"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="explore" color={color} size={size} />
          ),
        }}
      />
      <Bottom.Screen
        name="Candidatures"
        component={JobsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="work" color={color} size={size} />
          ),
        }}
      />
      <Bottom.Screen
        name="Mon Profil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomTabNavigator;
