import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
const TodoItem = ({
  todo,
  onPressEdit,
  onPressDelete,
  isEditing,
  updatedContent,
  onContentChange,
  updatedPriority,
  onPriorityChange,
  onUpdate,
}) => {
  const handleUpdate = () => {
    onUpdate();
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <View>
          <TextInput
            style={styles.input}
            value={updatedContent}
            onChangeText={onContentChange}
            placeholder="Update todo content"
          />
          <Picker
            selectedValue={updatedPriority}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              onPriorityChange(itemValue)
            }
          >
            <Picker.Item label="Normal" value="Normal" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="High" value="High" />
          </Picker>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{todo.content}</Text>
          <Text style={styles.createdAt}>
            {todo.priority} - Created:{" "}
            {new Date(todo.createdAt).toLocaleDateString()}
          </Text>
        </View>
      )}
      <View style={styles.buttonsContainer}>
        {isEditing ? (
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={onPressEdit}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onPressDelete}>
              <Text style={[styles.buttonText, { color: "red" }]}>Delete</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    fontSize: 16,
    marginBottom: 5,
  },
  createdAt: {
    fontSize: 10,
    color: "#888",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    padding: 5,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 14,
    color: "blue",
  },
  input: {
    flex: 1,
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  picker: {
    width: "50%", // Adjust the width of the picker
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default TodoItem;
