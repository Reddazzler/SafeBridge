import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { SafetyTip } from '@/types';
import { Colors } from '@/constants/colors';
import { Card } from './Card';

interface SafetyTipCardProps {
  tip: SafetyTip;
}

const { width } = Dimensions.get('window');

export const SafetyTipCard: React.FC<SafetyTipCardProps> = ({ tip }) => {
  return (
    <Card style={styles.card}>
      {tip.image && (
        <Image 
          source={{ uri: tip.image }} 
          style={styles.image} 
          resizeMode="cover"
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{tip.title}</Text>
        <Text style={styles.description}>{tip.content}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    width: width - 48,
    marginHorizontal: 8,
  },
  image: {
    width: '100%',
    height: 160,
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
  },
});