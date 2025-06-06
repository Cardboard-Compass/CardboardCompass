import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import { X, Plus, ShoppingCart, Share2 } from 'lucide-react-native';

type ScanResultModalProps = {
  visible: boolean;
  card: any; // In a real app, we'd use a proper type
  onClose: () => void;
};

const formatAUPrice = (price: number | undefined) => price ? `$${price.toFixed(2)} AUD` : 'N/A';
const formatUSDPrice = (price: number | undefined) => price ? `$${price.toFixed(2)} USD` : 'N/A';

const PriceSection = ({ card }) => (
  <View style={styles.priceSection}>
    <Text style={styles.sectionTitle}>Market Prices</Text>
    <View style={styles.priceCard}>
      <View style={styles.priceGroup}>
        <Text style={styles.priceGroupTitle}>eBay Australia</Text>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Last Sold:</Text>
          <Text style={styles.priceValue}>{formatAUPrice(card?.priceHistory?.ebayAU?.lastSold)}</Text>
        </View>
        <Text style={styles.priceMeta}>Last sold on {card?.priceHistory?.ebayAU?.lastSoldDate || 'N/A'}</Text>
      </View>
      
      <View style={styles.priceDivider} />
      
      <View style={styles.priceGroup}>
        <Text style={styles.priceGroupTitle}>TCGplayer</Text>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Market:</Text>
          <Text style={styles.priceValue}>{formatUSDPrice(card?.priceHistory?.tcgplayer?.market)}</Text>
        </View>
        <View style={styles.priceRangeContainer}>
          <View style={styles.priceRangeItem}>
            <Text style={styles.priceRangeLabel}>Low</Text>
            <Text style={styles.priceRangeValue}>{formatUSDPrice(card?.priceHistory?.tcgplayer?.low)}</Text>
          </View>
          <View style={styles.priceRangeItem}>
            <Text style={styles.priceRangeLabel}>Mid</Text>
            <Text style={styles.priceRangeValue}>{formatUSDPrice(card?.priceHistory?.tcgplayer?.mid)}</Text>
          </View>
          <View style={styles.priceRangeItem}>
            <Text style={styles.priceRangeLabel}>High</Text>
            <Text style={styles.priceRangeValue}>{formatUSDPrice(card?.priceHistory?.tcgplayer?.high)}</Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

const ScanResultModal: React.FC<ScanResultModalProps> = ({ visible, card, onClose }) => {
  const [addedToCollection, setAddedToCollection] = useState(false);

  const handleAddToCollection = () => {
    setAddedToCollection(true);
    // In a real app, this would save to the collection
  };

  if (!card) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Card Identified</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollContent}>
            <View style={styles.cardPreview}>
              <Image source={{ uri: card.imageUrl }} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{card.name || 'Unknown Card'}</Text>
                <Text style={styles.cardSet}>{card.set || 'Unknown Set'}</Text>
                <View style={styles.cardMeta}>
                  <Text style={styles.cardMetaLabel}>Rarity:</Text>
                  <Text style={styles.cardMetaValue}>{card.rarity || 'Unknown'}</Text>
                </View>
                <View style={styles.cardMeta}>
                  <Text style={styles.cardMetaLabel}>Number:</Text>
                  <Text style={styles.cardMetaValue}>{card.number || 'N/A'}</Text>
                </View>
                <View style={styles.confidenceBar}>
                  <View style={[styles.confidenceFill, { width: `${card.confidence || 0}%` }]} />
                </View>
                <Text style={styles.confidenceText}>
                  Match confidence: {card.confidence || 0}%
                </Text>
              </View>
            </View>

            <PriceSection card={card} />

            <View style={styles.conditionSection}>
              <Text style={styles.sectionTitle}>Card Condition</Text>
              <View style={styles.conditionSelector}>
                {['Mint', 'Near Mint', 'Excellent', 'Good', 'Poor'].map((condition) => (
                  <TouchableOpacity 
                    key={condition}
                    style={[
                      styles.conditionOption,
                      condition === 'Near Mint' && styles.selectedCondition
                    ]}
                  >
                    <Text style={[
                      styles.conditionText,
                      condition === 'Near Mint' && styles.selectedConditionText
                    ]}>
                      {condition}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <ShoppingCart size={20} color="#007AFF" />
                <Text style={styles.actionButtonText}>Sell</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Share2 size={20} color="#007AFF" />
                <Text style={styles.actionButtonText}>Share</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={[
                styles.addButton,
                addedToCollection && styles.addedButton
              ]}
              onPress={handleAddToCollection}
              disabled={addedToCollection}
            >
              {addedToCollection ? (
                <Text style={styles.addButtonText}>Added to Collection</Text>
              ) : (
                <>
                  <Plus size={20} color="white" />
                  <Text style={styles.addButtonText}>Add to Collection</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    position: 'relative',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  scrollContent: {
    flex: 1,
  },
  cardPreview: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  cardImage: {
    width: 120,
    height: 170,
    resizeMode: 'contain',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  cardName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSet: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 12,
  },
  cardMeta: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  cardMetaLabel: {
    fontSize: 14,
    color: '#8E8E93',
    width: 60,
  },
  cardMetaValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  confidenceBar: {
    height: 4,
    backgroundColor: '#E5E5EA',
    borderRadius: 2,
    marginTop: 12,
    marginBottom: 4,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 2,
  },
  confidenceText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  priceSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  priceCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  priceDivider: {
    height: 1,
    backgroundColor: '#E5E5EA',
  },
  priceLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  priceGroup: {
    marginVertical: 8,
  },
  priceGroupTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  priceMeta: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  priceRangeItem: {
    alignItems: 'center',
  },
  priceRangeLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  priceRangeValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  conditionSection: {
    padding: 16,
  },
  conditionSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  conditionOption: {
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
  },
  selectedCondition: {
    backgroundColor: '#007AFF',
  },
  conditionText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  selectedConditionText: {
    color: 'white',
    fontWeight: '500',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionButtonText: {
    color: '#007AFF',
    marginLeft: 8,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  addedButton: {
    backgroundColor: '#34C759',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default ScanResultModal;
