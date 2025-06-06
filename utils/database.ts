import { getDatabase, ref, set, get, push, remove, update, query, orderByChild, equalTo } from 'firebase/database';
import { app } from './auth';
import { captureError } from './errorTracking';
import { getCurrentUser } from './auth';

const db = getDatabase(app);

// Types
export interface CardData {
  id: string;
  name: string;
  set: string;
  number?: string;
  rarity?: string;
  imageUrl: string;
  category: 'pokemon' | 'magic' | 'yugioh' | 'flesh & blood';
  condition?: 'mint' | 'near_mint' | 'excellent' | 'good' | 'poor';
  notes?: string;
  addedAt: number;
  priceHistory: {
    tcgplayer: {
      market: number;
      low: number;
      mid: number;
      high: number;
      lastUpdated: number;
    };
    ebayAU: {
      lastSold: number;
      lastSoldDate: string;
    };
  };
}

export interface UserCollection {
  cards: { [key: string]: CardData };
  stats: {
    totalCards: number;
    totalValueUSD: number;
    totalValueAUD: number;
    lastUpdated: number;
  };
}

export interface UserProfile {
  displayName: string;
  location?: string;
  bio?: string;
  collectorSince?: string;
  preferences: {
    currency: 'USD' | 'AUD';
    notifications: boolean;
    privateCollection: boolean;
  };
}

// Collection Management
export async function addCardToCollection(cardData: Omit<CardData, 'id' | 'addedAt'>): Promise<string> {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const cardRef = push(ref(db, `users/${user.uid}/collection/cards`));
    const newCard: CardData = {
      ...cardData,
      id: cardRef.key!,
      addedAt: Date.now(),
    };

    await set(cardRef, newCard);
    await updateCollectionStats(user.uid);
    return cardRef.key!;
  } catch (error) {
    captureError(error as Error, {
      context: 'database/add-card',
      cardData,
    });
    throw error;
  }
}

export async function updateCard(cardId: string, updates: Partial<CardData>): Promise<void> {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const cardRef = ref(db, `users/${user.uid}/collection/cards/${cardId}`);
    await update(cardRef, updates);
    await updateCollectionStats(user.uid);
  } catch (error) {
    captureError(error as Error, {
      context: 'database/update-card',
      cardId,
      updates,
    });
    throw error;
  }
}

export async function removeCard(cardId: string): Promise<void> {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const cardRef = ref(db, `users/${user.uid}/collection/cards/${cardId}`);
    await remove(cardRef);
    await updateCollectionStats(user.uid);
  } catch (error) {
    captureError(error as Error, {
      context: 'database/remove-card',
      cardId,
    });
    throw error;
  }
}

export async function getCollection(): Promise<CardData[]> {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const collectionRef = ref(db, `users/${user.uid}/collection/cards`);
    const snapshot = await get(collectionRef);
    
    if (!snapshot.exists()) return [];
    
    return Object.values(snapshot.val() as { [key: string]: CardData })
      .sort((a, b) => b.addedAt - a.addedAt);
  } catch (error) {
    captureError(error as Error, {
      context: 'database/get-collection',
    });
    throw error;
  }
}

// User Profile Management
export async function updateUserProfile(profile: Partial<UserProfile>): Promise<void> {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const profileRef = ref(db, `users/${user.uid}/profile`);
    await update(profileRef, profile);
  } catch (error) {
    captureError(error as Error, {
      context: 'database/update-profile',
      profile,
    });
    throw error;
  }
}

export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const profileRef = ref(db, `users/${user.uid}/profile`);
    const snapshot = await get(profileRef);
    
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    captureError(error as Error, {
      context: 'database/get-profile',
    });
    throw error;
  }
}

// Private Helper Functions
async function updateCollectionStats(userId: string): Promise<void> {
  try {
    const collectionRef = ref(db, `users/${userId}/collection/cards`);
    const snapshot = await get(collectionRef);
    
    if (!snapshot.exists()) {
      await set(ref(db, `users/${userId}/collection/stats`), {
        totalCards: 0,
        totalValueUSD: 0,
        totalValueAUD: 0,
        lastUpdated: Date.now(),
      });
      return;
    }

    const cards = Object.values(snapshot.val() as { [key: string]: CardData });
    const stats = {
      totalCards: cards.length,
      totalValueUSD: cards.reduce((sum, card) => sum + (card.priceHistory.tcgplayer.market || 0), 0),
      totalValueAUD: cards.reduce((sum, card) => sum + (card.priceHistory.ebayAU.lastSold || 0), 0),
      lastUpdated: Date.now(),
    };

    await set(ref(db, `users/${userId}/collection/stats`), stats);
  } catch (error) {
    captureError(error as Error, {
      context: 'database/update-stats',
      userId,
    });
    throw error;
  }
}

// Market Data Management
export async function updateCardPrices(cardId: string, prices: CardData['priceHistory']): Promise<void> {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const cardRef = ref(db, `users/${user.uid}/collection/cards/${cardId}`);
    await update(cardRef, {
      priceHistory: prices,
    });
    await updateCollectionStats(user.uid);
  } catch (error) {
    captureError(error as Error, {
      context: 'database/update-prices',
      cardId,
      prices,
    });
    throw error;
  }
}

// Search and Filtering
export async function searchCollection(query: string): Promise<CardData[]> {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const collectionRef = ref(db, `users/${user.uid}/collection/cards`);
    const snapshot = await get(collectionRef);
    
    if (!snapshot.exists()) return [];
    
    const cards = Object.values(snapshot.val() as { [key: string]: CardData });
    return cards.filter(card => 
      card.name.toLowerCase().includes(query.toLowerCase()) ||
      card.set.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    captureError(error as Error, {
      context: 'database/search',
      query,
    });
    throw error;
  }
}

export async function filterCollectionByCategory(category: CardData['category']): Promise<CardData[]> {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const collectionRef = ref(db, `users/${user.uid}/collection/cards`);
    const categoryQuery = query(collectionRef, orderByChild('category'), equalTo(category));
    const snapshot = await get(categoryQuery);
    
    if (!snapshot.exists()) return [];
    
    return Object.values(snapshot.val() as { [key: string]: CardData })
      .sort((a, b) => b.addedAt - a.addedAt);
  } catch (error) {
    captureError(error as Error, {
      context: 'database/filter',
      category,
    });
    throw error;
  }
}
