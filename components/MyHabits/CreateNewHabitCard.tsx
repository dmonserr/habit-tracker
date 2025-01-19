import { Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

export const CreateNewHabitCard = ({ openModal }: { openModal: any }) => {
  const themedColor = useThemeColor({ light: 'gray', dark: 'white'}, 'text')

  return (
    <ThemedView
      style={{
        padding: 20,
        marginTop: 50,
        display: "flex",
        alignItems: "center",
        gap: 20,
      }}
    >
      <IconSymbol size={50} name="figure.stairs.circle.fill" color={themedColor} />
      <ThemedText
        style={{
          fontSize: 25,
          marginTop: 10,
        }}
      >
        No habits created yet
      </ThemedText>
      <ThemedText
        style={{
          fontSize: 20,
          textAlign: "center",
          color: "gray",
        }}
      >
        Ready to make the first step at a better life? Get started below
      </ThemedText>
      <TouchableOpacity
        onPress={openModal}
        style={{
          padding: 15,
          backgroundColor: "black",
          borderRadius: 15,
          paddingHorizontal: 30,
        }}
      >
        <ThemedText
          style={{
            color: "white",
            fontSize: 17,
          }}
        >
          Create a new habit
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};
