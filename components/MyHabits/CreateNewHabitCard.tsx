import { Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";

export const CreateNewHabitCard = ({ openModal }: { openModal: any }) => {
  return (
    <View
      style={{
        padding: 20,
        marginTop: 50,
        display: "flex",
        alignItems: "center",
        gap: 20,
      }}
    >
      <IconSymbol size={50} name="figure.stairs.circle.fill" color="black" />
      <Text
        style={{
          fontSize: 25,
          marginTop: 10,
        }}
      >
        No habits created yet
      </Text>
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          color: "gray",
        }}
      >
        Ready to make the first step at a better life? Get started below
      </Text>
      <TouchableOpacity
        onPress={openModal}
        style={{
          padding: 15,
          backgroundColor: "black",
          borderRadius: 15,
          paddingHorizontal: 30,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 17,
          }}
        >
          Create a new habit
        </Text>
      </TouchableOpacity>
    </View>
  );
};
