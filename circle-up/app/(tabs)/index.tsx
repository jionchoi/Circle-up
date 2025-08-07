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
    date: " Aug 10, 2025 6:00 PM",
    host: "Dev YEG",
    location: "Downtown Hub, Edmonton, AB",
  },
  {
    id: "evt_002",
    title: "Indie Game Night",
    date: " Aug 10, 2025 6:00 PM",
    host: "Pixel Arcade",
    location: "124 St & 102 Ave, Edmonton, AB",
  },
  {
    id: "evt_003",
    title: "Startup Mixer",
    date: " Aug 10, 2025 6:00 PM",
    host: "Startup Edmonton",
    location: "TEC Centre, Edmonton, AB",
  },
  {
    id: "evt_004",
    title: "Yoga in the Park",
    date: " Aug 10, 2025 6:00 PM",
    host: "River Valley Yoga",
    location: "Hawrelak Park, Edmonton, AB",
  },
  {
    id: "evt_005",
    title: "Photography Walk",
    date: " Aug 10, 2025 6:00 PM",
    host: "YEG Photographers",
    location: "Old Strathcona, Edmonton, AB",
  },
  {
    id: "evt_006",
    title: "Board Games & Bites",
    date: " Aug 10, 2025 6:00 PM",
    host: "Meeple Cafe",
    location: "Whyte Ave, Edmonton, AB",
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
            <Text className="text-lg text-black font-bold mt-3">Nearby events</Text>
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
