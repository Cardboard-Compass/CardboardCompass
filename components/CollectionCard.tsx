import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { colors } from '@/constants/colors';

interface CardProps {
  id: string;
  name: string;
  set: string;
  number: string;
  image: string;
  price: number;
  priceChange: number;
  game: string;
  rarity?: string;
}

interface CollectionCardProps {
  card: CardProps;
  viewMode: 'grid' | 'list';
  isDark: boolean;
}

export function CollectionCard({ card, viewMode, isDark }: CollectionCardProps) {
  if (viewMode === 'grid') {
    return (
      <Pressable 
        style={({ pressed }) => [
          styles.gridContainer,
          { 
            backgroundColor: isDark ? colors.gray[800] : colors.white,
            opacity: pressed ? 0.9 : 1
          }
        ]}
      >
        <Image source={{ uri: card.image }} style={styles.gridImage} />
        <Text style={[
          styles.gridName,
          { color: isDark ? colors.white : colors.gray[900] }
        ]} numberOfLines={1}>
          {card.name}
        </Text>
        <Text style={[
          styles.gridSet,
          { color: isDark ? colors.gray[400] : colors.gray[600] }
        ]} numberOfLines={1}>
          {card.set}
        </Text>
        <Text style={styles.gridPrice}>
          ${card.price.toFixed(2)}
        </Text>
      </Pressable>
    );
  }
  
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.listContainer,
        { 
          backgroundColor: isDark ? colors.gray[800] : colors.white,
          opacity: pressed ? 0.9 : 1
        }
      ]}
    >
      <Image source={{ uri: card.image }} style={styles.listImage} />
      <View style={styles.listInfo}>
        <Text style={[
          styles.listName,
          { color: isDark ? colors.white : colors.gray[900] }
        ]}>
          {card.name}
        </Text>
        <Text style={[
          styles.listSet,
          { color: isDark ? colors.gray[400] : colors.gray[600] }
        ]}>
          {card.set} · {card.number}
        </Text>
        {card.rarity && (
          <Text style={[
            styles.listRarity,
            { color: isDark ? colors.gray[400] : colors.gray[600] }
          ]}>
            {card.rarity}
          </Text>
        )}
      </View>
      <Text style={styles.listPrice}>
        ${card.price.toFixed(2)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    width: '48%',
    borderRadius: 12,
    padding: 12,
    margin: '1%',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  gridImage: {
    width: '100%',
    aspectRatio: 0.7,
    borderRadius: 8,
    marginBottom: 8,
  },
  gridName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginBottom: 2,
  },
  gridSet: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginBottom: 4,
  },
  gridPrice: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.primary[600],
  },
  listContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    marginHorizontal: '1%',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listImage: {
    width: 50,
    height: 70,
    borderRadius: 4,
  },
  listInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  listName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 2,
  },
  listSet: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 2,
  },
  listRarity: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  listPrice: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.primary[600],
    alignSelf: 'center',
  },
});
