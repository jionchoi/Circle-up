import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RatingStars from './RatingStars';

interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  userToRate?: {
    id: string;
    name: string;
    avatar?: string;
  };
  title?: string;
}

const RatingModal: React.FC<RatingModalProps> = ({
  visible,
  onClose,
  onSubmit,
  userToRate,
  title = 'Rate your experience',
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please select a rating before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(rating, comment);
      handleClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to submit rating. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setRating(0);
    setComment('');
    onClose();
  };

  const getRatingEmoji = (rating: number) => {
    if (rating >= 4.5) return '😊';
    if (rating >= 4.0) return '🙂';
    if (rating >= 3.0) return '😐';
    if (rating >= 2.0) return '😕';
    if (rating >= 1.0) return '😞';
    return '';
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {userToRate && (
              <View style={styles.userInfo}>
                <Text style={styles.userName}>Rate {userToRate.name}</Text>
              </View>
            )}

            <View style={styles.ratingSection}>
              <Text style={styles.ratingLabel}>How was your experience?</Text>
              <View style={styles.starsContainer}>
                <RatingStars
                  rating={rating}
                  onRatingChange={setRating}
                  size={32}
                  showLabel={true}
                />
              </View>
              {rating > 0 && (
                <Text style={styles.ratingEmoji}>
                  {getRatingEmoji(rating)}
                </Text>
              )}
            </View>

            <View style={styles.commentSection}>
              <Text style={styles.commentLabel}>Add a comment (optional)</Text>
              <TextInput
                style={styles.commentInput}
                value={comment}
                onChangeText={setComment}
                placeholder="Tell us about your experience..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                maxLength={500}
              />
              <Text style={styles.charCount}>
                {comment.length}/500 characters
              </Text>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.submitButton, rating === 0 && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={rating === 0 || isSubmitting}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Submitting...' : 'Submit Rating'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 32,
  },
  content: {
    padding: 20,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  ratingSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 16,
  },
  starsContainer: {
    marginBottom: 8,
  },
  ratingEmoji: {
    fontSize: 24,
    marginTop: 8,
  },
  commentSection: {
    marginBottom: 20,
  },
  commentLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    textAlignVertical: 'top',
    minHeight: 100,
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 4,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  submitButton: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RatingModal;
