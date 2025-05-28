import React, { useState, useEffect, useRef } from 'react';
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
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Rotate3d as Rotate, ImagePlus, X, Camera as CameraIcon } from 'lucide-react-native';
import { mockScanCard } from '@/utils/cardScanner';
import ScanResultModal from '@/components/scan/ScanResultModal';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (scanResult) {
      setShowModal(true);
    }
  }, [scanResult]);

  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
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
    setFacing(current => (current === 'back' ? 'front' : 'back'));
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