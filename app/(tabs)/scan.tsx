import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, useColorScheme } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Camera as FlipCamera, Search, X } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { CardScanInfo } from '@/components/CardScanInfo';
import { SearchBar } from '@/components/SearchBar';
import { Platform } from 'react-native';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function ScanScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedCard, setScannedCard] = useState<any | null>(null);
  const [scanMode, setScanMode] = useState<'camera' | 'search'>('camera');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  // Mock scan function - in a real app, this would process camera input
  function handleScan() {
    // Simulate finding a card
    setScannedCard({
      name: "Charizard",
      set: "Base Set",
      number: "4/102",
      image: "https://images.pexels.com/photos/6869051/pexels-photo-6869051.jpeg",
      price: 349.99,
      marketTrend: "+12.5%",
      rarity: "Holo Rare"
    });
  }

  // Reset scan state
  function clearScan() {
    setScannedCard(null);
  }

  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={[
        styles.container,
        { backgroundColor: isDark ? colors.gray[900] : colors.gray[100] }
      ]}>
        <Text style={{ color: isDark ? colors.white : colors.gray[900] }}>Loading camera permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions not granted
    return (
      <View style={[
        styles.container,
        { backgroundColor: isDark ? colors.gray[900] : colors.gray[100] }
      ]}>
        <Text style={[
          styles.permissionText,
          { color: isDark ? colors.white : colors.gray[900] }
        ]}>
          We need camera access to scan your cards
        </Text>
        <TouchableOpacity 
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // For web platform, show a simplified version since camera might not work well
  if (Platform.OS === 'web') {
    return (
      <View style={[
        styles.container,
        { backgroundColor: isDark ? colors.gray[900] : colors.gray[100] }
      ]}>
        <View style={styles.webScanContainer}>
          <Text style={[
            styles.webTitle,
            { color: isDark ? colors.white : colors.gray[900] }
          ]}>
            Card Search
          </Text>
          
          <SearchBar placeholder="Search by card name..." />
          
          <View style={styles.webNote}>
            <Text style={[
              styles.webNoteText,
              { color: isDark ? colors.gray[400] : colors.gray[600] }
            ]}>
              Note: Card scanning works best on native mobile apps. 
              Please use the search function on web or install the mobile app for full scanning capabilities.
            </Text>
          </View>
          
          {/* Mock search results */}
          <View style={styles.searchResultContainer}>
            <Text style={[
              styles.searchResultTitle,
              { color: isDark ? colors.white : colors.gray[900] }
            ]}>
              Popular Cards
            </Text>
            
            <TouchableOpacity 
              style={[
                styles.searchResult,
                { backgroundColor: isDark ? colors.gray[800] : colors.white }
              ]}
              onPress={() => handleScan()}
            >
              <Image 
                source={{ uri: "https://images.pexels.com/photos/6869051/pexels-photo-6869051.jpeg" }} 
                style={styles.searchResultImage} 
              />
              <View style={styles.searchResultInfo}>
                <Text style={[
                  styles.searchResultName,
                  { color: isDark ? colors.white : colors.gray[900] }
                ]}>
                  Charizard
                </Text>
                <Text style={[
                  styles.searchResultSet,
                  { color: isDark ? colors.gray[400] : colors.gray[600] }
                ]}>
                  Base Set · 4/102
                </Text>
              </View>
              <Text style={styles.searchResultPrice}>
                $349.99
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {scannedCard && (
          <CardScanInfo 
            card={scannedCard} 
            onClose={clearScan}
            isDark={isDark}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {scanMode === 'camera' && !scannedCard && (
        <>
          <CameraView style={styles.camera} facing={facing}>
            <View style={styles.scanOverlay}>
              <View style={styles.scanCorners}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
              </View>
              
              <Text style={styles.scanInstructions}>
                Center the card in the frame
              </Text>
            </View>
            
            <View style={styles.cameraControls}>
              <TouchableOpacity 
                style={styles.modeButton}
                onPress={() => setScanMode('search')}
              >
                <Search size={24} color={colors.white} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.scanButton}
                onPress={handleScan}
              >
                <View style={styles.scanButtonInner} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modeButton}
                onPress={toggleCameraFacing}
              >
                <FlipCamera size={24} color={colors.white} />
              </TouchableOpacity>
            </View>
          </CameraView>
        </>
      )}
      
      {scanMode === 'search' && !scannedCard && (
        <View style={[
          styles.searchContainer,
          { backgroundColor: isDark ? colors.gray[900] : colors.gray[100] }
        ]}>
          <View style={styles.searchHeader}>
            <Text style={[
              styles.searchTitle,
              { color: isDark ? colors.white : colors.gray[900] }
            ]}>
              Manual Search
            </Text>
            <TouchableOpacity onPress={() => setScanMode('camera')}>
              <X size={24} color={isDark ? colors.white : colors.gray[900]} />
            </TouchableOpacity>
          </View>
          
          <SearchBar placeholder="Search by card name..." />
          
          {/* Mock search results */}
          <View style={styles.searchResultContainer}>
            <Text style={[
              styles.searchResultTitle,
              { color: isDark ? colors.white : colors.gray[900] }
            ]}>
              Popular Cards
            </Text>
            
            <TouchableOpacity 
              style={[
                styles.searchResult,
                { backgroundColor: isDark ? colors.gray[800] : colors.white }
              ]}
              onPress={() => handleScan()}
            >
              <Image 
                source={{ uri: "https://images.pexels.com/photos/6869051/pexels-photo-6869051.jpeg" }} 
                style={styles.searchResultImage} 
              />
              <View style={styles.searchResultInfo}>
                <Text style={[
                  styles.searchResultName,
                  { color: isDark ? colors.white : colors.gray[900] }
                ]}>
                  Charizard
                </Text>
                <Text style={[
                  styles.searchResultSet,
                  { color: isDark ? colors.gray[400] : colors.gray[600] }
                ]}>
                  Base Set · 4/102
                </Text>
              </View>
              <Text style={styles.searchResultPrice}>
                $349.99
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      {scannedCard && (
        <CardScanInfo 
          card={scannedCard} 
          onClose={clearScan}
          isDark={isDark}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  permissionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  permissionButton: {
    backgroundColor: colors.primary[600],
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: colors.white,
    fontSize: 16,
  },
  scanOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanCorners: {
    width: 280,
    height: 390,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: colors.white,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  scanInstructions: {
    fontFamily: 'Inter-SemiBold',
    color: colors.white,
    fontSize: 16,
    marginTop: 24,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.white,
  },
  searchContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  searchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  searchResultContainer: {
    marginTop: 24,
  },
  searchResultTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 12,
  },
  searchResult: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  searchResultImage: {
    width: 48,
    height: 70,
    borderRadius: 4,
  },
  searchResultInfo: {
    flex: 1,
    marginLeft: 12,
  },
  searchResultName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  searchResultSet: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  searchResultPrice: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.primary[600],
  },
  webScanContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  webTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 16,
  },
  webNote: {
    padding: 12,
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 24,
  },
  webNoteText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});