import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

interface ValueChartProps {
  data: number[];
}

export function ValueChart({ data }: ValueChartProps) {
  // Find the min and max for scaling
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  
  // Scale the data to fit the chart height
  const scaledData = data.map(val => 
    range === 0 ? 0.5 : (val - min) / range
  );
  
  return (
    <View style={styles.container}>
      {scaledData.map((value, index) => (
        <View 
          key={index}
          style={[
            styles.bar,
            { 
              height: `${Math.max(value * 100, 5)}%`,
              backgroundColor: index === scaledData.length - 1 
                ? colors.secondary[400] 
                : colors.primary[400],
              opacity: (index + 1) / scaledData.length
            }
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
  bar: {
    width: 4,
    borderRadius: 2,
    marginHorizontal: 2,
  },
});