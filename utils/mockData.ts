// Mock data for the app

// Collection data
export const mockCollection = [
  {
    id: '1',
    name: 'Charizard V',
    set: 'Vivid Voltage',
    priceAUD: 120.50,
    priceUSD: 79.99,
    category: 'pokemon',
    imageUrl: 'https://images.pexels.com/photos/5644779/pexels-photo-5644779.jpeg',
    lastSoldAU: '2024-02-15',
    tcgplayerMarket: 74.99,
    tcgplayerLow: 65.50,
    tcgplayerMid: 80.00,
    tcgplayerHigh: 95.00,
  },
  // ... other collection items with similar price structure
];

// Market trends data with updated price structure
export const marketTrends = [
  {
    id: '101',
    name: 'Charizard VMAX',
    set: 'Darkness Ablaze',
    priceAUD: 180.75,
    priceUSD: 119.99,
    change: 5.2,
    imageUrl: 'https://images.pexels.com/photos/5644779/pexels-photo-5644779.jpeg',
    priceHistory: generatePriceHistory(180.75, 30, 5),
    marketEfficiency: 85,
    tcgplayerMarket: 110.99,
    tcgplayerLow: 95.50,
    tcgplayerMid: 115.00,
    tcgplayerHigh: 135.00,
  },
  // ... other market trends with similar price structure
];

// Price display helper functions with null/undefined checks
export const formatAUPrice = (price: number | null | undefined) => {
  if (typeof price !== 'number') return 'N/A';
  return `$${price.toFixed(2)} AUD`;
};

export const formatUSDPrice = (price: number | null | undefined) => {
  if (typeof price !== 'number') return 'N/A';
  return `$${price.toFixed(2)} USD`;
};

// Helper function to generate price history data
function generatePriceHistory(currentPrice: number, days: number, trend: number) {
  const data = [];
  let price = currentPrice - ((trend / 100) * currentPrice * days);
  
  for (let i = 0; i < days; i++) {
    const fluctuation = (Math.random() - 0.5) * 5;
    price = price + ((trend / 100) * price) + fluctuation;
    price = Math.max(price, 1);
    
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      price: price
    });
  }
  
  return data;
}
