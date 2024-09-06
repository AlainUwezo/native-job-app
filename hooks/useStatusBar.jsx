import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { StatusBar } from "react-native";

const useStatusBar = (barStyle = "default") => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      StatusBar.setBarStyle(barStyle);
    }
  }, [isFocused, barStyle]);
};

export default useStatusBar;
