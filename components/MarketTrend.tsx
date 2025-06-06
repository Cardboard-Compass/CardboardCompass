import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '@/constants/colors';
import { TrendingUp, TrendingDown } from 'lucide-react-native';

interface TrendData {
  title: string;
  category: string;
  percentChange: number;
}

interface MarketTrendProps {
  data: TrendData;
  isDark: boolean;
}

export function MarketTrend({ data, isDark }: MarketTrendProps) {
  const isTrendingUp = data.percentChange >= 0;
  
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        { 
          backgroundColor: isDark ? colors.gray[800] : colors.white,
          opacity: pressed ? 0.9 : 1
        }
      ]}
    >
      <View style={styles.trendIcon}>
        {isTrendingUp ? (
          <TrendingUp size={24} color={colors.success[500]} />
        ) : (
          <TrendingDown size={24} color={colors.error[500]} />
        )}
      </View>
      
      <Text style={[
        styles.title,
        { color: isDark ? colors.white : colors.gray[900] }
      ]} numberOfLines={2}>
        {data.title}
      </Text>
      
      <Text style={[
        styles.category,
        { color: isDark ? colors.gray[400] : colors.gray[600] }
      ]}>
        {data.category}
      </Text>
      
      <Text style={[
        styles.change,
        { 
          color: isTrendingUp 
            ? colors.success[500] 
            : colors.error[500] 
        }
      ]}>
        {isTrendingUp ? '+' : ''}{data.percentChange}%
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  trendIcon: {
    marginBottom: 12,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 8,
    height: 44,
  },
  category: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 8,
  },
  change: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
});
