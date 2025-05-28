import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, useColorScheme } from 'react-native';
import { SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { colors } from '@/constants/colors';
import { User, Bell, CreditCard, CircleHelp as HelpCircle, LogOut, ChevronRight, Moon } from 'lucide-react-native';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function ProfileScreen() {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [priceAlertsEnabled, setPriceAlertsEnabled] = useState(true);

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    // In a real app, this would update the app's theme
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const togglePriceAlerts = () => {
    setPriceAlertsEnabled(!priceAlertsEnabled);
  };

  return (
    <ScrollView 
      style={[
        styles.container,
        { backgroundColor: isDark ? colors.gray[900] : colors.gray[100] }
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[
          styles.title,
          { color: isDark ? colors.white : colors.gray[900] }
        ]}>
          Profile
        </Text>
      </View>

      <View style={styles.profileSection}>
        <View style={[
          styles.avatarContainer,
          { backgroundColor: isDark ? colors.gray[800] : colors.white }
        ]}>
          <User size={32} color={isDark ? colors.white : colors.gray[900]} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={[
            styles.profileName,
            { color: isDark ? colors.white : colors.gray[900] }
          ]}>
            Johnny Collectibles
          </Text>
          <Text style={[
            styles.profileEmail,
            { color: isDark ? colors.gray[400] : colors.gray[600] }
          ]}>
            johnny@example.com
          </Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={[
          styles.statCard,
          { backgroundColor: isDark ? colors.gray[800] : colors.white }
        ]}>
          <Text style={[
            styles.statValue,
            { color: isDark ? colors.white : colors.gray[900] }
          ]}>
            487
          </Text>
          <Text style={[
            styles.statLabel,
            { color: isDark ? colors.gray[400] : colors.gray[600] }
          ]}>
            Cards
          </Text>
        </View>
        <View style={[
          styles.statCard,
          { backgroundColor: isDark ? colors.gray[800] : colors.white }
        ]}>
          <Text style={[
            styles.statValue,
            { color: isDark ? colors.white : colors.gray[900] }
          ]}>
            $12,457
          </Text>
          <Text style={[
            styles.statLabel,
            { color: isDark ? colors.gray[400] : colors.gray[600] }
          ]}>
            Value
          </Text>
        </View>
        <View style={[
          styles.statCard,
          { backgroundColor: isDark ? colors.gray[800] : colors.white }
        ]}>
          <Text style={[
            styles.statValue,
            { color: isDark ? colors.white : colors.gray[900] }
          ]}>
            23
          </Text>
          <Text style={[
            styles.statLabel,
            { color: isDark ? colors.gray[400] : colors.gray[600] }
          ]}>
            Lists
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[
          styles.sectionTitle,
          { color: isDark ? colors.white : colors.gray[900] }
        ]}>
          App Settings
        </Text>
        
        <View style={[
          styles.settingItem,
          { backgroundColor: isDark ? colors.gray[800] : colors.white }
        ]}>
          <View style={styles.settingLeft}>
            <Moon size={20} color={isDark ? colors.white : colors.gray[900]} />
            <Text style={[
              styles.settingText,
              { color: isDark ? colors.white : colors.gray[900] }
            ]}>
              Dark Mode
            </Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleDarkMode}
            trackColor={{ false: colors.gray[300], true: colors.primary[400] }}
            thumbColor={colors.white}
          />
        </View>
        
        <View style={[
          styles.settingItem,
          { backgroundColor: isDark ? colors.gray[800] : colors.white }
        ]}>
          <View style={styles.settingLeft}>
            <Bell size={20} color={isDark ? colors.white : colors.gray[900]} />
            <Text style={[
              styles.settingText,
              { color: isDark ? colors.white : colors.gray[900] }
            ]}>
              Notifications
            </Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: colors.gray[300], true: colors.primary[400] }}
            thumbColor={colors.white}
          />
        </View>
        
        <View style={[
          styles.settingItem,
          { backgroundColor: isDark ? colors.gray[800] : colors.white }
        ]}>
          <View style={styles.settingLeft}>
            <CreditCard size={20} color={isDark ? colors.white : colors.gray[900]} />
            <Text style={[
              styles.settingText,
              { color: isDark ? colors.white : colors.gray[900] }
            ]}>
              Price Alerts
            </Text>
          </View>
          <Switch
            value={priceAlertsEnabled}
            onValueChange={togglePriceAlerts}
            trackColor={{ false: colors.gray[300], true: colors.primary[400] }}
            thumbColor={colors.white}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[
          styles.sectionTitle,
          { color: isDark ? colors.white : colors.gray[900] }
        ]}>
          Support
        </Text>
        
        <TouchableOpacity style={[
          styles.menuItem,
          { backgroundColor: isDark ? colors.gray[800] : colors.white }
        ]}>
          <View style={styles.menuLeft}>
            <HelpCircle size={20} color={isDark ? colors.white : colors.gray[900]} />
            <Text style={[
              styles.menuText,
              { color: isDark ? colors.white : colors.gray[900] }
            ]}>
              Help & Support
            </Text>
          </View>
          <ChevronRight size={20} color={isDark ? colors.gray[500] : colors.gray[400]} />
        </TouchableOpacity>
        
        <TouchableOpacity style={[
          styles.menuItem,
          { backgroundColor: isDark ? colors.gray[800] : colors.white }
        ]}>
          <View style={styles.menuLeft}>
            <LogOut size={20} color={colors.error[500]} />
            <Text style={[
              styles.menuText,
              { color: colors.error[500] }
            ]}>
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={[
        styles.versionText,
        { color: isDark ? colors.gray[600] : colors.gray[500] }
      ]}>
        Version 1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: colors.primary[600],
  },
  editButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.white,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginLeft: 12,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginLeft: 12,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
  },
});