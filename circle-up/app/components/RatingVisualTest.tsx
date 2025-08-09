import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RatingStars from './RatingStars';
import RatingCard from './RatingCard';
import RatingModal from './RatingModal';
import UserRatingSummary from './UserRatingSummary';
import QuickRating from './QuickRating';

const RatingVisualTest = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const mockUser = {
    id: '1',
    name: 'Sarah Johnson',
    rating: 4.8,
    totalRatings: 23,
  };

  const mockRating = {
    id: '1',
    user: mockUser,
    rating: 5,
    comment: 'Great experience! Very friendly and helpful.',
    date: '2 days ago',
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rating System Visual Test</Text>
        <Text style={styles.headerSubtitle}>How it should look</Text>
      </View>

      {/* Section 1: Interactive Stars */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Interactive Star Rating</Text>
        <View style={styles.demoCard}>
          <Text style={styles.demoLabel}>Tap the stars below:</Text>
          <RatingStars
            rating={0}
            onRatingChange={(rating) => {
              Alert.alert('Rating Selected', `You rated: ${rating} stars`);
            }}
            size={32}
            showLabel={true}
          />
        </View>
      </View>

      {/* Section 2: Quick Rating Examples */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Quick Rating Display</Text>
        <View style={styles.demoCard}>
          <View style={styles.quickRatingRow}>
            <Text style={styles.demoLabel}>Small:</Text>
            <QuickRating rating={4.2} totalRatings={15} size="small" />
          </View>
          <View style={styles.quickRatingRow}>
            <Text style={styles.demoLabel}>Medium:</Text>
            <QuickRating rating={4.5} totalRatings={23} size="medium" />
          </View>
          <View style={styles.quickRatingRow}>
            <Text style={styles.demoLabel}>Large:</Text>
            <QuickRating rating={4.8} totalRatings={31} size="large" />
          </View>
        </View>
      </View>

      {/* Section 3: User Rating Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. User Rating Summary (Profile)</Text>
        <UserRatingSummary
          rating={4.2}
          totalRatings={15}
          onPress={() => Alert.alert('Navigation', 'Navigate to ratings screen')}
        />
      </View>

      {/* Section 4: Rating Card */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Rating Card (Individual Rating)</Text>
        <RatingCard
          user={mockUser}
          rating={mockRating.rating}
          comment={mockRating.comment}
          date={mockRating.date}
          onPress={() => {
            Alert.alert('Card Pressed', 'This would open rating modal');
          }}
        />
      </View>

      {/* Section 5: Rating Distribution */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Rating Distribution Chart</Text>
        <View style={styles.demoCard}>
          <Text style={styles.demoLabel}>Your Rating Distribution:</Text>
          <View style={styles.distributionContainer}>
            {[5, 4, 3, 2, 1].map((stars) => (
              <View key={stars} style={styles.ratingBar}>
                <Text style={styles.starLabel}>{stars}★</Text>
                <View style={styles.barContainer}>
                  <View
                    style={[
                      styles.bar,
                      {
                        width: `${Math.random() * 100}%`,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.barCount}>{Math.floor(Math.random() * 10)}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Section 6: Rate Button */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Rate Someone Button</Text>
        <View style={styles.demoCard}>
          <TouchableOpacity
            style={styles.rateButton}
            onPress={() => setIsModalVisible(true)}
          >
            <Ionicons name="star-outline" size={20} color="#FFA500" />
            <Text style={styles.rateButtonText}>Rate Someone</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Section 7: Empty State */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. Empty State</Text>
        <View style={styles.emptyState}>
          <Ionicons name="star-outline" size={48} color="#ccc" />
          <Text style={styles.emptyText}>No ratings yet</Text>
          <Text style={styles.emptySubtext}>
            Start rating people to build your reputation
          </Text>
        </View>
      </View>

      {/* Rating Modal */}
      <RatingModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={(rating, comment) => {
          Alert.alert(
            'Rating Submitted!',
            `Rating: ${rating} stars\nComment: ${comment || 'No comment'}`
          );
        }}
        userToRate={{ id: '1', name: 'Demo User' }}
        title="Rate User"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  demoCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  demoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
  },
  quickRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  distributionContainer: {
    marginTop: 12,
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starLabel: {
    width: 30,
    fontSize: 12,
    color: '#666',
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginHorizontal: 8,
  },
  bar: {
    height: '100%',
    backgroundColor: '#FFA500',
    borderRadius: 4,
  },
  barCount: {
    width: 30,
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  rateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff3e0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  rateButtonText: {
    marginLeft: 8,
    color: '#FFA500',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 4,
  },
});

export default RatingVisualTest;
