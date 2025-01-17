import { Habit } from "@/app/(tabs)/Habits";
import { Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";

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
  return (
    <View
      style={{
        padding: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={onToggle}>
        {habit.completed ? (
          <IconSymbol size={22} name="checkmark" color="gray" />
        ) : (
          <IconSymbol size={22} name="circle" color="gray" />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onEdit}
        style={{
          backgroundColor: "black",
          borderRadius: 15,
          padding: 15,
          paddingHorizontal: 30,
          flex: 0.9,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
          {habit.name}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <IconSymbol size={22} name="x.circle" color="red" />
      </TouchableOpacity>
    </View>
  );
};
