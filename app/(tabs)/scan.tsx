import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  Alert,
  TouchableOpacity,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useScanStore } from '@/store/scan-store';
import { useBridgeStore } from '@/store/bridge-store';
import { QrCode, Camera, Info } from 'lucide-react-native';

// Mock QR code scanning since we can't use the actual camera
export default function ScanScreen() {
  const { processScan, isScanning } = useScanStore();
  const { bridges } = useBridgeStore();
  
  const [manualBridgeId, setManualBridgeId] = useState('');
  const [error, setError] = useState('');
  
  const handleScan = async () => {
    setError('');
    
    if (!manualBridgeId) {
      setError('Please enter a bridge ID');
      return;
    }
    
    const bridge = bridges.find(b => b.id === manualBridgeId);
    
    if (!bridge) {
      setError('Invalid bridge ID. Please try again.');
      return;
    }
    
    try {
      const scan = await processScan(manualBridgeId);
      
      if (scan) {
        router.push({
          pathname: '/scan-result',
          params: { 
            bridgeName: scan.bridgeName,
            points: scan.points.toString(),
          }
        });
      }
    } catch (error) {
      Alert.alert('Scan Failed', 'Failed to process scan. Please try again.');
    }
  };
  
  const handleMockScan = async () => {
    // Randomly select a bridge for demo purposes
    if (bridges.length === 0) {
      Alert.alert('No Bridges', 'No bridges available to scan.');
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * bridges.length);
    const randomBridge = bridges[randomIndex];
    
    try {
      const scan = await processScan(randomBridge.id);
      
      if (scan) {
        router.push({
          pathname: '/scan-result',
          params: { 
            bridgeName: scan.bridgeName,
            points: scan.points.toString(),
          }
        });
      }
    } catch (error) {
      Alert.alert('Scan Failed', 'Failed to process scan. Please try again.');
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Scan QR Code</Text>
        <Text style={styles.subtitle}>
          Scan the QR code on the pedestrian bridge to earn points
        </Text>
        
        <Card style={styles.scanCard}>
          <View style={styles.qrContainer}>
            <View style={styles.qrPlaceholder}>
              <QrCode size={120} color={Colors.primary} />
              {isScanning && (
                <View style={styles.scanningOverlay}>
                  <Text style={styles.scanningText}>Scanning...</Text>
                </View>
              )}
            </View>
          </View>
          
          <Text style={styles.scanInstructions}>
            Point your camera at the QR code on the bridge
          </Text>
          
          {Platform.OS === 'web' ? (
            <View style={styles.webNotice}>
              <Info size={16} color={Colors.secondary} style={styles.infoIcon} />
              <Text style={styles.webNoticeText}>
                Camera access is limited on web. Please use the manual entry or mock scan options below.
              </Text>
            </View>
          ) : null}
          
          <Button
            title="Scan QR Code"
            onPress={handleMockScan}
            variant="primary"
            size="large"
            loading={isScanning}
            fullWidth
            style={styles.scanButton}
          />
        </Card>
        
        <Card style={styles.manualCard}>
          <Text style={styles.manualTitle}>Manual Entry</Text>
          <Text style={styles.manualSubtitle}>
            Enter the bridge ID manually if scanning doesn't work
          </Text>
          
          <Input
            placeholder="Enter Bridge ID (e.g., HR16FOB01)"
            value={manualBridgeId}
            onChangeText={setManualBridgeId}
            error={error}
          />
          
          <Button
            title="Submit"
            onPress={handleScan}
            variant="outline"
            loading={isScanning}
            fullWidth
          />
        </Card>
        
        <View style={styles.demoContainer}>
          <Text style={styles.demoTitle}>Demo Bridge IDs:</Text>
          <View style={styles.demoIds}>
            {bridges.slice(0, 3).map((bridge) => (
              <TouchableOpacity 
                key={bridge.id}
                style={styles.demoIdButton}
                onPress={() => setManualBridgeId(bridge.id)}
              >
                <Text style={styles.demoIdText}>{bridge.id}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 24,
  },
  scanCard: {
    marginBottom: 24,
    alignItems: 'center',
  },
  qrContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    overflow: 'hidden',
  },
  qrPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  scanningOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  scanningText: {
    color: Colors.white,
    fontWeight: '600',
  },
  scanInstructions: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 16,
  },
  webNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary + '10',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoIcon: {
    marginRight: 8,
  },
  webNoticeText: {
    fontSize: 12,
    color: Colors.secondary,
    flex: 1,
  },
  scanButton: {
    marginTop: 8,
  },
  manualCard: {
    marginBottom: 24,
  },
  manualTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  manualSubtitle: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 16,
  },
  demoContainer: {
    marginBottom: 24,
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  demoIds: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  demoIdButton: {
    backgroundColor: Colors.primary + '10',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  demoIdText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
  },
});