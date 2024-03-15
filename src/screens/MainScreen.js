import React from "react";
import { View } from "react-native";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";

const MainScreen = () => {
  return (
    <View>
      <AddTodoForm />
      <TodoList />
    </View>
  );
};

export default MainScreen;
