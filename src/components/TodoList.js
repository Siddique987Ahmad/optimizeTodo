import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../actions/todoActions";
import { fetchTodos } from "../actions/todoActions";
import TodoItem from "./TodoItem";
import { Picker } from "@react-native-picker/picker";

const TodoList = () => {
  const dispatch = useDispatch();
  const allTodos = useSelector((state) => state.todos);
  const [todos, setTodos] = useState(allTodos);
  const [editingTodo, setEditingTodo] = useState(null);
  const [updatedContent, setUpdatedContent] = useState("");
  const [updatedPriority, setUpdatedPriority] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("priority");


  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  

  
  // useEffect(() => {
  //   // Filter and sort todos whenever allTodos, searchQuery, or sortCriteria changes
  //   const filteredTodos = allTodos.filter(todo =>
  //     todo.content.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  //   const sortedTodos = [...filteredTodos].sort((a, b) => {
  //     if (sortCriteria === 'priority') {
  //       return a.priority.localeCompare(b.priority);
  //     } else {
  //       // Add other sorting criteria here if needed
  //       return 0;
  //     }
  //   });

  //   setTodos(sortedTodos);
  // }, [allTodos, searchQuery, sortCriteria]);

  useEffect(() => {
    // Filter todos based on search query
    const filteredTodos = allTodos.filter((todo) =>
      todo.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort todos based on sort criteria
    let sortedTodos;
    if (sortCriteria === "priority") {
      sortedTodos = filteredTodos.sort((a, b) =>
        a.priority.localeCompare(b.priority)
      );
    } else {
      // Add other sorting criteria here if needed
      sortedTodos = filteredTodos;
    }

    setTodos(sortedTodos);
  }, [allTodos, searchQuery, sortCriteria]);


  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setUpdatedContent(todo.content);
    setUpdatedPriority(todo.priority);
  };

  const handleUpdateTodo = () => {
    if (updatedContent.trim() !== "") {
      const updatedTodo = {
        ...editingTodo,
        content: updatedContent,
        priority: updatedPriority, // Update the priority
      };
      dispatch(updateTodo(updatedTodo));
      setEditingTodo(null);
      setUpdatedContent("");
      setUpdatedPriority("");
    }
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const handleSortChange = (value) => {
    setSortCriteria(value);
    
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Search by content..."
      />
      <Picker
        selectedValue={sortCriteria}
        style={styles.sortPicker}
        onValueChange={handleSortChange}
      >
        <Picker.Item label="Sort by Priority" value="priority" />
        <Picker.Item label="Normal" value="Normal" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="High" value="High" />
      </Picker>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onPressEdit={() => handleEditTodo(todo)}
          onPressDelete={() => handleDeleteTodo(todo.id)}
          isEditing={editingTodo && editingTodo.id === todo.id}
          updatedContent={updatedContent}
          onContentChange={setUpdatedContent}
          updatedPriority={updatedPriority}
          onPriorityChange={setUpdatedPriority} // Pass the function to update priority
          onUpdate={handleUpdateTodo}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchInput: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  sortPicker: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default TodoList;
