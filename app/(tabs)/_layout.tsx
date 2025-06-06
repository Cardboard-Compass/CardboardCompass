import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import * as LucideWeb from 'lucide-react';
import * as LucideNative from 'lucide-react-native';

const Icons = Platform.select({
  web: LucideWeb,
  default: LucideNative,
});

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  const commonTabBarStyle = {
    backgroundColor: colors.tabBar,
    borderTopColor: colors.tabBarBorder,
    borderTopWidth: 0.5,
    height: Platform.OS === 'ios' ? 49 + insets.bottom : 56,
    paddingBottom: insets.bottom,
    paddingTop: 8,
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: commonTabBarStyle,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          paddingBottom: 4,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, size }) => <Icons.Scan size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: 'Collection',
          tabBarIcon: ({ color, size }) => <Icons.Folder size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: 'Market',
          tabBarIcon: ({ color, size }) => <Icons.LineChart size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="sell"
        options={{
          title: 'Sell',
          tabBarIcon: ({ color, size }) => <Icons.Store size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Icons.User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
