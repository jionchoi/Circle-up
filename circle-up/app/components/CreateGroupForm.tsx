// components/CreateGroupForm.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";

export type CreateGroupPayload = {
  title: string;
  leader: string;
  description: string;
  location: string;
};

type Props = {
  onSubmit: (data: CreateGroupPayload) => void;
  onCancel: () => void;
};

export default function CreateGroupForm({ onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const validate = () => {
    if (!title.trim()) return "Title is required";
    if (!description.trim()) return "Description is required";
    if (!location.trim()) return "Location is required";
    return null;
  };

  const handleSubmit = () => {
    const err = validate();
    if (err) return Alert.alert("Invalid form", err);

    onSubmit({
      title: title.trim(),
      leader: "Current User", // default to current user
      description: description.trim(),
      location: location.trim(),
    });
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 80 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 16 }}>
        Create Group
      </Text>

      <Field label="Title" value={title} onChange={setTitle} placeholder="Walk Group" />
      <Field
        label="Description"
        value={description}
        onChange={setDescription}
        placeholder="What's this group about?"
        multiline
        minHeight={100}
      />
      <Field
        label="Location"
        value={location}
        onChange={setLocation}
        placeholder="Downtown Hub, Edmonton"
      />

      <TouchableOpacity
        onPress={handleSubmit}
        style={{ backgroundColor: "black", paddingVertical: 14, borderRadius: 10, alignItems: "center", marginTop: 10 }}
      >
        <Text style={{ color: "white", fontWeight: "700" }}>Create Group</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onCancel} style={{ paddingVertical: 12, alignItems: "center", marginTop: 10 }}>
        <Text style={{ color: "#444" }}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
  minHeight,
  keyboardType,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  multiline?: boolean;
  minHeight?: number;
  keyboardType?: "default" | "number-pad";
}) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ fontWeight: "600", marginBottom: 6 }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        multiline={multiline}
        keyboardType={keyboardType}
        style={{
          backgroundColor: "white",
          padding: 12,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#e5e5e5",
          minHeight: minHeight || 0,
          textAlignVertical: multiline ? "top" : "center",
        }}
      />
    </View>
  );
}
