import { Habit } from "@/app/(tabs)/Habits";
import { Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";
import * as Haptics from "expo-haptics";
import { ThemedView } from "../ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../ThemedText";

export const HabitCard = ({
  habit,
  onToggle,
  onEdit,
  onDelete,
}: {
  habit: Habit;
  onToggle: any;
  onEdit: any;
  onDelete: any;
}) => {
  const themedColor = useThemeColor({ light: 'gray', dark: 'white'}, 'text')
  
  return (
    <ThemedView
      style={{
        padding: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          onToggle();
          if (process.env.EXPO_OS === "ios") {
            // Add a soft haptic feedback when pressing down on the tabs.
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
        }}
      >
        {habit.completed ? (
          <IconSymbol size={22} name="checkmark" color="gray" />
        ) : (
          <IconSymbol size={22} name="circle" color="gray" />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onEdit}
        style={{
          backgroundColor: themedColor,
          borderRadius: 15,
          padding: 15,
          paddingHorizontal: 30,
          flex: 0.9,
        }}
      >
        <ThemedText style={{ color: 'black', fontSize: 18, fontWeight: "600" }}>
          {habit.name}
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <IconSymbol size={22} name="x.circle" color="red" />
      </TouchableOpacity>
    </ThemedView>
  );
};
