import React, { useCallback, useState, useEffect } from "react";
import { View, StyleSheet, RefreshControl } from "react-native";
import { SearchFilter, SearchResultList } from "../../features/searchResult";
import { useTheme } from "../../theme/ThemeProvider";
import { useRoute } from "@react-navigation/native";
import useStatusBar from "../../hooks/useStatusBar";

const SearchResultScreen = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    job: "",
    category: "",
    location: "",
  });

  useStatusBar("dark-content");

  // Extract params from route
  useEffect(() => {
    if (route.params) {
      const { job, category, location } = route.params;
      console.log("Updated Params:", { job, category, location });
      setFilters({ job, category, location });
    }
  }, [route.params]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters) => {
    console.log("New Filters:", newFilters);
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <SearchFilter
        onSearch={handleSearch}
        onFiltersChange={handleFiltersChange}
        initialSearchQuery={filters.job}
        initialFilters={filters}
      />
      <SearchResultList
        searchQuery={searchQuery}
        filters={filters}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SearchResultScreen;
