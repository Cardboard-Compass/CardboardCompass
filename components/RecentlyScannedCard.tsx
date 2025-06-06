import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { colors } from '@/constants/colors';
import { TrendingUp, TrendingDown } from 'lucide-react-native';

interface CardProps {
  id: string;
  name: string;
  set: string;
  number: string;
  image: string;
  price: number;
  priceChange: number;
  game: string;
}

interface RecentlyScannedCardProps {
  card: CardProps;
  isDark: boolean;
}

export function RecentlyScannedCard({ card, isDark }: RecentlyScannedCardProps) {
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
      <Image source={{ uri: card.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={[
          styles.name,
          { color: isDark ? colors.white : colors.gray[900] }
        ]}>
          {card.name}
        </Text>
        <Text style={[
          styles.set,
          { color: isDark ? colors.gray[400] : colors.gray[600] }
        ]}>
          {card.set} · {card.number}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={[
          styles.price,
          { color: isDark ? colors.white : colors.gray[900] }
        ]}>
          ${card.price.toFixed(2)}
        </Text>
        <View style={styles.changeContainer}>
          {card.priceChange >= 0 ? (
            <TrendingUp size={12} color={colors.success[500]} />
          ) : (
            <TrendingDown size={12} color={colors.error[500]} />
          )}
          <Text style={[
            styles.change,
            { 
              color: card.priceChange >= 0 
                ? colors.success[500] 
                : colors.error[500] 
            }
          ]}>
            {Math.abs(card.priceChange)}%
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 8,
    padding: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 40,
    height: 56,
    borderRadius: 4,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  set: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  priceContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  price: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  change: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    marginLeft: 2,
  },
});
