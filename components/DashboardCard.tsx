import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '@/constants/colors';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  backgroundColor: string;
  textColor: string;
}

export function DashboardCard({ title, value, icon, backgroundColor, textColor }: DashboardCardProps) {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        { backgroundColor, opacity: pressed ? 0.9 : 1 }
      ]}
    >
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={[styles.value, { color: textColor }]}>
        {value}
      </Text>
      <Text style={[styles.title, { color: textColor }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    marginBottom: 12,
  },
  value: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});
