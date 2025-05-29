import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Rotate3d as Rotate, ImagePlus, X, Camera as CameraIcon } from 'lucide-react-native';
import { mockScanCard } from '@/utils/cardScanner';
import ScanResultModal from '@/components/scan/ScanResultModal';

// Conditionally import camera components
let CameraView;
let CameraType;
let useCameraPermissions;

if (Platform.OS !== 'web') {
  const camera = require('expo-camera');
  CameraView = camera.CameraView;
  CameraType = camera.CameraType;
  useCameraPermissions = camera.useCameraPermissions;
}

// Native platform component with camera functionality
function NativeScanScreen() {
  const [facing, setFacing] = React.useState(CameraType.back);
  const [isScanning, setIsScanning] = React.useState(false);
  const [scanResult, setScanResult] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const cameraRef = React.useRef(null);
  const [permission, requestPermission] = useCameraPermissions();

  React.useEffect(() => {
    if (scanResult) {
      setShowModal(true);
    }
  }, [scanResult]);

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.permissionContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/6507483/pexels-photo-6507483.jpeg' }}
            style={styles.permissionImage}
          />
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionText}>
            We need camera access to scan your cards. This helps identify and value your collection accurately.
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Camera Access</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  };

  const handleScan = async () => {
    if (isScanning) return;
    
    setIsScanning(true);
    try {
      // In a real app, this would process the camera frame
      // For now, we'll use a mock function
      const result = await mockScanCard();
      setScanResult(result);
    } catch (error) {
      Alert.alert('Scan Error', 'Unable to identify card. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setScanResult(null);
  };

  const handleSelectFromGallery = () => {
    // This would open the image picker in a real implementation
    Alert.alert('Coming Soon', 'Gallery selection will be available in the next update.');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={handleScan}>
        <SafeAreaView style={styles.overlay}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.iconButton} onPress={toggleCameraFacing}>
              <Rotate size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleSelectFromGallery}>
              <ImagePlus size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.scanAreaContainer}>
            <View style={styles.scanArea}>
              <View style={styles.cornerTL} />
              <View style={styles.cornerTR} />
              <View style={styles.cornerBL} />
              <View style={styles.cornerBR} />
            </View>
            <Text style={styles.scanText}>
              Position card within frame
            </Text>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.scanButton}
              onPress={handleScan}
              disabled={isScanning}>
              {isScanning ? (
                <ActivityIndicator color="white\" size="small" />
              ) : (
                <CameraIcon size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </CameraView>

      {showModal && scanResult && (
        <ScanResultModal visible={showModal} card={scanResult} onClose={closeModal} />
      )}
    </View>
  );
}

export default function ScanScreen() {
  // Web platform UI
  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.permissionContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/6507483/pexels-photo-6507483.jpeg' }}
            style={styles.permissionImage}
          />
          <Text style={styles.permissionTitle}>Camera Not Available</Text>
          <Text style={styles.permissionText}>
            The camera feature is not available on web browsers. Please use our mobile app to scan cards.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return <NativeScanScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanAreaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanArea: {
    width: 280,
    height: 400,
    borderWidth: 0,
    position: 'relative',
  },
  scanText: {
    color: 'white',
    fontSize: 16,
    marginTop: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  scanButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: 'white',
  },
  cornerTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: 'white',
  },
  cornerBL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: 'white',
  },
  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: 'white',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  permissionImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});