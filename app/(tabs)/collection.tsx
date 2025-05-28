import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, useColorScheme } from 'react-native';
import { SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { colors } from '@/constants/colors';
import { FilterMenu } from '@/components/FilterMenu';
import { CollectionCard } from '@/components/CollectionCard';
import { SearchBar } from '@/components/SearchBar';
import { Filter, Grid2x2 as Grid, List } from 'lucide-react-native';
import { mockCards } from '@/data/mockData';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function CollectionScreen() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All Cards');
  const [cards, setCards] = useState(mockCards);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  const toggleFilterMenu = () => {
    setFilterVisible(!filterVisible);
  };

  const applyFilter = (filter: string) => {
    setActiveFilter(filter);
    setFilterVisible(false);
    
    // In a real app, this would filter the actual data
    if (filter === 'All Cards') {
      setCards(mockCards);
    } else if (filter === 'Pokémon') {
      setCards(mockCards.filter(card => card.game === 'Pokémon'));
    } else if (filter === 'Magic: The Gathering') {
      setCards(mockCards.filter(card => card.game === 'Magic: The Gathering'));
    } else if (filter === 'Yu-Gi-Oh!') {
      setCards(mockCards.filter(card => card.game === 'Yu-Gi-Oh!'));
    }
  };

  return (
    <View style={[
      styles.container, 
      { backgroundColor: isDark ? colors.gray[900] : colors.gray[100] }
    ]}>
      <View style={styles.header}>
        <Text style={[
          styles.title,
          { color: isDark ? colors.white : colors.gray[900] }
        ]}>
          My Collection
        </Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton} onPress={toggleFilterMenu}>
            <Filter size={24} color={isDark ? colors.white : colors.gray[900]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={toggleViewMode}>
            {viewMode === 'grid' ? (
              <List size={24} color={isDark ? colors.white : colors.gray[900]} />
            ) : (
              <Grid size={24} color={isDark ? colors.white : colors.gray[900]} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <SearchBar placeholder="Search your collection..." />
      
      <View style={styles.filterChip}>
        <Text style={styles.filterChipText}>
          {activeFilter}
        </Text>
      </View>

      <FlatList
        data={cards}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={viewMode === 'grid' ? 2 : 1}
        key={viewMode} // Force re-render when layout changes
        renderItem={({ item }) => (
          <CollectionCard 
            card={item} 
            viewMode={viewMode} 
            isDark={isDark}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {filterVisible && (
        <FilterMenu 
          onClose={toggleFilterMenu}
          onSelectFilter={applyFilter}
          activeFilter={activeFilter}
          isDark={isDark}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  filterChip: {
    backgroundColor: colors.primary[600],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  filterChipText: {
    fontFamily: 'Inter-SemiBold',
    color: colors.white,
    fontSize: 14,
  },
  listContent: {
    padding: 8,
  },
});