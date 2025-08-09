import { Button, FlatList, ScrollView, Text, View } from "react-native";
import Header from "../components/Header";
import { useRouter } from "expo-router";
import SearchBar from "../components/SearchBar";
import EventCard from "../components/EventCard";
import Event from "@/interfaces/interfaces";

// Mock data
const events: Event[] = [
  {
    id: "evt_001",
    title: "Coffee & Code: React Nativeaddkl",
    date: " 2025 6:00 PM, Aug 10",
    host: "Dev YEG",
    location: "Downtown Hub, Edmonton, AB",
  },
  {
    id: "evt_002",
    title: "Indie Game Night",
    date: " 2025 6:00 PM, Aug 10",
    host: "Pixel Arcade",
    location: "124 St & 102 Ave, Edmonton, AB",
  },
  {
    id: "evt_003",
    title: "Startup Mixer",
    date: " 2025 6:00 PM, Aug 10",
    host: "Startup Edmonton",
    location: "TEC Centre, Edmonton, AB",
  },
  {
    id: "evt_004",
    title: "Yoga in the Park",
    date: " 2025 6:00 PM, Aug 10",
    host: "River Valley Yoga",
    location: "Hawrelak Park, Edmonton, AB",
  },
  {
    id: "evt_005",
    title: "Photography Walk",
    date: " 2025 6:00 PM, Aug 10",
    host: "YEG Photographers",
    location: "Old Strathcona, Edmonton, AB",
  },
  {
    id: "evt_006",
    title: "Board Games & Bites",
    date: " 2025 6:00 PM, Aug 10",
    host: "Meeple Cafe",
    location: "Whyte Ave, Edmonton, AB",
  },
  {
    id: "evt_007",
    title: "Book Club Meetup",
    date: " 2025 7:30 PM, Aug 12",
    host: "Edmonton Public Library",
    location: "Stanley A. Milner Library, Edmonton, AB",
  },
  {
    id: "evt_008",
    title: "Running Club",
    date: " 2025 6:30 AM, Aug 13",
    host: "YEG Runners",
    location: "Mill Creek Ravine, Edmonton, AB",
  },
  {
    id: "evt_009",
    title: "Tech Talk: AI & Future",
    date: " 2025 6:00 PM, Aug 14",
    host: "Edmonton AI Society",
    location: "University of Alberta, Edmonton, AB",
  },
  {
    id: "evt_010",
    title: "Cooking Workshop: Italian Cuisine",
    date: " 2025 5:00 PM, Aug 15",
    host: "Culinary Arts Studio",
    location: "Downtown Edmonton, AB",
  },
  {
    id: "evt_011",
    title: "Live Music Night",
    date: " 2025 8:00 PM, Aug 16",
    host: "Local Artists Collective",
    location: "The Starlite Room, Edmonton, AB",
  },
  {
    id: "evt_012",
    title: "Weekend Hiking Adventure",
    date: " 2025 9:00 AM, Aug 17",
    host: "Mountain Explorers",
    location: "Elk Island National Park, AB",
  },
  {
    id: "evt_013",
    title: "Art Gallery Opening",
    date: " 2025 7:00 PM, Aug 18",
    host: "Edmonton Art Gallery",
    location: "Art Gallery of Alberta, Edmonton, AB",
  },
  {
    id: "evt_014",
    title: "Language Exchange Cafe",
    date: " 2025 6:00 PM, Aug 19",
    host: "Polyglot Society",
    location: "Tim Hortons Downtown, Edmonton, AB",
  },
  {
    id: "evt_015",
    title: "Trivia Night",
    date: " 2025 7:00 PM, Aug 20",
    host: "Quiz Masters YEG",
    location: "The Common Bar, Edmonton, AB",
  },
  
];

export default function Index() {

  const router = useRouter(); //to navigate to different pages

  return (

    <View className="flex-1 items-stretch">
      <Header />


      <ScrollView className="flex-1 w-full" contentContainerStyle={{ padding: 16 }}>
        <View className="flex-1">

          <View className="flex-row items-center w-full mb-4">
            <SearchBar />
            <Button title="Host an event" onPress={() => { }} />
          </View>
          <>
            <Text className="text-lg text-black font-bold mt-3">Nearby events    map icon current location</Text>
            <FlatList
              data={events}
              renderItem={({ item }) => (
                <EventCard 
                  {...item}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              
              scrollEnabled={false}
            />
          </>
        </View>

      </ScrollView>
    </View>
  );
}
