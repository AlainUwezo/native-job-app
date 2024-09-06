import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Icon } from "@rneui/themed";

const ProfileAvatar = ({ profilePicture }) => {
  const hasProfilePicture = Boolean(profilePicture);

  return (
    <View style={styles.avatarContainer}>
      <Avatar
        rounded
        size="large"
        containerStyle={styles.avatar}
        source={hasProfilePicture ? { uri: profilePicture } : null}
        icon={
          hasProfilePicture
            ? undefined
            : {
                name: "person",
                type: "material",
                color: "#fff",
                size: 50,
              }
        }
        iconContainerStyle={hasProfilePicture ? {} : styles.iconContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    marginBottom: 10,
  },
  avatar: {
    backgroundColor: "#007AFF", // Couleur de fond de l'avatar lorsque l'image est absente
  },
  iconContainer: {
    backgroundColor: "#007AFF", // Couleur de fond de l'icône
    borderRadius: 75, // Pour faire en sorte que l'icône soit circulaire
  },
});

export default ProfileAvatar;
