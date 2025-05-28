import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, G, Line, Text as SvgText } from 'react-native-svg';

type PriceChartProps = {
  data: Array<{ date: string; price: number }>;
  width: number;
  height: number;
  timeRange: string;
};

const PriceChart: React.FC<PriceChartProps> = ({ data, width, height, timeRange }) => {
  // Filter data based on time range
  const filteredData = data.slice(-getDataPointsForRange(timeRange));

  // Find min and max for scaling
  let minPrice = Math.min(...filteredData.map(d => d.price));
  let maxPrice = Math.max(...filteredData.map(d => d.price));
  
  // Add some padding to min/max
  const padding = (maxPrice - minPrice) * 0.1;
  minPrice = Math.max(0, minPrice - padding);
  maxPrice = maxPrice + padding;

  // Chart dimensions
  const chartWidth = width - 40;
  const chartHeight = height - 40;
  const startX = 30;
  const startY = 10;

  // Create scaled points
  const points = filteredData.map((d, i) => {
    const x = startX + (i / (filteredData.length - 1)) * chartWidth;
    const y = startY + chartHeight - ((d.price - minPrice) / (maxPrice - minPrice)) * chartHeight;
    return { x, y };
  });

  // Create the path
  let pathD = '';
  points.forEach((point, i) => {
    if (i === 0) {
      pathD += `M ${point.x} ${point.y}`;
    } else {
      pathD += ` L ${point.x} ${point.y}`;
    }
  });

  // Create the filled area
  let areaPathD = pathD;
  areaPathD += ` L ${points[points.length - 1].x} ${startY + chartHeight}`;
  areaPathD += ` L ${points[0].x} ${startY + chartHeight}`;
  areaPathD += ' Z';

  // Determine if chart is trending up or down
  const firstPrice = filteredData[0].price;
  const lastPrice = filteredData[filteredData.length - 1].price;
  const isUpTrend = lastPrice >= firstPrice;

  // Y-axis labels
  const yLabels = [minPrice, (minPrice + maxPrice) / 2, maxPrice];

  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width={width} height={height}>
        {/* Y-axis labels */}
        {yLabels.map((price, i) => {
          const y = startY + chartHeight - ((price - minPrice) / (maxPrice - minPrice)) * chartHeight;
          return (
            <G key={`y-label-${i}`}>
              <Line
                x1={startX - 5}
                y1={y}
                x2={startX}
                y2={y}
                stroke="#C7C7CC"
                strokeWidth={1}
              />
              <SvgText
                x={5}
                y={y + 4}
                fill="#8E8E93"
                fontSize="10"
                textAnchor="start"
              >
                ${price.toFixed(0)}
              </SvgText>
            </G>
          );
        })}

        {/* Filled area under line */}
        <Path
          d={areaPathD}
          fill={isUpTrend ? "rgba(52, 199, 89, 0.1)" : "rgba(255, 59, 48, 0.1)"}
        />

        {/* Line chart */}
        <Path
          d={pathD}
          fill="none"
          stroke={isUpTrend ? "#34C759" : "#FF3B30"}
          strokeWidth={2}
        />
      </Svg>
    </View>
  );
};

function getDataPointsForRange(timeRange: string): number {
  switch (timeRange) {
    case '1D': return 24;
    case '1W': return 7;
    case '1M': return 30;
    case '3M': return 90;
    case 'YTD': return 180;
    case '1Y': return 365;
    default: return 30;
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
});

export default PriceChart;