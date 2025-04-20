import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bridge } from '@/types';
import { Colors } from '@/constants/colors';
import { Edit, Trash2 } from 'lucide-react-native';

interface BridgeItemProps {
  bridge: Bridge;
  onEdit: () => void;
  onDelete: () => void;
}

export const BridgeItem: React.FC<BridgeItemProps> = ({ 
  bridge, 
  onEdit, 
  onDelete 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.id}>{bridge.id}</Text>
        <Text style={styles.name}>{bridge.name}</Text>
        <Text style={styles.location}>
          {bridge.district}, {bridge.state}, {bridge.country}
        </Text>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsLabel}>Points per scan:</Text>
          <Text style={styles.pointsValue}>{bridge.pointsPerScan}</Text>
        </View>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]} 
          onPress={onEdit}
        >
          <Edit size={16} color={Colors.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]} 
          onPress={onDelete}
        >
          <Trash2 size={16} color={Colors.danger} />
        </TouchableOpacity>
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
  infoContainer: {
    flex: 1,
  },
  id: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsLabel: {
    fontSize: 12,
    color: Colors.textLight,
    marginRight: 4,
  },
  pointsValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: Colors.primaryLight + '30',
  },
  deleteButton: {
    backgroundColor: Colors.danger + '20',
  },
});