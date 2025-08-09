import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RatingStars from './RatingStars';

interface UserRatingSummaryProps {
  rating: number;
  totalRatings: number;
  onPress?: () => void;
  showDetails?: boolean;
}

const UserRatingSummary: React.FC<UserRatingSummaryProps> = ({
  rating,
  totalRatings,
  onPress,
  showDetails = true,
}) => {
  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Very Good';
    if (rating >= 3.5) return 'Good';
    if (rating >= 3.0) return 'Average';
    if (rating >= 2.0) return 'Below Average';
    if (rating >= 1.0) return 'Poor';
    return 'No Rating';
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return '#4CAF50';
    if (rating >= 4.0) return '#8BC34A';
    if (rating >= 3.5) return '#FFC107';
    if (rating >= 3.0) return '#FF9800';
    if (rating >= 2.0) return '#FF5722';
    return '#F44336';
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.ratingContainer}>
        <View style={styles.starsContainer}>
          <RatingStars
            rating={rating}
            onRatingChange={() => {}}
            size={20}
            readonly={true}
          />
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>
        
        <Text style={styles.ratingLabel}>{getRatingLabel(rating)}</Text>
        <Text style={styles.totalRatings}>
          {totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'}
        </Text>
      </View>

      {showDetails && (
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="star" size={16} color="#FFA500" />
            <Text style={styles.detailText}>View all ratings</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#999" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ratingContainer: {
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  ratingLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  totalRatings: {
    fontSize: 12,
    color: '#999',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
});

export default UserRatingSummary;
