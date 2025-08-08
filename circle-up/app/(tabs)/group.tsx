import React, { useState } from "react";
import { Button, FlatList, Text, View, TouchableOpacity, TextInput } from "react-native";
import CreateGroupForm, { CreateGroupPayload } from "../components/CreateGroupForm";

//type definition for group
type Group = {
  id: string;
  title: string;
  description: string;
  location: string;
  members: number;
  leader: string;
  created_at: string;
  tags?: string[]; //will be used for reccomendations and search
};

// mock initial data
const initialGroups: Group[] = [
  {
    id: "grp_001",
    title: "Walk Group",
    members: 10,
    leader: "John Doe",
    description: "Casual neighborhood walking club. Gentle walks & good talks.",
    created_at: "2025-01-01",
    location: "Downtown Hub, Edmonton, AB",
    tags: ["walk", "talk", "casual"],
  },
  {
    id: "grp_002",
    title: "Bookworms",
    members: 120,
    leader: "Sarah Lee",
    description: "Cozy club to read, recommend, and share fav books.",
    created_at: "2024-11-20",
    location: "124 St & 102 Ave, Edmonton, AB",
    tags: ["books", "reading", "recommendations"],
  },
  {
    id: "grp_003",
    title: "Startup Friends",
    members: 45,
    leader: "Mark Smith",
    description: "Meet founders & builders. Demo, collab, network.",
    created_at: "2023-07-15",
    location: "TEC Centre, Edmonton, AB",
    tags: ["startup", "founders", "builders"],
  },
  {
    id: "grp_004",
    title: "Yoga Crew",
    members: 25,
    leader: "Emily Brown",
    description: "Beginner-friendly flows in the park. Bring a mat!",
    created_at: "2025-03-02",
    location: "Hawrelak Park, Edmonton, AB",
    tags: ["yoga", "flow", "beginner"],
  },
];
//card component for each group
function GroupCard({
  title,
  description,
  location,
  members,
  leader,
  created_at,
}: Group) {
  //format the date to a more readable format
  const createdLabel = new Date(created_at).toLocaleDateString();

  return (
    <View className="bg-white rounded-xl p-4 mb-4 shadow-md">
      <Text className="text-lg font-bold mb-2">{title}</Text>
      <Text className="text-sm text-gray-600 mb-2">{description}</Text>
      <Text className="text-xs text-gray-500 mb-3">{location}</Text>

      <Text className="text-xs text-gray-500">Members: {members}</Text>
      <Text className="text-xs text-gray-500">Leader: {leader}</Text>
      <Text className="text-xs text-gray-500">Created: {createdLabel}</Text>

      <TouchableOpacity
        style={{
          backgroundColor: "black",
          paddingVertical: 10,
          borderRadius: 8,
          alignItems: "center",
          marginTop: 12,
        }}
        onPress={() => alert(`Joining ${title}`)}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>Join</Text>
      </TouchableOpacity>
    </View>
  );
}
//main component for the group page
export default function GroupsIndex() {
  //state for the groups
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  //state for the create form
  const [showCreateForm, setShowCreateForm] = useState(false);
  //state for search
  const [searchQuery, setSearchQuery] = useState("");

  // Filter groups based on search query
  const filteredGroups = groups.filter((group) =>
    group.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.leader.toLowerCase().includes(searchQuery.toLowerCase())
  );
  //function to handle the creation of a new group
  const handleCreate = (data: CreateGroupPayload) => {
    const newGroup: Group = {
      id: `grp_${Date.now()}`,
      members: 1,
      created_at: new Date().toISOString(),
      ...data,
    };
    setGroups((prev) => [newGroup, ...prev]);
    setShowCreateForm(false);
  };

    //render the create form if the state is true
  if (showCreateForm) {
    return (
      <CreateGroupForm
        onSubmit={handleCreate}
        onCancel={() => setShowCreateForm(false)}
      />
    );
  }

  return (
    //main view for the group page
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: "white",
          paddingTop: 50,
          paddingBottom: 20,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#e0e0e0",
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "bold", color: "#333" }}>
          Groups
        </Text>
      </View>

      {/* Search + Create */}
      <View
        style={{
          padding: 16,
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderBottomColor: "#e0e0e0",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, marginRight: 12 }}>
            <TextInput
              style={{
                backgroundColor: "#f0f0f0",
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 8,
                color: "#333",
              }}
              placeholder="Search groups..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <Button title="Create" onPress={() => setShowCreateForm(true)} />
        </View>
      </View>

      {/* List */}
      <View style={{ flex: 1, padding: 16 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 16,
            color: "#333",
          }}
        >
          Nearby groups
        </Text>

        <FlatList
          data={filteredGroups}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <GroupCard {...item} />}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>
    </View>
  );
}
