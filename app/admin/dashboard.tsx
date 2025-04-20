import BridgeItem from '@/components/BridgeItem';
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { BridgeItem } from '@/components/BridgeItem';
import { useBridgeStore } from '@/store/bridge-store';
import { 
  ArrowLeft, 
  Plus, 
  QrCode, 
  Bridge, 
  X,
  Download
} from 'lucide-react-native';
import { validateBridgeId } from '@/utils/validation';

export default function AdminDashboardScreen() {
  const { bridges, addBridge, updateBridge, deleteBridge } = useBridgeStore();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  
  const [currentBridge, setCurrentBridge] = useState(null);
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    district: '',
    state: '',
    country: '',
    location: '',
    pointsPerScan: 10,
  });
  
  const [errors, setErrors] = useState({
    id: '',
    name: '',
    district: '',
    state: '',
    country: '',
    location: '',
    pointsPerScan: '',
  });
  
  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      district: '',
      state: '',
      country: '',
      location: '',
      pointsPerScan: 10,
    });
    setErrors({
      id: '',
      name: '',
      district: '',
      state: '',
      country: '',
      location: '',
      pointsPerScan: '',
    });
  };
  
  const handleAddBridge = () => {
    resetForm();
    setShowAddModal(true);
  };
  
  const handleEditBridge = (bridge) => {
    setCurrentBridge(bridge);
    setFormData({ ...bridge });
    setShowEditModal(true);
  };
  
  const handleDeleteBridge = (bridge) => {
    Alert.alert(
      'Delete Bridge',
      `Are you sure you want to delete ${bridge.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteBridge(bridge.id),
          style: 'destructive',
        },
      ]
    );
  };
  
  const handleShowQR = (bridge) => {
    setCurrentBridge(bridge);
    setShowQRModal(true);
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = { 
      id: '', 
      name: '', 
      district: '', 
      state: '', 
      country: '', 
      location: '', 
      pointsPerScan: '' 
    };
    
    if (!formData.id) {
      newErrors.id = 'Bridge ID is required';
      isValid = false;
    } else if (!validateBridgeId(formData.id)) {
      newErrors.id = 'Invalid format. Use format: [State Code][District No]FOB[Serial No]';
      isValid = false;
    }
    
    if (!formData.name) {
      newErrors.name = 'Bridge name is required';
      isValid = false;
    }
    
    if (!formData.district) {
      newErrors.district = 'District is required';
      isValid = false;
    }
    
    if (!formData.state) {
      newErrors.state = 'State is required';
      isValid = false;
    }
    
    if (!formData.country) {
      newErrors.country = 'Country is required';
      isValid = false;
    }
    
    if (!formData.location) {
      newErrors.location = 'Location is required';
      isValid = false;
    }
    
    if (!formData.pointsPerScan) {
      newErrors.pointsPerScan = 'Points per scan is required';
      isValid = false;
    } else if (isNaN(Number(formData.pointsPerScan)) || Number(formData.pointsPerScan) <= 0) {
      newErrors.pointsPerScan = 'Points must be a positive number';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmitAdd = () => {
    if (!validateForm()) return;
    
    // Check if bridge ID already exists
    const existingBridge = bridges.find(b => b.id === formData.id);
    if (existingBridge) {
      setErrors({
        ...errors,
        id: 'Bridge ID already exists',
      });
      return;
    }
    
    addBridge({
      ...formData,
      pointsPerScan: Number(formData.pointsPerScan),
    });
    
    setShowAddModal(false);
    resetForm();
  };
  
  const handleSubmitEdit = () => {
    if (!validateForm()) return;
    
    // Check if bridge ID already exists (except current bridge)
    const existingBridge = bridges.find(b => b.id === formData.id && b.id !== currentBridge.id);
    if (existingBridge) {
      setErrors({
        ...errors,
        id: 'Bridge ID already exists',
      });
      return;
    }
    
    updateBridge(currentBridge.id, {
      ...formData,
      pointsPerScan: Number(formData.pointsPerScan),
    });
    
    setShowEditModal(false);
    resetForm();
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
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Bridge Management</Text>
          <Button
            title="Add Bridge"
            onPress={handleAddBridge}
            variant="primary"
            size="small"
            icon={<Plus size={16} color={Colors.white} />}
          />
        </View>
        
        <Card style={styles.statsCard}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{bridges.length}</Text>
              <Text style={styles.statLabel}>Total Bridges</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {bridges.reduce((sum, bridge) => sum + bridge.pointsPerScan, 0)}
              </Text>
              <Text style={styles.statLabel}>Total Points</Text>
            </View>
          </View>
        </Card>
        
        <Text style={styles.sectionTitle}>All Bridges</Text>
        
        <Card style={styles.bridgesCard}>
          {bridges.length > 0 ? (
            bridges.map((bridge) => (
              <BridgeItem
                key={bridge.id}
                bridge={bridge}
                onEdit={() => handleEditBridge(bridge)}
                onDelete={() => handleDeleteBridge(bridge)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No bridges added yet. Click "Add Bridge" to create one.
              </Text>
            </View>
          )}
        </Card>
        
        <View style={styles.qrSection}>
          <Text style={styles.sectionTitle}>QR Code Management</Text>
          <Text style={styles.sectionDescription}>
            Generate and manage QR codes for bridges
          </Text>
          
          <Card>
            <Text style={styles.qrInstructions}>
              Select a bridge to generate its QR code:
            </Text>
            
            <View style={styles.qrButtonsContainer}>
              {bridges.slice(0, 3).map((bridge) => (
                <Button
                  key={bridge.id}
                  title={bridge.name}
                  onPress={() => handleShowQR(bridge)}
                  variant="outline"
                  size="small"
                  style={styles.qrButton}
                  icon={<QrCode size={16} color={Colors.primary} />}
                />
              ))}
            </View>
          </Card>
        </View>
      </ScrollView>
      
      {/* Add Bridge Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Bridge</Text>
              <TouchableOpacity 
                onPress={() => setShowAddModal(false)}
                style={styles.closeButton}
              >
                <X size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScroll}>
              <Input
                label="Bridge ID"
                placeholder="e.g., HR16FOB01"
                value={formData.id}
                onChangeText={(text) => setFormData({ ...formData, id: text })}
                error={errors.id}
              />
              
              <Input
                label="Bridge Name"
                placeholder="Enter bridge name"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                error={errors.name}
              />
              
              <Input
                label="District"
                placeholder="Enter district"
                value={formData.district}
                onChangeText={(text) => setFormData({ ...formData, district: text })}
                error={errors.district}
              />
              
              <Input
                label="State"
                placeholder="Enter state"
                value={formData.state}
                onChangeText={(text) => setFormData({ ...formData, state: text })}
                error={errors.state}
              />
              
              <Input
                label="Country"
                placeholder="Enter country"
                value={formData.country}
                onChangeText={(text) => setFormData({ ...formData, country: text })}
                error={errors.country}
              />
              
              <Input
                label="Location"
                placeholder="Enter specific location"
                value={formData.location}
                onChangeText={(text) => setFormData({ ...formData, location: text })}
                error={errors.location}
              />
              
              <Input
                label="Points Per Scan"
                placeholder="Enter points"
                value={String(formData.pointsPerScan)}
                onChangeText={(text) => setFormData({ ...formData, pointsPerScan: text })}
                keyboardType="numeric"
                error={errors.pointsPerScan}
              />
            </ScrollView>
            
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => setShowAddModal(false)}
                variant="outline"
                style={styles.modalButton}
              />
              <Button
                title="Add Bridge"
                onPress={handleSubmitAdd}
                variant="primary"
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Edit Bridge Modal */}
      <Modal
        visible={showEditModal}
        transparent
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Bridge</Text>
              <TouchableOpacity 
                onPress={() => setShowEditModal(false)}
                style={styles.closeButton}
              >
                <X size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScroll}>
              <Input
                label="Bridge ID"
                placeholder="e.g., HR16FOB01"
                value={formData.id}
                onChangeText={(text) => setFormData({ ...formData, id: text })}
                error={errors.id}
              />
              
              <Input
                label="Bridge Name"
                placeholder="Enter bridge name"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                error={errors.name}
              />
              
              <Input
                label="District"
                placeholder="Enter district"
                value={formData.district}
                onChangeText={(text) => setFormData({ ...formData, district: text })}
                error={errors.district}
              />
              
              <Input
                label="State"
                placeholder="Enter state"
                value={formData.state}
                onChangeText={(text) => setFormData({ ...formData, state: text })}
                error={errors.state}
              />
              
              <Input
                label="Country"
                placeholder="Enter country"
                value={formData.country}
                onChangeText={(text) => setFormData({ ...formData, country: text })}
                error={errors.country}
              />
              
              <Input
                label="Location"
                placeholder="Enter specific location"
                value={formData.location}
                onChangeText={(text) => setFormData({ ...formData, location: text })}
                error={errors.location}
              />
              
              <Input
                label="Points Per Scan"
                placeholder="Enter points"
                value={String(formData.pointsPerScan)}
                onChangeText={(text) => setFormData({ ...formData, pointsPerScan: text })}
                keyboardType="numeric"
                error={errors.pointsPerScan}
              />
            </ScrollView>
            
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => setShowEditModal(false)}
                variant="outline"
                style={styles.modalButton}
              />
              <Button
                title="Save Changes"
                onPress={handleSubmitEdit}
                variant="primary"
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
      
      {/* QR Code Modal */}
      <Modal
        visible={showQRModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.qrModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Bridge QR Code</Text>
              <TouchableOpacity 
                onPress={() => setShowQRModal(false)}
                style={styles.closeButton}
              >
                <X size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            
            {currentBridge && (
              <View style={styles.qrContainer}>
                <Text style={styles.qrBridgeName}>{currentBridge.name}</Text>
                <Text style={styles.qrBridgeId}>{currentBridge.id}</Text>
                
                <View style={styles.qrCodeContainer}>
                  <QrCode size={200} color={Colors.text} />
                </View>
                
                <Text style={styles.qrInstructions}>
                  Place this QR code at the bridge entrance for users to scan
                </Text>
                
                <Button
                  title="Download QR Code"
                  onPress={() => {
                    Alert.alert(
                      'Download QR Code',
                      'In a real app, this would download the QR code image.'
                    );
                  }}
                  variant="primary"
                  icon={<Download size={20} color={Colors.white} />}
                  style={styles.downloadButton}
                />
              </View>
            )}
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
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
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
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textLight,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.lightGray,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 16,
  },
  bridgesCard: {
    padding: 0,
    marginBottom: 24,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
  },
  qrSection: {
    marginBottom: 24,
  },
  qrInstructions: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 16,
  },
  qrButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  qrButton: {
    marginRight: 8,
    marginBottom: 8,
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
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  closeButton: {
    padding: 4,
  },
  modalScroll: {
    maxHeight: 400,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  qrModalContent: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  qrContainer: {
    alignItems: 'center',
  },
  qrBridgeName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  qrBridgeId: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 24,
  },
  qrCodeContainer: {
    padding: 24,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    marginBottom: 24,
  },
  downloadButton: {
    marginTop: 16,
  },
});