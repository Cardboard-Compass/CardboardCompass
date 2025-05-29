import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  SafeAreaView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as LucideWeb from 'lucide-react';
import * as LucideNative from 'lucide-react-native';
import { captureError } from '@/utils/errorTracking';

const Icons = Platform.select({
  web: LucideWeb,
  default: LucideNative,
});

export default function ProfileScreen() {
  const userStats = [
    { label: 'Collection Value', value: '$12,450.87' },
    { label: 'Cards', value: '342' },
    { label: 'Sets', value: '24' },
  ];

  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: <Icons.Settings size={22} color="#8E8E93" />, label: 'Account Settings', showChevron: true },
        { icon: <Icons.Bell size={22} color="#8E8E93" />, label: 'Notifications', showToggle: true },
        { icon: <Icons.CreditCard size={22} color="#8E8E93" />, label: 'Payment Methods', showChevron: true },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: <Icons.Shield size={22} color="#8E8E93" />, label: 'Privacy Settings', showChevron: true },
        { icon: <Icons.Share2 size={22} color="#8E8E93" />, label: 'Share Profile', showChevron: true },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: <Icons.HelpCircle size={22} color="#8E8E93" />, label: 'Help & Support', showChevron: true },
        { 
          icon: <Icons.AlertTriangle size={22} color="#FF9500" />, 
          label: 'Test Error Tracking', 
          onPress: () => {
            try {
              throw new Error('Test error from Profile screen');
            } catch (error) {
              captureError(error as Error, {
                screen: 'Profile',
                action: 'Test Error Button',
                timestamp: new Date().toISOString(),
              });
            }
          }
        },
      ]
    },
    {
      title: null,
      items: [
        { icon: <Icons.LogOut size={22} color="#FF3B30" />, label: 'Sign Out', textColor: '#FF3B30' },
      ]
    }
  ];

  const renderMenuItem = (item, index, section) => (
    <TouchableOpacity 
      key={`${section.title}-${index}`}
      style={[
        styles.menuItem,
        index === section.items.length - 1 && styles.lastMenuItem
      ]}
      onPress={item.onPress}
    >
      <View style={styles.menuItemLeft}>
        {item.icon}
        <Text style={[styles.menuItemLabel, item.textColor && { color: item.textColor }]}>
          {item.label}
        </Text>
      </View>
      <View style={styles.menuItemRight}>
        {item.showToggle && <Switch value={true} />}
        {item.showChevron && <Icons.ChevronRight size={20} color="#C7C7CC" />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Alex Johnson</Text>
          <Text style={styles.profileLocation}>Sydney, Australia</Text>
          <Text style={styles.profileBio}>Collector since 2015 • Pokemon & Magic</Text>

          <View style={styles.statsContainer}>
            {userStats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.menuSection}>
            {section.title ? (
              <Text style={styles.menuSectionTitle}>{section.title}</Text>
            ) : null}
            <View style={styles.menuItems}>
              {section.items.map((item, index) => renderMenuItem(item, index, section))}
            </View>
          </View>
        ))}

        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>CardVault v1.0.0</Text>
        </View>
      </ScrollView>
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
    paddingTop: Platform.OS === 'android' ? 16 : 8,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileLocation: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 8,
  },
  profileBio: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  editProfileButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  editProfileText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  menuSection: {
    marginBottom: 24,
  },
  menuSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 16,
    marginBottom: 8,
  },
  menuItems: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemLabel: {
    fontSize: 16,
    marginLeft: 16,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  versionInfo: {
    alignItems: 'center',
    marginVertical: 24,
  },
  versionText: {
    color: '#8E8E93',
    fontSize: 14,
  },
});