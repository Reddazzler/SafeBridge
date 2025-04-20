import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Scan } from '@/types';
import { Colors } from '@/constants/colors';
import { formatDate } from '@/utils/date-utils';

interface ScanHistoryItemProps {
  scan: Scan;
}

export const ScanHistoryItem: React.FC<ScanHistoryItemProps> = ({ scan }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Text style={styles.bridgeName}>{scan.bridgeName}</Text>
        <Text style={styles.date}>{formatDate(scan.timestamp)}</Text>
      </View>
      
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsValue}>+{scan.points}</Text>
        <Text style={styles.pointsLabel}>points</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  leftContent: {
    flex: 1,
  },
  bridgeName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: Colors.textLight,
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  pointsValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.success,
  },
  pointsLabel: {
    fontSize: 12,
    color: Colors.textLight,
  },
});