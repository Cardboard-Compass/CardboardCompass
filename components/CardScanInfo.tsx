import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import { colors } from '@/constants/colors';
import { X, Plus, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react-native';

interface CardProps {
  name: string;
  set: string;
  number: string;
  image: string;
  price: number;
  marketTrend: string;
  rarity: string;
}

interface CardScanInfoProps {
  card: CardProps;
  onClose: () => void;
  isDark: boolean;
}

export function CardScanInfo({ card, onClose, isDark }: CardScanInfoProps) {
  const isTrendingUp = card.marketTrend.startsWith('+');
  
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
          Card Found
        </Text>
        <TouchableOpacity onPress={onClose}>
          <X size={24} color={isDark ? colors.white : colors.gray[900]} />
        </TouchableOpacity>
      </View>
      
      <View style={[
        styles.cardContainer,
        { backgroundColor: isDark ? colors.gray[800] : colors.white }
      ]}>
        <Image source={{ uri: card.image }} style={styles.cardImage} />
        
        <View style={styles.cardDetails}>
          <Text style={[
            styles.cardName,
            { color: isDark ? colors.white : colors.gray[900] }
          ]}>
            {card.name}
          </Text>
          <Text style={[
            styles.cardSet,
            { color: isDark ? colors.gray[400] : colors.gray[600] }
          ]}>
            {card.set} · {card.number}
          </Text>
          
          <View style={styles.rarityContainer}>
            <Text style={[
              styles.rarityLabel,
              { color: isDark ? colors.gray[400] : colors.gray[600] }
            ]}>
              Rarity:
            </Text>
            <Text style={[
              styles.rarityValue,
              { color: isDark ? colors.white : colors.gray[900] }
            ]}>
              {card.rarity}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={[
        styles.priceContainer,
        { backgroundColor: isDark ? colors.gray[800] : colors.white }
      ]}>
        <View style={styles.priceHeader}>
          <Text style={[
            styles.priceTitle,
            { color: isDark ? colors.white : colors.gray[900] }
          ]}>
            Current Market Price
          </Text>
          <TouchableOpacity style={styles.moreButton}>
            <ExternalLink size={16} color={colors.primary[600]} />
            <Text style={styles.moreButtonText}>More</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.priceRow}>
          <Text style={[
            styles.priceValue,
            { color: isDark ? colors.white : colors.gray[900] }
          ]}>
            ${card.price.toFixed(2)} AUD
          </Text>
          <View style={styles.trendContainer}>
            {isTrendingUp ? (
              <TrendingUp size={16} color={colors.success[500]} />
            ) : (
              <TrendingDown size={16} color={colors.error[500]} />
            )}
            <Text style={[
              styles.trendText,
              { 
                color: isTrendingUp 
                  ? colors.success[500] 
                  : colors.error[500] 
              }
            ]}>
              {card.marketTrend}
            </Text>
          </View>
        </View>
        
        <Text style={[
          styles.sourcesText,
          { color: isDark ? colors.gray[400] : colors.gray[600] }
        ]}>
          Price data from eBay Australia, TCGPlayer, Cardmarket
        </Text>
      </View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color={colors.white} />
          <Text style={styles.addButtonText}>Add to Collection</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  cardContainer: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardImage: {
    width: 90,
    height: 125,
    borderRadius: 8,
  },
  cardDetails: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  cardName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    marginBottom: 8,
  },
  cardSet: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 12,
  },
  rarityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rarityLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginRight: 4,
  },
  rarityValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  priceContainer: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.primary[600],
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginLeft: 4,
  },
  sourcesText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  addButton: {
    flex: 1,
    backgroundColor: colors.primary[600],
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  addButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.white,
    marginLeft: 8,
  },
});
