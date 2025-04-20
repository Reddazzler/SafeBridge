import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Reward } from '@/types';
import { Colors } from '@/constants/colors';
import { Card } from './Card';
import { Button } from './Button';

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  onRedeem: () => void;
}

export const RewardCard: React.FC<RewardCardProps> = ({ 
  reward, 
  userPoints,
  onRedeem 
}) => {
  const canRedeem = userPoints >= reward.pointsCost;
  
  return (
    <Card style={styles.card}>
      <Image 
        source={{ uri: reward.image }} 
        style={styles.image} 
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{reward.title}</Text>
        <Text style={styles.description}>{reward.description}</Text>
        
        <View style={styles.footer}>
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsLabel}>Points:</Text>
            <Text style={styles.pointsValue}>{reward.pointsCost}</Text>
          </View>
          
          <Button
            title="Redeem"
            onPress={onRedeem}
            variant={canRedeem ? 'primary' : 'outline'}
            size="small"
            disabled={!canRedeem}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.text,
  },
  description: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsLabel: {
    fontSize: 14,
    color: Colors.textLight,
    marginRight: 4,
  },
  pointsValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
});