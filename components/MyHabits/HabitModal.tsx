import { Habit } from "@/app/(tabs)/Habits";
import { useState } from "react";
import { Button, Modal, Text, TextInput, View } from "react-native";

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
      console.log("Add ", habitName)
    }
    setHabitName("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="none" transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            width: "80%",
            backgroundColor: "#fff",
            padding: 30,
            borderRadius: 10,
            elevation: 5,
          }}
        >
          <Text style={{
            fontSize: 25,
            fontWeight: '600',
            paddingBottom: 10
          }}>{selectedHabit ? "Edit Habit" : "New Habit"}</Text>
          <TextInput
            placeholder="Enter habit name"
            placeholderTextColor='gray'
            value={habitName}
            onChangeText={setHabitName}
            style={{
              borderBottomWidth: 1,
              borderColor: "#ccc",
              marginBottom: 20,
              paddingVertical: 10,
            }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
            }}
          >
            <Button title="Cancel" onPress={onClose} color="#FF5C5C" />
            <Button title="Save" onPress={handleSave} color="#007BFF" />
          </View>
        </View>
      </View>
    </Modal>
  );
};
