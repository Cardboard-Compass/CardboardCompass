import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Search, TrendingUp, TrendingDown, Zap, FolderHeart } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { DashboardCard } from '@/components/DashboardCard';
import { RecentlyScannedCard } from '@/components/RecentlyScannedCard';
import { ValueChart } from '@/components/ValueChart';
import { SearchBar } from '@/components/SearchBar';
import { mockCards, mockCollectionValue } from '@/data/mockData';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const [recentCards, setRecentCards] = useState(mockCards.slice(0, 3));
  const [collectionValue, setCollectionValue] = useState(mockCollectionValue);
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
        <View>
          <Text style={[
            styles.greeting, 
            { color: isDark ? colors.white : colors.gray[900] }
          ]}>
            G'day, Collector
          </Text>
          <Text style={[
            styles.date,
            { color: isDark ? colors.gray[400] : colors.gray[600] }
          ]}>
            {new Date().toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' })}
          </Text>
        </View>
      </View>

      <SearchBar placeholder="Search your collection..." />
      
      <View style={styles.valueContainer}>
        <View style={styles.valueTextContainer}>
          <Text style={[
            styles.valueLabel,
            { color: isDark ? colors.gray[400] : colors.gray[600] }
          ]}>
            Collection Value
          </Text>
          <Text style={[
            styles.valueAmount,
            { color: isDark ? colors.white : colors.gray[900] }
          ]}>
            ${collectionValue.current.toLocaleString('en-AU')}
          </Text>
          <View style={styles.changeContainer}>
            {collectionValue.percentChange >= 0 ? (
              <TrendingUp size={16} color={colors.success[500]} />
            ) : (
              <TrendingDown size={16} color={colors.error[500]} />
            )}
            <Text style={[
              styles.changeText,
              { 
                color: collectionValue.percentChange >= 0 
                  ? colors.success[500] 
                  : colors.error[500] 
              }
            ]}>
              {Math.abs(collectionValue.percentChange)}% {collectionValue.percentChange >= 0 ? 'up' : 'down'} this month
            </Text>
          </View>
        </View>
        <View style={styles.chartContainer}>
          <ValueChart data={collectionValue.history} />
        </View>
      </View>

      <View style={styles.cardsSection}>
        <View style={styles.sectionHeader}>
          <Text style={[
            styles.sectionTitle,
            { color: isDark ? colors.white : colors.gray[900] }
          ]}>
            Dashboard
          </Text>
        </View>
        
        <View style={styles.dashboardGrid}>
          <DashboardCard 
            title="Total Cards" 
            value="487" 
            icon={<FolderHeart size={24} color={colors.primary[500]} />}
            backgroundColor={isDark ? colors.gray[800] : colors.white}
            textColor={isDark ? colors.white : colors.gray[900]}
          />
          <DashboardCard 
            title="Market Movers" 
            value="12" 
            icon={<Zap size={24} color={colors.secondary[500]} />}
            backgroundColor={isDark ? colors.gray[800] : colors.white}
            textColor={isDark ? colors.white : colors.gray[900]}
          />
        </View>
      </View>

      <View style={styles.recentSection}>
        <View style={styles.sectionHeader}>
          <Text style={[
            styles.sectionTitle,
            { color: isDark ? colors.white : colors.gray[900] }
          ]}>
            Recently Scanned
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {recentCards.map((card, index) => (
          <RecentlyScannedCard 
            key={index}
            card={card}
            isDark={isDark}
          />
        ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  greeting: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  valueContainer: {
    marginHorizontal: 16,
    marginVertical: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.primary[800],
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valueTextContainer: {
    flex: 1,
  },
  valueLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[300],
    marginBottom: 4,
  },
  valueAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: colors.white,
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginLeft: 4,
  },
  chartContainer: {
    flex: 1,
    height: 80,
    justifyContent: 'flex-end',
  },
  cardsSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  dashboardGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recentSection: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
});