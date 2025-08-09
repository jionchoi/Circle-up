import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RatingStarsProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: number;
  readonly?: boolean;
  showLabel?: boolean;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  onRatingChange,
  size = 24,
  readonly = false,
  showLabel = false,
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarPress = (starRating: number) => {
    if (!readonly) {
      onRatingChange(starRating);
    }
  };

  const getStarIcon = (starNumber: number) => {
    const currentRating = hoverRating || rating;
    
    if (starNumber <= currentRating) {
      return 'star';
    } else if (starNumber - 0.5 <= currentRating) {
      return 'star-half';
    } else {
      return 'star-outline';
    }
  };

  const getStarColor = (starNumber: number) => {
    const currentRating = hoverRating || rating;
    
    if (starNumber <= currentRating) {
      return '#FFD700'; // Gold for filled stars
    } else {
      return '#D3D3D3'; // Light gray for empty stars
    }
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Very Good';
    if (rating >= 3.5) return 'Good';
    if (rating >= 3.0) return 'Average';
    if (rating >= 2.0) return 'Below Average';
    if (rating >= 1.0) return 'Poor';
    return 'No Rating';
  };

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((starNumber) => (
          <TouchableOpacity
            key={starNumber}
            onPress={() => handleStarPress(starNumber)}
            onPressIn={() => !readonly && setHoverRating(starNumber)}
            onPressOut={() => !readonly && setHoverRating(0)}
            disabled={readonly}
            style={styles.starButton}
          >
            <Ionicons
              name={getStarIcon(starNumber) as any}
              size={size}
              color={getStarColor(starNumber)}
            />
          </TouchableOpacity>
        ))}
      </View>
      {showLabel && (
        <Text style={styles.ratingLabel}>
          {getRatingLabel(rating)} ({rating.toFixed(1)})
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starButton: {
    padding: 2,
  },
  ratingLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});

export default RatingStars;
