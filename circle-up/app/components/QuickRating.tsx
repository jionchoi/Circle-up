import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RatingStars from './RatingStars';

interface QuickRatingProps {
  rating: number;
  totalRatings: number;
  size?: 'small' | 'medium' | 'large';
  showCount?: boolean;
  onPress?: () => void;
}

const QuickRating: React.FC<QuickRatingProps> = ({
  rating,
  totalRatings,
  size = 'medium',
  showCount = true,
  onPress,
}) => {
  const getStarSize = () => {
    switch (size) {
      case 'small': return 12;
      case 'large': return 20;
      default: return 16;
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small': return 10;
      case 'large': return 14;
      default: return 12;
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
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.ratingRow}>
        <RatingStars
          rating={rating}
          onRatingChange={() => {}}
          size={getStarSize()}
          readonly={true}
        />
        <Text style={[styles.ratingText, { fontSize: getTextSize() }]}>
          {rating.toFixed(1)}
        </Text>
      </View>
      
      {showCount && (
        <Text style={[styles.countText, { fontSize: getTextSize() - 2 }]}>
          ({totalRatings})
        </Text>
      )}
      
      {size === 'large' && (
        <Text style={styles.labelText}>
          {getRatingLabel(rating)}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: '600',
    color: '#333',
  },
  countText: {
    color: '#666',
    marginTop: 2,
  },
  labelText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default QuickRating;
