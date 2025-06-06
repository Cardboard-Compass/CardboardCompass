import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Switch,
  ScrollView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TextSelect as BoxSelect, DollarSign, ShoppingCart, Share2, ChevronRight } from 'lucide-react-native';
import { mockCollection } from '@/utils/mockData';

export default function SellScreen() {
  const [selectedTab, setSelectedTab] = useState('list');
  const [selectedCards, setSelectedCards] = useState([]);
  const [quickList, setQuickList] = useState(true);
  
  const marketplaces = [
    { id: 'ebay', name: 'eBay AU', logo: 'https://images.pexels.com/photos/11309513/pexels-photo-11309513.jpeg', enabled: true },
    { id: 'gumtree', name: 'Gumtree', logo: 'https://images.pexels.com/photos/11309513/pexels-photo-11309513.jpeg', enabled: true },
    { id: 'facebook', name: 'Facebook Marketplace', logo: 'https://images.pexels.com/photos/11309513/pexels-photo-11309513.jpeg', enabled: false },
  ];

  const toggleCardSelection = (cardId) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter(id => id !== cardId));
    } else {
      setSelectedCards([...selectedCards, cardId]);
    }
  };

  const handleQuickList = () => {
    if (selectedCards.length === 0) {
      Alert.alert('No Cards Selected', 'Please select at least one card to list');
      return;
    }
    
    Alert.alert(
      'List Cards',
      `Are you sure you want to list ${selectedCards.length} card(s) for sale?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'List Now', 
          onPress: () => {
            Alert.alert('Success', 'Your cards have been listed for sale!');
            setSelectedCards([]);
          } 
        },
      ]
    );
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.card,
        selectedCards.includes(item.id) && styles.selectedCard
      ]}
      onPress={() => toggleCardSelection(item.id)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.cardSet} numberOfLines={1}>{item.set}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Market:</Text>
          <Text style={styles.priceValue}>${(item.priceHistory?.ebayAU?.lastSold || 0).toFixed(2)}</Text>
        </View>
      </View>
      {selectedCards.includes(item.id) && (
        <View style={styles.checkmark}>
          <BoxSelect size={20} color="white" />
        </View>
      )}
    </TouchableOpacity>
  );

  const renderMarketplace = ({ item }) => (
    <View style={styles.marketplaceItem}>
      <Image source={{ uri: item.logo }} style={styles.marketplaceLogo} />
      <View style={styles.marketplaceInfo}>
        <Text style={styles.marketplaceName}>{item.name}</Text>
        <Text style={styles.marketplaceStatus}>
          {item.enabled ? 'Connected' : 'Not connected'}
        </Text>
      </View>
      <Switch
        value={item.enabled}
        onValueChange={() => {
          // In a real app, this would update the item's enabled state
          if (!item.enabled) {
            Alert.alert('Connect Account', `Would you like to connect your ${item.name} account?`);
          }
        }}
        trackColor={{ false: '#E5E5EA', true: '#34C759' }}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Sell Cards</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'list' && styles.activeTab]}
          onPress={() => setSelectedTab('list')}
        >
          <Text style={[styles.tabText, selectedTab === 'list' && styles.activeTabText]}>
            List Cards
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'active' && styles.activeTab]}
          onPress={() => setSelectedTab('active')}
        >
          <Text style={[styles.tabText, selectedTab === 'active' && styles.activeTabText]}>
            Active Listings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'sold' && styles.activeTab]}
          onPress={() => setSelectedTab('sold')}
        >
          <Text style={[styles.tabText, selectedTab === 'sold' && styles.activeTabText]}>
            Sold
          </Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'list' && (
        <>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>
              Selected: {selectedCards.length} cards
            </Text>
            {selectedCards.length > 0 && (
              <TouchableOpacity 
                style={styles.clearButton}
                onPress={() => setSelectedCards([])}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            data={mockCollection}
            renderItem={renderCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.cardList}
          />

          {selectedCards.length > 0 && (
            <View style={styles.actionBar}>
              <View style={styles.quickListContainer}>
                <Text style={styles.quickListText}>Quick List</Text>
                <Switch
                  value={quickList}
                  onValueChange={setQuickList}
                  trackColor={{ false: '#E5E5EA', true: '#34C759' }}
                />
              </View>
              <TouchableOpacity 
                style={styles.listButton}
                onPress={handleQuickList}
              >
                <DollarSign size={20} color="white" />
                <Text style={styles.listButtonText}>
                  List {selectedCards.length} Card{selectedCards.length > 1 ? 's' : ''}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      {selectedTab === 'active' && (
        <ScrollView style={styles.activeListingsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Connected Marketplaces</Text>
          </View>

          <View style={styles.marketplaceList}>
            {marketplaces.map(item => (
              <View key={item.id} style={styles.marketplaceItem}>
                <Image source={{ uri: item.logo }} style={styles.marketplaceLogo} />
                <View style={styles.marketplaceInfo}>
                  <Text style={styles.marketplaceName}>{item.name}</Text>
                  <Text style={styles.marketplaceStatus}>
                    {item.enabled ? 'Connected' : 'Not connected'}
                  </Text>
                </View>
                <Switch
                  value={item.enabled}
                  trackColor={{ false: '#E5E5EA', true: '#34C759' }}
                />
              </View>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Listings</Text>
          </View>

          <View style={styles.emptyStateContainer}>
            <ShoppingCart size={60} color="#C7C7CC" />
            <Text style={styles.emptyStateTitle}>No Active Listings</Text>
            <Text style={styles.emptyStateText}>
              Your active listings will appear here once you list cards for sale
            </Text>
            <TouchableOpacity 
              style={styles.emptyStateButton}
              onPress={() => setSelectedTab('list')}
            >
              <Text style={styles.emptyStateButtonText}>List Cards Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {selectedTab === 'sold' && (
        <View style={styles.emptyStateContainer}>
          <Share2 size={60} color="#C7C7CC" />
          <Text style={styles.emptyStateTitle}>No Sold Cards</Text>
          <Text style={styles.emptyStateText}>
            Your sold cards history will appear here
          </Text>
        </View>
      )}
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
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
  },
  activeTabText: {
    color: 'white',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  listHeaderText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    fontSize: 14,
    color: '#007AFF',
  },
  cardList: {
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
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
    position: 'relative',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#007AFF',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#5856D6',
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5EA',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quickListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickListText: {
    fontSize: 14,
    marginRight: 8,
  },
  listButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  listButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  activeListingsContainer: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  marketplaceList: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 8,
  },
  marketplaceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  marketplaceLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  marketplaceInfo: {
    flex: 1,
  },
  marketplaceName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  marketplaceStatus: {
    fontSize: 14,
    color: '#8E8E93',
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyStateButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
