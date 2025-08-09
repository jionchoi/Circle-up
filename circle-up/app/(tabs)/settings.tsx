import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  Switch,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

// types
type Setting = {
  id: string;
  title: string;
  description: string;
};

// mock data (kept your sample)
const SETTINGS: Setting[] = [
  { id: "1", title: "Notifications", description: "Enable or disable notifications" },
  { id: "2", title: "Privacy", description: "Manage your privacy settings" },
  { id: "3", title: "Language", description: "Change the language of the app" },
  { id: "4", title: "Notifications", description: "Enable or disable notifications" },
  { id: "5", title: "Privacy", description: "Manage your privacy settings" },
  { id: "6", title: "Language", description: "Change the language of the app" },
  { id: "7", title: "Notifications", description: "Enable or disable notifications" },
  { id: "8", title: "Privacy", description: "Manage your privacy settings" },
  { id: "9", title: "Language", description: "Change the language of the app" },
  { id: "10", title: "Notifications", description: "Enable or disable notifications" },
];

//main component for the settings screen    
export default function SettingsScreen() {
  //state for the search query
  const [query, setQuery] = useState("");
  //state for the notifications
  const [notifEnabled, setNotifEnabled] = useState(true);

  //simple search filter (case-insensitive)
  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q.length
      ? SETTINGS.filter(
          s =>
            s.title.toLowerCase().includes(q) ||
            s.description.toLowerCase().includes(q)
        )
      : SETTINGS;

    // optional: de-dupe by title so repeated rows don’t spam the list
    const seen = new Set<string>();
    return filtered.filter(s => {
      if (seen.has(s.title)) return false;
      seen.add(s.title);
      return true;
    });
  }, [query]);

  //render the settings
  const renderItem = ({ item }: { item: Setting }) => {
    const isNotifications = item.title === "Notifications";

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.row}
        onPress={() => {
          // demo: toggle notifications on row tap
          if (isNotifications) setNotifEnabled(prev => !prev);
          // TODO: navigate for other items (e.g., router.push("/settings/privacy"))
        }}
      >
        <View style={styles.rowText}>
          <Text style={styles.rowTitle}>{item.title}</Text>
          <Text style={styles.rowDesc}>{item.description}</Text>
        </View>

        {isNotifications ? (
          <Switch value={notifEnabled} onValueChange={setNotifEnabled} />
        ) : (
          <Text style={styles.chevron}>›</Text>
        )}
      </TouchableOpacity>
    );
  };

  //main view for the settings screen
    return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Settings</Text>

          <TextInput
            placeholder="Search settings…"
            value={query}
            onChangeText={setQuery}
            style={styles.search}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />

          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.sep} />}
            contentContainerStyle={{ paddingBottom: 24 }}
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>No settings found</Text>
              </View>
            }
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

//styles for the settings screen
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0B0B0C" },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  search: {
    height: 42,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#17181A",
    color: "black",
    borderWidth: 1,
    borderColor: "#232529",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: "#101113",
    borderRadius: 14,
  },
  rowText: { flex: 1 },
  rowTitle: { color: "white", fontSize: 16, fontWeight: "600" },
  rowDesc: { color: "#9aa0a6", fontSize: 13, marginTop: 2 },
  chevron: { color: "#5f6368", fontSize: 28, marginLeft: 6, marginRight: 2 },
  sep: { height: 12 }, // card spacing
  emptyBox: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: { color: "#9aa0a6" },
});