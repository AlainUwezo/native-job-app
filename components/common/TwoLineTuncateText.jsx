import React from "react";
import { Text, StyleSheet, View } from "react-native";

const TwoLineTruncateText = ({ children, textStyle }) => {
  return (
    <View style={styles.container}>
      <Text
        style={[styles.text, textStyle]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 20, // Adjust line height as needed
  },
});

export default TwoLineTruncateText;
