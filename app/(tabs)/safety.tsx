import React, { useRef, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Colors } from '@/constants/colors';
import { SafetyTipCard } from '@/components/SafetyTipCard';
import { SAFETY_TIPS } from '@/constants/safety-tips';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function SafetyScreen() {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleNext = () => {
    if (currentIndex < SAFETY_TIPS.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (width - 32));
    setCurrentIndex(index);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Road Safety Tips</Text>
          <Text style={styles.subtitle}>
            Learn how to stay safe on the roads
          </Text>
        </View>
        
        <View style={styles.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={SAFETY_TIPS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <SafetyTipCard tip={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToInterval={width - 32}
            decelerationRate="fast"
            onMomentumScrollEnd={handleScroll}
            contentContainerStyle={styles.carouselContent}
          />
          
          <View style={styles.carouselControls}>
            <TouchableOpacity 
              style={[
                styles.carouselButton,
                currentIndex === 0 ? styles.carouselButtonDisabled : null
              ]}
              onPress={handlePrevious}
              disabled={currentIndex === 0}
            >
              <ChevronLeft 
                size={24} 
                color={currentIndex === 0 ? Colors.lightGray : Colors.primary} 
              />
            </TouchableOpacity>
            
            <View style={styles.paginationContainer}>
              {SAFETY_TIPS.map((_, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.paginationDot,
                    index === currentIndex ? styles.paginationDotActive : null
                  ]} 
                />
              ))}
            </View>
            
            <TouchableOpacity 
              style={[
                styles.carouselButton,
                currentIndex === SAFETY_TIPS.length - 1 ? styles.carouselButtonDisabled : null
              ]}
              onPress={handleNext}
              disabled={currentIndex === SAFETY_TIPS.length - 1}
            >
              <ChevronRight 
                size={24} 
                color={currentIndex === SAFETY_TIPS.length - 1 ? Colors.lightGray : Colors.primary} 
              />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Use Pedestrian Bridges?</Text>
          <View style={styles.reasonsContainer}>
            <View style={styles.reasonItem}>
              <View style={[styles.reasonIcon, { backgroundColor: Colors.primary + '20' }]}>
                <Text style={[styles.reasonIconText, { color: Colors.primary }]}>1</Text>
              </View>
              <Text style={styles.reasonTitle}>Safety First</Text>
              <Text style={styles.reasonText}>
                Pedestrian bridges provide a safe way to cross busy roads without the risk of accidents.
              </Text>
            </View>
            
            <View style={styles.reasonItem}>
              <View style={[styles.reasonIcon, { backgroundColor: Colors.secondary + '20' }]}>
                <Text style={[styles.reasonIconText, { color: Colors.secondary }]}>2</Text>
              </View>
              <Text style={styles.reasonTitle}>Reduce Accidents</Text>
              <Text style={styles.reasonText}>
                Using bridges helps reduce pedestrian-related accidents and fatalities.
              </Text>
            </View>
            
            <View style={styles.reasonItem}>
              <View style={[styles.reasonIcon, { backgroundColor: Colors.success + '20' }]}>
                <Text style={[styles.reasonIconText, { color: Colors.success }]}>3</Text>
              </View>
              <Text style={styles.reasonTitle}>Set an Example</Text>
              <Text style={styles.reasonText}>
                By using bridges, you set a good example for children and others to follow.
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Road Safety Statistics</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>35%</Text>
              <Text style={styles.statLabel}>
                of road accidents involve pedestrians crossing roads unsafely
              </Text>
            </View>
            
            <View style={styles.statBox}>
              <Text style={styles.statValue}>70%</Text>
              <Text style={styles.statLabel}>
                reduction in accidents in areas with pedestrian bridges
              </Text>
            </View>
            
            <View style={styles.statBox}>
              <Text style={styles.statValue}>90%</Text>
              <Text style={styles.statLabel}>
                of pedestrian fatalities could be prevented by using bridges
              </Text>
            </View>
          </View>
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
    marginBottom: 24,
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
  carouselContainer: {
    marginBottom: 32,
  },
  carouselContent: {
    paddingRight: 16,
  },
  carouselControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 8,
  },
  carouselButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  carouselButtonDisabled: {
    backgroundColor: Colors.lightGray + '50',
    shadowOpacity: 0,
    elevation: 0,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.lightGray,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: Colors.primary,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  reasonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  reasonItem: {
    width: '100%',
    marginBottom: 24,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reasonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  reasonIconText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reasonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  reasonText: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  statBox: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
});