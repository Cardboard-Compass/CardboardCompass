import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { colors } from '@/constants/colors';
import { SearchBar } from '@/components/SearchBar';
import { MarketCard } from '@/components/MarketCard';
import { MarketTrend } from '@/components/MarketTrend';
import { mockMarketTrends, mockHotCards } from '@/data/mockData';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function MarketScreen() {
  const [trends, setTrends] = useState(mockMarketTrends);
  const [hotCards, setHotCards] = useState(mockHotCards);
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

  return (
    <ScrollView 
      style={[
        styles.container,
        { backgroundColor: isDark ? colors.gray[900] : colors.gray[100] }
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[
          styles.title,
          { color: isDark ? colors.white : colors.gray[900] }
        ]}>
          Market
        </Text>
      </View>

      <SearchBar placeholder="Search cards..." />
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[
            styles.sectionTitle,
            { color: isDark ? colors.white : colors.gray[900] }
          ]}>
            Market Trends
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.trendsContainer}
        >
          {trends.map((trend, index) => (
            <MarketTrend 
              key={index}
              data={trend}
              isDark={isDark}
            />
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[
            styles.sectionTitle,
            { color: isDark ? colors.white : colors.gray[900] }
          ]}>
            Hot Cards
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        {hotCards.map((card, index) => (
          <MarketCard 
            key={index}
            card={card}
            isDark={isDark}
          />
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[
            styles.sectionTitle,
            { color: isDark ? colors.white : colors.gray[900] }
          ]}>
            Australian Market Events
          </Text>
        </View>
        
        <View style={[
          styles.eventCard,
          { backgroundColor: isDark ? colors.gray[800] : colors.white }
        ]}>
          <View style={styles.eventDate}>
            <Text style={[
              styles.eventMonth,
              { color: isDark ? colors.gray[400] : colors.gray[600] }
            ]}>
              JUN
            </Text>
            <Text style={[
              styles.eventDay,
              { color: isDark ? colors.white : colors.gray[900] }
            ]}>
              24
            </Text>
          </View>
          <View style={styles.eventInfo}>
            <Text style={[
              styles.eventTitle,
              { color: isDark ? colors.white : colors.gray[900] }
            ]}>
              Sydney Collectible Card Expo
            </Text>
            <Text style={[
              styles.eventLocation,
              { color: isDark ? colors.gray[400] : colors.gray[600] }
            ]}>
              Sydney Convention Centre
            </Text>
          </View>
        </View>

        <View style={[
          styles.eventCard,
          { backgroundColor: isDark ? colors.gray[800] : colors.white }
        ]}>
          <View style={styles.eventDate}>
            <Text style={[
              styles.eventMonth,
              { color: isDark ? colors.gray[400] : colors.gray[600] }
            ]}>
              JUL
            </Text>
            <Text style={[
              styles.eventDay,
              { color: isDark ? colors.white : colors.gray[900] }
            ]}>
              15
            </Text>
          </View>
          <View style={styles.eventInfo}>
            <Text style={[
              styles.eventTitle,
              { color: isDark ? colors.white : colors.gray[900] }
            ]}>
              Melbourne Card Traders Meetup
            </Text>
            <Text style={[
              styles.eventLocation,
              { color: isDark ? colors.gray[400] : colors.gray[600] }
            ]}>
              Melbourne Exhibition Centre
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  viewAllText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.primary[600],
  },
  trendsContainer: {
    paddingRight: 16,
  },
  eventCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  eventDate: {
    width: 48,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventMonth: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  eventDay: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  eventInfo: {
    marginLeft: 16,
    flex: 1,
  },
  eventTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  eventLocation: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});