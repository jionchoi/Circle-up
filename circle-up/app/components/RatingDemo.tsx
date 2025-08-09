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

const RatingDemo = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    name: string;
    avatar?: string;
  } | null>(null);

  const mockUsers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      rating: 4.8,
      totalRatings: 23,
    },
    {
      id: '2',
      name: 'Mike Chen',
      rating: 4.5,
      totalRatings: 18,
    },
    {
      id: '3',
      name: 'Emily Davis',
      rating: 4.2,
      totalRatings: 31,
    },
  ];

  const mockRatings = [
    {
      id: '1',
      user: mockUsers[0],
      rating: 5,
      comment: 'Great experience! Very friendly and helpful.',
      date: '2 days ago',
    },
    {
      id: '2',
      user: mockUsers[1],
      rating: 4,
      comment: 'Good communication and arrived on time.',
      date: '1 week ago',
    },
  ];

  const handleRateUser = (user: { id: string; name: string; avatar?: string }) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleSubmitRating = async (rating: number, comment: string) => {
    Alert.alert(
      'Rating Submitted!',
      `Rating: ${rating} stars\nComment: ${comment || 'No comment'}\nUser: ${selectedUser?.name}`
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rating System Demo</Text>
        <Text style={styles.subtitle}>Uber-style rating components</Text>
      </View>

      {/* Interactive Rating Stars */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interactive Rating Stars</Text>
        <View style={styles.demoCard}>
          <Text style={styles.demoLabel}>Rate this demo:</Text>
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

      {/* Quick Rating Examples */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Rating Examples</Text>
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

      {/* User Rating Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Rating Summary</Text>
        <UserRatingSummary
          rating={4.2}
          totalRatings={15}
          onPress={() => Alert.alert('Navigation', 'Navigate to ratings screen')}
        />
      </View>

      {/* Rating Cards */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rating Cards</Text>
        {mockRatings.map((rating) => (
          <RatingCard
            key={rating.id}
            user={rating.user}
            rating={rating.rating}
            comment={rating.comment}
            date={rating.date}
            onPress={() => handleRateUser(rating.user)}
          />
        ))}
      </View>

      {/* Rate User Button */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rate a User</Text>
        <View style={styles.demoCard}>
          <TouchableOpacity
            style={styles.rateButton}
            onPress={() => {
              setSelectedUser({
                id: 'demo-user',
                name: 'Demo User',
              });
              setIsModalVisible(true);
            }}
          >
            <Ionicons name="star-outline" size={20} color="#FFA500" />
            <Text style={styles.rateButtonText}>Rate Demo User</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Rating Modal */}
      <RatingModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleSubmitRating}
        userToRate={selectedUser || undefined}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
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
    marginBottom: 8,
  },
  quickRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
});

export default RatingDemo;
