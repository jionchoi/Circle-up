import React, { useMemo, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
//type definitions for the featured and recommended items
type Featured = { id: string; title: string; desc: string };
type Rec = {
  id: string;
  name: string;
  category: string;   // display category
  type: "tech" | "food" | "creative" | "outdoors" | "environment" | "animals";
  time: string;       // e.g., "Sat 3–5 PM"
  distanceKm?: number;// undefined => online
  isOnline?: boolean; // for Online tab
  points: number;     // reward points
};

//type labels for the types
const TYPE_LABEL: Record<Rec["type"], string> = {
  tech: "Tech",
  food: "Food",
  creative: "Creative",
  outdoors: "Outdoors",
  environment: "Environment",
  animals: "Animals",
};

//main component for the volunteering screen
export default function VolunteeringScreen() {
  // ---------- Mock data ----------
  const featured: Featured[] = [
    { id: "1", title: "Golden Hour Walk", desc: "A gentle evening walk with neighbors." },
    { id: "2", title: "Pastries & Paints", desc: "Relaxing, beginner-friendly art session." },
    { id: "3", title: "Community Garden Day", desc: "Plant, water, and hang with plant people." },
    { id: "4", title: "Park Clean-Up", desc: "Help tidy the river valley trails." },
  ];

  const recommended: Rec[] = [
    { id: "1", name: "Tech Helpers", category: "Computer Club", type: "tech", time: "Sat 2–4 PM", distanceKm: 3.2, points: 40 },
    { id: "2", name: "Meal Helpers", category: "Tea & Chat Group", type: "food", time: "Sun 11–1 PM", distanceKm: 1.1, points: 30 },
    { id: "3", name: "Pet Pals", category: "Animal Shelter Support", type: "animals", time: "Fri 4–6 PM", distanceKm: 8.5, points: 50 },
    { id: "4", name: "Books & Buddies", category: "Library Reading Circle", type: "creative", time: "Thu 6–7 PM", isOnline: true, points: 20 },
    { id: "5", name: "Green Thumbs", category: "Community Garden", type: "environment", time: "Sat 9–11 AM", distanceKm: 5.0, points: 35 },
    { id: "6", name: "River Cleanup Crew", category: "Environment", type: "environment", time: "Sun 2–5 PM", distanceKm: 12.3, points: 60 },
    { id: "7", name: "Sunrise Hike Guides", category: "Trail Buddies", type: "outdoors", time: "Sat 6–8 AM", distanceKm: 9.1, points: 45 },
    { id: "8", name: "Intro to Coding Buddies", category: "Youth Center", type: "tech", time: "Wed 5–6 PM", isOnline: true, points: 25 },
  ];

  // ---------- UI state ----------
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Nearby" | "Online">("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedType, setSelectedType] =
    useState<Rec["type"] | "all">("all");

  // ---------- Filtering logic ----------
  const filteredRecs = useMemo(() => {
    return recommended
      .filter((r) => {
        // Tab filter
        if (activeTab === "Nearby" && (r.isOnline || (r.distanceKm ?? Infinity) > 10)) return false;
        if (activeTab === "Online" && !r.isOnline) return false;
        // Type filter
        if (selectedType !== "all" && r.type !== selectedType) return false;
        // Search filter
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return (
          r.name.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          TYPE_LABEL[r.type].toLowerCase().includes(q)
        );
      })
      // Nice sort: nearer first, then online, then by points desc
      .sort((a, b) => {
        const ad = a.isOnline ? Infinity : (a.distanceKm ?? Infinity);
        const bd = b.isOnline ? Infinity : (b.distanceKm ?? Infinity);
        if (ad !== bd) return ad - bd;
        return b.points - a.points;
      });
  }, [recommended, activeTab, selectedType, query]);

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
      {/* Header – centered */}
      <View style={{ alignItems: "center", marginBottom: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "#555" }}>Welcome Back!</Text>
        <Text style={{ fontSize: 28, fontWeight: "800", textAlign: "center" }}>
          Margaret James 👋
        </Text>
      </View>

      {/* Search + Filter Row */}
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 12 }}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search for Opportunities"
          style={{
            flex: 1,
            backgroundColor: "#f0f0f0",
            padding: 12,
            borderRadius: 8,
          }}
        />
        <TouchableOpacity
          onPress={() => setFiltersOpen((v) => !v)}
          style={{
            paddingHorizontal: 14,
            paddingVertical: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#ccc",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "600" }}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
        {(["All", "Nearby", "Online"] as const).map((tab) => {
          const active = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 14,
                borderRadius: 999,
                backgroundColor: active ? "black" : "#f0f0f0",
              }}
            >
              <Text style={{ color: active ? "white" : "#333", fontWeight: "600" }}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Filter panel (type chips) */}
      {filtersOpen && (
        <View
          style={{
            backgroundColor: "#fafafa",
            borderWidth: 1,
            borderColor: "#eee",
            borderRadius: 12,
            padding: 12,
            marginBottom: 12,
          }}
        >
          <Text style={{ fontWeight: "700", marginBottom: 8 }}>Type</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {(["all", "tech", "food", "creative", "outdoors", "environment", "animals"] as const).map((t) => {
              const active = selectedType === t;
              return (
                <TouchableOpacity
                  key={t}
                  onPress={() => setSelectedType(t)}
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    borderRadius: 999,
                    backgroundColor: active ? "black" : "#f0f0f0",
                  }}
                >
                  <Text style={{ color: active ? "white" : "#333" }}>
                    {t === "all" ? "All" : TYPE_LABEL[t as Rec["type"]]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

      {/* Featured */}
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>Featured</Text>
      {featured.map((item) => (
        <View key={item.id} style={{ marginBottom: 12 }}>
          <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
          <Text style={{ color: "#555" }}>{item.desc}</Text>
        </View>
      ))}

      {/* Points – display only */}
      <View
        style={{
          backgroundColor: "black",
          padding: 16,
          borderRadius: 12,
          marginVertical: 16,
        }}
      >
        <Text style={{ color: "white", marginBottom: 4 }}>Your Volunteer Points</Text>
        <Text style={{ fontSize: 24, fontWeight: "900", color: "white" }}>2328</Text>
      </View>

      {/* Recommended */}
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
        Recommended For You
      </Text>

      <FlatList
        data={filteredRecs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecRow item={item} />
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ color: "#777" }}>
            No opportunities match your filters.
          </Text>
        }
      />
    </View>
  );
}

/* ---------- Small Row Component with extra info ---------- */

function RecRow({ item }: { item: {
  name: string; category: string; type: Rec["type"]; time: string; distanceKm?: number; isOnline?: boolean; points: number;
} }) {
  const meta = item.isOnline ? "Online" : `${item.distanceKm?.toFixed(1) ?? "∞"} km away`;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
      }}
    >
      <View style={{ flexShrink: 1, paddingRight: 10 }}>
        <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
        <Text style={{ color: "#777" }}>{item.category} • {TYPE_LABEL[item.type]}</Text>
        <Text style={{ color: "#777", fontSize: 12 }}>
          {item.time} • {meta} • {item.points} pts
        </Text>
      </View>

      <TouchableOpacity
        style={{
          borderColor: "black",
          borderWidth: 1,
          borderRadius: 8,
          paddingVertical: 6,
          paddingHorizontal: 12,
        }}
        onPress={() => console.log("Volunteer →", item.name)}
      >
        <Text style={{ color: "black", fontWeight: "600" }}>Volunteer</Text>
      </TouchableOpacity>
    </View>
  );
}
