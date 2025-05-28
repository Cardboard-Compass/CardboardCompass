import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { colors } from '@/constants/colors';
import { X, Check } from 'lucide-react-native';

interface FilterMenuProps {
  onClose: () => void;
  onSelectFilter: (filter: string) => void;
  activeFilter: string;
  isDark: boolean;
}

export function FilterMenu({ onClose, onSelectFilter, activeFilter, isDark }: FilterMenuProps) {
  const filters = [
    'All Cards',
    'Pokémon',
    'Magic: The Gathering',
    'Yu-Gi-Oh!',
    'Flesh & Blood',
  ];
  
  return (
    <View style={[
      styles.overlay,
      { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
    ]}>
      <Pressable 
        style={styles.dismissArea}
        onPress={onClose}
      />
      
      <View style={[
        styles.container,
        { backgroundColor: isDark ? colors.gray[900] : colors.white }
      ]}>
        <View style={styles.header}>
          <Text style={[
            styles.title,
            { color: isDark ? colors.white : colors.gray[900] }
          ]}>
            Filter Cards
          </Text>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color={isDark ? colors.white : colors.gray[900]} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.filterList}>
          {filters.map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterItem,
                { borderBottomColor: isDark ? colors.gray[800] : colors.gray[200] },
              ]}
              onPress={() => onSelectFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                { color: isDark ? colors.white : colors.gray[900] }
              ]}>
                {filter}
              </Text>
              {activeFilter === filter && (
                <Check size={20} color={colors.primary[600]} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    zIndex: 100,
  },
  dismissArea: {
    flex: 1,
  },
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  filterList: {
    marginBottom: 16,
  },
  filterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  filterText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
});