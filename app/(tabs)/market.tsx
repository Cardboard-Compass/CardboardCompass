import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronUp, ChevronDown, TrendingUp, CircleAlert as AlertCircle, Clock } from 'lucide-react-native';
import { marketTrends, hotCards } from '@/utils/mockData';
import PriceChart from '@/components/market/PriceChart';

const screenWidth = Dimensions.get('window').width;

export default function MarketScreen() {
  const [selectedChart, setSelectedChart] = useState(null);
  const [timeRange, setTimeRange] = useState('1W');

  const renderTrendingCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.trendingCard}
      onPress={() => setSelectedChart(item)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.trendingCardImage} />
      <View style={styles.trendingCardInfo}>
        <Text style={styles.trendingCardName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.trendingCardSet} numberOfLines={1}>{item.set}</Text>
        <View style={styles.trendingCardPrice}>
          <Text style={styles.trendingCardPriceValue}>${(item.priceHistory?.tcgplayer?.market || 0).toFixed(2)}</Text>
          <View style={[
            styles.trendingCardChange,
            { backgroundColor: item.change >= 0 ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255, 59, 48, 0.1)' }
          ]}>
            {item.change >= 0 ? (
              <ChevronUp size={12} color="#34C759" />
            ) : (
              <ChevronDown size={12} color="#FF3B30" />
            )}
            <Text style={[
              styles.trendingCardChangeText,
              { color: item.change >= 0 ? '#34C759' : '#FF3B30' }
            ]}>
              {Math.abs(item.change).toFixed(1)}%
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHotCard = ({ item }) => (
    <TouchableOpacity style={styles.hotCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.hotCardImage} />
      <View style={styles.hotCardOverlay}>
        <View style={styles.hotCardRank}>
          <Text style={styles.hotCardRankText}>{item.rank}</Text>
        </View>
        <View style={styles.hotCardInfo}>
          <Text style={styles.hotCardName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.hotCardSet} numberOfLines={1}>{item.set}</Text>
          <View style={styles.hotCardStats}>
            <Text style={styles.hotCardPrice}>${(item.priceHistory?.tcgplayer?.market || 0).toFixed(2)}</Text>
            <View style={styles.hotCardChange}>
              <ChevronUp size={12} color="#34C759" />
              <Text style={styles.hotCardChangeText}>{item.change}%</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Market</Text>
      </View>

      <FlatList
        data={[1]} // Just one item to render all our content
        keyExtractor={() => 'market-content'}
        renderItem={() => (
          <View>
            {/* Market Insights */}
            <View style={styles.insightsContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Market Insights</Text>
              </View>

              <View style={styles.insightCards}>
                <View style={[styles.insightCard, { backgroundColor: 'rgba(90, 200, 250, 0.1)' }]}>
                  <TrendingUp size={20} color="#5AC8FA" />
                  <Text style={styles.insightValue}>+5.3%</Text>
                  <Text style={styles.insightLabel}>Market Growth</Text>
                </View>

                <View style={[styles.insightCard, { backgroundColor: 'rgba(255, 149, 0, 0.1)' }]}>
                  <AlertCircle size={20} color="#FF9500" />
                  <Text style={styles.insightValue}>23</Text>
                  <Text style={styles.insightLabel}>Price Alerts</Text>
                </View>

                <View style={[styles.insightCard, { backgroundColor: 'rgba(88, 86, 214, 0.1)' }]}>
                  <Clock size={20} color="#5856D6" />
                  <Text style={styles.insightValue}>1.4hr</Text>
                  <Text style={styles.insightLabel}>Avg. Time Listed</Text>
                </View>
              </View>
            </View>

            {/* Selected Chart or Trending List */}
            <View style={styles.chartContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  {selectedChart ? selectedChart.name : 'Trending Cards'}
                </Text>
                {selectedChart && (
                  <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => setSelectedChart(null)}
                  >
                    <Text style={styles.backButtonText}>Back to Trending</Text>
                  </TouchableOpacity>
                )}
              </View>

              {selectedChart ? (
                <View>
                  <View style={styles.chartCard}>
                    <View style={styles.chartHeader}>
                      <View>
                        <Text style={styles.chartTitle}>{selectedChart.name}</Text>
                        <Text style={styles.chartSubtitle}>{selectedChart.set}</Text>
                      </View>
                      <View>
                        <Text style={styles.chartPrice}>${(selectedChart.priceHistory?.tcgplayer?.market || 0).toFixed(2)}</Text>
                        <View style={styles.chartChange}>
                          {selectedChart.change >= 0 ? (
                            <ChevronUp size={12} color="#34C759" />
                          ) : (
                            <ChevronDown size={12} color="#FF3B30" />
                          )}
                          <Text style={[
                            styles.chartChangeText,
                            { color: selectedChart.change >= 0 ? '#34C759' : '#FF3B30' }
                          ]}>
                            {Math.abs(selectedChart.change).toFixed(1)}%
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.timeRangeSelector}>
                      {['1D', '1W', '1M', '3M', 'YTD', '1Y'].map(range => (
                        <TouchableOpacity
                          key={range}
                          style={[
                            styles.timeRangeButton,
                            timeRange === range && styles.timeRangeButtonActive
                          ]}
                          onPress={() => setTimeRange(range)}
                        >
                          <Text style={[
                            styles.timeRangeText,
                            timeRange === range && styles.timeRangeTextActive
                          ]}>
                            {range}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    <PriceChart 
                      data={selectedChart.priceHistory} 
                      width={screenWidth - 48} 
                      height={200}
                      timeRange={timeRange}
                    />

                    <View style={styles.chartStats}>
                      <View style={styles.chartStat}>
                        <Text style={styles.chartStatLabel}>Market Cap</Text>
                        <Text style={styles.chartStatValue}>$1.2M</Text>
                      </View>
                      <View style={styles.chartStat}>
                        <Text style={styles.chartStatLabel}>24h Volume</Text>
                        <Text style={styles.chartStatValue}>$45.8K</Text>
                      </View>
                      <View style={styles.chartStat}>
                        <Text style={styles.chartStatLabel}>Listings</Text>
                        <Text style={styles.chartStatValue}>124</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.marketStats}>
                    <Text style={styles.marketStatsTitle}>Market Efficiency</Text>
                    <View style={styles.efficiencyBar}>
                      <View style={[styles.efficiencyBarFill, { width: `${selectedChart.marketEfficiency}%` }]} />
                    </View>
                    <Text style={styles.efficiencyText}>
                      {selectedChart.marketEfficiency}% - {selectedChart.marketEfficiency > 70 ? 'Highly Liquid' : 'Moderate Liquidity'}
                    </Text>
                  </View>
                </View>
              ) : (
                <FlatList
                  data={marketTrends}
                  renderItem={renderTrendingCard}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.trendingCardList}
                />
              )}
            </View>

            {/* Hot Cards */}
            <View style={styles.hotCardsContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Hot This Week</Text>
              </View>

              <FlatList
                data={hotCards}
                renderItem={renderHotCard}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.hotCardList}
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  insightsContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  insightCards: {
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  insightCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  insightValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  insightLabel: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
  chartContainer: {
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  chartCard: {
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  chartSubtitle: {
    fontSize: 12,
    color: '#8E8E93',
  },
  chartPrice: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
  },
  chartChange: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  chartChangeText: {
    fontSize: 12,
    marginLeft: 2,
  },
  timeRangeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeRangeButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  timeRangeButtonActive: {
    backgroundColor: '#007AFF',
  },
  timeRangeText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  timeRangeTextActive: {
    color: 'white',
    fontWeight: '500',
  },
  chartStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  chartStat: {
    alignItems: 'center',
  },
  chartStatLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  chartStatValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  marketStats: {
    marginHorizontal: 16,
    marginTop: 12,
  },
  marketStatsTitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  efficiencyBar: {
    height: 6,
    backgroundColor: '#E5E5EA',
    borderRadius: 3,
    overflow: 'hidden',
  },
  efficiencyBarFill: {
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 3,
  },
  efficiencyText: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  trendingCardList: {
    paddingHorizontal: 12,
  },
  trendingCard: {
    width: 180,
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  trendingCardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    backgroundColor: '#F8F8F8',
  },
  trendingCardInfo: {
    padding: 12,
  },
  trendingCardName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  trendingCardSet: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 8,
  },
  trendingCardPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trendingCardPriceValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  trendingCardChange: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  trendingCardChangeText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 2,
  },
  hotCardsContainer: {
    marginBottom: 24,
  },
  hotCardList: {
    paddingHorizontal: 12,
  },
  hotCard: {
    width: 200,
    height: 280,
    marginHorizontal: 4,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  hotCardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  hotCardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  hotCardRank: {
    position: 'absolute',
    top: -230,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotCardRankText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  hotCardInfo: {
    width: '100%',
  },
  hotCardName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  hotCardSet: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginBottom: 8,
  },
  hotCardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hotCardPrice: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  hotCardChange: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(52,199,89,0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  hotCardChangeText: {
    color: '#34C759',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 2,
  },
});
