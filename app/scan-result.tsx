import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Button } from '@/components/Button';
import { Award, Check, Home, QrCode } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export default function ScanResultScreen() {
  const { bridgeName, points } = useLocalSearchParams();
  
  useEffect(() => {
    // Trigger haptic feedback on success
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Check size={60} color={Colors.white} />
        </View>
        
        <Text style={styles.title}>Scan Successful!</Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.bridgeLabel}>Bridge</Text>
          <Text style={styles.bridgeName}>{bridgeName}</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.pointsContainer}>
            <Award size={24} color={Colors.primary} style={styles.pointsIcon} />
            <View>
              <Text style={styles.pointsLabel}>Points Earned</Text>
              <Text style={styles.pointsValue}>+{points}</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.message}>
          Thank you for using the pedestrian bridge and staying safe!
        </Text>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Scan Another"
            onPress={() => {
              router.back();
              router.push('/scan');
            }}
            variant="outline"
            style={styles.button}
            icon={<QrCode size={20} color={Colors.primary} />}
          />
          
          <Button
            title="Go to Home"
            onPress={() => {
              router.back();
              router.push('/');
            }}
            variant="primary"
            style={styles.button}
            icon={<Home size={20} color={Colors.white} />}
          />
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
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 24,
    width: '100%',
    marginBottom: 24,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bridgeLabel: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
  },
  bridgeName: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginBottom: 16,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsIcon: {
    marginRight: 16,
  },
  pointsLabel: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.success,
  },
  message: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});