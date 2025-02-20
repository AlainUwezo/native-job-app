import React, { useState } from "react";
import { FlatList, Text, TextInput, View, StyleSheet } from "react-native";
import { Button, Card, Icon } from "@rneui/themed";
import AddGigModal from "./AddGigModal"; // Formulaire d'ajout de gig
import { gigs as initialGigs } from "../../data/mockData";
import { useTheme } from "../../theme/ThemeProvider";

const GigList = () => {
  const [gigs, setGigs] = useState(initialGigs);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useTheme();

  const handleAddGig = (newGig) => {
    setGigs((prevGigs) => [
      ...prevGigs,
      { ...newGig, id: (prevGigs.length + 1).toString() },
    ]);
  };

  const filteredGigs = gigs.filter((gig) =>
    gig.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Bouton Ajouter Gig */}
      <Button
        title=""
        onPress={() => setModalVisible(true)}
        buttonStyle={[
          styles.addButton,
          {
            backgroundColor: theme.colors.primary,
          },
        ]}
        containerStyle={styles.addButtonContainer}
        icon={<Icon name="add-circle-outline" color="#fff" />}
      />
      {/* Barre de recherche */}
      <View
        style={[
          {
            backgroundColor: theme.colors.primary,
            paddingBottom: 20,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            paddingHorizontal: 15,
          },
        ]}
      >
        <View style={[styles.searchBarContainer]}>
          <TextInput
            placeholder="Rechercher un gig..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Icon name="search" color="#666" style={styles.searchIcon} />
        </View>
      </View>

      {/* Liste des Gigs */}
      <FlatList
        data={filteredGigs}
        style={styles.gigs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            containerStyle={[
              styles.card,
              {
                backgroundColor: theme.colors.backgroundSecondary,
              },
            ]}
          >
            <Card.Title>{item.title}</Card.Title>
            <Card.Divider />
            <View style={styles.cardContent}>
              <Icon name="location-on" color="#666" />
              <Text style={styles.location}>{item.location}</Text>
            </View>
            <View style={styles.cardContent}>
              <Icon name="description" color="#666" />
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <View style={styles.cardContent}>
              <Icon name="attach-money" color="#666" />
              <Text
                style={[
                  styles.price,
                  {
                    color: theme.colors.accent,
                  },
                ]}
              >
                ${item.price}
              </Text>
            </View>
          </Card>
        )}
        contentContainerStyle={styles.listContainer}
      />

      {/* Modal d'ajout de gig */}
      <AddGigModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onAddGig={handleAddGig}
      />
    </View>
  );
};

export default GigList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 80,
    right: 5,
    marginHorizontal: 15,
    zIndex: 999,
  },
  addButton: {
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    borderColor: "#d5d5d5",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginVertical: 4,
  },
  gigs: {
    paddingBottom: 60,
  },
  location: {
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginRight: 8,
  },
  searchIcon: {
    marginLeft: 10,
  },
});
