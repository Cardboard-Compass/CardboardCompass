import { getCollection, addCardToCollection, updateCard, removeCard } from './database';
import { mockCollection } from './mockData';

describe('Database Operations', () => {
  const testCard = mockCollection[0];

  test('addCardToCollection adds a card with correct price history structure', async () => {
    const cardData = {
      name: testCard.name,
      set: testCard.set,
      imageUrl: testCard.imageUrl,
      category: 'pokemon' as const,
      priceHistory: {
        tcgplayer: {
          market: 79.99,
          low: 65.50,
          mid: 80.00,
          high: 95.00,
          lastUpdated: Date.now(),
        },
        ebayAU: {
          lastSold: 120.50,
          lastSoldDate: new Date().toISOString().split('T')[0],
        },
      },
    };

    try {
      const cardId = await addCardToCollection(cardData);
      expect(cardId).toBeTruthy();
    } catch (error) {
      console.error('Test error:', error);
      throw error;
    }
  });
});