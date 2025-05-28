import { captureError } from './errorTracking';
import { CardData } from './database';

// Card recognition confidence threshold
const CONFIDENCE_THRESHOLD = 80;

// Card detection settings
const DETECTION_SETTINGS = {
  minArea: 0.4, // Card must occupy at least 40% of frame
  maxArea: 0.9, // Card must not occupy more than 90% of frame
  aspectRatio: {
    min: 1.3, // Standard TCG card ratio is ~1.4
    max: 1.5,
  },
};

// Mock API response type
interface CardRecognitionResult {
  name: string;
  set: string;
  number?: string;
  rarity?: string;
  confidence: number;
  category: CardData['category'];
  priceHistory: CardData['priceHistory'];
}

// Simulates card detection in frame
export function isCardInFrame(frameMetrics: { width: number; height: number }): boolean {
  // In a real implementation, this would use computer vision to detect card edges
  return Math.random() > 0.3; // 70% chance of detecting a card
}

// Simulates analyzing frame quality
export function analyzeFrameQuality(brightness: number, blur: number): {
  isGoodQuality: boolean;
  message?: string;
} {
  if (brightness < 0.3) {
    return { isGoodQuality: false, message: 'Too dark. Move to a brighter area.' };
  }
  if (brightness > 0.9) {
    return { isGoodQuality: false, message: 'Too bright. Reduce glare.' };
  }
  if (blur > 0.5) {
    return { isGoodQuality: false, message: 'Image is blurry. Hold steady.' };
  }
  return { isGoodQuality: true };
}

// Main card scanning function
export async function scanCard(imageData: string): Promise<CardRecognitionResult | null> {
  try {
    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate card recognition with mock data
    const mockCards: CardRecognitionResult[] = [
      {
        name: 'Charizard VMAX',
        set: 'Darkness Ablaze',
        number: '020/189',
        rarity: 'Ultra Rare',
        confidence: 95,
        category: 'pokemon',
        priceHistory: {
          tcgplayer: {
            market: 89.99,
            low: 75.00,
            mid: 90.00,
            high: 120.00,
            lastUpdated: Date.now(),
          },
          ebayAU: {
            lastSold: 135.50,
            lastSoldDate: new Date().toISOString().split('T')[0],
          },
        },
      },
      {
        name: 'Black Lotus',
        set: 'Alpha',
        number: '232',
        rarity: 'Rare',
        confidence: 92,
        category: 'magic',
        priceHistory: {
          tcgplayer: {
            market: 25000.00,
            low: 20000.00,
            mid: 25000.00,
            high: 30000.00,
            lastUpdated: Date.now(),
          },
          ebayAU: {
            lastSold: 38000.00,
            lastSoldDate: new Date().toISOString().split('T')[0],
          },
        },
      },
    ];

    const result = mockCards[Math.floor(Math.random() * mockCards.length)];

    // Simulate recognition confidence check
    if (result.confidence < CONFIDENCE_THRESHOLD) {
      return null;
    }

    return result;
  } catch (error) {
    captureError(error as Error, {
      context: 'cardScanner/scanCard',
      timestamp: new Date().toISOString(),
    });
    throw error;
  }
}

// Helper function to get feedback message based on card position
export function getPositionFeedback(
  cardBounds: { x: number; y: number; width: number; height: number },
  frameSize: { width: number; height: number },
): string | null {
  const cardCenterX = cardBounds.x + cardBounds.width / 2;
  const cardCenterY = cardBounds.y + cardBounds.height / 2;
  const frameCenterX = frameSize.width / 2;
  const frameCenterY = frameSize.height / 2;

  const tolerance = 50; // pixels

  if (Math.abs(cardCenterX - frameCenterX) > tolerance) {
    return cardCenterX < frameCenterX ? 'Move card right' : 'Move card left';
  }

  if (Math.abs(cardCenterY - frameCenterY) > tolerance) {
    return cardCenterY < frameCenterY ? 'Move card down' : 'Move card up';
  }

  const cardArea = (cardBounds.width * cardBounds.height) / (frameSize.width * frameSize.height);
  
  if (cardArea < DETECTION_SETTINGS.minArea) {
    return 'Move closer to the card';
  }
  
  if (cardArea > DETECTION_SETTINGS.maxArea) {
    return 'Move away from the card';
  }

  return null;
}