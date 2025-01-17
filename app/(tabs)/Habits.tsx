import { CreateNewHabitCard } from "@/components/MyHabits/CreateNewHabitCard";
import { HabitCard } from "@/components/MyHabits/HabitCard";
import { HabitModal } from "@/components/MyHabits/HabitModal";
import { IconSymbol } from "@/components/ui/IconSymbol";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export type Habit = {
  id: string;
  name: string;
  completed: boolean;
};

const Habits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit>();

  useEffect(() => {
    loadHabits();
    loadDailyCompletion();
  }, []);

  useEffect(() => {
    loadDailyCompletion();
  }, [date]);

  const loadHabits = async () => {
    try {
      const savedHabits = await AsyncStorage.getItem("habits");
      setHabits(savedHabits ? JSON.parse(savedHabits) : []);
    } catch (error) {
      console.error("Failed to load habits:", error);
    }
  };

  const saveHabits = async (habitsToSave: Habit[]) => {
    try {
      await AsyncStorage.setItem("habits", JSON.stringify(habitsToSave));
    } catch (error) {
      console.error("Failed to save habits:", error);
    }
  };

  const loadDailyCompletion = async () => {
    try {
      const savedCompletion = await AsyncStorage.getItem(date);
      const dailyCompletion = savedCompletion
        ? JSON.parse(savedCompletion)
        : {};
      const updatedHabits = habits.map((habit) => ({
        ...habit,
        completed: dailyCompletion[habit.id] || false,
      }));
      setHabits(updatedHabits);
    } catch (error) {
      console.error("Failed to load daily completion:", error);
    }
  };

  const saveDailyCompletion = async () => {
    try {
      const dailyCompletion = habits.reduce(
        (acc: Record<string, boolean>, habit) => {
          acc[habit.id] = habit.completed;
          return acc;
        },
        {}
      );
      await AsyncStorage.setItem(date, JSON.stringify(dailyCompletion));
    } catch (error) {
      console.error("Failed to save daily completion:", error);
    }
  };

  const addHabit = (newHabit: string) => {
    if (newHabit.trim() !== "") {
      const updatedHabits = [
        ...habits,
        { id: Date.now().toString(), name: newHabit, completed: false },
      ];
      setHabits(updatedHabits);
      saveHabits(updatedHabits);
      setNewHabit("");
      setIsDisplayed(false);
    }
  };

  const toggleHabit = async (id: string) => {
    const updatedHabits = habits.map((habit) =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updatedHabits);
    await saveDailyCompletion();
  };

  const deleteHabit = (id: string) => {
    const updatedHabits = habits.filter((habit) => habit.id !== id);
    setHabits(updatedHabits);
    saveHabits(updatedHabits);
  };

  const editHabit = (id: string, newName: string) => {
    const updatedHabits = habits.map((habit) =>
      habit.id === id ? { ...habit, name: newName } : habit
    );
    setHabits(updatedHabits);
    saveHabits(updatedHabits);
  };

  const openOptions = (habit: Habit) => {
    setSelectedHabit(habit);
    setIsDisplayed(true);
  };

  const changeDate = (days: number) => {
    const newDate = moment(date).add(days, "days").format("YYYY-MM-DD");
    saveDailyCompletion();
    setDate(newDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Habits</Text>
        <TouchableOpacity onPress={() => setIsDisplayed(true)}>
          <IconSymbol size={30} name="plus.circle.dashed" color="black" />
        </TouchableOpacity>
      </View>
      <View>
        {habits.length == 0 ? (
          <CreateNewHabitCard openModal={() => setIsDisplayed(true)} />
        ) : (
          <>
            <View style={styles.dateContainer}>
              <Button title="Previous" onPress={() => changeDate(-1)} />
              <Text style={styles.dateText}>{date}</Text>
              <Button title="Next" onPress={() => changeDate(1)} />
            </View>
            <FlatList
              data={habits}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <HabitCard
                  habit={item}
                  onToggle={() => toggleHabit(item.id)}
                  onEdit={() => openOptions(item)}
                  onDelete={() => deleteHabit(item.id)}
                />
              )}
            />
          </>
        )}
      </View>
      <HabitModal
        visible={isDisplayed}
        onClose={() => {
          setIsDisplayed(false);
          setSelectedHabit(undefined);
        }}
        onAddHabit={addHabit}
        selectedHabit={selectedHabit}
        onEditHabit={editHabit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 25,
    paddingTop: 50,
    height: "100%",
  },
  headerContainer: {
    marginVertical: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
  },
  habitRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  habitContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  habitText: {
    fontSize: 18,
  },
  completedHabit: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  addButton: {
    backgroundColor: "#000",
    borderRadius: 50,
    width: 40,
    height: 40,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
  optionsButton: {
    padding: 10,
  },
  optionsButtonText: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    paddingVertical: 5,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Habits;
