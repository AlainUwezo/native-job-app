import { NavigationContainer } from "@react-navigation/native";
import StackNativeNavigator from "./StackNativeNavigator";

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StackNativeNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
