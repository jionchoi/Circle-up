# Uber-Style Rating System

A comprehensive frontend-only rating system built with React Native and TypeScript, featuring interactive star ratings, rating cards, modals, and user rating summaries.

## Features

- ⭐ **Interactive Star Ratings** - Touch-responsive 1-5 star rating system
- 📱 **Rating Modal** - Full-screen modal for submitting ratings with comments
- 🃏 **Rating Cards** - Display individual ratings with user information
- 📊 **User Rating Summary** - Show user's overall rating statistics
- ⚡ **Quick Rating** - Compact rating display in multiple sizes
- 📈 **Rating Distribution** - Visual breakdown of rating distribution
- 🔄 **Pull-to-Refresh** - Refresh rating data with pull gesture
- 🎨 **Modern UI** - Clean, modern design with shadows and animations

## Components

### 1. RatingStars
Interactive star rating component with hover effects and labels.

```tsx
import RatingStars from './components/RatingStars';

<RatingStars
  rating={4.2}
  onRatingChange={(rating) => console.log(rating)}
  size={24}
  readonly={false}
  showLabel={true}
/>
```

**Props:**
- `rating`: Current rating (0-5)
- `onRatingChange`: Callback when rating changes
- `size`: Star size in pixels (default: 24)
- `readonly`: Disable interaction (default: false)
- `showLabel`: Show rating label (default: false)

### 2. RatingModal
Full-screen modal for submitting ratings with comments.

```tsx
import RatingModal from './components/RatingModal';

<RatingModal
  visible={isModalVisible}
  onClose={() => setIsModalVisible(false)}
  onSubmit={(rating, comment) => handleSubmit(rating, comment)}
  userToRate={{ id: '1', name: 'John Doe' }}
  title="Rate your experience"
/>
```

**Props:**
- `visible`: Modal visibility
- `onClose`: Close modal callback
- `onSubmit`: Submit rating callback
- `userToRate`: User being rated (optional)
- `title`: Modal title

### 3. RatingCard
Display individual ratings with user information.

```tsx
import RatingCard from './components/RatingCard';

<RatingCard
  user={{
    id: '1',
    name: 'John Doe',
    rating: 4.5,
    totalRatings: 23
  }}
  rating={5}
  comment="Great experience!"
  date="2 days ago"
  onPress={() => handleCardPress()}
/>
```

### 4. UserRatingSummary
Show user's overall rating statistics.

```tsx
import UserRatingSummary from './components/UserRatingSummary';

<UserRatingSummary
  rating={4.2}
  totalRatings={15}
  onPress={() => navigateToRatings()}
  showDetails={true}
/>
```

### 5. QuickRating
Compact rating display in multiple sizes.

```tsx
import QuickRating from './components/QuickRating';

<QuickRating
  rating={4.5}
  totalRatings={23}
  size="medium"
  showCount={true}
  onPress={() => handlePress()}
/>
```

**Size options:** `'small'`, `'medium'`, `'large'`

## Screens

### Ratings Screen (`app/(tabs)/ratings.tsx`)
Main ratings screen with:
- User rating summary with distribution chart
- Recent ratings list
- Pull-to-refresh functionality
- Rate user button

### Profile Integration
The rating system is integrated into the profile screen with:
- User rating summary card
- Navigation to ratings screen

## Usage Examples

### Basic Star Rating
```tsx
const [rating, setRating] = useState(0);

<RatingStars
  rating={rating}
  onRatingChange={setRating}
  size={32}
  showLabel={true}
/>
```

### Rating Modal
```tsx
const [isModalVisible, setIsModalVisible] = useState(false);

const handleSubmitRating = async (rating: number, comment: string) => {
  // Handle rating submission
  console.log('Rating:', rating, 'Comment:', comment);
};

<RatingModal
  visible={isModalVisible}
  onClose={() => setIsModalVisible(false)}
  onSubmit={handleSubmitRating}
  userToRate={{ id: '1', name: 'John Doe' }}
/>
```

### Rating Cards List
```tsx
const ratings = [
  {
    id: '1',
    user: { id: '1', name: 'John', rating: 4.5, totalRatings: 23 },
    rating: 5,
    comment: 'Great!',
    date: '2 days ago'
  }
];

{ratings.map(rating => (
  <RatingCard
    key={rating.id}
    user={rating.user}
    rating={rating.rating}
    comment={rating.comment}
    date={rating.date}
  />
))}
```

## Styling

The rating system uses a consistent color scheme:
- **Primary Orange**: `#FFA500` (for stars and accents)
- **Gold Stars**: `#FFD700` (for filled stars)
- **Gray Stars**: `#D3D3D3` (for empty stars)
- **Background**: `#f8f9fa`
- **Cards**: `#fff` with shadows

## Data Structure

### Rating Interface
```typescript
interface Rating {
  id: string;
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
}
```

### User Interface
```typescript
interface User {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  totalRatings: number;
}
```

## Customization

### Colors
You can customize colors by modifying the color values in each component's styles.

### Sizes
Star sizes can be adjusted by changing the `size` prop values.

### Labels
Rating labels can be customized by modifying the `getRatingLabel` function in components.

## Demo

To see all components in action, you can temporarily replace any screen content with:

```tsx
import RatingDemo from './components/RatingDemo';

// In your screen component
return <RatingDemo />;
```

## Navigation

The rating system is integrated into the tab navigation:
- **Ratings Tab**: Main ratings screen
- **Profile Tab**: User rating summary

## Future Enhancements

- [ ] Rating analytics and insights
- [ ] Rating filters and search
- [ ] Rating notifications
- [ ] Rating badges and achievements
- [ ] Rating export functionality
- [ ] Multi-language support

## Dependencies

- React Native
- Expo Vector Icons
- TypeScript

No additional dependencies required - everything is built with standard React Native components.
