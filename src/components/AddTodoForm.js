import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { addTodo } from "../actions/todoActions";
import { Picker } from "@react-native-picker/picker";

const AddTodoForm = () => {
  // const [searchContent, setSearchContent] = useState(''); // State for search input
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("Normal"); // Set default priority to 'Normal'
  const [showPicker, setShowPicker] = useState(false); // State to control the visibility of the picker
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (content.trim() !== "") {
      const createdAt = new Date().toISOString(); // Convert date to ISO 8601 string
      const todoContent = `${content} (${priority})`; // Concatenate content and priority

      dispatch(
        addTodo({ id: Date.now(), content, priority, todoContent, createdAt })
      );
      setContent("");
      setPriority("Normal"); // Reset priority to 'Normal' after submission
      //setShowPicker(false); // Hide the picker after submission
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={content}
          onChangeText={setContent}
          placeholder="Enter todo content"
          onFocus={() => setShowPicker(true)} // Show the picker when the TextInput is focused
        />
      </View>
      {showPicker && ( // Conditionally render the picker based on the showPicker state
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={priority}
            onValueChange={(itemValue, itemIndex) => setPriority(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Normal" value="Normal" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="High" value="High" />
          </Picker>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Add Todo" onPress={handleSubmit} color="#007bff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    paddingBottom: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 60,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 5,
    width: "100%",
  },
  picker: {
    width: "50%", // Adjust the width of the picker
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 5,
  },
  buttonContainer: {
    width: "100%",
  },
});

export default AddTodoForm;
