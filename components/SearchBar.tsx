import React from 'react';
import { View, TextInput, StyleSheet, useColorScheme, Pressable } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface SearchBarProps {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onClear?: () => void;
}

export function SearchBar({ placeholder, value, onChangeText, onClear }: SearchBarProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <View style={styles.container}>
      <View style={[
        styles.searchContainer,
        { backgroundColor: isDark ? colors.gray[800] : colors.white }
      ]}>
        <Search 
          size={20} 
          color={isDark ? colors.gray[400] : colors.gray[500]} 
          style={styles.searchIcon}
        />
        <TextInput
          style={[
            styles.input,
            { color: isDark ? colors.white : colors.gray[900] }
          ]}
          placeholder={placeholder}
          placeholderTextColor={isDark ? colors.gray[500] : colors.gray[400]}
          value={value}
          onChangeText={onChangeText}
        />
        {value ? (
          <Pressable onPress={onClear}>
            <X 
              size={20} 
              color={isDark ? colors.gray[400] : colors.gray[500]} 
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    paddingVertical: 0,
  },
});
