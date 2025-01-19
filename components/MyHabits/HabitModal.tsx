import { Habit } from "@/app/(tabs)/Habits";
import { useState } from "react";
import { Button, Modal, Text, TextInput, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

export const HabitModal = ({
  visible,
  onClose,
  onAddHabit,
  selectedHabit,
  onEditHabit,
}: {
  visible: boolean;
  selectedHabit: Habit | undefined;
  onClose: any;
  onAddHabit: any | undefined;
  onEditHabit: any | undefined;
}) => {
  const [habitName, setHabitName] = useState(
    selectedHabit ? selectedHabit.name : ""
  );

  const handleSave = () => {
    if (selectedHabit) {
      onEditHabit(selectedHabit.id, habitName);
    } else {
      onAddHabit(habitName);
    }
    setHabitName("");
    onClose();
  };

  const themedColor = useThemeColor({ light: 'gray', dark: 'white'}, 'text')

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <ThemedView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}
      >
        <ThemedView
          style={{
            width: "80%",
            padding: 30,
            borderRadius: 10,
            elevation: 5,
          }}
        >
          <ThemedText style={{
            fontSize: 25,
            fontWeight: '600',
            paddingBottom: 10
          }}>{selectedHabit ? "Edit Habit" : "New Habit"}</ThemedText>
          <TextInput
            placeholder="Enter habit name"
            placeholderTextColor={themedColor}
            value={habitName}
            onChangeText={setHabitName}
            style={{
              borderBottomWidth: 1,
              borderColor: "#ccc",
              marginBottom: 20,
              paddingVertical: 10,
              color: themedColor
            }}
          />
          <ThemedView
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
            }}
          >
            <Button title="Cancel" onPress={onClose} color="#FF5C5C" />
            <Button title="Save" onPress={handleSave} color="#007BFF" />
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
};
