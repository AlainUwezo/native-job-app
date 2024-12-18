// src/screens/GigListScreen.tsx
import React, { useState, useCallback } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { SearchBar } from "@rneui/themed";
import { gigs } from "../../data/mockData";
import { useNavigation } from "@react-navigation/native";

// Fonction pour enlever les accents
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Fonction pour le debounce
const useDebounce = (func, delay) => {
  const [timer, setTimer] = useState(null);

  const debouncedFunction = useCallback(
    (...args) => {
      if (timer) clearTimeout(timer);
      const newTimer = setTimeout(() => func(...args), delay);
      setTimer(newTimer);
    },
    [timer, func, delay]
  );

  return debouncedFunction;
};

const GigList = () => {
  const [search, setSearch] = useState("");
  const [filteredGigs, setFilteredGigs] = useState(gigs);
  const navigation = useNavigation();

  // Fonction pour rechercher les gigs
  const handleSearch = (text) => {
    setSearch(text);

    const filtered = gigs.filter(
      (gig) =>
        removeAccents(gig.title.toLowerCase()).includes(
          removeAccents(text.toLowerCase())
        ) ||
        removeAccents(gig.location.toLowerCase()).includes(
          removeAccents(text.toLowerCase())
        )
    );

    setFilteredGigs(filtered);
  };

  // Utilisation du debounce pour la recherche
  const debouncedSearch = useDebounce(handleSearch, 500); // Délai de 500ms pour éviter les recherches trop fréquentes

  const handleNavigateToDetail = (gig) => {
    navigation.navigate("GigDetail", { gig });
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <SearchBar
        placeholder="Rechercher un gig..."
        onChangeText={debouncedSearch} // Utilisation de la recherche debouncée
        value={search}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInput}
      />

      {/* Gig List */}
      <FlatList
        data={filteredGigs}
        alwaysBounceVertical={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gigItem}
            onPress={() => handleNavigateToDetail(item)}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.location}>{item.location}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
  },
  searchBarContainer: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 8,
    padding: 0,
    marginHorizontal: 15,
  },
  searchBarInput: {
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  gigItem: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    color: "#555",
  },
  price: {
    fontSize: 16,
    color: "#28a745",
    fontWeight: "600",
  },
});

export default GigList;
