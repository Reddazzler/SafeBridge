import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  Image,
  FlatList
} from 'react-native';
import { Colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { useAuthStore } from '@/store/auth-store';
import { useScanStore } from '@/store/scan-store';
import { ScanHistoryItem } from '@/components/ScanHistoryItem';
import { router } from 'expo-router';
import { Award, QrCode, TrendingUp } from 'lucide-react-native';

export default function HomeScreen() {
  const { user } = useAuthStore();
  const { scans, getUserScans } = useScanStore();
  
  const userScans = user ? getUserScans(user.id).slice(0, 5) : [];
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {user?.name || 'User'}</Text>
          <Text style={styles.subtitle}>Welcome to SafeBridge Rewards</Text>
        </View>
        
        <Card style={styles.statsCard}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: Colors.primary + '20' }]}>
                <Award size={20} color={Colors.primary} />
              </View>
              <Text style={styles.statValue}>{user?.points || 0}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: Colors.secondary + '20' }]}>
                <QrCode size={20} color={Colors.secondary} />
              </View>
              <Text style={styles.statValue}>{user?.scans || 0}</Text>
              <Text style={styles.statLabel}>Scans</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: Colors.success + '20' }]}>
                <TrendingUp size={20} color={Colors.success} />
              </View>
              <Text style={styles.statValue}>Level {Math.floor((user?.points || 0) / 100) + 1}</Text>
              <Text style={styles.statLabel}>Status</Text>
            </View>
          </View>
        </Card>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <Button
              title="Scan QR Code"
              onPress={() => router.push('/scan')}
              variant="primary"
              style={styles.actionButton}
            />
            <Button
              title="View Rewards"
              onPress={() => router.push('/rewards')}
              variant="outline"
              style={styles.actionButton}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {userScans.length > 0 ? (
            <Card>
              {userScans.map((scan) => (
                <ScanHistoryItem key={scan.id} scan={scan} />
              ))}
            </Card>
          ) : (
            <Card>
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No activity yet. Start scanning QR codes on bridges to earn points!
                </Text>
              </View>
            </Card>
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety Reminder</Text>
          <Card>
            <View style={styles.safetyReminder}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1605020420620-20c943cc4669?q=80&w=2070&auto=format&fit=crop' }} 
                style={styles.safetyImage} 
                resizeMode="cover"
              />
              <Text style={styles.safetyTitle}>
                Always Use Pedestrian Bridges
              </Text>
              <Text style={styles.safetyText}>
                Crossing roads directly is dangerous. Use pedestrian bridges to stay safe and earn rewards.
              </Text>
              <Button
                title="Learn More"
                onPress={() => router.push('/safety')}
                variant="outline"
                size="small"
                style={styles.safetyButton}
              />
            </View>
          </Card>
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
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
  },
  statsCard: {
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textLight,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.lightGray,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  emptyState: {
    padding: 16,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
  },
  safetyReminder: {
    alignItems: 'center',
  },
  safetyImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  safetyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  safetyText: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 20,
  },
  safetyButton: {
    alignSelf: 'center',
  },
});