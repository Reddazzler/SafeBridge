import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  Alert,
  Modal,
  TouchableOpacity
} from 'react-native';
import { Colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { RewardCard } from '@/components/RewardCard';
import { useAuthStore } from '@/store/auth-store';
import { useRewardStore } from '@/store/reward-store';
import { Award, Check, X } from 'lucide-react-native';

export default function RewardsScreen() {
  const { user } = useAuthStore();
  const { rewards, redeemReward } = useRewardStore();
  
  const [selectedReward, setSelectedReward] = useState(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const handleRedeemPress = (reward) => {
    setSelectedReward(reward);
  };
  
  const handleConfirmRedeem = async () => {
    if (!selectedReward) return;
    
    setIsRedeeming(true);
    
    try {
      const success = await redeemReward(selectedReward.id);
      
      if (success) {
        setShowSuccessModal(true);
      } else {
        Alert.alert('Redemption Failed', 'You do not have enough points for this reward.');
      }
    } catch (error) {
      Alert.alert('Redemption Failed', 'An error occurred. Please try again.');
    } finally {
      setIsRedeeming(false);
      setSelectedReward(null);
    }
  };
  
  const handleCancelRedeem = () => {
    setSelectedReward(null);
  };
  
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Rewards</Text>
          <Text style={styles.subtitle}>
            Redeem your points for exciting rewards
          </Text>
        </View>
        
        <Card style={styles.pointsCard}>
          <View style={styles.pointsContainer}>
            <View style={styles.pointsIconContainer}>
              <Award size={24} color={Colors.primary} />
            </View>
            <View style={styles.pointsTextContainer}>
              <Text style={styles.pointsValue}>{user?.points || 0}</Text>
              <Text style={styles.pointsLabel}>Available Points</Text>
            </View>
          </View>
        </Card>
        
        <View style={styles.rewardsSection}>
          <Text style={styles.sectionTitle}>Available Rewards</Text>
          
          {rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              userPoints={user?.points || 0}
              onRedeem={() => handleRedeemPress(reward)}
            />
          ))}
        </View>
      </ScrollView>
      
      {/* Confirmation Modal */}
      <Modal
        visible={!!selectedReward}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Redemption</Text>
            <Text style={styles.modalText}>
              Are you sure you want to redeem {selectedReward?.title} for {selectedReward?.pointsCost} points?
            </Text>
            
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={handleCancelRedeem}
                variant="outline"
                style={styles.modalButton}
              />
              <Button
                title="Confirm"
                onPress={handleConfirmRedeem}
                variant="primary"
                loading={isRedeeming}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successModalContent}>
            <View style={styles.successIconContainer}>
              <Check size={40} color={Colors.white} />
            </View>
            <Text style={styles.successTitle}>Redemption Successful!</Text>
            <Text style={styles.successText}>
              Your reward has been successfully redeemed. Check your email for details.
            </Text>
            <Button
              title="Done"
              onPress={closeSuccessModal}
              variant="primary"
              fullWidth
              style={styles.successButton}
            />
          </View>
        </View>
      </Modal>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
  },
  pointsCard: {
    marginBottom: 24,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  pointsTextContainer: {
    flex: 1,
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  pointsLabel: {
    fontSize: 14,
    color: Colors.textLight,
  },
  rewardsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  successModalContent: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  successButton: {
    width: '100%',
  },
});