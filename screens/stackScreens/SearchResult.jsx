import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { SearchFilter, SearchResultList } from "../../features/searchResult";
import { useTheme } from "../../theme/ThemeProvider";
import { useCallback, useState } from "react";

const SearchResult = () => {
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request or data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <View>
        <SearchFilter />
        <ScrollView
          style={styles.resultList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          }
          contentContainerStyle={styles.scrollViewContent}
        >
          <SearchResultList />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultList: {
    flexGrow: 1,
  },
});

export default SearchResult;
