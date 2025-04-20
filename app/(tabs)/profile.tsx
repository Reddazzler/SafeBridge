import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { useAuthStore } from '@/store/auth-store';
import { useScanStore } from '@/store/scan-store';
import { ScanHistoryItem } from '@/components/ScanHistoryItem';
import { 
  User, 
  LogOut, 
  Award, 
  Clock, 
  Mail, 
  Phone, 
  MapPin,
  ChevronRight,
  HelpCircle,
  Shield,
  Settings
} from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const { scans, getUserScans } = useScanStore();
  
  const userScans = user ? getUserScans(user.id) : [];
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            logout();
            router.replace('/');
          },
        },
      ]
    );
  };
  
  const handleAdminLogin = () => {
    router.push('/admin');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={40} color={Colors.white} />
            </View>
          </View>
          
          <Text style={styles.name}>{user?.name || 'User'}</Text>
          <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user?.points || 0}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user?.scans || 0}</Text>
              <Text style={styles.statLabel}>Scans</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>Level {Math.floor((user?.points || 0) / 100) + 1}</Text>
              <Text style={styles.statLabel}>Status</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <Card style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: Colors.primary + '20' }]}>
                  <User size={20} color={Colors.primary} />
                </View>
                <Text style={styles.menuItemText}>Edit Profile</Text>
              </View>
              <ChevronRight size={20} color={Colors.gray} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: Colors.secondary + '20' }]}>
                  <Award size={20} color={Colors.secondary} />
                </View>
                <Text style={styles.menuItemText}>My Rewards</Text>
              </View>
              <ChevronRight size={20} color={Colors.gray} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: Colors.success + '20' }]}>
                  <Clock size={20} color={Colors.success} />
                </View>
                <Text style={styles.menuItemText}>Activity History</Text>
              </View>
              <ChevronRight size={20} color={Colors.gray} />
            </TouchableOpacity>
          </Card>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          
          <Card style={styles.contactCard}>
            <View style={styles.contactItem}>
              <Mail size={20} color={Colors.primary} style={styles.contactIcon} />
              <Text style={styles.contactText}>contact@safebridge.org</Text>
            </View>
            
            <View style={styles.contactItem}>
              <Phone size={20} color={Colors.primary} style={styles.contactIcon} />
              <Text style={styles.contactText}>+91 98765 43210</Text>
            </View>
            
            <View style={styles.contactItem}>
              <MapPin size={20} color={Colors.primary} style={styles.contactIcon} />
              <Text style={styles.contactText}>
                SafeBridge Office, 123 Road Safety Street, New Delhi, India
              </Text>
            </View>
          </Card>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More</Text>
          
          <Card style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: Colors.primary + '20' }]}>
                  <HelpCircle size={20} color={Colors.primary} />
                </View>
                <Text style={styles.menuItemText}>Help & Support</Text>
              </View>
              <ChevronRight size={20} color={Colors.gray} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: Colors.secondary + '20' }]}>
                  <Shield size={20} color={Colors.secondary} />
                </View>
                <Text style={styles.menuItemText}>Privacy Policy</Text>
              </View>
              <ChevronRight size={20} color={Colors.gray} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: Colors.gray + '20' }]}>
                  <Settings size={20} color={Colors.gray} />
                </View>
                <Text style={styles.menuItemText}>Settings</Text>
              </View>
              <ChevronRight size={20} color={Colors.gray} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleAdminLogin}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: Colors.danger + '20' }]}>
                  <Shield size={20} color={Colors.danger} />
                </View>
                <Text style={styles.menuItemText}>Admin Panel</Text>
              </View>
              <ChevronRight size={20} color={Colors.gray} />
            </TouchableOpacity>
          </Card>
        </View>
        
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          size="large"
          style={styles.logoutButton}
        />
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
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    width: '100%',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
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
  menuCard: {
    padding: 0,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: Colors.text,
  },
  contactCard: {
    padding: 16,
  },
  contactItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  contactIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  contactText: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  logoutButton: {
    marginBottom: 24,
  },
});