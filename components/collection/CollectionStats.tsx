import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatAUPrice, formatUSDPrice } from '@/utils/mockData';

type CollectionStatsProps = {
  totalCards: number;
  totalValueAUD: number;
  totalValueUSD: number;
  uniqueSets: number;
};

export function CollectionStats({ 
  totalCards, 
  totalValueAUD,
  totalValueUSD,
  uniqueSets 
}: CollectionStatsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.stat}>
        <Text style={styles.statValue}>{totalCards}</Text>
        <Text style={styles.statLabel}>Cards</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.stat}>
        <Text style={styles.statValue}>{formatAUPrice(totalValueAUD)}</Text>
        <Text style={styles.statValueSecondary}>{formatUSDPrice(totalValueUSD)}</Text>
        <Text style={styles.statLabel}>Total Value</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.stat}>
        <Text style={styles.statValue}>{uniqueSets}</Text>
        <Text style={styles.statLabel}>Sets</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statValueSecondary: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: '#E5E5EA',
    alignSelf: 'center',
  },
});
