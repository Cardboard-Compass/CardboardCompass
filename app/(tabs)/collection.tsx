import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as LucideNative from 'lucide-react-native';
import * as LucideWeb from 'lucide-react';
import { CollectionStats } from '@/components/collection/CollectionStats';
import { mockCollection } from '@/utils/mockData';

// Platform-specific icon components
const Icons = Platform.select({
  web: LucideWeb,
  default: LucideNative,
});

const { Search, Filter, Plus, ChevronDown } = Icons;

interface ScrollableTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

function ScrollableTabs({ tabs, activeTab, onTabChange }: ScrollableTabsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.tabsContent}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            activeTab === tab && styles.activeTab
          ]}
          onPress={() => onTabChange(tab)}
        >
          <Text style={[
            styles.tabText,
            activeTab === tab && styles.activeTabText
          ]}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const SORT_OPTIONS = ['Recently Added', 'Price: High to Low', 'Price: Low to High', 'Alphabetical'];

export default function CollectionScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const filteredCards = mockCollection.filter(card => 
    card.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (activeTab === 'all' || card.category.toLowerCase() === activeTab)
  );

  const totalValueAUD = mockCollection.reduce((sum, card) => sum + card.priceAUD, 0);
  const totalValueUSD = mockCollection.reduce((sum, card) => sum + card.tcgplayerMarket, 0);

  const renderCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.cardSet} numberOfLines={1}>{item.set}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Value:</Text>
          <Text style={styles.priceValue}>${item.priceAUD.toFixed(2)} AUD</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>My Collection</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="white" />
        </TouchableOpacity>
      </View>

      <CollectionStats 
        totalCards={mockCollection.length} 
        totalValueAUD={totalValueAUD}
        totalValueUSD={totalValueUSD}
        uniqueSets={new Set(mockCollection.map(card => card.set)).size}
      />

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search your collection..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <ScrollableTabs
          tabs={['all', 'pokemon', 'magic', 'yugioh', 'flesh & blood']}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </View>

      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <TouchableOpacity 
          style={styles.sortSelector}
          onPress={() => setShowSortOptions(!showSortOptions)}
        >
          <Text style={styles.sortText}>{sortBy}</Text>
          <ChevronDown size={16} color="#007AFF" />
        </TouchableOpacity>

        {showSortOptions && (
          <View style={styles.sortOptionsContainer}>
            {SORT_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.sortOption}
                onPress={() => {
                  setSortBy(option);
                  setShowSortOptions(false);
                }}
              >
                <Text style={[
                  styles.sortOptionText,
                  sortBy === option && styles.activeSortOption
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <FlatList
        data={filteredCards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cardList}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No cards found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your filters or add new cards</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  tabsContainer: {
    marginBottom: 16,
  },
  tabsContent: {
    paddingHorizontal: 12,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    color: '#8E8E93',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    position: 'relative',
  },
  sortLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginRight: 8,
  },
  sortSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
    marginRight: 4,
  },
  sortOptionsContainer: {
    position: 'absolute',
    top: 30,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  sortOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sortOptionText: {
    fontSize: 14,
  },
  activeSortOption: {
    color: '#007AFF',
    fontWeight: '500',
  },
  cardList: {
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    backgroundColor: '#F8F8F8',
  },
  cardInfo: {
    padding: 12,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSet: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34C759',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
});