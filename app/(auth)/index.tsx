import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  SafeAreaView,
  Platform,
  ScrollView
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/colors';
import { Button } from '@/components/Button';
import { useAuthStore } from '@/store/auth-store';

export default function WelcomeScreen() {
  const { isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1605020420620-20c943cc4669?q=80&w=2070&auto=format&fit=crop' }} 
            style={styles.headerImage} 
            resizeMode="cover"
          />
          <View style={styles.overlay} />
          <Text style={styles.title}>SafeBridge Rewards</Text>
          <Text style={styles.subtitle}>Stay safe, earn rewards</Text>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.description}>
            Use pedestrian bridges to cross roads safely and earn rewards for making the right choice.
          </Text>
          
          <View style={styles.featureContainer}>
            <View style={styles.feature}>
              <View style={[styles.featureIcon, { backgroundColor: Colors.primary + '20' }]}>
                <Text style={[styles.featureIconText, { color: Colors.primary }]}>1</Text>
              </View>
              <Text style={styles.featureTitle}>Scan QR Codes</Text>
              <Text style={styles.featureDescription}>
                Scan QR codes placed on pedestrian bridges
              </Text>
            </View>
            
            <View style={styles.feature}>
              <View style={[styles.featureIcon, { backgroundColor: Colors.secondary + '20' }]}>
                <Text style={[styles.featureIconText, { color: Colors.secondary }]}>2</Text>
              </View>
              <Text style={styles.featureTitle}>Earn Points</Text>
              <Text style={styles.featureDescription}>
                Collect points every time you use a bridge
              </Text>
            </View>
            
            <View style={styles.feature}>
              <View style={[styles.featureIcon, { backgroundColor: Colors.success + '20' }]}>
                <Text style={[styles.featureIconText, { color: Colors.success }]}>3</Text>
              </View>
              <Text style={styles.featureTitle}>Get Rewards</Text>
              <Text style={styles.featureDescription}>
                Redeem points for discounts and vouchers
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Create Account" 
            onPress={() => router.push('/register')}
            variant="primary"
            size="large"
            fullWidth
            style={styles.button}
          />
          <Button 
            title="Login" 
            onPress={() => router.push('/login')}
            variant="outline"
            size="large"
            fullWidth
            style={styles.button}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    height: 300,
    justifyContent: 'flex-end',
    padding: 24,
    position: 'relative',
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.white,
    opacity: 0.9,
  },
  content: {
    padding: 24,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 32,
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  feature: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 24,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIconText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: 16,
  },
  buttonContainer: {
    padding: 24,
    marginTop: 'auto',
  },
  button: {
    marginBottom: 12,
  },
});