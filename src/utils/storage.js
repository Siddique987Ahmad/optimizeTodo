import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "todos";

export const saveTodos = async (todos) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Error saving todos to AsyncStorage:", error);
  }
};

export const getTodos = async () => {
  try {
    const todos = await AsyncStorage.getItem(STORAGE_KEY);
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error("Error getting todos from AsyncStorage:", error);
    return [];
  }
};
