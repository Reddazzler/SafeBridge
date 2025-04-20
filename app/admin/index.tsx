import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
  Modal
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useAuthStore } from '@/store/auth-store';
import { Lock, ArrowLeft } from 'lucide-react-native';

export default function AdminLoginScreen() {
  const { adminLogin } = useAuthStore();
  
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  
  const handleLogin = async () => {
    if (!password) {
      setError('Please enter the admin password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await adminLogin(password);
      
      if (success) {
        router.push('/admin/dashboard');
      } else {
        const attempts = loginAttempts + 1;
        setLoginAttempts(attempts);
        
        if (attempts >= 3) {
          Alert.alert(
            'Too Many Attempts',
            'You have exceeded the maximum number of login attempts. Please try again later.',
            [
              {
                text: 'OK',
                onPress: () => router.back(),
              },
            ]
          );
        } else {
          setError(`Invalid password. ${3 - attempts} attempts remaining.`);
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Login</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Lock size={60} color={Colors.primary} />
          </View>
          
          <Text style={styles.title}>Admin Access</Text>
          <Text style={styles.subtitle}>
            Enter the admin password to access the bridge management system
          </Text>
          
          <View style={styles.form}>
            <Input
              label="Admin Password"
              placeholder="Enter admin password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError('');
              }}
              secureTextEntry
              error={error}
            />
            
            <Button
              title="Login"
              onPress={handleLogin}
              variant="primary"
              size="large"
              loading={isLoading}
              fullWidth
              style={styles.loginButton}
            />
          </View>
          
          <Text style={styles.hint}>
            Hint: For demo purposes, use "Reddazzler@773"
          </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 32,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    marginBottom: 24,
  },
  loginButton: {
    marginTop: 16,
  },
  hint: {
    fontSize: 14,
    color: Colors.textLight,
    fontStyle: 'italic',
  },
});