import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import RatingStars from './RatingStars';

interface RatingCardProps {
  user: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
    totalRatings: number;
  };
  rating: number;
  comment?: string;
  date: string;
  onPress?: () => void;
  showUserInfo?: boolean;
}

const RatingCard: React.FC<RatingCardProps> = ({
  user,
  rating,
  comment,
  date,
  onPress,
  showUserInfo = true,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={!onPress}>
      <View style={styles.header}>
        {showUserInfo && (
          <View style={styles.userInfo}>
            <Image
              source={
                user.avatar
                  ? { uri: user.avatar }
                  : require('../../assets/images/elderly_pfp_2.png')
              }
              style={styles.avatar}
            />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user.name}</Text>
              <View style={styles.userRatingContainer}>
                <RatingStars
                  rating={user.rating}
                  onRatingChange={() => {}}
                  size={14}
                  readonly={true}
                />
                <Text style={styles.totalRatings}>
                  ({user.totalRatings} ratings)
                </Text>
              </View>
            </View>
          </View>
        )}
        <View style={styles.ratingContainer}>
          <RatingStars
            rating={rating}
            onRatingChange={() => {}}
            size={20}
            readonly={true}
          />
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      
      {comment && (
        <View style={styles.commentContainer}>
          <Text style={styles.comment}>{comment}</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  userRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalRatings: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  commentContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  comment: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});

export default RatingCard;
